const mongoose = require("mongoose")

//Schema design
const packageSchema = mongoose.Schema({
    destinationName : {
      type: String,
      required: [true, "Please provide a destination name for this package!"],
      trim: true, //Remove unused spaces
      unique: [true, "This name is already taken, please choose a different name"],
      minLength: [3, 'Name must be at least 3 characters.'],
      maxLength: [100, "Name is too large"],
    },
    description: {
        type: String,
        required: true
    },
    cost:{
        type: Number,
        required: true,
        min: [0, "Price can't be negative"],
    },
    img:{
        type: String,
        required: true
    },
    viewCount:{
      type: Number,
      requires:false
    }
    },{
    timestamps : true
  })
   /*  productSchema.post('save', function(doc, next){
    console.log('After saving data');
    next() */
  packageSchema.methods.logger = function(){
    console.log(`Data saved for ${this.name}`)
  }
  const Package = mongoose.model('package', packageSchema)
  module.exports = Package
