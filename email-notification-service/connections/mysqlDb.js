const mysql = require('mysql');
const CONFIG = require('../config/config');

const con = async () => {

    let config = {
        host: CONFIG.host,
        user: CONFIG.mysql_username,
        password: CONFIG.password,
        database: CONFIG.database,
        dateStrings: true
    };

    return mysql.createConnection(config);
};


module.exports = {
    createConnection: con
};
