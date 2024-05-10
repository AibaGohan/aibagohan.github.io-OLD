document.addEventListener("DOMContentLoaded", function() {
    const boxes = document.querySelectorAll(".box-header");
    boxes.forEach((box) => {
        box.addEventListener("click", function() {
            const content = this.nextElementSibling;
            content.classList.toggle("hidden");
            this.classList.toggle("expanded"); /* 新增部分 */
        });
    });
});