const { state } = require('../state');

function injectCssStateClasses() {
  // Add missing css class to "Like Memo" buttons
  $(`.post .actions a[href^='memo/like']`).addClass('like-button');

  //add class to secondary nav buttons
  $(`.nav a[href^='disclaimer']`).addClass('disclaimer-button');
  $(`.nav a[href="logout"]`).addClass('logout-button');

  //add new-memo class
    $(`a[href^='memo/new']`).addClass('new-memo-inner-button');


  //add my-profile class
  $(`html a[href*="profile/"]`).addClass('profile-button');
  $(`table a[href*="profile/"], h2 a[href*="profile/"]`).removeClass('profile-button');

  // remove from name links
  $(`html a[href="/profile/1F5GrRezwGokQhxmF4fYaBbbNrPPaeBqMm"], html .name a[href*="profile/"]`).addClass('post-profile-button');
    

  //add footer-button to lower buttons
  $(`html a[href="/introducing-memo"], html a[href="/profile/1F5GrRezwGokQhxmF4fYaBbbNrPPaeBqMm"], html a[href="/stats"], html a[href^='protocol']`).addClass('footer-button');

  //add outline-button to dashboard buttons
  $(`html a[href="key/change-password"], html a[href="key/export"], html a[href="memo/set-name"]`).addClass('outline-button');

  //add new-memo to header 

  if ($(".like-button")[0]){
      // using like to query if user logged in
      $( ".nav" ).append( '<a class="btn new-memo-button" href="memo/new">New Memo</a>' );
  }

  // Add data-txhash to posts
  $(`.post .actions .like-button`).each((_, a) => {
    const $a = $(a);
    const $post = $a.closest('.post');
    const href = $a.attr('href');
    const txhash = href.match(/[^\/\?]+$/)[0];
    $post.attr('data-txhash', txhash);
  });

  // Remove "Like Memo", which will be done by CSS instead
  $(`.post .actions .like-button`).html('');

  // Restore likes
  $('.post[data-txhash]').each((_, post) => {
    const $post = $(post);
    const txhash = $post.attr('data-txhash');

    $post.toggleClass('is-liked', !!state.likedPosts[txhash]);
  });
}

module.exports = injectCssStateClasses;
