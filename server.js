const express = require("express");
const app = express();

const mysql = require("mysql");

const connection = mysql.createConnection({
    user:'root',
    password:'root',
    host:'localhost',
    database:'form'
})

app.use(express.urlencoded({extended:true}));

app.post('/signup', async(req,res) => {

    console.log(req.body);

    const {fullname, password, email, address} = req.body;

    const query = `INSERT INTO users (fullname, email, password, address) VALUES ('${fullname}','${email}','${password}','${address}')`;

    connection.query(query,(err,result) => {

        if(err) {
            console.log(err.message);
        }

        console.log(result);

        res.send('Signup successfully completed');
    })
});

app.get('/users', async(req,res) => {

    const query = 'SELECT * FROM users';

    connection.query(query, (err,result) => {

        if(err) {
            console.log(err.message);
        }

        console.log(result);

        res.send(result);

    })

})

app.listen(4000, () => {
    console.log("Server is up");
})

