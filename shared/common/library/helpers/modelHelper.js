const modelHelper = {
  parseErrors: (result) => {
    if (!result || !result.errors) return null;
    const errors = result.errors;

    let msgErrors = [];
    for (const key in errors) {
      if (errors.hasOwnProperty(key)) {
        const messages = errors[key];
        if (messages) msgErrors.push(...messages);
      }
    }

    let message = '';
    let htmlErrors = '';
    if (result.message) message += result.message;
    if (msgErrors.length) {
      htmlErrors += '<ul>';
      for (const msgError of msgErrors) {
        htmlErrors += `<li>${msgError}</li>`;
      }
      htmlErrors += '</ul>';
    }

    message += htmlErrors;
    return message;
  },
};

export default modelHelper;
