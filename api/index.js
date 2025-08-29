const express = require("express");

const mysql = require("mysql2/promise");

// const stringConnection = {
//     host: '127.0.0.1',
//     user: "root",
//     password: '',
//     database: 'teste2s2025',
//     port: 3306
// };

async function conectar() {
    const connection = await mysql.createConnection({
        host: 'localhost', //Servidor
        user: 'root', //Usuário
        password: '', //Senha
        database: 'clinica_veterinaria', //Banco de Dados
        port: 3306 //Porta
    });
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

// rota teste
app.get("/", () => {
    console.log("Rota raiz acessada !")
});

app.get("/users", (req, resp) => {
    resp.send({ data: [{ "username": "jose", "userpsw": "1223" }, { "username": "carlos", "userpsw": "123" }, { "username": "Bianca", "userpsw": "12345" }] })
});

app.get("/roles", (req, resp) => {
    resp.send({ data: [{ "role": "CLIENT", "ativo": true }, { "role": "ADMIN", "ativo": true }] })
});

//Criando uma rota
//C- CREATE=Insert-POST
//R- READ=Select-GET
//U-UPDATE=Update-PUT 
//D-DELETE=Delete-DELETE

// 1. rota = GET select * from == read
app.get("/api/racas", async (req, resp ) => {
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

//2.rota = POST
app.post("/api/racas", async (req, resp) => {
    console.log(req.body);
    //const { raca } = req.body ;
    const raca = "gato";
    try {
        const connection = await conectar();
        const result = await connection.execute( `INSERT INTO racas (raca) values ("${raca}")`);
        resp.send( result );
    
    } catch (error) {
        resp.status(401).send({'message': error, 'sucess':'error'});
    }
});

//3.rota = PUT
async function put_racas(req, resp) {
    return
}

app.put("", () => {});

//4.rota = DELETE
const delete_racas = (req, resp)=>{

}
app.delete("", () => {});

const port = 3500;

const conn = conectar();

app.listen(port, () => {
    console.log(`servidor rodando na porta: ${port} !`)
});
