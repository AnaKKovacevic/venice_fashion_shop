const verifyAdmin = (req,res,next)=>{
    let user = req.userData;
    if(user.isAdmin){
        next()
    }else{
        return res.status(409).send("You don't have access to this action.");
    }
}

module.exports = verifyAdmin;