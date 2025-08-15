const express = require("express");

const mysql = require("mysql2/promise");

const stringConnection = {
    host: 'localhost',
    user: "root",
    database: 'teste2s2025',
    port: 3306
};

async function conectar() {
    const connection = await mysql.createConnection({
        stringConnection
    });
    return connection;
}

const app = express();

app.use(express.json());

// rota teste
app.get("/", () => {
    console.log("Rota raiz acessada !")
});

app.get("/users", ( req, resp) => {
    resp.send({data: [{"username": "jose", "userpsw": "1223"}, {"username": "carlos", "userpsw": "123"}]})
});

app.get("/roles", ( req, resp) => {
    resp.send({data: [{"role": "CLIENT", "ativo": true}, {"role": "ADMIN", "ativo": true}]})
});

const port = 3500;

const conn = conectar();

app.listen(port, () => {
    console.log(`servidor rodando na porta: ${port} !`)
});
