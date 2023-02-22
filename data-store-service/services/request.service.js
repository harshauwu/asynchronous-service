const { createConnection } = require('../connections/mysqlDb');

const saveRequestDetails = async (data) => {
    const currentDate = new Date();
    const dbConnection = await createConnection();
    const sql = `INSERT INTO requests (meta_data, created_at, updated_at) VALUES (${data}, ${currentDate}, ${currentDate})`;
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
module.exports.saveRequestDetails = saveRequestDetails;