// Simple login actions
$(document).ready(function () {

    // Override connect
    $('.override-connect').click(function () {
        $.post('ajax/login/authenticate', {
                username: $(this).attr('username'),
                password: $(this).attr('password')
            },
            function (result) {
                if (!!result.authenticated) {
                    location.href = '/lobby';
                }
                else {
                    alert('Wrong Login');
                }
            }
        );
    });

    $('#login').click(function () {
        $.post('ajax/login/authenticate', {
                username: $('input#username').val(),
                password: $('input#password').val()
            },
            function (result) {
                if (!!result.authenticated) {
                    location.href = '/lobby';
                }
                else {
                    alert('Wrong Login');
                }
            }
        );
    });

    // Alert if not permitted
    var flag = location.href.split('?')[1];

    if (flag === 'unauthorized')
        $('.alert').removeClass('hide');
});
