const CONFIG = require('../config/config');
const { SESClient, SendEmailCommand } =  require('@aws-sdk/client-ses') ;

class EmailService {
    async sendEmail(emailTemplate, subject, toEmail, dataSet) {

        // configure AWS SDK
        const config = {
            accessKeyId: CONFIG.aws_sqs_key,
            secretAccessKey: CONFIG.aws_sqs_secret_access_key,
            region: CONFIG.aws_region,
        };

        // Create SES service object.
        const sesClient = new SESClient(config);
        
        const sendEmailCommand = this.createSendEmailCommand(
            'to@example.com',
            'harshauwu@gmail.com'
        );
          
        try {
            return await sesClient.send(sendEmailCommand);
        } catch (e) {
            console.error('Failed to send email.');
            return e;
        }
    }


    createSendEmailCommand (toAddress, fromAddress) {
        return new SendEmailCommand({
            Destination: {
                /* required */
                CcAddresses: [
                    /* more items */
                ],
                ToAddresses: [
                    toAddress,
                    /* more To-email addresses */
                ],
            },
            Message: {
                /* required */
                Body: {
                    /* required */
                    Html: {
                        Charset: 'UTF-8',
                        Data: 'HTML_FORMAT_BODY',
                    },
                    Text: {
                        Charset: 'UTF-8',
                        Data: 'TEXT_FORMAT_BODY',
                    },
                },
                Subject: {
                    Charset: 'UTF-8',
                    Data: 'EMAIL_SUBJECT',
                },
            },
            Source: fromAddress,
            ReplyToAddresses: [
                /* more items */
            ],
        });
    }
}

module.exports = new EmailService();