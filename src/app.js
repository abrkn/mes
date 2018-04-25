const injectInlineCommenting = require('./plugins/inline-commenting');
const injectRememberPassword = require('./plugins/remember-password');
const injectAutoExpandImages = require('./plugins/auto-expand-images');
const injectFixTipAmountInput = require('./plugins/fix-tip-amount');
const injectCssStateClasses = require('./plugins/css-state-classes');
const injectExpandEmojis = require('./plugins/expand-emojis');
const enforceS3UpdateUrlChange = require('./plugins/enforce-s3-update-url-change');

const addCss = () => {
  const element = document.createElement('style');
  element.innerText = require('./app.scss');

  document.head.appendChild(element);
};

addCss();

$(() => {
  enforceS3UpdateUrlChange();
  injectRememberPassword();
  injectFixTipAmountInput();
  injectAutoExpandImages();
  injectCssStateClasses();
  injectInlineCommenting();
  injectExpandEmojis();
});
