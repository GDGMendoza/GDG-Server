
var mongoose = require('mongoose');

var eventSchema = new mongoose.Schema({
    cover: { type: String }, //Buffer
    title: { type: String, required: true, index: true },
    description: { type: String },
    date: { type: String, required: true }, //posibilidad de cambiar por Date!!
    difficulty: { type: String },
    //agenda: { }, //probablemente sea un atributo virtual
    //tags: [ String ], //seteado automaticamente segun sesiones
    location: {
        googleMapImage: { type: String },
        googleMapLink: { type: String },
        address: { type: String }
    },
    active: {}, //WILDCARD!! notificar OBLIGATORIAMENTE al guardar //Date|true segun releaseDate
    googlePlusEvent: { type: String },
    facebookEvent: { type: String },
    googlePlusAlbum: { type: String },
    sessions: [
        {
            title: { type: String, required: true },
            description: { type: String, required: true },
            tags: [ String ],
            authors: [
                { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
            ],//, required: true, index: true //probar agregar índice
            startTime: { type: String },
            endTime: { type: String },
            githubLinks: [ String ],
            videoLinks: [ String ],
            demoLink: { type: String },
            createdAt: { type: Date, default: Date.now },
            modifiedAt: { type: Date, default: Date.now }
        }
    ],
    liveStream: { type: String },
    //gdg: { type: String, default: "GDGMendoza" },
    createdAt: { type: Date, default: Date.now },
    modifiedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Event', eventSchema, 'events');