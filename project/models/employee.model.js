const mongoose = require('mongoose');

var employeeShema = new mongoose.Schema({
    Nombre: {
        type: String,
        required: 'Campo requerido.'
    },
    APaterno: {
        type: String,
        required: 'Campo requerido.'
    },
    AMaterno: {
        type: String,
        required: 'Campo requerido.'
    },
    FechaNacimiento: {
        type: String,
        required: 'Campo requerido.'
    }

    
});
mongoose.model('Employee', employeeShema);