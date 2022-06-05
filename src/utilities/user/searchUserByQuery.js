export const searchUserByQuery = ({ users, searchQuery }) => {
  if (searchQuery) {
    return users.filter(({ firstName, lastName, username }) => {
      return (
        firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        username.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });
  }
};
