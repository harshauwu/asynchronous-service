const { createConnection } = require('../connections/mysqlDb');

const saveEmailLogs = async (data) => {
    const currentDate = new Date();
    const dbConnection = await createConnection();
    const sql = `INSERT INTO requests (request_id, meta_data, status, created_at, updated_at) VALUES (${data.request_id}, ${data}, 0, ${currentDate}, ${currentDate})`;
    return await new Promise((resolve, reject) => {
        return dbConnection.query(sql, (error, result) => {
            if (error) {
                console.log(error);
                return reject(error);
            }
            resolve(result);
        });
    });
};
module.exports.saveEmailLogs = saveEmailLogs;