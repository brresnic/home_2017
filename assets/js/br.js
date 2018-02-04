var initialized = false;
var artLoaded = false;
// $( window ).load(function() {
//   //wait to load the art page until everything else loads
//   loadArt();
// });

$( document ).ready(function() {

  // initial nav based on hash
  if(window.location.hash) {
    var hash = window.location.hash.substring(1); //Puts hash in variable, and removes the # character
    triggerPage(hash);
    if(hash != 'intro') {
      $('#nav').removeClass('no-transition');
      if(hash == 'art') {
        loadArt();
      }
    }
  } else {
    triggerPage('intro');
  }

  // register a function that is triggered on scroll
  $(window).scroll(function() {
    var position = $(this).scrollTop();
    adjustMenuItems(position);
    if(position > 120) {
      $('#sticky-nav').addClass('show');
      if($('.art-nav').hasClass('active')) {
        $('.art-nav + div').removeClass('cleared');
      }
    } else {
      $('#sticky-nav').removeClass('show');
      $('.art-nav + div').addClass('cleared');
    }
  });

  // scroll when the arrow on the art page is clicked
  $('#art-content div:nth-child(4) img').click(
  function(){
    console.log('arrow clicked');
    $('html, body').animate({
        scrollTop: 800
     }, 350);
  });

  // "one page app" navigation
  $('#nav div h1').click(
  function(){
    if($('#nav').hasClass('intro')){
      triggerPage("proj");
    } else {
      triggerPage('intro');
    }
  });

  $('#intro-text p').click(
  function(){
    triggerPage("proj");
  });

  $('.project-nav').click(
  function(){
    triggerPage("proj");
  });

  $('#home').click(
  function(){
    triggerPage("proj");
  });

  // art
  $('.art-nav').click(
    function(){
      loadArt();
      triggerPage('art');
  });
  // about
  $('.about-nav').click(
    function(){
      triggerPage('about');
  });

  // when a project category is clicked, select the relevant projects
  $('.bigdata').click(
  function(e){
    e.preventDefault();
    resetFilters();
    selectProjects(['AR','graph','VR']);
    $('.project-nav span').text('Big Data');
    $('.project-nav span').addClass('active');
    $('#projects a h6').addClass('filtered');
  });
  $('.spatial').click(
  function(e){
    e.preventDefault();
    selectProjects(['AR','krunkle','VR','bloop']);
    $('.project-nav span').text('Spatial Experience');
    $('.project-nav span').addClass('active');
    $('#projects a h6').addClass('filtered');
    $('.spatial').addClass('active');
    $('#AR h6 span').addClass('active');
  });
  $('.user').click(
  function(e){
    e.preventDefault();
    selectProjects(['AR','AP']);
    $('.project-nav span').text('User Behavior');
    $('.project-nav span').addClass('active');
    $('#projects a h6').addClass('filtered');
    $('.user').addClass('active');
    $('#AR h6 span').addClass('active');
  });

  // when a category is hovered, enlarge the relevant label
  $('.bigdata').on('mouseenter mouseleave', debounce(function(e) {
    if(e.type == 'mouseenter') {
      $('.bigdata').addClass('focused');

    }
    if(e.type == 'mouseleave' || e.type == 'mouseout' ) {
      $('.bigdata').removeClass('focused');
    }
  },500,true));
  $('.spatial').on('mouseenter mouseleave', debounce(function(e) {
    if(e.type == 'mouseenter') {
      $('.spatial').addClass('focused');
      $('#AR .spatial').removeClass('cleared');
      $('#AR h6 span').removeClass('cleared');
    }
    if(e.type == 'mouseleave' || e.type == 'mouseout' ) {
      $('.spatial').removeClass('focused');
      $('#AR .spatial').addClass('cleared');
      $('#AR h6 span').addClass('cleared');
    }
  },500,true));
    $('.user').on('mouseenter mouseleave', debounce(function(e) {
    if(e.type == 'mouseenter') {
      $('.user').addClass('focused');
      $('#AR .user').removeClass('cleared');
      $('#AR h6 span').removeClass('cleared');
    }
    if(e.type == 'mouseleave' || e.type == 'mouseout' ) {
      $('.user').removeClass('focused');
      $('#AR .user').addClass('cleared');
      $('#AR h6 span').addClass('cleared');
    }

  },500,true));

  // link the "AR" image's hover state to it's h5 image hover state
  var items = $("#projects #AR a");
  items.hover(function() {
          // Mouseover state
          $('#projects #AR h5').addClass("hovered");
          $('#projects #AR img').addClass("hovered");
      },
      function() {
          // Mouseout state
          $('#projects #AR h5').removeClass("hovered");
          $('#projects #AR img').removeClass("hovered");
  });

});

// David Walsh debounce, modified to trigger after timeout on second call
function debounce(func, wait, immediate) {
  var timeout;
  return function() {
    var context = this, args = arguments;
    var later = function() {
      timeout = null;
      func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
    console.log(args);
  };
};


function triggerPage(page) {
      $(window).scrollTop(0);
      window.location.hash = page;

      var proj = function(element) {
        element.removeClass('active');
      }
      var art =  function(element) {
        element.removeClass('active');
      }
      var about = function(element) {
        element.removeClass('active')
      }
      var intro = function(element) {
        element.removeClass('active')
      }
      switch(page) {
          case "proj":
              proj = function(element) {
                element.addClass('active');
              }
              clearIntroText();
              resetFilters();
              selectProjects(['AR','graph','AP','krunkle','VR','bloop']);
              $('body > div:nth-child(1)').addClass('projs');
              break;
          case "art":
              art = function(element) {
                element.addClass('active');
              }
              clearIntroText();
              break;
          case "about":
              about = function(element) {
                element.addClass('active');
              }
              clearIntroText();
              break;
          case "intro":
              intro = function(element) {
                element.addClass('active');
              }
              $('#intro-text').removeClass('cleared');
              $('#home').removeClass('cleared');
              $('#nav').addClass('intro');
              setTimeout(function(){$('#nav').removeClass('no-transition');}, 100);
              break;
      }

      // highlight current nav element
      proj($('.project-nav'));
      art($('.art-nav'));
      about($('.about-nav'));

      // swap content
      proj($('#projects'));
      art($('#art-content'));
      about($('#about-content'));

      // swap background
      intro($('#bg'));
      proj($('#bg2'));

      // trigger texture
      intro($('#texture'));



      //$('#nav').removeClass('no-transition');
}

function resetFilters() {
  $('#projects a h6').removeClass('active');
  $('#projects a h6').removeClass('filtered');
  $('#AR h6 span').removeClass('active');
  $('.project-nav span').removeClass('active');
  $('.project-nav span').text('');
}

function hoverProjects(category, type) {
  console.log(category);
  if(type == 'mouseenter') {
    category.addClass('focused');
    // for(p in projs) {
    //   $('#'+projs[p] + ' h6').addClass('focused');
    // }
  }
  if(type == 'mouseleave') {
    category.removeClass('focused');
    // for(p in projs) {
    //   $('#'+projs[p] + ' h6').removeClass('focused');
    // }
  }
}
function selectProjects(array) {
  if(initialized) {
    if(array.length != 0) {
      trigger(array);
    }
  }
  else {
    initialized = true;
    if(array.length == 0) {
      trigger(['AR','AP','graph','krunkle','VR','bloop']);
    }
    else {
      trigger(array);
    }
  }
}

function clearIntroText() {
  $('#intro-text').addClass('cleared');
  $('#home').addClass('cleared');
  $('#nav').removeClass('intro');
  $('#nav').removeClass('projs');
  $('body > div:nth-child(1)').removeClass('projs');
}

// trigger and recursively focus stagger the focusing of selected projects
function trigger(t, projs) {
  projs = projs || ['bloop','VR','krunkle','AP','graph','AR'];
  if(projs){
    for(p in projs) {
      if(!t.includes(projs[p])){
        $('#'+projs[p]).removeClass('focused');
        projs.splice(p, 1);
        setTimeout(function(){
          trigger(t,projs);
        }, 50);
        break;
      }
      if(p == projs.length - 1) {
        t = t.reverse();
        recursivelyFocus(t);
      }
    }
  } else {
    t = t.reverse();
    recursivelyFocus(t);
  }
}
function recursivelyFocus(t){

  if(t.length > 0) {
    proj = t.pop();
    $('#'+ proj).addClass('focused');
    $('#'+proj + ' h6').removeClass('focused');
    setTimeout(function(){
      recursivelyFocus(t);
    }, 50);
  }
}

// anchors link 50px above themselves
window.addEventListener("hashchange", function () {
    window.scrollTo(window.scrollX, window.scrollY - 50);
});

// calculates which menu item is active on scroll (for the art section)
function adjustMenuItems(position) {

  $('.section').each(function() {
      var target = $(this).offset().top;
      var id = $(this).attr('id');

      if (position + 230 >= target) {
          $('.art-nav + div a').removeClass('active');
          $('.art-nav + div a[href="#' + id + '"]').addClass('active');

          if(position + 530 >= $('#electronic').offset().top) {
            $('.art-nav + div a').removeClass('active');
            $('.art-nav + div a[href="#electronic"]').addClass('active');
          }
      }
  });
}

  // TODO dynamically load content (lazyload pages)
function loadArt() {
  if(!artLoaded) {
    artLoaded = true;
    $("#art-content").load("art.html");
  }
}

