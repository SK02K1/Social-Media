export const saveUserDataInLocalStorage = (userData) => {
  localStorage.setItem('sharemoment-userData', JSON.stringify(userData));
};
