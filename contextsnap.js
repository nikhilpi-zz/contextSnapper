$(document).ready( function() {
  
  $('body').prepend('<div class="context-sidebar"></div>')
  
  var source   = $("#testdiv").html();
  var template = Handlebars.compile(source);
  var context = {title: "My New Post"};
  var html  = template(context);
  
  $('span.context').click(function(){
    $('.context-sidebar').toggleClass('context-show')
    $('.context-sidebar').append(html)
  });

});   