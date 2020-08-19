const mongoose = require('mongoose');
const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI,{
    useUnifiedTopology: true,
     useNewUrlParser: true 
     
})

    .then(db=>console.log('Database is connected'))
    .catch(err=>console.log(err));

    const CitasSchema=mongoose.Schema({
        salon: {
            type: String, 
            required: true
        },
        hour: {
            type: String, 
            required: true
        },
        date: {
            type: Date,
            default: Date.now,
            required: true
        },
        description: {
            type: String, 
            required: true
        }
    });

    module.exports = mongoose.model('Citas', CitasSchema);
