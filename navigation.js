document.addEventListener("DOMContentLoaded", function() {
    var url = window.location.href;
    // Ensure the URL does not end with a slash unless it's the root of the domain
    if (url.endsWith('/') && url.length > window.location.origin.length + 1) {
      var newUrl = url.slice(0, -1);
      // Perform a comparison and redirect if the current URL with the slash is not the same as the new URL
      if (window.location.href !== newUrl && window.location.href !== newUrl + '/') {
        window.location.replace(newUrl); // Use replace to avoid history loop issues
      }
    }
  });
  

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
