function adjustMenuItems() {
  var position = $(this).scrollTop();
  // console.log('position ' + position);

  $('.section').each(function() {
      var target = $(this).offset().top;
      var id = $(this).attr('id');

      if (position + 230 >= target) {
          $('#sticky-nav > a').removeClass('active');
          $('#sticky-nav > a[href="#' + id + '"]').addClass('active');

          if(position + 530 >= $('#electronic').offset().top) {
            $('#sticky-nav > a').removeClass('active');
            $('#sticky-nav > a[href="#electronic"]').addClass('active');
          }
      }

  });
}

var initialized = false;
$( document ).ready(function() {
  $(window).scroll(function() {
    adjustMenuItems();
  });

  $('#all').click(
  function(){
    clear(['AR','AP','graph','krunkle','VR','bloop']);
    $('#all').addClass('active');
  });

  $('#bigdata').click(
  function(){
    clear(['AR','graph','VR']);
    $('#bigdata').addClass('active');
  });

  $('#spatial').click(
  function(){
    clear(['AR','krunkle','VR','bloop']);
    $('#spatial').addClass('active');
  });

  $('#user').click(
  function(){
    clear(['AR','AP']);
    $('#user').addClass('active');
  });

  $('#intro-text').removeClass('cleared');

  if($(window).width() < 900) {
    clear([]);
  }
  // window.setTimeout(function(){clear([])}, [4400]);
});

function clear(array) {
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
      $('#all').removeClass('active');
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
  $('#bg').addClass('cleared');
}

function initProjects() {
  $('#all').addClass('active');
  $('#projectNav').addClass('active');
  trigger(['AR','AP','graph','krunkle','VR','bloop']);
}

function trigger(t, projs) {
  projs = projs || ['bloop','VR','krunkle','graph','AP','AR'];
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


  // t.forEach(function(e){//fades selected to full
  //   $('#'+e).addClass('focused');
  // });
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

window.addEventListener("hashchange", function () {
    window.scrollTo(window.scrollX, window.scrollY - 50);
});
