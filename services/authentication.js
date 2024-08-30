// const sesionIdttouser= new Map();
const jwt=require('jsonwebtoken')
const secret="Atharav"
function setUser(user){
    // sesionIdttouser.set(id,user)
    const payload={
        _id:user._id,
        email:user.email,
        admin:user.admin
    }
    return jwt.sign(payload,secret)
}
function getUser(token){
    if(!token) return null;
    return jwt.verify(token,secret)
}

module.exports={
    setUser,getUser
}