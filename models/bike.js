const mongoose = require('mongoose');
const { Schema } = mongoose;

const Bike = new Schema({
    title: { type: String },
    description: { type: String },
    price: { type: Number },
    postalCode: { type: Number },
    city: { type: String },
    country: { type: String },
    vendor: { type: mongoose.Schema.Types.ObjectId, 
        ref: "Usuario" },
    lastModification: {type: Date, default: Date.now},
    bikeInfo: {
        bikeBrand: { type: String },
        bikeModel: { type: String },
        year: { type: String },
        color: {type: String },
        bikeType: { type: String },
        size: {
            frame: { type: Number },
            wheels: { type: Number }
        },
        suspension: {
            suspension_front: { type: Boolean},
            suspension_rear: { type: Boolean}
        },
        gearBox: {
            gb_brand: { type: String },
            gb_model: { type: String },
            gb_type: { type: String },
            chainRings: { type: Number },
            cogset: { type: Number }
        },
        brakes: {
            brakes_front: {
                bf_type: { type: String },
                bf_brand: { type: String }
            },
            brakes_rear: {
                br_type: { type: String },
                br_brand: { type: String }
            }
        },
        extras: {
            lights: {
                lightFront: { type: Boolean},
                lightRear: { type: Boolean}
            },
            bell: { type: Boolean},
            smartphoneHolder: { type: Boolean},
            speedometer: { type: Boolean},
            basket: { type: Boolean},
            rearRack: { type: Boolean},
            trainingWheels: { type: Boolean},
            babySeat: { type: Boolean},
            locker: { type: Boolean},
            kickstand: { type: Boolean}
        }
    }
});

module.exports = mongoose.model('AnuncioBici', Bike);