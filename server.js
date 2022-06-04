const mysql= require('mysql2') ;
const express = require('express') ;
var app = express() ;
const bodyparser = require('body-parser');

app.use(bodyparser.json());




var mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'sqltutorial',
    database: 'firstdb',
    multipleStatements : true
  
});
mysqlConnection.connect((err) => {
    if (!err)
        console.log('connection succeded.');
    else
        console.log('connection failed.... Error : ' + JSON.stringify(err, undefined, 2));
});



app.get('/student', (req, res) => {
    mysqlConnection.query('SELECT * FROM student', (err, rows, fields) => {
        if (!err)
            res.send(rows);
            
        else
            console.log(err);
    })
});

app.get('/student/:id', (req, res) => {
    mysqlConnection.query('SELECT * FROM student WHERE id = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});

app.delete('/student/:id', (req, res) => {
    mysqlConnection.query('DELETE FROM student WHERE id = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send('Deleted ');
        else
            console.log(err);
    })
});



app.post('/student', (req, res) => {
    let id = req.query.id ;
    let Country = req.query.Country ;
    let Name = req.query.Name ;
    let sql = 'INSERT INTO student(id,Name,Country) VALUE(?,?,?)' ;
    mysqlConnection.query(sql, [id ,Name, Country], (err, rows, fields) => {
                if (!err)
                 
                        
                 res.send('Inserted student');
                    
                else
                    console.log(err);
    })
});

app.patch('/student/:id', (req, res) => {
    const id = req.params.id ;
    let emp = req.body;
    var sql = "update student set Name=? , Country=? where id =?";
    mysqlConnection.query(sql, [emp.Name, emp.Country,id], (err, rows, fields) => {
        if (!err)
            res.send('Updated successfully');
        else
        res.send('ID not Found');
            console.log(err);
    })
});

app.listen(3000, () => console.log('server is running at port 3000'));