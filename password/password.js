function checkPassword() {
    var password = document.getElementById('password-input').value;
    if (password == '123123') { // 將'123123'替換成你想要的密碼
        document.getElementById('password-section').style.display = 'none';
        document.getElementById('content').style.display = 'block';
    } else {
        document.getElementById('error-message').style.display = 'block';
    }
}