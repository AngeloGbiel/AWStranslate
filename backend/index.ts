import express from 'express'
import cors from 'cors'
import router from './Translate'
import serverless from 'serverless-http'

const app = express()

app.use(express.json())
app.use(cors({
    credentials: true,
    origin: '*'
}))


app.use(router)

export const handler = serverless(app)