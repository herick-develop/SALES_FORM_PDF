const securityCodes = [
    {code:'JFVWLY', email:'vendas.cidade@gmail.com'},
    {code:'MKBRFD', email:'vendas.cidae@gmail.com'},
    {code:'TAYB2X', email:'vendas.cidade@gmail.com'},
    {code:'YUTWWU', email:'vendas.cidade@gmail.com'},
    {code:'5X9TV7', email:'vendas.cidade@gmail.com'},
]

const getEmailBySecurityCode = (securityCode) => {
    
    const data = securityCodes.filter( (element) => element.code === securityCode);
    return data[0].email;
};

module.exports = {getEmailBySecurityCode};