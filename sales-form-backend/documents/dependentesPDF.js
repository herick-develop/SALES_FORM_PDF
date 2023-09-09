module.exports = ({
    dependentes,
 })=>{
     const today = new Date()
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
                      <img  src="http://example_url/assets/img/header-pdf.png" style="width:100%; max-width:800px; height: 100px">
                    </td>
                 </tr>
              </table>
           
 
              ${dependentes?.length > 0 ? "<table style=\"border: 1px solid #fff; background: #1970B7; border-radius: 4px; padding: 0 4px; margin-top: 2px; border-spacing: 0px;\"><tr><td style=\"color: white; width: 400px\"><strong>D E P E N D E N T E S</strong></td><td style=\"color: white;width: 100px; text-align: start\"><strong style=\"width: 200px; text-align: center;\">D A T A &nbsp;&nbsp; N A S C.</strong></td><td style=\"color: white;width: 100px; text-align: end;\"><strong>I D A D E</strong></td></tr></table>" : ''}
              `;
 
              dependentes?.forEach(dependente => {
                pdf+=
                `<table style="border: 1px solid #eeeeee; border-radius: 4px; padding: 0 4px; margin-top: 2px">
                    <tr class="item">
                        <td style="width: 400px"><strong>${dependente.name ? dependente.name : ''}</strong></td>
                        <td style="text-align: center;width: 200px"><strong>${dependente.birthDate ? dependente.birthDate : ''}</strong></td>
                      <td style="text-align: end;width: 100px"><strong>${dependente.age ? dependente.age : '0'} anos</strong></td>
                    </tr>
                    <tr class="item">
                        <td><span>CPF: ${dependente.cpf ? dependente.cpf : ''}</span>&nbsp;&nbsp;<span>E-mail: ${dependente.email ? dependente.email : ''}</span></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr class="item">
                        <td><span>Grau de Parentesco: ${dependente.kinship ? dependente.kinship : ''}</span></td>
                        <td></td>
                        <td></td>
                    </tr>
                 <tr>
                   <td>
                      <p style="margin: 0px"><input type="checkbox" ${ dependente.type === 'Adic. Simples' && 'checked' } /> Adic. Simples &nbsp;<input type="checkbox" ${ dependente.type === 'Adic. Duplo' && 'checked' } /> Adic. Duplo &nbsp; ${dependente.cellphone ? 'Celular  ' + dependente.cellphone : ''}</p>
                   </td>
                 </tr>
 
                </table>
                </body>
                </html>
                `
              })
 
    return pdf;
 
 }