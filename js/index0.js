// Toggle Function
$ = require('jquery')

materialIcons = '<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">';

buttonStyles = '<link href="https://codepen.io/andytran/pen/vLmRVp.css" rel="stylesheet">';

button = '<a href="pharma.html" class="at-button"><i class="material-icons">link</i></a>';

document.body.innerHTML += materialIcons + buttonStyles + button;

function change() {

    $(this).children('i').toggleClass('fa-pencil');
    // Switches the forms
    $('.form').animate({
        height: "toggle",
        'padding-top': 'toggle',
        'padding-bottom': 'toggle',
        opacity: "toggle"
    }, "slow");


}
