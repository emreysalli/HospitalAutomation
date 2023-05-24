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
        var authQuery = "SELECT EXISTS(SELECT 1 FROM admins WHERE username = '" + data.username + "' AND password = '" + data.password + "') AS present"
        conn.query(authQuery, function(err, result) {
            if (err) {
                callback({
                    error: err
                });
            }
            if (result[0].present == 1) {
                callback({
                    data: {
                        userPresent: true
                    }
                });
            } else {
                callback({
                    data: {
                        userPresent: false
                    }
                });
            }
        })
    });

    // ADMIN REQURESTS 

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

    // DOCTOR REQUESTS 

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
        var insertQuery = "INSERT INTO doctors (username, password, name, surname, tcnumber, polyclinic, polyclinicId) VALUES ('" + data.username + "', '" + data.password + "','" + data.name + "', '" + data.surname + "','" + data.tcnumber + "','" + data.polyclinic + "','" + data.polyclinicId + "')"
        conn.query(insertQuery, function(err, result) {
            if (err) {
                console.log("selam");
                callback({
                    error: err
                });
            }
            callback({
                data: "ok"
            });
        })
    });
    socket.on('REMOVE_DOCTOR', (data, callback) => {
        for (let index = 0; index < data.length; index++) {
            var deleteQuery = "DELETE FROM doctors WHERE id=" + data[index] + ""
            conn.query(deleteQuery, function(err, result) {
                if (err) {
                    callback({
                        error: err
                    });
                }
                callback({
                    data: "ok"
                });
                console.log("Record deleted.");
            })

        }
    });

    socket.on('UPDATE_DOCTOR', (data, callback) => {
        var updateQuery = "UPDATE doctors SET username = '" + data.username + "', password = '" + data.password + "',name = '" + data.name + "',surname = '" + data.surname + "',tcnumber = '" + data.tcnumber + "' WHERE id = '" + data.id + "'"
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

    // POLYCLINIC REQUESTS

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
        for (let index = 0; index < data.length; index++) {
            var deleteQuery = "DELETE FROM polyclinics WHERE id=" + data[index] + ""
            conn.query(deleteQuery, function(err, result) {
                if (err) {
                    callback({
                        error: err
                    });
                }
                callback({
                    data: "ok"
                });
                console.log("Record deleted.");
            })
        }
    });

    socket.on('UPDATE_POLYCLINIC', (data, callback) => {
        var updateQuery = "UPDATE polyclinics SET polyclinicName = '" + data.polyclinicName + "' WHERE id = '" + data.id + "'"
        conn.query(updateQuery, function(err, result) {
            if (err) {
                callback({
                    error: err
                });
            }
            callback({
                data: "ok"
            });
            console.log("Record updated.");
        })
    });

    // LABTECHNICIANS REQUESTS

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
                    labTechnicians: result
                }
            });
        })
    });

    socket.on('ADD_LABTECHNICIAN', (data, callback) => {
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
        for (let index = 0; index < data.length; index++) {
            var deleteQuery = "DELETE FROM labtechnicians WHERE id=" + data[index] + ""
            conn.query(deleteQuery, function(err, result) {
                if (err) {
                    callback({
                        error: err
                    });
                }
                callback({
                    data: "ok"
                });
                console.log("Record deleted.");
            })
        }
    });

    socket.on('UPDATE_LABTECHNICIAN', (data, callback) => {
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

    // STAFF REQUESTS

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
        for (let index = 0; index < data.length; index++) {
            var deleteQuery = "DELETE FROM staff WHERE id=" + data[index] + ""
            conn.query(deleteQuery, function(err, result) {
                if (err) {
                    callback({
                        error: err
                    });
                }
                callback({
                    data: "ok"
                });
                console.log("Record deleted.");
            })
        }
    });

    socket.on('UPDATE_STAFF', (data, callback) => {
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

    // PATIENT REQUESTS

    socket.on('GET_PATIENTS', (callback) => {
        var selectQuery = "SELECT id, username, password, name, surname, tcnumber, gender, bloodGroup, birthPlace, DATE_FORMAT(p.birthDate,'%d-%m-%Y') as birthDate, phoneNumber, address, email FROM patients"
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
        var insertQuery = "INSERT INTO patients (username, password, name, surname, tcnumber, gender, bloodGroup, birthPlace, birthDate, phoneNumber, address, email) VALUES ('" + data.username + "', '" + data.password + "','" + data.name + "','" + data.surname + "','" + data.tcnumber + "','" + data.gender + "','" + data.bloodGroup + "','" + data.birthPlace + "','" + data.birthDate + "','" + data.phoneNumber + "','" + data.address + "', '"+ data.email +"')"
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
        for (let index = 0; index < data.length; index++) {
            var deleteQuery = "DELETE FROM patients WHERE id=" + data[index] + ""
            conn.query(deleteQuery, function(err, result) {
                if (err) {
                    callback({
                        error: err
                    });
                }
                callback({
                    data: "ok"
                });
                console.log("Record deleted.");
            })
        }
    });


    socket.on('UPDATE_PATIENT', (data, callback) => {
        var updateQuery = "UPDATE patients SET username = '" + data.username + "', password = '" + data.password + "',name = '" + data.name + "',surname = '" + data.surname + "',tcnumber = '" + data.tcnumber + "',gender = '" + data.gender + "',bloodGroup = '" + data.bloodGroup + "',birthPlace = '" + data.birthPlace + "',birthDate = '" + data.birthDate + "',phoneNumber = '" + data.phoneNumber + "',address = '" + data.address + "',email = '"+ data.email +"' WHERE id = '" + data.id + "'"
        conn.query(updateQuery, function(err, result) {
            if (err) {
                callback({
                    error: err
                });
            }
            callback({
                data: "ok"
            });
            console.log("Record updated.");
        })
    });

    // PATIENT PAGE

    socket.on('PATIENT_LOGIN', (data, callback) => {
        var authQuery = "SELECT EXISTS(SELECT 1 FROM patients WHERE username = '" + data.username + "' AND password = '" + data.password + "') AS present"
        conn.query(authQuery, function(err, result) {
            if (err) {
                callback({
                    error: err
                });
            }
            if (result[0].present == 1) {
                var idQuery = "SELECT id from patients WHERE username = '" + data.username + "'"
                conn.query(idQuery, function(err, result) {
                    if (err) {
                        callback({
                            error: err
                        });
                    }
                    callback({
                        data: {
                            userPresent: true,
                            id: result[0].id
                        }
                    });
                })
            } else {
                callback({
                    data: {
                        userPresent: false
                    }
                });
            }
        })
    });

    socket.on('GET_PATIENT_INFO', (data, callback) => {
        var selectQuery = "SELECT * from patients WHERE id = '" + data.id + "'"
        conn.query(selectQuery, function(err, result) {
            if (err) {
                callback({
                    error: err
                });
            }
            console.log(result)
            callback({
                data: {
                    "patientInfo": {
                        "name": result[0].name,
                        "surname": result[0].surname,
                        "tcnumber": result[0].tcnumber,
                        "address": result[0].address,
                        "bloodGroup": result[0].bloodGroup,
                        "gender": result[0].gender,
                        "birthPlace": result[0].birthPlace,
                        "birthDate": result[0].birthDate,
                        "phoneNumber": result[0].phoneNumber,
                        "email": result[0].email,
                        "username": result[0].username,
                        "password": result[0].password
                    }
                }
            });
        })
    });

    socket.on('GET_PATIENT_PRESCRIPTIONS', (data, callback) => {
        var selectQuery = "SELECT p.id, DATE_FORMAT(p.date,'%d-%m-%Y') as date, p.prescriptionNo, p.patientId, p.doctorId, CONCAT(d.name,' ',d.surname) as doctor, p.explanation FROM prescriptions as p INNER JOIN doctors as d ON d.id = doctorId WHERE p.patientId = '" + data.id + "'";
        conn.query(selectQuery, function(err, result) {
            if (err) {
                callback({
                    error: err
                });
            }
            callback({
                data: {
                    prescriptions: result
                }
            });
        })
    });

    socket.on('GET_PATIENT_MEDICINES', (data, callback) => {
        var selectQuery = "SELECT * from medicines WHERE prescriptionId = '" + data.prescriptionId + "'"
        conn.query(selectQuery, function(err, result) {
            if (err) {
                callback({
                    error: err
                });
            }
            callback({
                data: {
                    prescriptions: result
                }
            });
        })
    });

    socket.on('GET_PATIENT_ANALYSIS_RESULTS', (data, callback) => {
        console.log(data);
        var selectQuery = "SELECT id, DATE_FORMAT(date,'%d-%m-%Y') as date, patientId FROM analysisResults WHERE patientId = '" + data.patientId + "' GROUP BY date"
        conn.query(selectQuery, function(err, result) {
            console.log(err,result);
            if (err) {
                callback({
                    error: err
                });
            }
            callback({
                data: {
                    analysisResults: result
                }
            });
        })
    });

    socket.on('GET_PATIENT_ANALYSIS_RESULTS_BY_DATE', (data, callback) => {
        console.log(data)
        var selectQuery = "SELECT id, DATE_FORMAT(date,'%d-%m-%Y') as date, transactionName, result, resultUnit, referenceValue, patientId FROM analysisResults WHERE patientId = '"+ data.patientId +"' AND date = '"+ data.date +"'"
        conn.query(selectQuery, function(err, result) {
            if (err) {
                callback({
                    error: err
                });
            }
            callback({
                data: {
                    analysisResults: result
                }
            });
        })
    });

    socket.on('SEARCH_APPOINTMENTS', (data, callback) => {
        var selectQuery = "SELECT appointmentHour FROM appointments WHERE doctorId = '" + data.doctorId + "' AND appointmentDate ='" + data.appointmentDate + "'"
        conn.query(selectQuery, function(err, result) {
            if (err) {
                callback({
                    error: err
                });
            }
            callback({
                data: {
                    appointments: result
                }
            });
        })
    });

    socket.on('GET_DOCTORS_OF_POLYCLINIC', (data, callback) => {
        var selectQuery = "SELECT id, CONCAT(d.name,' ',d.surname) as doctor FROM doctors as d WHERE polyclinicId = '" + data.polyclinicId + "'"
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

    socket.on('GET_PATIENT_APPOINTMENTS', (data, callback) => {
        var selectQuery = "SELECT a.id, a.polyclinicName, a.doctorId, DATE_FORMAT(a.appointmentDate,'%d-%m-%Y') as appointmentDate, a.appointmentHour, CONCAT(d.name,' ',d.surname) as doctor FROM appointments as a INNER JOIN doctors as d ON d.id = a.doctorId WHERE a.patientId=" + data.patientId + ""
        conn.query(selectQuery, function(err, result) {
            if (err) {
                callback({
                    error: err
                });
            }
            callback({
                data: {
                    appointments: result
                }
            });
        })
    });

    socket.on('CANCEL_PATIENT_APPOINTMENTS', (data, callback) => {
        var insertQuery = "INSERT INTO pastAppointments (appointmentDate, appointmentHour, doctorId, patientId, polyclinicName) SELECT appointmentDate, appointmentHour, doctorId, patientId, polyclinicName FROM appointments WHERE id = '" + data.appointmentId + "'"
        conn.query(insertQuery, function(err, result) {
            if (err) {
                callback({
                    error: err
                });
            }
            callback({
                data: "ok"
            });
        })

        var deleteQuery = "DELETE FROM appointments WHERE id=" + data.appointmentId + ""
        conn.query(deleteQuery, function(err, result) {
            if (err) {
                callback({
                    error: err
                });
            }
            callback({
                data: "ok"
            });
        })
    });

    socket.on('GET_PATIENT_PAST_APPOINTMENTS', (data, callback) => {
        var selectQuery = "SELECT p.id, p.polyclinicName, p.doctorId, DATE_FORMAT(p.appointmentDate,'%d-%m-%Y') as appointmentDate, p.appointmentHour, p.appointmentStatus, CONCAT(d.name,' ',d.surname) as doctor FROM pastAppointments as p INNER JOIN doctors as d ON d.id = p.doctorId WHERE p.patientId=" + data.patientId + ""
        conn.query(selectQuery, function(err, result) {
            if (err) {
                callback({
                    error: err
                });
            }
            callback({
                data: {
                    appointments: result
                }
            });
        })
    });

    socket.on('SAVE_APPOINTMENT', (data, callback) => {
        var insertQuery = "INSERT INTO appointments (polyclinicName, doctorId, patientId, appointmentDate, appointmentHour) VALUES ('" + data.polyclinicName + "', '" + data.doctorId + "','" + data.patientId + "','" + data.appointmentDate + "','" + data.appointmentHour + "')"

        conn.query(insertQuery, function(err, result) {
            if (err) {
                callback({
                    error: err
                });
            }
            callback({
                data: "ok"
            });
        })
    });

    socket.on('DOCTOR_LOGIN', (data, callback) => {
        var authQuery = "SELECT EXISTS(SELECT 1 FROM doctors WHERE username = '" + data.username + "' AND password = '" + data.password + "') AS present"
        conn.query(authQuery, function(err, result) {
            if (err) {
                callback({
                    error: err
                });
            }
            if (result[0].present == 1) {
                var idQuery = "SELECT id from doctors WHERE username = '" + data.username + "'"
                conn.query(idQuery, function(err, result) {
                    if (err) {
                        callback({
                            error: err
                        });
                    }
                    callback({
                        data: {
                            userPresent: true,
                            id: result[0].id
                        }
                    });
                })
            } else {
                callback({
                    data: {
                        userPresent: false
                    }
                });
            }
        })
    });

    socket.on('GET_DOCTOR_INFO', (data, callback) => {
        var selectQuery = "SELECT * from doctors WHERE id = '" + data.id + "'"
        conn.query(selectQuery, function(err, result) {
            if (err) {
                callback({
                    error: err
                });
            }
            console.log(result)
            callback({
                data: {
                    "doctorInfo": {
                        "name": result[0].name,
                        "surname": result[0].surname,
                        "tcnumber": result[0].tcnumber,
                        "polyclinic": result[0].polyclinic,
                        "username": result[0].username,
                        "password": result[0].password
                    }
                }
            });
        })
    });

    socket.on('GET_DOCTOR_APPOINTMENTS', (data, callback) => {
        console.log(data);
        var selectQuery = "SELECT a.id, DATE_FORMAT(a.appointmentDate,'%d-%m-%Y') as appointmentDate, a.appointmentHour, CONCAT(p.name,' ',p.surname) as patient, p.tcnumber, p.id as patientId from appointments as a INNER JOIN patients as p ON p.id = a.patientId WHERE a.doctorId = '"+ data.id +"' AND a.appointmentDate = '"+data.appointmentDate +"' "
        conn.query(selectQuery, function(err, result) {
            if (err) {
                callback({
                    error: err
                });
            }
            callback({
                data: {
                    appointments: result
                }
            });
        })
    });

    socket.on('DOCTOR_ANALYSIS_RESULTS', (data, callback) => {
        var selectQuery = "SELECT a.id, DATE_FORMAT(a.date,'%d-%m-%Y') as date, a.transactionName, a.result, a.resultUnit, a.referenceValue, a.patientId FROM analysisResults as a INNER JOIN patients as p on p.tcnumber = '"+ data.tcnumber +"'"
        conn.query(selectQuery, function(err, result) {
            if (err) {
                callback({
                    error: err
                });
            }
            callback({
                data: {
                    analysisResults: result
                }
            });
        })
    });

    socket.on('GET_PATIENT_INFO_WITH_TC', (data, callback) => {
        var selectQuery = "SELECT * from patients WHERE tcnumber = '"+ data.tcnumber +"'"
        conn.query(selectQuery, function(err, result) {
            if (err) {
                callback({
                    error: err
                });
            }
            callback({
                data: {
                    patientInfo: result[0]
                }
            });
        })
    });
    
    socket.on('ADD_PRESCRIPTION', (data, callback) => {
        var insertQuery = "INSERT INTO prescriptions (date, prescriptionNo, patientId, doctorId, explanation) VALUES ('"+ data.date +"','"+ data.prescriptionNo +"','"+ data.patientId +"','"+ data.doctorId +"','"+ data.explanation +"')"
        conn.query(insertQuery, function(err, result) {
            if (err) {
                callback({
                    error: err
                });
            }
            callback({
                data: {
                    prescriptionId:result.insertId
                }
            });
        })

    });

    socket.on('ADD_MEDICINES', (data, callback) => {
        for (let index = 0; index < data.medicines.length; index++) {
            var insertQuery = "INSERT INTO medicines (medicineName, dose, period, medicineUsage, numberOfUses, totalBox, prescriptionId) VALUES ('"+ data.medicines[index].medicineName +"','"+ data.medicines[index].dose +"','"+ data.medicines[index].period +"','"+ data.medicines[index].usage +"','"+ data.medicines[index].numberOfUses +"','"+ data.medicines[index].totalBox +"', '"+data.prescriptionId+"')"
            conn.query(insertQuery, function(err, result) {
                if (err) {
                    callback({
                        error: err
                    });
                }
            })
        }
        callback({
            data: "ok"
        });
    });

    socket.on('ADD_DIAGNOSIS', (data, callback) => {
        for (let index = 0; index < data.diagnoses.length; index++) {
            insertQuery = "INSERT INTO diagnosis (explanation, type, doctorId, patientId) VALUES ('"+ data.diagnoses[index].explanation +"','"+ data.diagnoses[index].type +"','"+ data.doctorId +"','"+ data.patientId +"')"
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
        }
    });

    socket.on('GET_STAFF_INFO', (data, callback) => {
        var selectQuery = "SELECT * from staff WHERE id = '" + data.id + "'"
        conn.query(selectQuery, function(err, result) {
            if (err) {
                callback({
                    error: err
                });
            }
            console.log(result)
            callback({
                data: {
                    "staffInfo": {
                        "name": result[0].name,
                        "surname": result[0].surname,
                        "tcnumber": result[0].tcnumber,
                        "username": result[0].username,
                        "password": result[0].password
                    }
                }
            });
        })
    });

    socket.on('GET_LAB_TECHNICIAN_INFO', (data, callback) => {
        var selectQuery = "SELECT * from labtechnicians WHERE id = '" + data.id + "'"
        conn.query(selectQuery, function(err, result) {
            if (err) {
                callback({
                    error: err
                });
            }
            console.log(result)
            callback({
                data: {
                    "labTechnicianInfo": {
                        "name": result[0].name,
                        "surname": result[0].surname,
                        "tcnumber": result[0].tcnumber,
                        "username": result[0].username,
                        "password": result[0].password
                    }
                }
            });
        })
    });

    socket.on('ADD_ANALYSIS_RESULT', (data, callback) => {
        console.log(data);
        for (let index = 0; index < data.analysisResults.length; index++) {
            insertQuery = "INSERT INTO analysisresults (date, transactionName, result, resultUnit, referenceValue, patientId) VALUES ('"+ data.analysisResults[index].date +"','"+ data.analysisResults[index].transactionName +"','"+ data.analysisResults[index].result +"','"+ data.analysisResults[index].resultUnit +"','"+ data.analysisResults[index].referenceValue +"','"+ data.patientId +"')"
            conn.query(insertQuery, function(err, result) {
                if (err) {
                    callback({
                        error: err
                    });
                }
            })
        }
        callback({
            data: "ok"
        });
    });

    socket.on('LAB_TECHNICIAN_LOGIN', (data, callback) => {
        var authQuery = "SELECT EXISTS(SELECT 1 FROM labtechnicians WHERE username = '" + data.username + "' AND password = '" + data.password + "') AS present"
        conn.query(authQuery, function(err, result) {
            if (err) {
                callback({
                    error: err
                });
            }
            if (result[0].present == 1) {
                var idQuery = "SELECT id from labtechnicians WHERE username = '" + data.username + "'"
                conn.query(idQuery, function(err, result) {
                    if (err) {
                        callback({
                            error: err
                        });
                    }
                    callback({
                        data: {
                            userPresent: true,
                            id: result[0].id
                        }
                    });
                })
            } else {
                callback({
                    data: {
                        userPresent: false
                    }
                });
            }
        })
    });

    socket.on('STAFF_LOGIN', (data, callback) => {
        var authQuery = "SELECT EXISTS(SELECT 1 FROM staff WHERE username = '" + data.username + "' AND password = '" + data.password + "') AS present"
        conn.query(authQuery, function(err, result) {
            if (err) {
                callback({
                    error: err
                });
            }
            if (result[0].present == 1) {
                var idQuery = "SELECT id from staff WHERE username = '" + data.username + "'"
                conn.query(idQuery, function(err, result) {
                    if (err) {
                        callback({
                            error: err
                        });
                    }
                    callback({
                        data: {
                            userPresent: true,
                            id: result[0].id
                        }
                    });
                })
            } else {
                callback({
                    data: {
                        userPresent: false
                    }
                });
            }
        })
    });

    socket.on('GET_INCONCLUSIVE_ANALYSIS_RESULTS', (data, callback) => {
        var selectQuery = "SELECT a.id, DATE_FORMAT(a.date,'%d-%m-%Y') as date, a.transactionName, a.result, a.resultUnit, a.referenceValue, a.patientId, CONCAT(p.name,' ',p.surname) as patient FROM analysisResults as a INNER JOIN patients as p ON p.id = a.patientId WHERE a.result = ''"
        conn.query(selectQuery, function(err, result) {
            if (err) {
                callback({
                    error: err
                });
            }
            callback({
                data: {
                    analysisResults: result
                }
            });
        })
    });
    
    socket.on('UPDATE_ANALYSIS_RESULT', (data, callback) => {
        var updateQuery = "UPDATE analysisResults SET result = '"+ data.result +"' WHERE id = '" + data.id + "'"
        conn.query(updateQuery, function(err, result) {
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

    socket.on('SEND_WISH_AND_COMPLAINT', (data, callback) => {
        var insertQuery = "INSERT INTO wishesAndComplaints(subject, creationDate, userType, userId, name, surname) VALUES ('"+ data.subject +"','"+ data.creationDate +"','"+ data.userType +"','"+ data.userId +"','"+ data.name +"','"+ data.surname +"')"
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

    socket.on('GET_USER_WISHES_AND_COMPLAINTS', (data, callback) => {
        var selectQuery = "SELECT id, subject, description, DATE_FORMAT(creationDate,'%d-%m-%Y') as creationDate, DATE_FORMAT(solutionDate,'%d-%m-%Y') as solutionDate FROM wishesAndComplaints WHERE userId = '"+ data.userId +"' AND userType = '"+ data.userType +"'"
        conn.query(selectQuery, function(err, result) {
            if (err) {
                callback({
                    error: err
                });
            }
            callback({
                data:{
                    wishes:result
                }
            });
        })

    });

    socket.on('GET_WISHES_AND_COMPLAINTS', (data, callback) => {
        var selectQuery = "SELECT id, subject, description, DATE_FORMAT(creationDate,'%d-%m-%Y') as creationDate, DATE_FORMAT(solutionDate,'%d-%m-%Y') as solutionDate, userType, userId, name, surname FROM wishesAndComplaints"
        conn.query(selectQuery, function(err, result) {
            if (err) {
                callback({
                    error: err
                });
            }
            callback({
                data: {wishes:result}
            });
        })

    });

    socket.on('ADD_DESCRIPTION', (data, callback) => {
        var updateQuery = "UPDATE wishesAndComplaints SET description = '"+ data.description +"', solutionDate = '"+ data.solutionDate +"' WHERE id = '"+ data.id +"'"
        conn.query(updateQuery, function(err, result) {
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

    socket.on('VERIFY_EMAIL', (data, callback) => {
        var authQuery = "SELECT EXISTS(SELECT 1 FROM patients WHERE email = '"+ data.email +"') AS present"
        conn.query(authQuery, function(err, result) {
            if (err) {
                callback({
                    error: err
                });
            }
            if (result[0].present == 1) {
                callback({
                    data: {
                        present: true
                    }
                });
            } else {
                callback({
                    data: {
                        present: false
                    }
                });
            }
        })
    });

    socket.on('CHANGE_PATIENT_PASSWORD', (data, callback) => {
        var updateQuery = "UPDATE patients SET password = '"+ data.newPassword +"' WHERE email = '"+ data.email +"'"
        conn.query(updateQuery, function(err, result) {
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

});

server.listen(3001, () => {
    console.log('Server is running');
});
// const SOCKET_URL = 'http://192.168.1.109:3000';