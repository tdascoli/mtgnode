$(document).ready(function() {
    $('#logout').click(function () {
        alert('logout');
        $.post('ajax/login/logout',
            function (result) {
                if (!result.authenticated) {
                    location.href = '/';
                }
                else {
                    alert('Wrong Logout');
                }
            }
        );
    });
});