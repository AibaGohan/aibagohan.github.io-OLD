$(document).ready(function() {
    const depth = window.location.pathname.split('/').length - 1;
    const basePath = depth === 1 ? './' : '../'.repeat(depth - 1);

    $.get(`${basePath}header.html`, function(data) {
        $('body').prepend(data);
    });
});
