const mysql = require('mysql');
const log = require('log-to-file');

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "ad23ol12",
    database: "example_db"
});

con.connect(function(err){
    if (err) throw err;
    const sql = "DELETE FROM test LIMIT 10";
    let intervalId = setInterval(() => {
        con.query(sql, function (err, result) {
            if (err) throw err;
            console.log("Number of records deleted: " + result.affectedRows);
            log("Number of records deleted: " + result.affectedRows, './logs/script.log');
            if (result.affectedRows === 0) {
                console.log('Finished!');
                log('Finished!', './logs/script.log');
                clearInterval(intervalId);
            }
        });
    }, 2000);
    
});