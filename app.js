const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(express.static(__dirname));

app.post('/detect', (req, res) => {
    const text = req.body.text.toLowerCase();

    const suspiciousWords = [
        'urgent',
        'click here',
        'verify account',
        'password',
        'bank',
        'lottery',
        'free money'
    ];

    let score = 0;

    suspiciousWords.forEach(word => {
        if (text.includes(word)) {
            score++;
        }
    });

    if (score >= 2) {
        res.json({ message: '⚠ Suspicious Email Detected!' });
    } else {
        res.json({ message: '✅ Safe Email' });
    }
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
