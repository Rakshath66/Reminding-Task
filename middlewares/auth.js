const {validateToken}= require("../services/authentitaction");

// Middleware for JWT authentication
const authenticateUser = (cookieName) => {
  return (req,res,next) => {
    const tokenCookieValue=req.cookies[cookieName];
    // console.log(tokenCookieValue);
    if(!tokenCookieValue){ 
        return next();
    }

    try{
        const userPayload=validateToken(tokenCookieValue);
        req.user= userPayload;
        // next();
    }
    catch(error) {
        // next();
    }

    next();
};
};

module.exports = {authenticateUser};
