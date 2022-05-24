export const isMyProfile = ({ user, userData }) => {
  return userData.username === user?.username;
};
