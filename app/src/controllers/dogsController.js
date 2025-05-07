//src\controllers\dogsController.js
const {Router} = require('express');
const router = Router();
const dogsModels = require('../models/dogsModel')

router.get('/dogs', async(req, res) => {
    try {
        const result = await dogsModels.getDogs();
        res.json(result);
    } catch (error) {
        console.error('Error en la consulta: ', error);
        res.status(500).json({ error: 'Error al obtener los perros' });
    }
});

router.get('/dogs/:breed', async (req, res) => {
    try {
        const raza = req.params.breed;
        const result = await dogsModels.getDogsByBreed(raza);
        if (result.length === 0) {
            return res.status(404).json({
                error: `No se pudo consultar la raza de perros ${breed}`
            })
        }
        res.json(result);
    } catch (error) {
        res.status(500).json({
            error: `Error al consultar perro por: ${raza}`
        })
    }
})

module.exports = router;