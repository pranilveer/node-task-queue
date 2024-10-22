const fs = require('fs');
const path = require('path');

const logFilePath = path.join(__dirname, '../logs/tasks.log');

function logTaskCompletion(userId) {
    const logEntry = `${userId}-task completed at-${Date.now()}\n`;
    fs.appendFileSync(logFilePath, logEntry, 'utf8');
}

module.exports = {
    logTaskCompletion,
};
