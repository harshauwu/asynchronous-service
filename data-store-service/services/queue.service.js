
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
            if (data.type == 'REQUEST') {
                return data; 
            } else {
                throw new Error('Invalid type ');
            }
        } catch (err) {
            console.log('Error', err);
        }
    }

    sendMessage(messageBody) {
        let msgBody =  {...messageBody, ...{type: 'SEND_EMAIL'}};
        // Set the parameters
        const params = {
            DelaySeconds: 2,
            MessageAttributes: {
                Author: {
                    DataType: 'String',
                    StringValue: 'Harsha Lakmal',
                }
            },
            MessageBody:JSON.stringify(msgBody),
            MessageDeduplicationId: Date.now().toString(),
            MessageGroupId: 'SendEmail',
            QueueUrl: CONFIG.sqs_url_2,
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
