
document.querySelector('.hamburger').addEventListener('click', function() {
    const nav = document.getElementById('navbar');
    nav.classList.toggle('active'); // 切换 'active' 类，控制显示和隐藏
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
