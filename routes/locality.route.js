import express from 'express';
import localityService from "../service/locality.service.js";

const router = express.Router();
router.use(express.json());

router.get('/', async (req, res) => {
    try {
        let message = "";
        const {name, postal_code, postal_code_complement, toponym, canton_code, language_code} = req.body || {};

        let locality = await localityService.getLocality({
            name,
            postal_code,
            postal_code_complement,
            toponym,
            canton_code,
            language_code
        });

        if (locality === null || locality === undefined) {
            message = `Aucune localité n'a été trouvé`;
            res.status(404).json({error: message});
        } else {
            if (name === undefined){
                message = `Les localités ont bien été trouvés`;
            } else {
                message = `La localité ${locality[0]["toponym"]} à bien été trouvée`;
            }
        }
        res.status(200).json({message: message, body: locality})
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});

router.post('/', async (req, res) => {
    try {
        let message = "";
        let locality = await localityService.setLocality({
            name: req.body.name === undefined ? null : req.body.name,
            postal_code: req.body.postal_code === undefined ? null : req.body.postal_code,
            postal_code_complement: req.body.postal_code_complement === undefined ? null : req.body.postal_code_complement,
            toponym: req.body.toponym === undefined ? null : req.body.toponym,
            canton_code: req.body.canton_code === undefined ? null : req.body.canton_code,
            language_code: req.body.language_code === undefined ? null : req.body.language_code
        });

        if (locality === null || locality === undefined) {
            message = `Aucune localité n'a été ajoutée`;
            res.status(500).json({error: message})
        } else {
            message = `La localité ${req.body.name} à bien été ajoutée`;
            res.status(200).json({message: message})
        }
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});

router.patch('/:id/update', async (req, res) => {
    try {
        const id = parseInt(req.params.id)

        if (await localityService.isIdValid(id)) {
            let message = "";
            let locality = await localityService.updateLocality({
                id: id,
                name: req.body.name === undefined ? null : req.body.name,
                postal_code: req.body.postal_code === undefined ? null : req.body.postal_code,
                postal_code_complement: req.body.postal_code_complement === undefined ? null : req.body.postal_code_complement,
                toponym: req.body.toponym === undefined ? null : req.body.toponym,
                canton_code: req.body.canton_code === undefined ? null : req.body.canton_code,
                language_code: req.body.language_code === undefined ? null : req.body.language_code
            });

            if (locality < 1) {
                message = `Erreur dans la mise à jour de la localité avec l'ID ${id}`;
                res.status(500).json({message: message})
            } else {
                message = `La localité ${req.body.name} à bien été modifiée`;
                res.status(200).json({message: message})
            }
        } else {
            const message = `La localité avec l'ID ${id} n'existe pas...`;
            res.status(404).json({error: message})
        }
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id)

        if (await localityService.isIdValid(id)) {
            let message = "";
            let locality = await localityService.deleteLocality(id);

            if (locality < 1) {
                message = `Erreur dans la suppression de la localité avec l'ID ${id}`;
            } else {
                message = `La localité avec l'ID ${id} à bien été supprimée`;
            }
            res.status(200).json({message: message})
        } else {
            const message = `La localité avec l'ID ${id} n'existe pas...`;
            res.status(404).json({error: message})
        }
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});

export default router;