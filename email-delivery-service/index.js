const { updateSendEmailStatus } =  require('./services/email_log.service');
const SQSService  =  require('./services/queue.service');

exports.handler = async () => {
    try {
        const queue = new SQSService();
        const data = await queue.receiveMessage();
        await updateSendEmailStatus(data);
    } catch (error) {
        console.log('error' + error.stack);
        return;
    }
}