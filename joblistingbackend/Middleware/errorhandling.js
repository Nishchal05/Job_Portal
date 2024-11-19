const errormiddleware=(err,req,res,next)=>{
    console.log(err);
    res.send({
        success: false,
        message: "something went wrong",
        err,
    }
    )
}
module.exports=errormiddleware;