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


document.addEventListener('DOMContentLoaded', function() {
    console.log("Document is ready. Initializing audio setup...");

    // Create audio element and append to body
    var bgMusic = document.createElement('audio');
    bgMusic.id = 'bg-music';
    bgMusic.src = 'ragtime2024-03-22.mp3';  // This should be correct as both files are in the same directory
    bgMusic.loop = true;
    bgMusic.muted = true;  // Start muted to comply with browser autoplay policies
    document.body.appendChild(bgMusic);

    bgMusic.addEventListener('error', function(e) {
        console.error("Error occurred with audio playback:", e);
    });

    // Create toggle button and append to body
    var musicToggleBtn = document.createElement('button');
    musicToggleBtn.id = 'toggle-music';
    musicToggleBtn.textContent = 'Turn On Music';
    musicToggleBtn.style.position = 'fixed';
    musicToggleBtn.style.top = '10px';
    musicToggleBtn.style.right = '10px';
    musicToggleBtn.style.padding = '10px';
    musicToggleBtn.style.background = '#ddd';
    musicToggleBtn.style.border = 'none';
    musicToggleBtn.style.cursor = 'pointer';
    document.body.appendChild(musicToggleBtn);

    console.log("Audio and button elements added to the DOM.");

    // Event listener for the button to toggle music
    musicToggleBtn.addEventListener('click', function() {
        console.log("Toggle button clicked. Current muted state:", bgMusic.muted);
        if (bgMusic.muted) {
            bgMusic.muted = false;
            bgMusic.play().then(() => {
                console.log("Music playing.");
            }).catch(e => {
                console.error("Failed to play music:", e);
            });
            this.textContent = 'Turn Off Music';
        } else {
            bgMusic.muted = true;
            this.textContent = 'Turn On Music';
        }
    });

    // Optional: Play music on first user interaction
    document.body.addEventListener('click', function playMusicFirstTime() {
        console.log("Body clicked. Attempting to play music for the first time.");
        if (bgMusic.paused) {
            bgMusic.play().then(() => {
                console.log("Music playing.");
            }).catch(e => {
                console.error("Failed to play music:", e);
            });
            bgMusic.muted = false;
            musicToggleBtn.textContent = 'Turn Off Music';
        }
        document.body.removeEventListener('click', playMusicFirstTime);
    }, {once: true});
});
