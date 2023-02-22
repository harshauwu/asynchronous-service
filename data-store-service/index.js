const { saveRequestDetails } =  require('./services/request.service');
const SQSService  =  require('./services/queue.service');

exports.handler = async () => {
    try {
        const queue = new SQSService();
        const data = await queue.receiveMessage();
        await saveRequestDetails(data);
        await queue.sendMessage(data);
    } catch (error) {
        console.log('error' + error.stack);
        return;
    }
};