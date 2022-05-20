export const getPostByID = ({ postID, posts }) => {
  return posts.find(({ _id }) => _id === postID);
};
