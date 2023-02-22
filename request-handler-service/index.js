const  sqsClient  =  require('./services/queue.service');

exports.handler = async (event) => {
    try {
        console.log(event);
        const queue = new sqsClient();
        await queue.sendMessage(event);
        let response = {
            statusCode: 201
        };
        return response;
    } catch (error) {
        console.log('Error', error);
        let response = {
            statusCode: 500,
            body: JSON.stringify(error),
        };
        return response;
    }
};