import express from 'express'
const app = express()
const port = process.env.PORT
import localityRouter from './routes/locality.route.js';
import clientRouter from './routes/client.route.js';
import dogsRouter from "./routes/dogs.route.js";
import swaggerUi from 'swagger-ui-express';
import {openApiSpecification} from './swagger.js'

app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(openApiSpecification, {explorer :true}));

app.get('/', (req, res) => {
    res.send('Hello World!!!!')
})

// Locality route
app.use('/locality', localityRouter);

// Client route
app.use('/client', clientRouter);

// Dogs route
app.use('/dogs', dogsRouter);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})