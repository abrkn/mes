const injectInlineLike = require('./plugins/inline-like');
const injectRememberPassword = require('./plugins/remember-password');
const injectAutoExpandImages = require('./plugins/auto-expand-images');
const injectFixTipAmountInput = require('./plugins/fix-tip-amount');
const injectCssStateClasses = require('./plugins/css-state-classes');
const injectExpandEmojis = require('./plugins/expand-emojis');
const injectInlineReply = require('./plugins/inline-reply');
const injectAutoExpandMaps = require('./plugins/auto-expand-maps');

const addCss = () => {
  const element = document.createElement('style');
  element.innerText = require('./app.scss');

  document.head.appendChild(element);
};

addCss();

$(() => {
  injectRememberPassword();
  injectFixTipAmountInput();
  injectAutoExpandImages();
  injectCssStateClasses();
  injectInlineLike();
  injectExpandEmojis();
  injectInlineReply();
  injectAutoExpandMaps();
});
