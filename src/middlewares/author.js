const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config")

const author = (req, res, next) => {
    const auth = req.headers.authorization;

    if(!auth) {
        return res.status(400).send( { error:"Token required"} );
    }
    const Token = auth.split(" ")[1];
    try {
     const ver = jwt.verify(Token, jwtSecret);

    next();
    }catch(err){
        res.status(401).send( {error: "Token error"} )
    }
};

module.exports = { author };
