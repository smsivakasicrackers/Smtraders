const sendToken = (user,statusCode,res)=>{
   
    //creating jwt Token
    const token = user.getJwtToken();

    //setting cookies
    const options = {
        expires:new Date(Date.now() + process.env.COOKIE_EXPIRES_TIME *24 *60 *60 *1000),
    httpOnly:true,
    secure: true,   // Required for HTTPS
    sameSite: "None", // Allows cross-site cookies
    }

res.status(statusCode)
.cookie('token',token,options)
.json({
    success:true,
    token,
    user
})

}

module.exports = sendToken;
