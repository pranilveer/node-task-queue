const Queue = require('bull');
const { logTaskCompletion } = require('./logger');

const taskQueue = new Queue('taskQueue', {
    redis: {
        host: 'localhost',
        port: 6379,
    },
});


const RATE_LIMIT_SECONDS = 1;
const RATE_LIMIT_MINUTES = 20;

taskQueue.process(async (job) => {
    const { user_id } = job.data;
    logTaskCompletion(user_id);
    return Promise.resolve();
});

const queueTask = (user_id) => {
    return taskQueue.add({ user_id }, {
        delay: 1000,
        attempts: 1,
    });
};

module.exports = {
    queueTask,
};
