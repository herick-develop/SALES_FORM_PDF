module.exports = (request, response, next) => {
    const allowedOrigins = ["http://example.com.br", "http://example", "http://example:3000", "http://localhost:3000"];
    const origin = request.headers.origin;
    if(allowedOrigins.includes(origin)) {
        response.setHeader("Access-Control-Allow-Origin", origin);
    }
    response.setHeader("Access-Control-Allow-Methods", "*");
    response.setHeader("Access-Control-Allow-Headers", "*");
    response.setHeader("Access-Control-Max-Age", "10");
    next();
}