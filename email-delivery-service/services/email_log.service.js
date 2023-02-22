const { createConnection } = require('../connections/mysqlDb');

const updateSendEmailStatus = async (data) => {
    const currentDate = new Date();
    const dbConnection = await createConnection();
    const sql = `UPDATE email_logs SET status = 1, updated_at: ${currentDate} WHERE `;
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
module.exports.updateSendEmailStatus = updateSendEmailStatus;