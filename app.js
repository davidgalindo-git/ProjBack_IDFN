import express from 'express'
const app = express()
const port = process.env.PORT
import localityRouter from './routes/locality.route.js';
import clientRouter from './routes/client.route.js';
import dogsRouter from "./routes/dogs.route.js";
import serviceRouter from './routes/service.route.js';
import swaggerUi from 'swagger-ui-express';
import {openApiSpecification} from './swagger.js'

app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(openApiSpecification, {explorer :true}));

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

// If none of the routes above are matched, raise status 404
app.use((req, res, next) => {
    // Set the HTTP status code to 404 (Not Found)
    res.status(404).json({
        success: false,
        message: 'Route not found',
        requestedUrl: req.originalUrl
    });
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})