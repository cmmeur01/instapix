export const notFollowing = (state) => {
  let allUsers = Object.values(state.entities.users);
  let currentUserId = state.session.user.id;
  let notFollowed = allUsers.filter(user => !user.followers.includes(currentUserId) && user._id !== currentUserId );
  let randomUsers = [];
  while (randomUsers.length < 10) {
    let random = Math.floor(Math.random() * notFollowed.length);
    let user = notFollowed[random];
    if (!randomUsers.includes(user)) randomUsers.push(user);
  }
  return randomUsers;
};

export const findPost = (state) => {
  let postId = state.ui.modal.postId;
  return state.entities.posts[postId];
};

export const findUsers = (state) => {
  // let postId = state.ui.modal;
  // let likers = state.entities.posts.postId.likes;
  // return likers.map(liker => state.entities.users[liker]);
  return Object.values(state.entities.users);
}