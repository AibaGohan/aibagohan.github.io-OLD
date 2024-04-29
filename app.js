const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use(express.static('public')); // 用於訪問靜態文件，如 CSS, JS

let messages = []; // 存儲留言的數組

// 獲取留言的 API
app.get('/api/messages', (req, res) => {
    res.json(messages);
});

// 發送留言的 API
app.post('/api/messages', (req, res) => {
    const { username, content } = req.body;
    messages.push({ username, content, id: messages.length + 1 });
    res.status(201).send({ success: true });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
