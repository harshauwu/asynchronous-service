const AWS = require('aws-sdk');
const AWSMock = require('aws-sdk-mock');

describe('Lambda Function', () => {
    test('validate the Lambda function with input and output parameters', async () => {
        AWSMock.setSDKInstance(AWS);

        const myName = 'Harsha Lakmal';
        const Payload = {name: myName};
        const outputObj = {
            statusCode: 201
        };

        AWSMock.mock('Lambda', 'invoke', function (params, callback){
            callback(null, { Payload: JSON.stringify({message: `${myName}`})});
        });

        const {handler} = require('../../index');
        const resObj = await handler(Payload);

        expect(resObj).toMatchObject(outputObj);

        AWSMock.restore('Lambda');
    });
});

