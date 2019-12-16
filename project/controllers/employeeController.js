const express = require('express');

var router = express.Router();
const mongoose = require('mongoose');
const Employee = mongoose.model('Employee');


router.get('/list', (req, res) => {
    Employee.find((err, docs) => {
        if(!err){
            res.render("employee/list", {
                list: docs
            });
        }
        else{
            console.log('Error en retornar la lista :' + err);
        }
    });
});



router.get('/', (req,res) => {
    res.render("employee/addOrEdit", {
        viewTitle : "Insertar Empleado"
    });
});

router.post('/', (req, res) => {
    if(req.body._id == '')
  insertRecord(req, res);
  else
  updateRecord(req, res);
});

function insertRecord(req, res) {
var employee = new Employee();
 employee.Nombre = req.body.Nombre;
 employee.APaterno = req.body.APaterno;
 employee.AMaterno = req.body.AMaterno;
 employee.FechaNacimiento = req.body.FechaNacimiento;
 employee.save((err, doc) =>{
     if(!err)
     res.redirect('employee/list');
     
     else {
         if(err.name == 'ValidationError'){
         handleValidationError(err, req.body);
         res.render("employee/addOrEdit", {
            viewTitle : "Insertar Empleado",
            employee: req.body
        });
        }
         else
         console.log('Error durante la insercción: ' + err);
     }
 });
}

function  updateRecord(req, res) {
    Employee.findOneAndUpdate ({_id: req.body._id}, req.body, { new: true }, (err, doc) => {
     if (!err) { res.redirect('employee/list'); }
     else {
         if (err.name == 'ValidationError') {
             handleValidationError(err,req.body);
             res.render("employee/addOrEdit", {
                 viewTitle: 'Actualizar Empleado',
                 employee: req.body
             });
         }
         else
         console.log('Error durante la actualización : ' + err);
     }  
    });
}



function handleValidationError(err, body){
    
        for(field in err.errors)
        {
            switch (err.errors[field].path) {
                 case 'Nombre':
                     body['NombreError'] = err.errors[field].message;
                     break;
                case 'APaterno':
                     body['APaternoError'] = err.errors[field].message;
                     break;
                case 'AMaterno':
                     body['AMaternoError'] = err.errors[field].message;
                     break;
                case 'FechaNacimiento':
                     body['FechaNacimientoError'] = err.errors[field].message;
                     break;
    }        
        }
    };

router.get('/:id', (req, res) => { 
    Employee.findById(req.params.id, (err, doc) => {
        if(!err){
            res.render("employee/addOrEdit",{
                viewTitle: "Actualizar Empleado",
                employee: doc
            });
        }
    });
});

router.get('/delete/:id', (req, res) => {
    Employee.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/employee/list');
        }
        else
        {
            console.log('Error al eliminar :' + error);
        }
    })
});
/*
Employee.reportePersonaPdf = async(req, res) => {
    try {
        const { id } = req.params;
        const empleadoPDF = await Employee.findById(id);
    }catch (error) {
        emailErr.correoError(error);
    }
};

var pdf = {
    content: [
        {
            layout: 'lightHorizontalLines',
            tables: {
                headerRows: 1,
                widths: [
                    [ 'Nombre', 'Apellido Paterno','Apellido Materno','Fecha Nacimiento' ],
                    [ empleadoPDF.Nombre,empleadoPDF.APaterno,empleadoPDF.AMaterno,empleadoPDF.FechaNacimiento]
                ]
            }
        }
    ]
};

const PDF = pdfMake.createPdf(pdf);
PDF.getBase64((data)=>{
    res.writeHead(200,
        {
            'Content-Type': 'application/pdf',
            'Content-Disposition':'attachment;filename="reporte"' + empleadoPDF
        });
        const dowload = Buffer.from(data.toString('utf-8'), 'base64');
        res.end(dowload);

        });

/*

steps: [
    { setFontSize: 40 },
    {text: [48,27, 'Reporte']},

    { setLineWidth: [0] },
    { line: [25, 35, 185, 35] }, 
],

pdf(_dato) {
    this.get(this, 'steps').pushObjects([
        { setFontSize: 14 },
        { text: [35, 65, `Nombre: ${_dato.Nombre}`] },
        { setFontSize: 14 },
        { text: [35, 80, `Apellido Paterno:  ${_dato.APaterno}`] },
        { setFontSize: 14 },
        { text: [35, 96, `Apellido Materno:  ${_dato.AMaterno}`] },
        { setFontSize: 14 },
        { text: [35, 110, `Fecha Nacimiento:  ${_dato.FechaNacimiento}`] },
   
    ]);
    $("#btnDescargarPDF).click();*/


module.exports = router;
