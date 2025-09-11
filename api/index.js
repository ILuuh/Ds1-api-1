const express = require("express");
const mysql = require("mysql2/promise");

const stringConnection = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'clinica_veterinaria',
    port: 3306
};

async function conectar() {
    const connection = await mysql.createConnection(
        stringConnection
    );
    return connection;
}

async function consultarDados() {
    const connection = await conectar();
    try {
        const [rows, fields] = await connection.execute('SELECT * FROM sua_tabela');
        console.log(rows);
    } catch (err) {
        console.error('Erro ao executar a consulta:', err);
    } finally {
        connection.end();
    }
}

const app = express();

app.use(express.json());

app.get("/", () => {
    console.log("rota raiz acessada ! ");
});

app.get("/users", (req, resp) => {
    resp.send({ data: [{ "username": "jose", "userpsw": "123" }, { "username": "carlos", "userpsw": "123" }] });
})

app.get("/roles", (req, resp) => {
    resp.send({ data: [{ "role": "CLIENT", "ativo": true }, { "role": "ADMIN", "ativo": true }] });
});

// criando uma rota
// CRUD == SQL  == API
// Create == Insert == POST
// Read == Select == GET
// Update == Update == PUT
// Delete == Delete  == DELETE

// 1. rota  = GET == select * from == Read
app.get("/api/racas", async (req, resp) => {
    const connection = await conectar();
    try {
        const [rows, fields] = await connection.execute('SELECT * FROM racas');
        console.log(rows);
        resp.send(rows);
    } catch (err) {
        console.error('Erro ao executar a consulta:', err);
    } finally {
        connection.end();
    }
});

// 3. rota  = GETbyid == select * from tabela where id = ?id == Read
app.get("/api/racas/:id", async (req, resp) => {
    const idValue = req.params.id;
    console.log(idValue);

    const connection = await conectar();
    try {
        const [rows, fields] = await connection.execute(`SELECT * FROM racas WHERE id = ${idValue}`);
        console.log(rows);
        resp.send(rows);
    } catch (err) {
        console.error('Erro ao executar a consulta:', err);
    } finally {
        connection.end();
    }
});

// 2.rota  = POST
app.post("/api/racas", async (req, res) => {

    const { raca } = req.body;
    try {
        const connection = await conectar();
        const result = await connection.execute(`INSERT INTO racas (raca) values ( "${raca}")`);
        res.send(result);
    } catch (error) {
        res.status(401).send({ 'message': error, 'sucess': 'error' })

    }
});

// 3.rota  = PUT
async function put_racas(req, res) {
    const { raca } = req.body;
    const id = req.params.id;

    const connection = await conectar();
    const result = await connection.execute(`UPDATE racas SET raca = "${raca}" WHERE id = ${id}`);
    res.send(result).status(202);

}
app.put("/api/racas/:id", (req, res) => put_racas(req, res));

// 4.rota  = DELETE
async function delete_racas(req, res) {
    const id = req.params.id;

    const connection = await conectar();
    const result = await connection.execute(`DELETE FROM racas WHERE id = ${id}`);
    res.send(result).status(202);
}
app.delete("/api/racas/:id", (req, res) => {
    delete_racas( req, res);
});

const Port = 3500;

const conn = conectar();

app.listen(Port, () => { console.log(`servidor rodando na porta: ${Port} !`) });