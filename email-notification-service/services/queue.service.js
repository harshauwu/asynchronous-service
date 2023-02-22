
const {SQSClient, ReceiveMessageCommand, SendMessageCommand} = require('@aws-sdk/client-sqs');
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

    receiveMessage() {
        // Set the parameters
        const params = {
            AttributeNames: ['SentTimestamp'],
            MaxNumberOfMessages: 1,
            MessageAttributeNames: ['All'],
            QueueUrl: CONFIG.sqs_url,
            WaitTimeSeconds: 2
        };
        const command = new ReceiveMessageCommand(params);
        return new Promise((resolve, reject) => {
            
            // Send the order data to the SQS queue
            this.client.send(command)
                .then(data => {
                    console.log('SQS | SUCCESS:');
                    console.log(JSON.stringify(data));
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
