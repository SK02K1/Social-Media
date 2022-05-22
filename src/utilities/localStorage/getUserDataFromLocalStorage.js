export const getUserDataFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem('sharemoment-userData'));
};
