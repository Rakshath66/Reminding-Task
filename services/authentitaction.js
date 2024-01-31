const JWT= require("jsonwebtoken");
const config=require("../config/config");

const secret=config.JWT_SECRET;

function createTokenForUser(user){
    const payload={
        _id: user._id, // Unique user ID
        username: user.username,
        phone_number: user.phone_number,
        priority:user.priority,
    }
    const token=JWT.sign(payload,secret);
    return token;
}

function validateToken(token){
    const payload=JWT.verify(token,secret);
    return payload;
}

module.exports={createTokenForUser,validateToken};