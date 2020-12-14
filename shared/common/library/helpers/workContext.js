const workContext = {
  userId: () => {
    return localStorage.getItem('sub');
  },
  languageId: () => {
    return localStorage.getItem('languageId');
  },
};

export default workContext;
