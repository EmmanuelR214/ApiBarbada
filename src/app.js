import express from 'express'
import cors from 'cors';
import cookieParser from 'cookie-parser';
import indexRoutes from './routes/users.routes.js'
import indexRoutesStore from './routes/saucers.routes.js'
import indexRoutesAdmin from './routes/admin.routes.js'

const app = express()

const allowedOrigins = ['http://localhost:5173', 'http://localhost:5174']

app.use(cors({
    //origin: 'http://localhost:5173',
    origin: allowedOrigins,
    credentials: true
}));
app.use(express.json())
app.use(cookieParser())

app.use("/api",indexRoutes)
app.use('/api',indexRoutesStore)
app.use('/api', indexRoutesAdmin)

app.get("/api", (req, res) => {
    res.send('Bienvenido a la Api')
})

app.use((req,res, next)=>{
    res.status(404).json({
        message:"ruta no encontrada"
    })
})

export default app

/*
    origin: 'http://localhost:5173',
    // origin: 'http://localhost:5174',
    //origin: 'https://la-barbada2.vercel.app',
*/