const jwt = require('jsonwebtoken');

// Issue Token
const generateToken = (req, res) => {
    jwt.sign({user:req.user}, 'secretkey', {expiresIn:'5 min'}, (err, token) => {
        if(err){
            res.sendStatus(500);
        } else {
            res.json({
                message:"Account created and user logged inside the app",
                token:token
            });
        }
    });
}

const auth=(req,res,next)=>{
    const authHeader = req.headers['auth-token']
    const token = authHeader;
    if (!token) return res.status(401).send("Authorization not present !!");
    try {
        jwt.verify(token, 'secretkey', (err, authData) => {
            if(err) return res.status(401).send("Authorization got expired, Login Again !!");
            req.authData = authData
            next()
          })
      } catch (error) {
        res.status(400).send(error);
      } 
};

module.exports={generateToken,auth}