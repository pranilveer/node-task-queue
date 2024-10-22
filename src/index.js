const express = require('express');
const { queueTask } = require('./taskQueue');

const app = express();
const PORT = process.env.PORT || 3000;

const RATE_LIMIT_SECONDS = 1
const RATE_LIMIT_MINUTES = 20;

app.use(express.json());

const userRequests = {};

app.use((req, res, next) => {
    const { user_id } = req.body;
    if (!user_id) {
        return res.status(400).send('User ID is required');
    }

    const now = Date.now();
    const userRequestsList = userRequests[user_id] || [];

    const oneMinuteAgo = now - 60 * 1000;
    userRequests[user_id] = userRequestsList.filter(timestamp => timestamp > oneMinuteAgo);

    if (userRequests[user_id].length >= RATE_LIMIT_MINUTES) {
        return queueTask(user_id).then(() => {
            res.status(202).send('Your task is queued and will be processed shortly.');
        });
    } else {
        userRequests[user_id].push(now);
        queueTask(user_id).then(() => {
            res.status(200).send('Task queued successfully.');
        });
    }
    next();
});

app.post('/api/v1/task', (req, res) => {
    const { user_id } = req.body;
    res.send(`Task is being processed for user ID: ${user_id}`);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
