export const isPostAlreadyLiked = ({ likedBy, uid }) => {
  return Boolean(likedBy.find(({ username }) => username === uid));
};
