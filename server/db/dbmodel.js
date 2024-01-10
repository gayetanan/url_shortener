import mysql from "mysql";
import dotenv from "dotenv"
dotenv.config()
const dbinfo = {
    host: process.env.HOST,
    port: process.env.PORT,
    user: process.env.USER_NAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    multipleStatements: true
}

const MYSQL = mysql.createConnection(dbinfo);

// @DESC Connecting to DB
MYSQL.connect((err) => {
    if (!err) {
        console.log("connecting to DB.")
    } else {
        console.log(err.message)
    }
});

// @DESC INSERT new url
const addURlToDb = ({ id, site, createdAt, expiredAt = null }) => {
    return new Promise((resovle, reject) => {
        const query = `INSERT INTO urls(id,site,created_date,expiration_date) VALUES (?,?,?,?);`

        MYSQL.query(query, [id, site, createdAt, expiredAt], async (err) => {
            if (!err) {
                // const newInsertedURL = await getUlrByid(id)
                // resovle(newInsertedURL)
                resovle(true)
            } else {
                // url is greater the 50 characters long
                if (err.code === "ER_DATA_TOO_LONG") {
                    reject({ status: "longURL", msg: "Your URL exceed 50 characters." })
                    return;
                }
                reject({ msg: "Server Error" })
            }
        })
    })
}

const getUlrByid = (id) => {
    return new Promise((resovle, reject) => {
        const query = `SELECT * FROM urls WHERE id =?`
        MYSQL.query(query, id, (err, result) => {
            if (!err) {
                // return url OBJ if there is url found
                // otherwise return Null
                switch (result.length) {
                    case 1:
                        resovle(result[0])
                        break;
                    default:
                        resovle(null)
                        break;
                }
            } else {
                reject(err)
            }
        })
    })
}
const deleteURLById = (id) => {
    return new Promise((resovle, reject) => {
        const query = `DELETE FROM urls WHERE id = ?`
        MYSQL.query(query, id, (err, result) => {
            if (!err) {
                resovle(true);
            } else {
                reject(new Error(err.message))
            }
        })
    })

}

const getAllURLDb = () => {
    return new Promise((resovle, reject) => {
        // DELETE all expired url;
        // return the others
        const query = `DELETE FROM urls WHERE NOW() > expiration_date;
        SELECT id, CONCAT("http://localhost:5000/",id) AS url FROM urls ORDER BY created_date DESC;`
        MYSQL.query(query, (err, results) => {
            if (!err) {
                resovle(results[1]);
            } else {
                reject(new Error(err.message))
            }
        })
    })
}
const updateURL = ({ id, expirationDate = null }) => {
    return new Promise((resovle, reject) => {
        const query = `UPDATE urls SET expiration_date = ? WHERE id=?`
        MYSQL.query(query, [expirationDate, id], (err, results) => {
            if (!err) {
                resovle(true);
            } else {
                reject(new Error(err.message))
            }
        })
    })
}

export { addURlToDb, getUlrByid, deleteURLById, getAllURLDb, updateURL }
