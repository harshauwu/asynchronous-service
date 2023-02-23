//const {saveRequestDetails} =  require('./services/request.service');
//const SQSService  =  require('./services/queue.service');
const emailService = require('./services/email.service');

exports.handler = async () => {
    try {
        //const queue = new SQSService();
        //const data = await queue.receiveMessage();
        
        // const subject = 'Sample Email !!!';
        // const toEmail =  'harshauwu@gmail.com';
        // const emailTemplate = 'sample.ejs';
        // let emailContent = {
        //     title : 'Sample Email !!'
        // }

        // await emailService.sendEmail(emailTemplate, subject, toEmail, emailContent);
        
    } catch (error) {
        console.log('error' + error.stack);
        return;
    }
};