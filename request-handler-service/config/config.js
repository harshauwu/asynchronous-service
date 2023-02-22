const config = {
    aws_sqs_key: process.env.ACCESS_KEY_ID || 'aws_sqs_key',
    aws_sqs_secret_access_key: process.env.ACCESS_KEY_SECRET || 'aws_sqs_secret_access_key',
    aws_region: process.env.REGION || 'us-east-1',
    sqs_url: process.env.SQS_URL || 'xxx',
};

module.exports = config;