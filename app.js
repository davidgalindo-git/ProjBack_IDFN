import express from 'express'
const app = express()
const port = process.env.PORT
import localityRouter from './routes/locality.route.js';
import dogsRouter from "./routes/dogs.route.js";

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!')
})

// Locality route
app.use('/locality', localityRouter);

// Dogs route
app.use('/dogs', dogsRouter);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})