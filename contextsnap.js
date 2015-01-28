$(document).ready( function() {
  
  $('body').prepend('<div class="context-sidebar"><div class="context-side-clicker"></div><div id="context-body"></div></div>')

  var wikiObj = {
    title: "Darren Wilson",
    summary: "The shooting of Michael Brown occurred on August 9, 2014, in Ferguson, Missouri, a suburb of St. Louis. Brown, an 18-year-old black man, was fatally shot by Darren Wilson, 28, a white Ferguson police officer.",
    img: "https://thenypost.files.wordpress.com/2014/11/screen_shot_2014-11-26_at_6-44-10_am_102580913-e1416977210871.jpg"
  };

  var darrenWidgets = {
    wikipedia: wikiObj
  };

  var keywordData = {
    "Darren Wilson" : darrenWidgets
  };

  var open = false;
  var currentKeyword = '';
  var templates = $("#templates").html();
  var templates = Handlebars.compile(templates);
  
  $('span.context').click(function(){
    var keyword = $(this)[0].textContent;
    if (open && currentKeyword !== keyword){
      renderKeyword(keyword);
      currentKeyword = keyword;
    } else if (open && currentKeyword === keyword) {
      open = false;
      $('.context-sidebar').toggleClass('context-show');
    } else {
      $('.context-sidebar').toggleClass('context-show');
      renderKeyword(keyword);
      currentKeyword = keyword;
      open = true;
    }
  });

  $('span.context').hover(function(){
    var keyword = $(this)[0].textContent;
    if (open && currentKeyword !== keyword){
      // renderKeyword(keyword);
      // currentKeyword = keyword;
    } else if (open && currentKeyword === keyword) {
      $('.context-sidebar').toggleClass('context-peak');
    } else if (!open){
      $('.context-sidebar').toggleClass('context-peak');
      renderKeyword(keyword);
      currentKeyword = keyword;
    }
  });

  $('.context-side-clicker').click(function(){
    if (open){
      open = false;
      $('.context-sidebar').toggleClass('context-show');
    } else {
      open = true;
      $('.context-sidebar').toggleClass('context-show');
    } 
  });
    

  function renderKeyword(keyword){
    $('#context-body').empty();
    var sideBarData = keywordData[keyword];
    var sideBarhtml  = templates(sideBarData);
    $('#context-body').append(sideBarhtml)
  }



});   