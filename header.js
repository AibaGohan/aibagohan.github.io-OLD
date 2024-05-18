$(document).ready(function() {
    const depth = window.location.pathname.split('/').length - 1;
    const basePath = depth === 1 ? './' : '../'.repeat(depth - 1);

    $.get(`${basePath}header.html`, function(data) {
        $('body').prepend(data);

        // Navigation and hamburger button logic
        const hamburgerIcon = document.getElementById('hamburger-icon');
        if (hamburgerIcon) {
            hamburgerIcon.src = `${basePath}hamburger.svg`;
        }

        // Ensure tool link visibility based on screen size
        const toolsLink = document.getElementById('tools-link');
        if (window.innerWidth <= 650) {
            toolsLink.style.display = 'block';
        } else {
            toolsLink.style.display = 'none';
        }

        window.addEventListener('resize', function() {
            if (window.innerWidth <= 650) {
                toolsLink.style.display = 'block';
            } else {
                toolsLink.style.display = 'none';
            }
        });

        // Ensure password link visibility based on screen size
        const passwordLink = document.getElementById('password-link');
        if (window.innerWidth <= 650) {
            passwordLink.style.display = 'block';
        } else {
            passwordLink.style.display = 'none';
        }

        window.addEventListener('resize', function() {
            if (window.innerWidth <= 650) {
                passwordLink.style.display = 'block';
            } else {
                passwordLink.style.display = 'none';
            }
        });

        document.querySelector('.hamburger').addEventListener('click', function() {
            const nav = document.getElementById('navbar');
            nav.classList.toggle('active');
            document.body.classList.toggle('menu-open');

            // Toggle icon
            this.classList.toggle('active');
            if (this.classList.contains('active')) {
                this.innerHTML = `<img src="${basePath}delete.svg" alt="Close Menu" />`; // Replace with delete.svg
            } else {
                this.innerHTML = `<img src="${basePath}hamburger.svg" alt="Menu" />`; // Hamburger
            }

            // Show contact info and social media icons on mobile
            let contactInfo = document.querySelector('.contact-info');
            let socialIcons = document.querySelector('.social-icons');

            if (!contactInfo) {
                contactInfo = document.createElement('div');
                contactInfo.classList.add('contact-info');
                contactInfo.innerHTML = `<p>版權所有 © 2024 by AibaGogetsuhan</p>`;
                document.body.appendChild(contactInfo); // Add contactInfo to body
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
                document.body.appendChild(socialIcons); // Add socialIcons to body
            }

            if (!nav.classList.contains('active')) {
                if (contactInfo) contactInfo.remove();
                if (socialIcons) socialIcons.remove();
            }
        });
    });
});
