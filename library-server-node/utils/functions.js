const fs = require('fs');
const path = require('path');

const getProjectRootPath = () => path.resolve(__dirname, '..');

const successResponse = (msg='', data={} ) => ( { message: msg, data: data, success: true} );
const errorResponse = (msg='', data={}) => ({ message: msg, data: data, success: false});

const logError = (msg, stack = {}) => {
    const logDir = path.resolve(getProjectRootPath(), 'logs');
    if (!fs.existsSync(logDir)){
        fs.mkdirSync(logDir);
    }
    const logFile = path.resolve(logDir, 'errors.txt');
    const content = `\r\n ===> ${ (new Date).toISOString() } \r\n Message: ${msg} \r\n Stack: ${JSON.stringify(stack)} \r\n`;
    fs.appendFile(logFile, content, err => {
        if (err) {
          console.error(err);
        }
      });

}

module.exports = {
    successResponse,
    errorResponse,
    logError,
    getProjectRootPath,
}