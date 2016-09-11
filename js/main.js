---
---

function share($btn) {
  var platform = $btn.attr('data-platform');
  var permalink = '{{ site.url }}' + $btn.attr('data-permalink');
  var picture = $btn.attr('data-picture') || false;
  var post_title = $btn.attr('data-title');
  var post_subtitle = $btn.attr('data-subtitle');
  
  var options;
  switch(platform) {
    case 'facebook':
      options = {
        host: 'https://facebook.com/dialog/feed',
        params: {
          display: 'popup',
          app_id: '{{ site.fb_app_id }}',
          link: permalink,
          caption: post_title,
          picture: picture ? picture : '{{ site.url }}{{ site.export_logo }}'
        },
        size: { width: 555, height: 577 }
      }
    break;
    case 'twitter':
      options = {
        host: 'https://twitter.com/intent/tweet',
        params: {
          text: post_title,
          url: permalink,
          via: 'nickvorobiov',
        },
        size: { width: 450, height: 253 }
      }
    break;
    case 'vk':
      options = {
        host: 'http://vk.com/share.php',
        params: {
          url: permalink,
          title: post_title,
          description: post_subtitle ? post_subtitle : '{{ site.title }}',
          image: picture ? picture : '{{ site.url }}{{ site.export_logo }}'
        },
        size: { width: 650, height: 570 }
      }
    break;
  }

  if (options) {
    //console.log(options.params);
    PopupCenter(
      options.host + '?' + $.param(options.params),
      '_blank', options.size.width, options.size.height);
  }

  return false;
};

$(function(){
  $('.btn-share').click(function(e){
    e.preventDefault();
    share($(this));
  })
})

function PopupCenter(url, title, w, h) {
  // Fixes dual-screen position                         Most browsers      Firefox
  var dualScreenLeft = window.screenLeft != undefined ? window.screenLeft : screen.left;
  var dualScreenTop = window.screenTop != undefined ? window.screenTop : screen.top;

  var width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? 
    document.documentElement.clientWidth : screen.width;
  var height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? 
    document.documentElement.clientHeight : screen.height;

  var left = ((width / 2) - (w / 2)) + dualScreenLeft;
  var top = ((height / 2) - (h / 2)) + dualScreenTop;
  var newWindow = window.open(url, title, 'scrollbars=yes, width=' + w + ', height=' + h + 
    ', top=' + top + ', left=' + left);

  // Puts focus on the newWindow
  if (window.focus) {
    newWindow.focus();
  }
}
