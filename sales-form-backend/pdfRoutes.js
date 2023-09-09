const express = require('express');
const path = require('path');
const multer = require('multer');

const { createPdf, fetchPdf, sendPdf } = require('./pdfController');
const { geraStringAleatoria } = require('./modules/random');

const pdfRoute = express.Router();

const securityCodes = [
  'JFVWLY',
  'MKBRFD',
  'TAYB2X',
  'YUTWWU',
  '5X9TV7'
]

const storage = multer.diskStorage({
  destination: function (req, file, cb) {

    if(file.originalname == 'cpf') {

      cb(null, 'uploads/cpfs');

    } else if( file.originalname == 'compEndereco' ) {

      cb(null, 'uploads/compEnderecos');

    } else if( file.originalname == 'rgFrente' ) {

      cb(null, 'uploads/rgFrentes');

    }else if( file.originalname == 'rgVerso' ) {

      cb(null, 'uploads/rgVersos');

    } else {

      cb(null, 'uploads/');

    }
  },

  filename: function (req, file, cb) {
    
    cb(null, geraStringAleatoria() + path.extname(file.originalname + '.' + file.mimetype.split('/').slice(-1)[0]));

  }
})

var upload = multer({ storage: storage });

pdfRoute.post('/createPdf', upload.array("file", 10), createPdf)

pdfRoute.post('/validateCode', (req, res) => {

  const isSecurityCodeValid = securityCodes.includes(req.body.securityCode);

  if( isSecurityCodeValid ) {
    return res.json( {valid: true} );
  };

  return res.sendStatus(401);

})

module.exports = pdfRoute