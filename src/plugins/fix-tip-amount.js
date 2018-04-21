function injectFixTipAmount() {
  const $formMemoLike = $("#form-memo-like");

  if ($formMemoLike.length) {
    // Only tip in integers with a minimum of what is stated: "(min. 123)"
    $formMemoLike.find("input#tip").attr({
      type: "number",
      pattern: "d*",
      min: $('#form-memo-like label[for="tip"]')
        .text()
        .match(/(\d+)\)/)[1]
    });
  }
}

module.exports = injectFixTipAmount;
