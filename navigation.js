document.querySelector('.hamburger').addEventListener('click', function() {
    const nav = document.getElementById('navbar');
    nav.classList.toggle('active'); // 切换 'active' 类，控制显示和隐藏
});

document.addEventListener("DOMContentLoaded", function() {
    var clickableElements = document.querySelectorAll('a, button, input[type="button"], input[type="submit"]');
    clickableElements.forEach(function(element) {
        element.addEventListener("click", function(e) {
            e.preventDefault(); // 注意：這會阻止點擊事件的默認行為，只使用於非導航目的
            // 進行所需的操作
        });
    });
});
