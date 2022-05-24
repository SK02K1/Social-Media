export const sortPosts = ({ posts, sortBy }) => {
  if (posts) {
    switch (sortBy) {
      case 'TRENDING':
        return [...posts].sort(
          (a, b) => b?.likes?.likeCount - a?.likes?.likeCount
        );
      case 'LATEST':
        return [...posts].sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
      case 'OLDEST':
        return [...posts].sort(
          (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
        );
      default:
        return [...posts];
    }
  }
  return posts;
};
