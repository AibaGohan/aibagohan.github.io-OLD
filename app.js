const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public')); // 為了使 Express 能夠訪問靜態文件（如 CSS, JavaScript）

// 用於存儲留言的陣列
let messages = [];

// 首頁路由，返回留言板表單和留言列表
app.get('/contact', (req, res) => {
    let htmlOutput = '<h1>留言板</h1><form action="/post-message" method="POST">' +
                     '<input type="text" name="name" placeholder="您的名字" required><br>' +
                     '<textarea name="message" placeholder="您的留言" required></textarea><br>' +
                     '<button type="submit">提交留言</button></form>' +
                     '<h2>留言列表</h2>';

    messages.forEach(msg => {
        htmlOutput += `<p><strong>${msg.name}:</strong> ${msg.message}</p>`;
    });

    res.send(htmlOutput);
});

// 處理 POST 請求
app.post('/post-message', (req, res) => {
    const { name, message } = req.body;
    messages.push({ name, message });
    res.redirect('/contact');
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
