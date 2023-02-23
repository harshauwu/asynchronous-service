
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

    async receiveMessage() {
        // Set the parameters
        const params = {
            AttributeNames: ['SentTimestamp'],
            MaxNumberOfMessages: 1,
            MessageAttributeNames: ['All'],
            QueueUrl: CONFIG.sqs_url,
            WaitTimeSeconds: 2
        };
        const command = new ReceiveMessageCommand(params);
        try {
            const data = await this.client.send(command);
            console.log('Success', JSON.stringify(data));
            return data.Body; 
        } catch (err) {
            console.log('Error', err);
        }
    }
}

module.exports = SQSService;
