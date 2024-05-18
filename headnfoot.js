$(document).ready(function() {
    $.get('footer.html', function(data) {
        $('body').append(data);
    });
});