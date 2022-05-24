export const filterByNotFollowingUser = ({ posts, following, uid }) => {
  if (posts) {
    const usernames = following.map(({ username }) => username);
    return posts.filter(
      ({ username }) => !usernames.includes(username) && username !== uid
    );
  }
};
