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
            contactInfo.innerHTML = `<p>版權所有 © 2024 by AibaGogetsuhan</p>`;
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
        loadMessages(); // 重新加載留言
        event.target.reset(); // 清空表單
    });
});


function loadMessages() {
    fetch('/api/messages').then(response => response.json()).then(messages => {
        const messagesList = document.getElementById('messages-list');
        messagesList.innerHTML = ''; // 清空現有留言
        messages.forEach(message => {
            const li = document.createElement('li');
            li.textContent = `${message.username}: ${message.content}`;
            messagesList.appendChild(li);
        });
    });
}

loadMessages(); // 初始加載留言


