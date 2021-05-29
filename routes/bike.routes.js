const express = require('express');
const router = express.Router();
const Bike = require("../models/bike")
const checkToken = require("../middleware")

router.get('/', async (req, res) => {
    await Bike.find({})
        .populate("vendor")
        .exec((err, bikes) => {
            if (err) {
                return res.status(400).send(err);
            }
            return res.json(bikes);
        })
});

router.get('/:id', async (req, res) => {
    await Bike.findById(req.params.id)
        .populate("vendor")
        .exec((err, bike) => {
            if (err) {
                return res.status(400).send(err);
            }
            return res.json(bike);
        })
});

router.post('/', checkToken, async (req, res) => {
    var userId = req.user.id
    const { title, description, price, postalCode, city, country, vendorID, bikeInfo, bikeBrand, bikeModel, year, color, bikeType, size, frame, wheels, suspension, suspension_front, suspension_rear, gearBox, gb_brand, gb_model, gb_type, chainRings, cogset, brakes, brakes_front, bf_type, bf_brand, brakes_rear, br_type, br_brand, extras, lights, lightFront, lightRear, bell, smartphoneHolder, speedometer, basket, rearRack, trainingWheels, babySeat, locker, kickstand } = req.body;
    const newBike = new Bike({ title, description, price, postalCode, city, country, vendor: userId, bikeInfo, bikeBrand, bikeModel, year, color, bikeType, size, frame, wheels, suspension, suspension_front, suspension_rear, gearBox, gb_brand, gb_model, gb_type, chainRings, cogset, brakes, brakes_front, bf_type, bf_brand, brakes_rear, br_type, br_brand, extras, lights, lightFront, lightRear, bell, smartphoneHolder, speedometer, basket, rearRack, trainingWheels, babySeat, locker, kickstand });
    await newBike.save().then(res.json({ status: 'Anuncio guardado' }))
})

router.put('/:id', checkToken, async (req, res) => {
    const { title, description, price, postalCode, city, country, vendorID, bikeInfo, bikeBrand, bikeModel, year, color, bikeType, size, frame, wheels, suspension, suspension_front, suspension_rear, gearBox, gb_brand, gb_model, gb_type, chainRings, cogset, brakes, brakes_front, bf_type, bf_brand, brakes_rear, br_type, br_brand, extras, lights, lightFront, lightRear, bell, smartphoneHolder, speedometer, basket, rearRack, trainingWheels, babySeat, locker, kickstand } = req.body;
    const newBike = { title, description, price, postalCode, city, country, vendor: vendorID, bikeInfo, bikeBrand, bikeModel, year, color, bikeType, size, frame, wheels, suspension, suspension_front, suspension_rear, gearBox, gb_brand, gb_model, gb_type, chainRings, cogset, brakes, brakes_front, bf_type, bf_brand, brakes_rear, br_type, br_brand, extras, lights, lightFront, lightRear, bell, smartphoneHolder, speedometer, basket, rearRack, trainingWheels, babySeat, locker, kickstand };
    await Bike.findByIdAndUpdate(req.params.id, newBike);
    res.json({ status: 'Anuncio actualizado' })
});

router.delete('/:id', async (req, res) => {
    await Bike.findByIdAndRemove(req.params.id);
    res.json({ status: 'Anuncio eliminado' })
})

module.exports = router;