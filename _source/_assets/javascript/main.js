$(window).load(function()
{
  $('img.tipsy').tipsy({title: 'alt' });
  $('a.tipsy').tipsy({title: 'title', gravity: 's'});
  $('.fancybox').fancybox({
      helpers: {
          title : {
              type : 'float'
          }
      }
  });
});
