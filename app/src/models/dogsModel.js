//src\models\dogsModel.js
const mysql = require('mysql2/promise');

const connection = mysql.createPool({
    host: 'dbdogs',
    user: 'root',
    password: '123',
    database: 'dogs',
    port: 3306
});

async function testConnection() {
    let attemps = 5;
    while (attemps > 0) {
        try {
            const connectionConfirmed = await connection.getConnection();
            console.log('La conexión se establecio de manera correcta.')
            connectionConfirmed.release();
            return;

        } catch (error) { 
            attemps-- 
            console.log(`Error al establecer la conexión ${error.message}`);
            if (attemps === 0) {
                throw new Error('No se pudo establecer la conexión.')
            }
            console.log(`Se volvera a intentar la conexion en 5 segundo :). Cuenta con ${attemps} intentos mas.`)
            await new Promise(resolve => setTimeout(resolve, 5000))
        }
    }
}

testConnection();

async function getDogs() {
    try {
        const [row] = await connection.query('SELECT * FROM dogs');
        return row

    } catch (error) {
        console.error('Error al realizar la consulta:', error);
        throw error
    }
};

async function getDogsByBreed(breed) {
    try {
        const [row] = await connection.query('SELECT * FROM dogs WHERE breed = ?', [breed])
        return row
    }
    catch (error) {
        console.error('Error en la consulta:', error)
    }
}

module.exports = {
    getDogs,
    getDogsByBreed
}