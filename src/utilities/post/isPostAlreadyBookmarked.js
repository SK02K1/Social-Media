export const isPostAlreadyBookmarked = ({ bookmarks, postID }) => {
  return bookmarks && Boolean(bookmarks.find(({ _id }) => _id === postID));
};
