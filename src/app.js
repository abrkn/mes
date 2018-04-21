const injectInlineCommenting = require('./plugins/inline-commenting');
const injectRememberPassword = require('./plugins/remember-password');
const injectAutoExpandImages = require('./plugins/auto-expand-images');
const injectFixTipAmountInput = require('./plugins/fix-tip-amount');
const injectCssStateClasses = require('./plugins/css-state-classes');

const addCss = () => {
  const element = document.createElement('style');
  element.innerText = require('../app.css');

  document.head.appendChild(element);
};

addCss();

$(() => {
  injectRememberPassword();
  injectFixTipAmountInput();
  injectAutoExpandImages();
  injectCssStateClasses();
  injectInlineCommenting();
});
