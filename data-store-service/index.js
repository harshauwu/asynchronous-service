const { saveRequestDetails } =  require('./services/request.service');
const SQSService  =  require('./services/queue.service');

exports.handler = async () => {
    try {
        const queue = new SQSService();
        const data = await queue.receiveMessage();
        const result = await saveRequestDetails(data);
        const payload = {...data, ...{request_id: result.id}};
        await queue.sendMessage(payload);
    } catch (error) {
        console.log('error' + error.stack);
        return;
    }
};