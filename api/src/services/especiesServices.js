const { conectar, desconectar } = require('../database/config');

const get = async (req, resp) => {
    const connection = await conectar();
    try {
        const [rows, fields] = await connection.execute('SELECT * FROM especies order by id desc');
        resp.status(201).send(rows);
    } catch (err) {
        console.error('Erro ao executar a consulta:', err);
    } finally {
        desconectar(connection);
    }
}

// 2. rota  = GETbyid == select * from tabela where id = ?id == Read
const getByid = async (req, resp) => {
    const idValue = req.params.id;
    const connection = await conectar();
    try {
        const [rows, fields] = await connection.execute(`SELECT * FROM especies WHERE id = ${idValue}`);
        resp.send(rows);
    } catch (err) {
        console.error('Erro ao executar a consulta:', err);
    } finally {
        desconectar(connection);
    }
}

// 3.rota  = POST
const post = async (req, res) => {
    const { especie } = req.body;
    const connection = await conectar();
    try {
        const result = await connection.execute(`INSERT INTO especies (especie) values ( "${especie}")`);
        res.status(201).send(result);
    } catch (error) {
        res.status(401).send({ 'message': error, 'sucess': 'error' });
    } finally {
        desconectar(connection);
    }
}

// 4.rota  = PUT = UPDATE
async function put(req, res) {
    const { especie } = req.body;
    const id = req.params.id;
    const connection = await conectar();
    try {
        const result = await connection.execute(`UPDATE especies SET especie = "${especie}" WHERE id = ${id}`);
        res.status(202).send(result);
    } catch (error) {
        res.status(401).send({ 'message': error, 'sucess': 'error' });
    } finally {
        desconectar(connection);

    }
}

// 4.rota  = DELETE
const erase = async (req, res) => {
    const id = req.params.id;
    const connection = await conectar();
    try {
        const result = await connection.execute(`DELETE FROM especies WHERE id = ${id}`);
        res.status(204).send(result);
    } catch (error) {
        res.status(508).send({ "message": "Erro executar a solicitação!", sucess: false })
    } finally {
        desconectar(connection);
    }
}


module.exports = { get, getByid, erase, post, put }