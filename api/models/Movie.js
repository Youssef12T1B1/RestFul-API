const  mongoose  = require("mongoose")


const movieSchema = new mongoose.Schema({
    title : String,
    storyline : String,
    RelaseDate : String,
    price: Number

},{ timestamps: true})

const Movie = mongoose.model('movie', movieSchema);

module.exports= Movie
