import * as PostAPIUtil from "./../util/post_api_util";

export const RECEIVE_POSTS = "RECEIVE_POSTS";
export const RECEIVE_FEED_POSTS = "RECEIVE_FEED_POSTS";
export const RECEIVE_POST = "RECEIVE_POST";
export const RECEIVE_MORE_POSTS = "RECEIVE_MORE_POSTS";
export const RECEIVE_EXPLORE_POSTS = 'RECEIVE_EXPLORE_POSTS';


const receivePosts = posts => {
  return {
    type: RECEIVE_POSTS,
    posts
  };
};

const receivePost = post => {
  return {
    type: RECEIVE_POST,
    post
  };
};

const receiveFeedPosts = data => {
  return {
    type: RECEIVE_FEED_POSTS,
    data
  };
};

const receiveMorePosts = posts => {
  return {
    type: RECEIVE_MORE_POSTS,
    posts
  };
};

const receiveExplorePosts = posts => {
  return {
    type: RECEIVE_EXPLORE_POSTS,
    posts
  };
};

export const fetchPosts = () => dispatch => {
  return PostAPIUtil.fetchPosts().then(res => {
    return dispatch(receiveFeedPosts(res.data));
  });
};

export const fetchPostsByUserId = id => dispatch => {
  return PostAPIUtil.fetchPostsByUserId(id).then(res => {
    return dispatch(receivePosts(res.data));
  });
};

//has posts.posts when dispatch receivePost
export const fetchPost = id => dispatch => {
  return PostAPIUtil.fetchPost(id).then(res => {
    return dispatch(receivePost(res.data));
  });
};

// does not have posts.posts when dispatch receivePost
export const postComment = (post_id, user_id, text) => dispatch => {
  return PostAPIUtil.postComment(post_id, user_id, text).then(res => {
    return dispatch(receivePost(res.data));
  });
};

export const sendPost = post => dispatch => {
  return PostAPIUtil.sendPost(post).then(res => {
    return res.data.post._id;
  });
};

export const fetchMorePosts = numPosts => dispatch => {
  return PostAPIUtil.fetchMorePosts(numPosts).then(res => {
    return dispatch(receiveMorePosts(res.data));
  });
};

export const fetchExplorePosts = () => dispatch => {
  return PostAPIUtil.fetchExplorePosts().then(res => {
    return dispatch(receiveExplorePosts(res.data.posts));
  });
};