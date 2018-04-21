function injectRememberPassword() {
  $('[type="password"]').each((_, password) => {
    // Load
    $(password).val(localStorage.memoPassword || "");

    // Save
    $(password)
      .closest("form")
      .submit(() => {
        localStorage.memoPassword = $(password).val();
      });
  });
}

module.exports = injectRememberPassword;
