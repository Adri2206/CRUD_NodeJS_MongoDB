 //Enviar Correo
 //Requerimos el paquete
var nodemailer = require('nodemailer');
const controller = {};

controller.correo = (err, req, res) => {
const mens = err;
const output = `
<h3>Error encontrado..</h3>
<ul>
    <li>Error:${mens}</li>

</ul>
`;
//Creamos el objeto de transporte
let transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: false,
    service: 'gmail',
  auth: {
    user: 'adidonis09@gmail.com',
    pass: 'DIOSestaaqui2206'
  }
});

let mailOptions = {
  from: 'adidonis09@gmail.com',
  to: 'eduardo.arreola1901@gmail.com',
  subject: 'Excepciones',
  html: output
};

transporter.sendMail(mailOptions, function(error, info)
{
  if (error) {
    return console.log("0 -" + error);
  } else {
    console.log('Email enviado: %s ', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  }
  });

};

module.exports = nodemailer;