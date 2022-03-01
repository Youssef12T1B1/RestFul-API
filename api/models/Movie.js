const  mongoose  = require("mongoose")


const movieSchema =  mongoose.Schema({
    title : {
        type: String,
        required : true
    },
    storyline : {
        type: String,
        required : true
    },
    relaseDate :{
        type: String,
       
    },
    price: {
        type: Number,
        required : true
    },
    poster : {
        type: String,
        required : true

    }

},{ timestamps: true})

const Movie = mongoose.model('movie', movieSchema);

module.exports= Movie
