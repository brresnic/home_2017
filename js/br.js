var initialized = false;
$( document ).ready(function() {
  $(window).scroll(function() {
    adjustMenuItems();
  });

  // programatically change content when nav items are pressed
  // projects
  $('#nav div h1').click(
  function(){
    $('#sticky-nav').addClass('intro');
    $('#intro-text').removeClass('cleared');
    $('#home').removeClass('cleared');
    $('#nav div h1').addClass('intro');


    $('#project-nav').removeClass('active');
    $('#art-nav').removeClass('active');
    $('#about-nav').removeClass('active');


    // swap content
    $('#projects').removeClass('active');
    $('#art').removeClass('active');
    $('#about').removeClass('active');
    // TODO add class hidden on timeout e.g.
                  //    box.removeClass('hidden');
                  // setTimeout(function () {
                  //   box.removeClass('visuallyhidden');
                  // }, 20);
    // TODO abstract this code into a function

    // swap subnav
    $('#art-nav + div').addClass('cleared');
    $('#project-nav + div').addClass('cleared');

    // swap background
    $('#bg').removeClass('cleared');
    $('#bg2').addClass('cleared');
    $('#bg3').addClass('cleared');
  });

  $('#project-nav').click(
  function(){
    selectProjects(['AR','graph','AP','krunkle','VR','bloop']);
    clearIntroText();

    $('#project-nav').addClass('active');
    $('#art-nav').removeClass('active');
    $('#about-nav').removeClass('active');

    // swap content
    $('#projects').addClass('active');
    $('#art').removeClass('active');
    $('#about').removeClass('active');

    // swap subnav
    $('#project-nav + div').removeClass('cleared');
    $('#art-nav + div').addClass('cleared');

    // swap background
    $('#bg').addClass('cleared');
    $('#bg2').removeClass('cleared');
    $('#bg3').addClass('cleared');
  });

  // art
  $('#art-nav').click(
    function(){
      clearIntroText();

      $('#project-nav').removeClass('active');
      $('#art-nav').addClass('active');
      $('#about-nav').removeClass('active');

      // swap content
      $('#projects').removeClass('active');
      $('#art').addClass('active');
      $('#about').removeClass('active');

      // swap subnav
      $('#project-nav + div').addClass('cleared');
      $('#art-nav + div').removeClass('cleared');

      // swap background
      $('#bg').addClass('cleared');
      $('#bg2').addClass('cleared');
      $('#bg3').removeClass('cleared');
  });
  // about
  $('#about-nav').click(
    function(){
      clearIntroText();

      $('#project-nav').removeClass('active');
      $('#art-nav').removeClass('active');
      $('#about-nav').addClass('active');

      // swap content
      $('#projects').removeClass('active');
      $('#art').removeClass('active');
      $('#about').addClass('active');

      // swap subnav
      $('#project-nav + div').addClass('cleared');
      $('#art-nav + div').addClass('cleared');

      // swap background
      $('#bg').addClass('cleared');
      $('#bg2').addClass('cleared');
      $('#bg3').addClass('cleared');
  });

  // when a project category is clicked, select the relevant projects
  $('#bigdata').click(
  function(){
    selectProjects(['AR','graph','VR']);
    $('#bigdata').addClass('active');
    $('#projectNav').addClass('active');

  });
  $('#spatial').click(
  function(){
    selectProjects(['AR','krunkle','VR','bloop']);
    $('#spatial').addClass('active');
    $('#projectNav').addClass('active');

  });
  $('#user').click(
  function(){
    selectProjects(['AR','AP']);
    $('#user').addClass('active');
    $('#projectNav').addClass('active');

  });

  // initially select all projects
  selectProjects([]);
});

function selectProjects(array) {
  if(initialized) {
    if(array.length != 0) {
      clearInit();
      trigger(array);
    }
  }
  else {
    clearIntroText();
    initialized = true;
    if(array.length == 0) {
      window.setTimeout(function(){initProjects()}, [600]);
    }
    else {
      $('#projectNav').addClass('active');
      window.setTimeout(function(){trigger(array)}, [400]);
    }
  }
}

function clearInit() {
  $('#projectNav').addClass('active');
  $('#sticky-nav a').removeClass('active');
}

function clearIntroText() {
  $('#intro-text').addClass('cleared');
  $('#home').addClass('cleared');
  $('#bg').addClass('cleared');
  $('#nav div h1').removeClass('intro');
  $('#sticky-nav').removeClass('intro');
}

function initProjects() {
  $('#projectNav').addClass('active');
  $('#projectNav').addClass('active');
  trigger(['AR','AP','graph','krunkle','VR','bloop']);
}

// trigger and recursively focus stagger the focusing of selected projects
function trigger(t, projs) {
  projs = projs || ['bloop','VR','krunkle','AP','graph','AR'];
  if(projs){
    for(p in projs) {
      console.log(p);
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
    console.log(t);
    $('#'+ t.pop()).addClass('focused');
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
function adjustMenuItems() {

  var position = $(this).scrollTop();

  $('.section').each(function() {
      var target = $(this).offset().top;
      var id = $(this).attr('id');

      if (position + 230 >= target) {
          $('#art-nav + div a').removeClass('active');
          $('#art-nav + div a[href="#' + id + '"]').addClass('active');

          if(position + 530 >= $('#electronic').offset().top) {
            $('#art-nav + div a').removeClass('active');
            $('#art-nav + div a[href="#electronic"]').addClass('active');
          }
      }
  });
}

  // TODO automatically scroll to top on page change, test scroll behavior of art

  // TODO dynamically load content (lazyload pages)

  // TODO split css files into seperate files for font, sticky-nav, and other

  // TODO highlight projects when a subnav is selected


