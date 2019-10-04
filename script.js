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
        con.query({
            sql: sql,
            timeout: 1500,
        }, function (err, result) {
            try {
                if (err) throw err;
            } catch (e) {
                console.error('erro' + e);
                process.exit();
            }
            console.log("Number of records deleted: " + result.affectedRows);
            log("Number of records deleted: " + result.affectedRows, './logs/script.log');
            if (result.affectedRows === 0) {
                console.log('Finished!');
                log('Finished!', './logs/script.log');
                process.exit();
                clearInterval(intervalId);
            }
        });
    }, 2000);
});

function ScriptException(err) {
    this.value = err;
    this.message = err.message;
}