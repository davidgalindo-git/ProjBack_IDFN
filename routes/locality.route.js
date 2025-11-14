import express from 'express';
import localityService from "../service/locality.service.js";

const router = express.Router();
router.use(express.json());

// router.get('/', (req, res) => {
//     res.send('Hello Locality!')
// })

router.get('/', async (req, res) => {
    if (req.query.locality) {
        try {
            let locality = await localityService.getLocality(req.query.locality);
            console.log(locality);
            let message = `La localité ${req.query.locality} a bien été récupérée !`;
            res.json({message: message, body: locality});
        } catch (error) {
            res.status(404).json({error: error.message});
        }
    }
});

export default router;