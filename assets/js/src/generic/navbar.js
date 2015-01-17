// navbar utils

$(document).on('click','.navbar-collapse.in',function(e) {
    if( $(e.target).is('a') ) {
        $(this).collapse('hide');
    }
});

$('a.playgroundnav').click(function(){
    $('#playgroundnav').collapse('hide');
});