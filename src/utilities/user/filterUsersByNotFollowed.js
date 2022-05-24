export const filterUsersByNotFollowed = ({ following, users, uid }) => {
  if (users) {
    const usernames = following.map(({ username }) => username);
    return users.filter(
      ({ username }) => !usernames.includes(username) && username !== uid
    );
  }
  return [];
};
