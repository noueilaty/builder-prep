firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    $('.Auth-off').hide();
    $('.Auth-on').show();
    $('#username').text(user.email);
  } else {
    $('.Auth-off').show();
    $('.Auth-on').hide();
  }
});

$('#signup-form').on('click', () => {
  firebase.auth().createUserWithEmailAndPassword(
    $('#email').val(),
    $('#password').val()
  ).then(
    () => $('#auth-message').text('Successfully signed up!').addClass('Auth-message--success').removeClass('Auth-message--error')
  ).catch(err =>
    $('#auth-message').text('Error: ' + err.message).addClass('Auth-message--error').removeClass('Auth-message--success')
  );
});

$('#login-form').on('submit', e => {
  e.preventDefault();
  firebase.auth().signInWithEmailAndPassword(
    $('#email').val(),
    $('#password').val()
  ).then(
    () => $('#auth-message').text('Successfully logged in.').addClass('Auth-message--success').removeClass('Auth-message--error')
  ).catch(err =>
    $('#auth-message').text('Error: ' + err.message).addClass('Auth-message--error').removeClass('Auth-message--success')
  );
});

$('#logout-form').on('click', () => {
  firebase.auth().signOut().then(
    () => $('#auth-message').text('Successfully logged out!').addClass('Auth-message--success').removeClass('Auth-message--error')
  ).catch(err =>
    $('#auth-message').text('Error: ' + err.message).addClass('Auth-message--error').removeClass('Auth-message--success')
  );
});

$('.Auth-close').on('click', () => $('.Auth').hide() );

$('.Auth-show').on('click', () => $('.Auth').show());

$(window).on('click', e => {
    if (e.target == $('.Auth')[0]) {
        $('.Auth').hide();
        $('#auth-message').text('').removeClass('Auth-message--success').removeClass('Auth-message--error');
    }
});
