const express = require('express');
const app = express();
const http = require('http');
const {
    Server
} = require('socket.io');
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
        callback({
            userPresent: true
        });
    });

    socket.on('GET_ADMINS', (callback) => {
        var selectQuery = "SELECT * FROM admins"
        conn.query(selectQuery, function(err, result) {
            if (err) {
                callback({
                    error: err
                });
            }
            callback({
                data: {
                    admins: result
                }
            });
        })
    });
    socket.on('ADD_ADMIN', (data, callback) => {
        console.log(data);
        var insertQuery = "INSERT INTO admins (username, password, name, surname, tcnumber) VALUES ('" + data.username + "', '" + data.password + "','" + data.name + "', '" + data.surname + "','" + data.tcnumber + "')"
        conn.query(insertQuery, function(err, result) {
            if (err) {
                callback({
                    error: err
                });
            }
        })
        callback({
            data: "ok"
        });
    });
    socket.on('REMOVE_ADMIN', (data, callback) => {
        console.log(data);
        for (let index = 0; index < data.length; index++) {
            var deleteQuery = "DELETE FROM admins WHERE id=" + data[index] + ""
            conn.query(deleteQuery, function(err, result) {
                if (err) {
                    callback({
                        error: err
                    });
                }
                console.log("Record deleted.");
            })
        }
        callback({
            data: "ok"
        });
    });


    socket.on('UPDATE_ADMIN', (data, callback) => {
        console.log(data);
        var updateQuery = "UPDATE admins SET username = '" + data.username + "', password = '" + data.password + "',name = '" + data.name + "',surname = '" + data.surname + "',tcnumber = '" + data.tcnumber + "' WHERE id = '" + data.id + "'"
        conn.query(updateQuery, function(err, result) {
            if (err) {
                callback({
                    error: err
                });
            }
            console.log("Record updated.");
        })
        callback({
            data: "ok"
        });
    });

    socket.on('GET_DOCTORS', (callback) => {
        var selectQuery = "SELECT * FROM doctors"
        conn.query(selectQuery, function(err, result) {
            if (err) {
                callback({
                    error: err
                });
            }
            callback({
                data: {
                    doctors: result
                }
            });
        })
    });


    socket.on('ADD_DOCTOR', (data, callback) => {
        console.log(data);
        var insertQuery = "INSERT INTO doctors (username, password, name, surname, tcnumber, polyclinic) VALUES ('" + data.username + "', '" + data.password + "','" + data.name + "', '" + data.surname + "','" + data.tcnumber + ",'" + data.polyclinic + "')"
        conn.query(insertQuery, function(err, result) {
            if (err) {
                callback({
                    error: err
                });
            }
        })
        callback({
            data: "ok"
        });
    });
    socket.on('REMOVE_DOCTOR', (data, callback) => {
        console.log(data);
        for (let index = 0; index < data.length; index++) {
            var deleteQuery = "DELETE FROM doctors WHERE id=" + data[index] + ""
            conn.query(deleteQuery, function(err, result) {
                if (err) {
                    callback({
                        error: err
                    });
                }
                console.log("Record deleted.");
            })
        }
    });

    socket.on('UPDATE_DOCTOR', (data, callback) => {
        console.log(data);
        var updateQuery = "UPDATE doctors SET username = '" + data.username + "', password = '" + data.password + "',name = '" + data.name + "',surname = '" + data.surname + "',tcnumber = '" + data.tcnumber + "',polyclinic = '" + data.polyclinic + "' WHERE id = '" + data.id + "'"
        conn.query(updateQuery, function(err, result) {
            if (err) {
                callback({
                    error: err
                });
            }
            console.log("Record updated.");
        })
        callback({
            data: "ok"
        });
    });

    socket.on('GET_POLYCLINICS', (callback) => {
        var selectQuery = "SELECT * FROM polyclinics"
        conn.query(selectQuery, function(err, result) {
            if (err) {
                callback({
                    error: err
                });
            }
            callback({
                data: {
                    polyclinics: result
                }
            });
        })
    });

    socket.on('ADD_POLYCLINIC', (data, callback) => {
        console.log(data);
        var insertQuery = "INSERT INTO polyclinics (polyclinicName) VALUES ('" + data.polyclinicName + "')"
        conn.query(insertQuery, function(err, result) {
            if (err) {
                callback({
                    error: err
                });
            }
        })
        callback({
            data: "ok"
        });
    });

    socket.on('REMOVE_POLYCLINIC', (data, callback) => {
        console.log(data);
        for (let index = 0; index < data.length; index++) {
            var deleteQuery = "DELETE FROM polyclinics WHERE id=" + data[index] + ""
            conn.query(deleteQuery, function(err, result) {
                if (err) {
                    callback({
                        error: err
                    });
                }
                console.log("Record deleted.");
            })
        }
    });

    socket.on('UPDATE_POLYCLINIC', (data, callback) => {
        console.log(data);
        var updateQuery = "UPDATE polyclinics SET polyclinicName = '" + data.polyclinicName + "'"
        conn.query(updateQuery, function(err, result) {
            if (err) {
                callback({
                    error: err
                });
            }
            console.log("Record updated.");
        })
        callback({
            data: "ok"
        });
    });

    socket.on('GET_LABTECHNICIANS', (callback) => {
        var selectQuery = "SELECT * FROM labtechnicians"
        conn.query(selectQuery, function(err, result) {
            if (err) {
                callback({
                    error: err
                });
            }
            callback({
                data: {
                    labtechnicians: result
                }
            });
        })
    });

    socket.on('ADD_LABTECHNICIAN', (data, callback) => {
        console.log(data);
        var insertQuery = "INSERT INTO labtechnicians (username, password, name, surname, tcnumber) VALUES ('" + data.username + "', '" + data.password + "','" + data.name + "','" + data.surname + "','" + data.tcnumber + "')"
        conn.query(insertQuery, function(err, result) {
            if (err) {
                callback({
                    error: err
                });
            }
        })
        callback({
            data: "ok"
        });
    });

    socket.on('REMOVE_LABTECHNICIAN', (data, callback) => {
        console.log(data);
        for (let index = 0; index < data.length; index++) {
            var deleteQuery = "DELETE FROM labtechnicians WHERE id=" + data[index] + ""
            conn.query(deleteQuery, function(err, result) {
                if (err) {
                    callback({
                        error: err
                    });
                }
                console.log("Record deleted.");
            })
        }
    });

    socket.on('UPDATE_LABTECHNICIAN', (data, callback) => {
        console.log(data);
        var updateQuery = "UPDATE labtechnicians SET username = '" + data.username + "', password = '" + data.password + "',name = '" + data.name + "',surname = '" + data.surname + "',tcnumber = '" + data.tcnumber + "' WHERE id = '" + data.id + "'"
        conn.query(updateQuery, function(err, result) {
            if (err) {
                callback({
                    error: err
                });
            }
            console.log("Record updated.");
        })
        callback({
            data: "ok"
        });
    });

    socket.on('GET_STAFF', (callback) => {
        var selectQuery = "SELECT * FROM staff"
        conn.query(selectQuery, function(err, result) {
            if (err) {
                callback({
                    error: err
                });
            }
            callback({
                data: {
                    staff: result
                }
            });
        })
    });

    socket.on('ADD_STAFF', (data, callback) => {
        console.log(data);
        var insertQuery = "INSERT INTO staff (username, password, name, surname, tcnumber) VALUES ('" + data.username + "', '" + data.password + "','" + data.name + "','" + data.surname + "','" + data.tcnumber + "')"
        conn.query(insertQuery, function(err, result) {
            if (err) {
                callback({
                    error: err
                });
            }
        })
        callback({
            data: "ok"
        });
    });

    socket.on('REMOVE_STAFF', (data, callback) => {
        console.log(data);
        for (let index = 0; index < data.length; index++) {
            var deleteQuery = "DELETE FROM staff WHERE id=" + data[index] + ""
            conn.query(deleteQuery, function(err, result) {
                if (err) {
                    callback({
                        error: err
                    });
                }
                console.log("Record deleted.");
            })
        }
    });

    socket.on('UPDATE_STAFF', (data, callback) => {
        console.log(data);
        var updateQuery = "UPDATE staff SET username = '" + data.username + "', password = '" + data.password + "',name = '" + data.name + "',surname = '" + data.surname + "',tcnumber = '" + data.tcnumber + "' WHERE id = '" + data.id + "'"
        conn.query(updateQuery, function(err, result) {
            if (err) {
                callback({
                    error: err
                });
            }
            console.log("Record updated.");
        })
        callback({
            data: "ok"
        });
    });

    socket.on('GET_PATIENTS', (callback) => {
        var selectQuery = "SELECT * FROM patients"
        conn.query(selectQuery, function(err, result) {
            if (err) {
                callback({
                    error: err
                });
            }
            callback({
                data: {
                    patients: result
                }
            });
        })
    });

    socket.on('ADD_PATIENT', (data, callback) => {
        console.log(data);
        var insertQuery = "INSERT INTO patients (username, password, name, surname, tcnumber, gender, bloodGroup, birthPlace, birthDate, phoneNumber, address) VALUES ('" + data.username + "', '" + data.password + "','" + data.name + "','" + data.surname + "','" + data.tcnumber + "','" + data.gender + "','" + data.bloodGroup + "','" + data.birthPlace + "','" + data.birthDate + "','" + data.phoneNumber + "','" + data.address + "')"
        conn.query(insertQuery, function(err, result) {
            if (err) {
                callback({
                    error: err
                });
            }
        })
        callback({
            data: "ok"
        });
    });

    socket.on('REMOVE_PATIENT', (data, callback) => {
        console.log(data);
        for (let index = 0; index < data.length; index++) {
            var deleteQuery = "DELETE FROM patients WHERE id=" + data[index] + ""
            conn.query(deleteQuery, function(err, result) {
                if (err) {
                    callback({
                        error: err
                    });
                }
                console.log("Record deleted.");
            })
        }
    });


    socket.on('UPDATE_PATIENT', (data, callback) => {
        console.log(data);
        var updateQuery = "UPDATE patients SET username = '" + data.username + "', password = '" + data.password + "',name = '" + data.name + "',surname = '" + data.surname + "',tcnumber = '" + data.tcnumber + "',gender = '" + data.gender + "',bloodGroup = '" + data.bloodGroup + "',birthPlace = '" + data.birthPlace + "',birthDate = '" + data.birthDate + "',phoneNumber = '" + data.phoneNumber + "',address = '" + data.address + "' WHERE id = '" + data.id + "'"
        conn.query(updateQuery, function(err, result) {
            if (err) {
                callback({
                    error: err
                });
            }
            console.log("Record updated.");
        })
        callback({
            data: "ok"
        });
    });
});

server.listen(3001, () => {
    console.log('Server is running');
});
// const SOCKET_URL = 'http://192.168.1.109:3000';