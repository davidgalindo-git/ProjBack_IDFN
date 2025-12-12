import express from 'express'
const app = express()
const port = process.env.PORT
import localityRouter from './routes/locality.route.js';
import clientRouter from './routes/client.route.js';
import dogsRouter from "./routes/dogs.route.js";
import serviceRouter from './routes/service.route.js';

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!!!!')
})

// Service route
app.use('/service', serviceRouter);

// Locality route
app.use('/locality', localityRouter);

// Client route
app.use('/client', clientRouter);

// Dogs route
app.use('/dogs', dogsRouter);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})