
const {SQSClient, SendMessageCommand} = require('@aws-sdk/client-sqs');
const CONFIG = require('../config/config');

class SQSService {
    constructor() {
        // Configure the region
        const config = {
            region: CONFIG.aws_region,
            accessKeyId: CONFIG.aws_sqs_key,
            secretAccessKey: CONFIG.aws_sqs_secret_access_key
        };

        // Create sqs client
        this.client = new SQSClient(config);
    }

    sendMessage(messageBody) {
        let msgBody = {...messageBody, ...{type : 'REQUEST'}};
        // Set the parameters
        const params = {
            DelaySeconds: 0,
            MessageAttributes: {
                Author: {
                    DataType: 'String',
                    StringValue: 'Harsha Lakmal',
                }
            },
            MessageBody:msgBody,
            MessageDeduplicationId: Date.now().toString(),
            MessageGroupId: 'sendEmail',
            QueueUrl: CONFIG.sqs_url
        };
        const command = new SendMessageCommand(params);
        return new Promise((resolve, reject) => {
            
            console.log('SQS params: ' + JSON.stringify(params));
            // Send the order data to the SQS queue
            this.client.send(command)
                .then(data => {
                    console.log(`SQS | SUCCESS: ${data.MessageId}`);
                    return resolve(data);
                })
                .catch(err => {
                    console.log('SQS failed!');
                    console.log(err);
                    return reject(err);
                });
        });
    }
}

module.exports = SQSService;
