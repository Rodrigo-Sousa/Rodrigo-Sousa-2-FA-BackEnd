// Utilizando o framework Express
import express from "express";
// Pacote que utilizamos como middleware, para analisar os dados codificados via JSON.
import bodyParser from "body-parser";
// Utilizando para armazenar alguns dados e criar o arquivo .json
import { JsonDB, Config } from "node-json-db";
// Utilizado para criar um id único e não sequencial.
import { v4 as uuidv4 } from 'uuid'
// Biblioteca responsável por fazer a validação do 2FA.
import speakeasy from "speakeasy";
// Importando o arquivo swaggerDocument
import {swaggerDocument} from "./docs/docs.js";
import swaggerUi from 'swagger-ui-express';

const app = express();

const dbConfig = new Config("meuBancoDados", true, false, '/');

const db = new JsonDB(dbConfig);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/api", (req, res) => {
    res.json({ message: "Bem vindo a aplicação em duplo fator. Exemplo" });
});

// Informando a rota que iremos utilizar para exibir a documentação
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Ropara para registrar um usuário

app.post("/api/registro", (req, res) => {
    const id = uuidv4();
    try {
        const path = `/user/${id}`;
        // Criando uma chave secreta temporária
        const temp_secret = speakeasy.generateSecret();
        // Criando um usuário no banco de dados
        db.push(path, { id, temp_secret });
        // Respondendo o ID do usuário e a chave gerado de forma temporária, para o navegador
        res.json({ id, secret: temp_secret.ascii });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error ao gerar chave secreta' });
    }
});

app.post("/api/verificar", (req, res) => {
    const { userId, token } = req.body;
    try {
        // Recuperando os dados do usuário vindo do arquivo JSON.
        const path = `/user/${userId}`;
        async function usuario(path) {
            const user = await db.getData(path);
            console.log({ user });
            const { ascii: secret } = user.temp_secret;
            const verificarToken = speakeasy.totp.verify({
                secret,
                encoding: 'ascii',
                token
            });
            if (verificarToken) {
                // Atualizando a chave do usuário, de temp_secret, para secret, de forma definitiva
                db.push(path, { id: userId, secret: user.temp_secret });
                res.json({ verificar: true })
            } else {
                res.json({ verificar: false })
            }

        }
        console.log(usuario(path));
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao recuperar o usuário' })
    };
});

// Validando o token, inserido
app.post("/api/validar", (req, res) => {
    const { userId, token } = req.body;
    try {
        // Recuperando os dados do usuário vindo do arquivo JSON.
        const path = `/user/${userId}`;

        async function validarToken(path){

            const user = await db.getData(path);

            console.log({user});

            const { ascii: secret } = user.secret;

            // Retornando se o token fornecido for verdadeiro, combinar com o que foi encaminhado.
            const tokenValidado = speakeasy.totp.verify({
                secret,
                encoding: 'ascii',
                token,
                window: 1
            });
            if(tokenValidado){
                res.json({validado: true});
            }else{
                res.json({validado: false});
            }

        }

        console.log(validarToken(path));
    } catch (error) {
        res.status(500).json({ message: 'Erro ao validar token do usuário!' });
    }
});

app.listen(3002, () => {
    console.log("API inicializada!");
});