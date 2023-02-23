const { mockClient } = require('aws-sdk-client-mock');
const { SQSClient } = require('@aws-sdk/client-sqs');
const sqsService =  require('../../../services/queue.service');

const sqsMock = mockClient(SQSClient);

/**
 * To be sure that unit tests are independent from each other,
 * reset mock behavior between the tests.
 */
beforeEach(() => {
    sqsMock.reset();
});
  
it('should receive message from sqs ', async () => {
    const sqs = new sqsService();
    const result = await sqs.receiveMessage();
    console.log(result);
});
  