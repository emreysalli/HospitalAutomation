const express = require('express');
const app = express();
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

var mysql = require('mysql');
var conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "hospital_db"
  });
conn.connect();


app.use(cors());
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on('ADMIN_LOGIN', (data, callback) => {
    console.log(data);
    callback({userPresent:true});
  });
  
  socket.on('GET_ADMINS', (callback) => {
    var selectQuery = "SELECT * FROM admins"
    conn.query(selectQuery,function(err, result) {
    if (err) {
        callback({error:err});
    }
    callback({data:{admins:result}});
    })
  });
  socket.on('ADD_ADMIN', (data, callback) => {
    console.log(data);
    var insertQuery = "INSERT INTO admins (username, password, name, surname, tcnumber) VALUES ('"+ data.username +"', '"+ data.password +"','"+ data.name +"', '"+ data.surname +"','"+ data.tcnumber +"')"
    conn.query(insertQuery,function(err, result) {
        if (err) {
            callback({error:err});
        }
        console.log("Record deleted.");
        })
    callback({data:"ok"});
  });
  socket.on('REMOVE_ADMIN', (data, callback) => {
    console.log(data);
    for (let index = 0; index < data.length; index++) {
        var deleteQuery = "DELETE FROM admins WHERE id="+ data[index] +""
        conn.query(deleteQuery,function(err, result) {
        if (err) {
            callback({error:err});
        }
        console.log("Record deleted.");
        })
    }
    callback({data:"ok"});
  });
  socket.on('UPDATE_ADMIN', (data, callback) => {
    console.log(data);
    var updateQuery = "UPDATE admins SET username = '"+ data.username +"', password = '"+ data.password +"',name = '"+ data.name +"',surname = '"+ data.surname +"',tcnumber = '"+ data.tcnumber +"' WHERE id = '"+ data.id +"'"
    conn.query(updateQuery,function(err, result) {
        if (err) {
            callback({error:err});
        }
      console.log("Record updated.");
    })
    callback({data:"ok"});
  });
  socket.on('ADD_DOCTOR', (data, callback) => {
    console.log(data);
    callback({userPresent:true});
  });
  socket.on('REMOVE_DOCTOR', (data, callback) => {
    console.log(data);
    callback({userPresent:true});
  });
  socket.on('UPDATE_DOCTOR', (data, callback) => {
    console.log(data);
    callback({userPresent:true});
  });
  socket.on('ADD_PATIENT', (data, callback) => {
    console.log(data);
    callback({userPresent:true});
  });

});

server.listen(3001, () => {
  console.log('Server is running');
});
// const SOCKET_URL = 'http://192.168.1.109:3000';

