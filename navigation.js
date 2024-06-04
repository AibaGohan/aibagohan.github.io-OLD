document.addEventListener('DOMContentLoaded', function() {
    const depth = window.location.pathname.split('/').length - 1;
    const basePath = depth === 1 ? './' : '../'.repeat(depth - 1);
    const hamburgerIcon = document.getElementById('hamburger-icon');

    if (hamburgerIcon) {
        hamburgerIcon.src = `${basePath}hamburger.svg`;
    }

    const nav = document.getElementById('navbar');
    const body = document.body;
    
    document.querySelector('.hamburger').addEventListener('click', function() {
        nav.classList.toggle('active');
        body.classList.toggle('menu-open');

        // Toggle icon
        if (this.classList.contains('active')) {
            this.innerHTML = `<img src="${basePath}delete.svg" alt="Close Menu" />`; // Replace with delete.svg
        } else {
            this.innerHTML = `<img src="${basePath}hamburger.svg" alt="Menu" />`; // Hamburger icon
        }

        // Add or remove background class when menu is open
        if (body.classList.contains('menu-open')) {
            body.classList.add('menu-open');
        } else {
            body.classList.remove('menu-open');
        }

        // Mobile contact info and social icons handling
        let contactInfo = document.querySelector('.contact-info');
        let socialIcons = document.querySelector('.social-icons');

        if (!contactInfo) {
            contactInfo = document.createElement('div');
            contactInfo.classList.add('contact-info');
            contactInfo.innerHTML = `<p>版權所有 © 2024 AibaGogetsuhan</p>`;
            document.body.appendChild(contactInfo); // Append contactInfo to body
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
            document.body.appendChild(socialIcons); // Append socialIcons to body
        }

        if (!nav.classList.contains('active')) {
            if (contactInfo) contactInfo.remove();
            if (socialIcons) socialIcons.remove();
        }
    });

    const toolsLink = document.getElementById('tools-link');
    const passwordLink = document.getElementById('password-link');

    // Ensure tool links only display on small screens
    if (window.innerWidth <= 600) {
        toolsLink.style.display = 'block';
        passwordLink.style.display = 'block';
    } else {
        toolsLink.style.display = 'none';
        passwordLink.style.display = 'none';
    }

    window.addEventListener('resize', function() {
        if (window.innerWidth <= 600) {
            toolsLink.style.display = 'block';
            passwordLink.style.display = 'block';
        } else {
            toolsLink.style.display = 'none';
            passwordLink.style.display = 'none';
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
            cursorX += (mouseX + scrollX - cursorX) * 0.175;
            cursorY += (mouseY + scrollY - cursorY) * 0.175;

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
            if (element && element.tagName === 'P') {
                magicPointer.classList.add('text');
            } else {
                magicPointer.classList.remove('text');
            }
        }

        document.addEventListener('mousemove', handleTextCursor);
    }

});


document.getElementById('message-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = {
        username: formData.get('username'),
        content: formData.get('content')
    };

    fetch('/api/messages', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(() => {
        loadMessages(); // Reload messages
        event.target.reset(); // Clear the form
    });
});

function loadMessages() {
    fetch('/api/messages').then(response => response.json()).then(messages => {
        const messagesList = document.getElementById('messages-list');
        messagesList.innerHTML = ''; // Clear existing messages
        messages.forEach(message => {
            const li = document.createElement('li');
            li.textContent = `${message.username}: ${message.content}`;
            messagesList.appendChild(li);
        });
    });
}

loadMessages(); // Initial load of messages
