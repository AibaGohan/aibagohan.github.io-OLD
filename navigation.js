document.querySelector('.hamburger').addEventListener('click', function() {
    const nav = document.getElementById('navbar');
    nav.classList.toggle('active');
    document.body.classList.toggle('menu-open');

    // 切换图标
    this.classList.toggle('active');
    if (this.classList.contains('active')) {
        this.innerHTML = '&times;'; // X号
    } else {
        this.innerHTML = '&#9776;'; // 汉堡包
    }

    // 移动端显示联系方式
    const contactInfo = document.createElement('div');
    contactInfo.classList.add('contact-info');
    contactInfo.innerHTML = `
        <p>版權所有 © 2024 by AibaGogetsuhan</p>
    `;
    if (nav.classList.contains('active')) {
        nav.appendChild(contactInfo);
    } else {
        const existingContactInfo = document.querySelector('.contact-info');
        if (existingContactInfo) {
            existingContactInfo.remove();
        }
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
