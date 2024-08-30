const { getUser } = require("../services/authentication.js");

async function handleCheckauth(req, res, next) {
    const userid = req.cookies?.uid;
    // console.log('User ID from cookie:', userid);
    if (!userid ) {
        console.log('No user ID found in cookies. Redirecting to login.');
      return next();
    }
    const user = await getUser(userid);
    req.user = user;
    next();
}

function handleRestrictionstouser(roles=[]) {
  return function(req,res,next){
    if(!req.user) {return res.redirect("/login")}
    if(!roles.includes(req.user.role)){ return res.end("Unauthorized to view")}
    next();
  }
}
module.exports = { handleRestrictionstouser, handleCheckauth };
