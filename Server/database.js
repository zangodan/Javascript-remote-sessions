import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

const pool = mysql.createPool({
    host: process.env.MTSQL_HOST,
    user: process.env.MTSQL_USER,
    password: process.env.MTSQL_PASSWORD,
    database: process.env.MTSQL_DATABASE
}).promise();


export async function getSessionsCode(){
    const result = await pool.query("SELECT * FROM sessions");
    return result[0];
}

export async function getSessionCodeById(id){
    const result = await pool.query(`
    SELECT *
    FROM sessions
    WHERE sessionID=?`
    ,[id]);
    return result[0][0];
}

export async function setSessionCode(sessionID, newCode){
    const result = await pool.query(`
    UPDATE sessions
    SET code = ?
    WHERE sessionID = ?`
    ,[newCode, sessionID]);
    return {"Session-Id": sessionID, "New-Code": newCode};
}