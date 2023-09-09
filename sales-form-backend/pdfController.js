//we use html-pdf for pdf
const pdf = require('html-pdf');
const fs = require('fs');
const PDFMerger = require('pdf-merger-js');
const path = require('path');
const env = require('dotenv');
const nodemailer = require('nodemailer');

const pdfTemplate = require("./documents/titular.js");
const pdfTemplateA = require("./documents/dependentesPDF.js");
const {getEmailBySecurityCode} = require('./modules/getEmailBySecurityCode.js');
const { geraStringAleatoria, clearStrings } = require('./modules/random');

env.config();

function clearStorage({ nameContrato, nameDependentes, nameMerge, nameCpf, nameCompEndereco, nameRgFrente, nameRgVerso }) {

    console.log('callClear');

    if(nameContrato) {
        fs.existsSync( path.join(__dirname, 'pdfs', 'pdfTitular',nameContrato + '.pdf') ) ? fs.unlinkSync( path.join(__dirname, 'pdfs', 'pdfTitular',nameContrato + '.pdf') ) : ''
        console.log('clear PDF Titular');
    }
    
    if(nameDependentes) {
        fs.existsSync( path.join(__dirname, 'pdfs', 'pdfDependente', nameDependentes+ '.pdf') ) ? fs.unlinkSync( path.join(__dirname, 'pdfs', 'pdfDependente',nameDependentes+ '.pdf') ) : ''
        console.log('clear PDF Dependentes');
    }
    
    if(nameMerge) {
        fs.existsSync( path.join(__dirname, 'pdfs', 'pdfMerged',nameMerge+ '.pdf') ) ? fs.unlinkSync( path.join(__dirname, 'pdfs', 'pdfMerged',nameMerge+ '.pdf') ) : ''
        console.log('clear PDF Merged');
    }
    
    if(nameCpf) {
        fs.existsSync( path.join(__dirname, 'uploads', 'cpfs' ,nameCpf) ) ? fs.unlinkSync( path.join(__dirname, 'uploads', 'cpfs',nameCpf) ) : ''
        console.log('clear CPF');
    }
    
    if(nameCompEndereco) {
        fs.existsSync( path.join(__dirname, 'uploads', 'compEnderecos' ,nameCompEndereco) ) ? fs.unlinkSync( path.join(__dirname, 'uploads', 'compEnderecos', nameCompEndereco) ) : ''
        console.log('clear Comp Endereco');
    }
    
    if(nameRgFrente) {
        fs.existsSync( path.join(__dirname, 'uploads', 'rgFrentes' ,nameRgFrente) ) ? fs.unlinkSync( path.join(__dirname, 'uploads', 'rgFrentes',nameRgFrente) ) : ''
        console.log('clear RG Frente');
    }
    
    if(nameRgVerso) {
        fs.existsSync( path.join(__dirname, 'uploads', 'rgVersos' ,nameRgVerso) ) ? fs.unlinkSync( path.join(__dirname, 'uploads', 'rgVersos',nameRgVerso) ) : ''
        console.log('clear RG Verso');
    }

}

exports.createPdf = (req,res)=>{

    const parsedBody = JSON.parse(req.body.document);

    nameContrato = geraStringAleatoria();

    let nameContrato;
    let nameDependentes;
    let nameMerge;
    let nameCpf,nameCompEndereco,nameRgFrente,nameRgVerso;

    req.files.map( (file) => {

        if(file.originalname == 'cpf') {

            nameCpf = file.filename;

        } else if( file.originalname == 'compEndereco' ) {

            nameCompEndereco = file.filename;

        } else if( file.originalname == 'rgFrente' ) {

            nameRgFrente = file.filename;

        } else if( file.originalname == 'rgVerso' ) {

            nameRgVerso = file.filename;

        } else {

            console.log('nome invalido');

        }
    } )

    pdf.create(pdfTemplate(parsedBody), options).toFile(path.join(__dirname, 'pdfs', 'pdfTitular', nameContrato+'.pdf'), (err)=>{
        if(err){
            console.log(err);
        };

        nameDependentes = geraStringAleatoria(1);

        pdf.create(pdfTemplateA(parsedBody), options).toFile(path.join(__dirname,'pdfs', 'pdfDependente',nameDependentes+'.pdf'),(err)=>{

            if(err){

                console.log(err);

            };

            nameMerge = geraStringAleatoria(1);

            var merger = new PDFMerger();

            (async () => {

                await merger.add(path.join(__dirname, 'pdfs', 'pdfTitular',nameContrato+'.pdf'));

                parsedBody.temDependentes?
                    await merger.add(path.join(__dirname, 'pdfs', 'pdfDependente',nameDependentes+'.pdf'))
                : '';

                await merger.save(path.join(__dirname, 'pdfs', 'pdfMerged',nameMerge+'.pdf'));

                (async () => {

                    if (fs.existsSync( path.join(__dirname, 'pdfs', 'pdfMerged',nameMerge+'.pdf') )) {

                        const emailRegiao = getEmailBySecurityCode(parsedBody.codigoSeguranca);

                        const ourEmailAttachments = [
                            {
                                filename:'Contrato de Venda.pdf',

                                content:fs.readFileSync(path.join(__dirname, 'pdfs', 'pdfMerged',nameMerge+'.pdf')).toString("base64"),

                                contentType: 'application/pdf',

                                path:path.join(__dirname, 'pdfs' , 'pdfMerged',nameMerge+'.pdf')

                           }
                        ];

                        if(nameCpf) ourEmailAttachments.push(
                            {
                                filename: `CPF.${ nameCpf.split('.').slice(-1)[0] }`,

                                content:fs.readFileSync(path.join(__dirname, 'uploads', 'cpfs',nameCpf)).toString("base64"),

                                contentType: `image/${nameCpf}`,

                                path:path.join(__dirname, 'uploads', 'cpfs' ,nameCpf)

                           }
                        );

                        if(nameCompEndereco) {

                            ourEmailAttachments.push(
                                {
                                    filename: `Comprovante de Residência.${ nameCompEndereco.split('.').slice(-1)[0]  }`,

                                    content:fs.readFileSync(path.join(__dirname, 'uploads', 'compEnderecos',nameCompEndereco)).toString("base64"),

                                    contentType: `image/${nameCompEndereco}`,

                                    path:path.join(__dirname, 'uploads', 'compEnderecos' ,nameCompEndereco)

                                 }
                            )
                        }

                        if(nameRgFrente) {

                            ourEmailAttachments.push(
                                {
                                    filename: `RG Frente.${ nameRgFrente.split('.').slice(-1)[0] }`,

                                    content:fs.readFileSync(path.join(__dirname, 'uploads', 'rgFrentes', nameRgFrente)).toString("base64"),

                                    contentType: `image/${nameRgFrente}`,

                                    path:path.join(__dirname, 'uploads', 'rgFrentes' ,nameRgFrente)

                                 }
                            )
                        }

                        if(nameRgVerso) {

                            ourEmailAttachments.push(
                                {
                                    filename: `RG Verso.${ nameRgVerso.split('.').slice(-1)[0] }`,

                                    content:fs.readFileSync(path.join(__dirname, 'uploads', 'rgVersos' ,nameRgVerso)).toString("base64"),

                                    contentType: `image/${nameRgVerso}`,

                                    path:path.join(__dirname, 'uploads', 'rgVersos' ,nameRgVerso)

                                 }
                            )
                        }

                        smtpTransport.sendMail({

                            attachments: ourEmailAttachments,

                            from: email_origin,

                            to: `emailDestiny, ${emailRegiao}`,

                            subject: `Contrato de venda - Títular: ${parsedBody.titular} - Vendedor: ${parsedBody.codigoDoVendedor}`,

                            html:`Segue em anexo fotos dos documentos e o contrato de venda.`,

                    },function(error,info){

                        if(error){

                            console.log(error);

                        } else {

                            res.send("Mail has been sended to your email. Check your mail")

                            clearStorage({
                                nameContrato,
                                nameDependentes,
                                nameMerge,
                                nameCpf,
                                nameCompEndereco,
                                nameRgFrente, nameRgVerso
                            });

                        }

                    })

                    if(!parsedBody.email) return

                        smtpTransport.sendMail({

                            attachments:[

                                {
                                    filename:'Contrato de Venda.pdf',

                                    content:fs.readFileSync(path.join(__dirname, 'pdfs' , 'pdfMerged',nameMerge+'.pdf')).toString("base64"),

                                    contentType: 'application/pdf',

                                    path:path.join(__dirname, 'pdfs' , 'pdfMerged',nameMerge+'.pdf')

                                },
                            ],

                            from: email_origin,

                            to: parsedBody.email,

                            subject:'Contrato de venda',

                            html:`

                            Obrigado por fazer parte!`,

                        },function(error,info){

                            if(error){

                                console.log(error);
                            }

                        })
                    }
                }
            )();
        })();
    })});

    let smtpTransport = nodemailer.createTransport({

    host:'smtp.gmail.com',

    service:'Gmail',

    port:465,

    secure:true,

            auth:{
                user:process.env.EMAIL_USERNAME,

                pass:process.env.EMAIL_PASSWORD
            },
        tls:{rejectUnauthorized:false}

    })

    clearStrings();

};