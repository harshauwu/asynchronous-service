const {saveEmailLogs} =  require('./services/email_log.service');
const SQSService  =  require('./services/queue.service');
const emailService = require('./services/email.service');

exports.handler = async () => {
    try {
        const queue = new SQSService();
        const data = await queue.receiveMessage();
        
        const subject = 'Sample Email !!!';
        const toEmail = data.toEmail;
        const emailContent = {
            title : 'Sample Email !!'
        };

        await emailService.sendEmail(subject, toEmail, emailContent);
        await saveEmailLogs(data);
    } catch (error) {
        console.log('error' + error.stack);
        return;
    }
};