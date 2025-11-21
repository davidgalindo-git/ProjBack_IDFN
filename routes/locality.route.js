import express from 'express';
import localityService from "../service/locality.service.js";

const router = express.Router();
router.use(express.json());

router.get('/', async (req, res) => {
    try {
        let message = "";
        let locality = await localityService.getLocality({
            name: req.query.name,
            postalCode: req.query.postalCode,
            postalCodeComplement: req.query.postalCodeComplement,
            toponyme: req.query.toponyme,
            canton: req.query.canton,
            langCode: req.query.langCode
        });

        if (locality.length !== 0) {
            message = `La localité ${req.query.name} à bien été trouvée`;
        } else {
            message = `Aucune localité n'a été trouvé`;
        }
        res.json({message: message, body: locality})

    } catch (error) {
        res.status(404).json({error: error.message});
    }
});

export default router;