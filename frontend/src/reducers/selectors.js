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
  let postId = state.ui.modal.postId;
  let post = state.entities.posts[postId];
  let likers = post.likes;
  return likers.map(liker => state.entities.users[liker]);
  // return Object.values(state.entities.users);
<<<<<<< Updated upstream
};
=======
};

export const findCurrentUser = state => {
  let currentUserId = state.session.user.id;
  return Object.values(state.entities.users).filter(user => user._id === currentUserId)[0];
};

// export const notFollowingExplore = state => {
//   let allUsers = Object.values(state.entities.users);
//   let currentUserId = state.session.user.id;
//   let notFollowed = allUsers.filter(
//     user =>
//       !user.followers.includes(currentUserId) && user._id !== currentUserId
//   );
//   return notFollowed;
// };
>>>>>>> Stashed changes
