const  mongoose  = require("mongoose")


const rentalSchema =  mongoose.Schema({
   movie : {
       type : mongoose.Schema.Types.ObjectId,
        ref: 'movie',
        required: true
    },
   qty : {
       type: Number , default:1
   }


},{ timestamps: true})

const Rental = mongoose.model('rental', rentalSchema);

module.exports= Rental
