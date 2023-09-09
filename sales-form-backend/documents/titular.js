const { extenso } = require('../modules/numeroPorExtenso.js');

module.exports = ({
   titular, dataDeNascimento,
   enderecoResidencial,numeroCasa,
   bairro,cidade,
   estado,cep,
   empresa,email,
   naturalidade,rg,
   ssp,cpf,
   estadocivil,profissao,
   fone,celular,
   observacao,
   tipoDePlano,
   pagamentoAVista,
   plano, vencimento,
   assinaturaVendedor,
   assinaturaTitular,
   codigoDoVendedor,
})=>{
    const today = new Date();
    const valorPorExtenso = extenso(pagamentoAVista);
    let pdf = `
    <!doctype html>
    <html>
       <head>
          <meta charset="utf-8">
          <title>PDF Result Template</title>
          <style>
          input[type=checkbox] {
            position: relative;
             cursor: pointer;
             margin-top: -12px;
            margin-left: -3px;
       }
       input[type=checkbox]:before {
            content: "";
            display: block;
            position: absolute;
            width: 14px;
            height: 14px;
            top: 0;
            left: 0;
            border: 2px solid #555555;
            border-radius: 3px;
            background-color: white;
            margin-top: -4px;
            margin-left: -3px;
   }
       input[type=checkbox]:checked:after {
            content: "";
            display: block;
            width: 5px;
            height: 10px;
            border: solid black;
            border-width: 0 1px 1px 0;
            -webkit-transform: rotate(45deg);
            -ms-transform: rotate(45deg);
            transform: rotate(45deg);
            position: absolute;
            top: -3px;
            left: 2px;
   }
          html {
            zoom: 0.725;
          }
             body {
               margin: 0px;
             }
             .invoice-box {
             max-width: 800px;
             margin: auto;
             padding: 30px;
             border: 1px solid #eee;
             box-shadow: 0 0 10px rgba(0, 0, 0, .15);
             font-size: 12px;
             line-height: 24px;
             font-family: 'Helvetica Neue', 'Helvetica';
             color: #555;
             height: 280mm;
             }
             .margin-top {
             margin-top: 50px;
             }
             .justify-center {
             text-align: center;
             }
             .invoice-box table {
             width: 100%;
             line-height: inherit;
             text-align: left;
             }
             .invoice-box table td {
             padding: 1px;
             vertical-align: top;
             }
             .invoice-box table tr td:nth-child(2) {
             text-align: right;
             }
             .invoice-box table tr.top table td {
             padding-bottom: 20px;
             }
             .invoice-box table tr.top table td.title {
             font-size: 45px;
             line-height: 45px;
             color: #333;
             }
             .invoice-box table tr.information table td {
             padding-bottom: 40px;
             }
             .invoice-box table tr.heading td {
             background: #eee;
             font-weight: bold;
             }
             .invoice-box table tr.details td {
             padding-bottom: 20px;
             }
             .invoice-box table tr.item td {
             border-bottom: 1px solid #eee;
             }
             .invoice-box table tr.item.last td {
             border-bottom: none;
             }
             .invoice-box table tr.total td:nth-child(2) {
             border-top: 2px solid #eee;
             font-weight: bold;
             }
             @media only screen and (max-width: 600px) {
             .invoice-box table tr.top table td {
             width: 100%;
             display: block;
             text-align: center;
             }
             .invoice-box table tr.information table td {
             width: 100%;
             display: block;
             text-align: center;
             }
             .invoice-box table tr.item {
             width: 100%;
             border: 1px solid #f00;
             }
             }
          </style>
       </head>
       <body>
          <div class="invoice-box">

             <table>
                <tr>
                   <td class="title">
                     <img  src="http://url_example/assets/img/header-pdf.png" style="width:100%; max-width:800px; height: 100px">
                   </td>
                </tr>
             </table>
            

             <table cellpadding="0" cellspacing="0">

                <tr class="item">
                   <td><strong>Titular:</strong> ${titular ? titular : ''}</td>
                   <td><strong>Data de nascimento:</strong> ${dataDeNascimento ? dataDeNascimento : ''}</td>
                </tr>
                <tr class="item">
                   <td><strong>Endereço Residencial:</strong> ${enderecoResidencial ? enderecoResidencial : ''}</td>
                   <td><strong>Nº:</strong> ${numeroCasa ? numeroCasa : ''}</td>
                </tr>
                <tr class="item">
                    <td><strong>Bairro:</strong> ${bairro ? bairro : ''}</td>
                    <td><strong>Cidade:</strong> ${cidade ? cidade : ''}</td>
                </tr>
             </table>

             <table cellpadding="0" cellspacing="0">
                <tr class="item">
                    <td><strong>Estado:</strong> ${estado ? estado : ''}</td>
                    <td><strong>CEP:</strong> ${cep ? cep : ''}&nbsp;&nbsp</td>
                    <td><strong>RG:</strong> ${rg ? rg : ''}</td>
                    <td><strong>SSP:</strong> ${ssp ? ssp : ''}</td>
                    <td><strong>CPF:</strong> ${cpf ? cpf : ''}</td>
                </tr>

             </table>

             <table cellpadding="0" cellspacing="0">
               <tr class="item">
                     <td><strong>Natural de:</strong> ${naturalidade ? naturalidade : ''}</td>
                     <td><strong style="margin-right: 8px;">Estado Civil:</strong> ${estadocivil ? estadocivil : ''}&nbsp;&nbsp;&nbsp;&nbsp;</td>
                     <td><strong>Profissão:</strong> ${profissao ? profissao : ''}</td>
               </tr>
             </table>

             <table cellpadding="0" cellspacing="0">
               <tr class="item">
                  <td><strong>Empresa:</strong> ${empresa ? empresa : ''}</td>
                  <td><strong>E-mail:</strong> ${email ? email : ''}</td>
               </tr>
               
               <tr class="item">
                  <td><strong>Fone / Fixo:</strong> ${fone ? fone : ''}</td>
                  <td><strong>Celular / WhatsApp:</strong> ${celular ? celular : ''}</td>
               </tr>
             </table>

             <table style="border: 1px solid #e2e2e2; border-radius: 4px 4px 0px 0px; padding: 0 4px; margin-top: 8px;">
               <tr class="item">
                  <td style="padding-bottom: 40px;overflow-wrap: break-word; word-wrap: break-word;word-break: break-word;">OBSERVAÇÂO <p style="margin: 0px; word-wrap: break-word;"> ${observacao ? observacao : ''} </p></td>
               </tr>
             </table>

             <table style="background: #1970B7; color: white; padding: 0 4px; border-radius: 0px 0px 4px 4px;">
                  <tr>
                     <td>&nbsp;<strong>T I P O &nbsp;&nbsp; D E &nbsp;&nbsp; P L A N O</strong></td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                     <td><strong><input type="checkbox" ${ tipoDePlano === 'Com ascendente' && 'checked' } /> Com ascendente </strong>&nbsp;&nbsp;&nbsp;&nbsp;</td>
                     <td><strong><input type="checkbox" ${ tipoDePlano === 'Sem ascendente' && 'checked' } /> Sem ascendente </strong></td>
                     <td><strong><input type="checkbox" ${ tipoDePlano === 'Empresarial individual' && 'checked' } /> Empresarial individual </strong>&nbsp;</td>
                  </tr>
             </table>

             <table style="border: 1px solid #fff; background: #1970B7; border-radius: 4px; padding: 0 4px; margin-top: 8px;">
               <tr>
                  <td style="color: white"><strong>F O R M A &nbsp;&nbsp; D E &nbsp;&nbsp; A Q U I S I Ç Â O</strong></td>
               </tr>
             </table>

             <table style="background: rgba(25, 112, 183, .25); border-radius: 4px; padding: 0 4px 2px 4px; margin-top: 2px;">
               <tr>
                  <td>PAGAMENTO À VISTA</td>
                  <td style="text-align: start">VALOR POR EXTENSO</td>
               </tr>
               <tr>
                  <td style="background: white; border-radius: 4px; border-radius: 4px; padding: 0 4px;">R$ ${ pagamentoAVista ? pagamentoAVista : '&nbsp;'}</td>
                  <td style="background: white; border-radius: 4px; border-radius: 4px; padding: 0 4px;">${valorPorExtenso ? valorPorExtenso : '&nbsp;'}</td>
               </tr>
             </table>

             <table style="border: 1px solid #fff; background: #1970B7; border-radius: 4px; padding: 0px 4px; margin-top: 8px;">
               <tr>
                  <td style="color: white"><strong>M A N U T E N Ç Ã O</strong></td>
               </tr>
             </table>

             <table style="background: rgba(25, 112, 183, .25); border-radius: 4px; padding: 0 4px 2px 4px; margin-top: 2px;">
               <tr>
                  <td>PLANO</td>
                  <td style="text-align: start">VENCIMENTO</td>
               </tr>
               <tr>

                  <tr>
                     <td style="background: white; border-radius: 4px; border-radius: 4px; padding: 0px 4px; width: 75%;">${plano ? plano : '&nbsp;'}</td>
                     <td style="background: white; border-radius: 4px; border-radius: 4px; padding: 0px 4px;">${ vencimento ? vencimento : '&nbsp;'}</td>
                  </tr>
               </tr>

               <tr>
                  <td style="font-size: 10px">
                     Caso a cobrança não seja efetuada até a data do vencimento o contratante se obriga a efetuar o pagamento.
                  </td>
               </tr>
             </table>

             <table style="border: 1px solid #e2e2e2; border-radius: 4px; padding: 0px 4px; margin-top: 8px;">
               <tr style="height: 8px;"></tr>
               <tr>
                  <td style="width: 100px;"></td>
                  <td style="text-align: center"><img style="width: 200px; height: 75px; max-height: 75px;" src="${assinaturaTitular ? assinaturaTitular : ''}" /><hr style="width: 100%;"/><p style="margin: 0px">Assinatura do Contratante</p></td>
                  <td style="width: 150px;"></td>
                  <td style="text-align: center"><img style="width: 200px; height: 75px; max-height: 75px;" src="${assinaturaVendedor ? assinaturaVendedor : ''}" /><hr style="width: 100%;"/><p style="margin: 0px">Assinatura do Prestador de Serviço</p></td>
                  <td style="width: 100px;"></td>
               </tr>
             </table>

             <table style="border: 1px solid #fff; background: #1970B7; border-radius: 4px; padding: 0 4px; margin-top: 2px;">
             <tr colspan="3">
                <td style="color: white">CARÊNCIA 90 DIAS P/ASSISTÊNCIA FUNERAL</td>
                <td style="color: white; text-align: center; width: 153px;"> ${today.toLocaleDateString({ language: 'PT-BR'})} </td>
                <td style="color: white; text-align: end;">DATA DO 1º PAGAMENTO <strong>${vencimento ? vencimento : ''}</strong></td>
             </tr>
             </table>

             <table style="border: 1px solid #fff; background: #1970B7; border-radius: 4px; padding: 0 4px; margin-top: 2px;">
             <tr>
                <td style="color: white; text-align:center"><strong>PLANTÃO 24hs</strong> <span style="font-size: 10px; margin-left: 8px;">CASCAVEL - <small style="font-size: 10px">45</small> 3218 2325 | GUARAPUAVA - <small style="font-size: 10px">42</small> 3623 0362 | TOLEDO - <small style="font-size: 10px">45</small> 2035 6060 | UMUARAMA - <small style="font-size: 10px">44</small> 3623 6060</span> </td>
             </tr>
             </table>
             
          </div>
       </body>
    </html>
   `
   return pdf;

}