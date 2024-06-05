document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const message = document.getElementById('message').value;
    const responseDiv = document.getElementById('response');

    if (name && message) {
        // 將留言保存到 LocalStorage
        const messages = JSON.parse(localStorage.getItem('messages')) || [];
        messages.push({ name, message });
        localStorage.setItem('messages', JSON.stringify(messages));

        // 顯示留言
        displayMessages();

        // 清空表單
        document.getElementById('contact-form').reset();
        responseDiv.textContent = '留言提交成功！';
    } else {
        responseDiv.textContent = '提交失敗（後端銳意製作中，請暫時先通過「連絡先」聯絡站主）';
    }
});

function displayMessages() {
    const messages = JSON.parse(localStorage.getItem('messages')) || [];
    const responseDiv = document.getElementById('response');
    responseDiv.innerHTML = messages.map(msg => `<p><strong>${msg.name}</strong>: ${msg.message}</p>`).join('');
}

// 頁面加載時顯示現有的留言
document.addEventListener('DOMContentLoaded', displayMessages);