import express from 'express'
import cors from 'cors'
import router from './Translate'

const app = express()
const port = 3000

app.use(express.json())
app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173'
}))
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:5173'); // Permitir solicitações do domínio http://localhost
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use(router)

app.listen(port,()=>{
    console.log(`App rodando na porta ${port}`)
})