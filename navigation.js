document.addEventListener('DOMContentLoaded', function() {
    const depth = window.location.pathname.split('/').length - 1;
    const basePath = depth === 1 ? './' : '../'.repeat(depth - 1);
    const hamburgerIcon = document.getElementById('hamburger-icon');
    if (hamburgerIcon) {
        hamburgerIcon.src = `${basePath}hamburger.svg`;
    }

    // 确保工具链接仅在小屏幕上显示
    const toolsLink = document.getElementById('tools-link');
    if (window.innerWidth <= 600) {
        toolsLink.style.display = 'block';
    } else {
        toolsLink.style.display = 'none';
    }

    window.addEventListener('resize', function() {
        if (window.innerWidth <= 600) {
            toolsLink.style.display = 'block';
        } else {
            toolsLink.style.display = 'none';
        }
    });

    // 确保工具链接仅在小屏幕上显示
    const passwordLink = document.getElementById('password-link');
    if (window.innerWidth <= 600) {
        passwordLink.style.display = 'block';
    } else {
        passwordLink.style.display = 'none';
    }

    window.addEventListener('resize', function() {
        if (window.innerWidth <= 600) {
            passwordLink.style.display = 'block';
        } else {
            passwordLink.style.display = 'none';
        }
    });

    document.querySelector('.hamburger').addEventListener('click', function() {
        const nav = document.getElementById('navbar');
        nav.classList.toggle('active');
        document.body.classList.toggle('menu-open');

        // 切换图标
        this.classList.toggle('active');
        if (this.classList.contains('active')) {
            this.innerHTML = `<img src="${basePath}delete.svg" alt="Close Menu" />`; // 替换为 delete.svg
        } else {
            this.innerHTML = `<img src="${basePath}hamburger.svg" alt="Menu" />`; // 汉堡包
        }

        // 移动端显示联系方式和社交媒体图标
        let contactInfo = document.querySelector('.contact-info');
        let socialIcons = document.querySelector('.social-icons');

        if (!contactInfo) {
            contactInfo = document.createElement('div');
            contactInfo.classList.add('contact-info');
            contactInfo.innerHTML = `<p>版權所有 © 2024 AibaGogetsuhan</p>`;
            document.body.appendChild(contactInfo); // 将 contactInfo 添加到 body
        }

        if (!socialIcons) {
            socialIcons = document.createElement('div');
            socialIcons.classList.add('social-icons');
            socialIcons.innerHTML = `
                <a href="https://tieba.baidu.com/home/main?id=tb.1.428b3914.fTqSzh1wdmWO4V30k21dFw?t=1706283902" target="_blank">
                    <img src="${basePath}contact/tieba-icon.svg" alt="Tieba">
                </a>
                <a href="https://qm.qq.com/q/LV1tWyKKeQ" target="_blank">
                    <img src="${basePath}contact/qq-icon.svg" alt="QQ">
                </a>
                <a href="https://discordapp.com/users/315194753757085697" target="_blank">
                    <img src="${basePath}contact/discord-icon.svg" alt="Discord">
                </a>
            `;
            document.body.appendChild(socialIcons); // 将 socialIcons 添加到 body
        }

        if (!nav.classList.contains('active')) {
            if (contactInfo) contactInfo.remove();
            if (socialIcons) socialIcons.remove();
        }
    });
    
    const categorySelect = document.querySelector('.dropdownblue');
    if (categorySelect) {
        categorySelect.addEventListener('click', function() {
            const dropdownContent = this.querySelector('.dropdown-content-blue');
            const dropdownArrow = this.querySelector('#dropdown-arrow');
            const isVisible = dropdownContent.style.display === 'block';

            dropdownContent.style.display = isVisible ? 'none' : 'block';
            dropdownArrow.src = isVisible ? '../../arrow-down.svg' : '../../arrow-up.svg';
        });
    }

    // Cursor Magic Mouse Initialization
    if (window.innerWidth > 600) {
        const magicMouseCursor = document.createElement('div');
        const magicPointer = document.createElement('div');

        magicMouseCursor.classList.add('magicMouseCursor', 'default');
        magicPointer.classList.add('magicPointer');

        document.body.appendChild(magicMouseCursor);
        document.body.appendChild(magicPointer);

        let mouseX = 0, mouseY = 0;
        let cursorX = 0, cursorY = 0;

        const updateCursorPosition = () => {
            const scrollX = window.scrollX;
            const scrollY = window.scrollY;
            magicPointer.style.left = `${mouseX + scrollX}px`;
            magicPointer.style.top = `${mouseY + scrollY}px`;
        };

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            updateCursorPosition();
        });

        document.addEventListener('scroll', updateCursorPosition);

        function animateCursor() {
            const scrollX = window.scrollX;
            const scrollY = window.scrollY;
            cursorX += (mouseX + scrollX - cursorX) * 0.125;
            cursorY += (mouseY + scrollY - cursorY) * 0.125;

            magicMouseCursor.style.left = `${cursorX}px`;
            magicMouseCursor.style.top = `${cursorY}px`;

            requestAnimationFrame(animateCursor);
        }

        // Initialize the cursor position at the mouse's current position
        const initCursor = () => {
            // Remove the initial centered positioning
            document.addEventListener('mousemove', (e) => {
                mouseX = e.clientX;
                mouseY = e.clientY;
                cursorX = e.clientX;
                cursorY = e.clientY;
                magicPointer.style.left = `${e.clientX}px`;
                magicPointer.style.top = `${e.clientY}px`;
                magicMouseCursor.style.left = `${e.clientX}px`;
                magicMouseCursor.style.top = `${e.clientY}px`;
            }, { once: true });
        };

        initCursor();
        animateCursor();

        document.querySelectorAll('a, button, .hover-effect').forEach((el) => {
            el.addEventListener('mouseover', () => {
                magicMouseCursor.classList.add('hover');
                magicPointer.classList.add('is-hover');
            });
            el.addEventListener('mouseout', () => {
                magicMouseCursor.classList.remove('hover');
                magicPointer.classList.remove('is-hover');
            });
        });

        const logo = document.getElementById('logo');
        logo.addEventListener('mouseover', () => {
            magicMouseCursor.classList.add('hover');
            magicPointer.classList.add('is-hover');
            logo.style.boxShadow = 'inset 0 0 10px rgba(244, 123, 50, 0.5), 0 0 25px rgba(244, 123, 75, 0.5)'; // 添加内边缘橙色边框
        });
        logo.addEventListener('mouseout', () => {
            magicMouseCursor.classList.remove('hover');
            magicPointer.classList.remove('is-hover');
            logo.style.boxShadow = 'none'; // 移除边框
        });

        document.querySelectorAll('.no-cursor').forEach((el) => {
            el.addEventListener('mouseenter', () => {
                magicMouseCursor.style.opacity = 0;
                magicPointer.style.opacity = 0;
            });
            el.addEventListener('mouseleave', () => {
                magicMouseCursor.style.opacity = 1;
                magicPointer.style.opacity = 1;
            });
        });

        function handleTextCursor(event) {
            const element = document.elementFromPoint(event.clientX, event.clientY);
            const textTags = ['P', 'S', 'LI', 'STRONG'];
            const parentClasses = ['quote-section', 'excerpt'];
            
            if (element) {
                if (textTags.includes(element.tagName) || parentClasses.some(className => element.closest('.' + className))) {
                    magicPointer.classList.add('text');
                } else {
                    magicPointer.classList.remove('text');
                }
            } else {
                magicPointer.classList.remove('text');
            }
        }

        document.addEventListener('mousemove', handleTextCursor);
    }

    // 添加点击事件监听器
    document.getElementById('logo').addEventListener('click', function() {
        window.location.href = '/';
    });

});
