import express from 'express';
import localityService from "../service/locality.service.js";

const router = express.Router();
router.use(express.json());

router.get('/', async (req, res) => {
    try {
        let message = "";
        let locality = await localityService.getLocality({
            name: req.query.name,
            postal_code: req.query.postal_code,
            postal_code_complement: req.query.postal_code_complement,
            toponym: req.query.toponym,
            canton_code: req.query.canton_code,
            lang_code: req.query.lang_code
        });

        if (locality.length !== 0) {
            message = `La localité ${locality["name"]} à bien été trouvée`;
        } else {
            message = `Aucune localité n'a été trouvé`;
        }
        res.json({message: message, body: locality})

    } catch (error) {
        res.status(404).json({error: error.message});
    }
});

export default router;