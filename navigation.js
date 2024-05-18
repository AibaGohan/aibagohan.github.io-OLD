document.addEventListener('DOMContentLoaded', function() {
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
            event.target.reset(); // Clear form
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
});
