const schema = require("../schema/schema")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const { json } = require("body-parser");


module.exports.register = async (req, res, next) => {

  try {
  const {username, password, email} = await req.body;
  const candidate = await schema.findOne({username});
  if (candidate) {
   res.status(442).json({message: "username already exists"})
   return next()
  } 
  else if (!candidate) {
     if (password.length < 8) {return res.json({message: "password must contain at least 8 characters"})}
   const salt = bcrypt.genSaltSync(10)
   const hash = bcrypt.hashSync(password, salt)
   console.log(hash) 
   const newUser = await schema.create({username: username, password: hash, email: email});
   newUser.validateSync()
   newUser.save();
   res.status(200).json({message: "account created"})
   next()
   res.redirect('/')
  }
 
  } catch (error) {
    return error.message
  }
}


module.exports.logIn = async (req, res, next) => {
  
  const {username, password, email} = await req.body
  const candidate = await schema.findOne({username})
  if (candidate) {
   const compare = bcrypt.compareSync(password, candidate.password)
    if (compare) {
      const token = jwt.sign(candidate.toJSON(), process.env.JWT_SECRET, {expiresIn: "60m"});
      jwt.verify(token, process.env.JWT_SECRET)
      candidate.active = true;
      candidate.active === true ? res.json({message: "user digned in"}) : next() ;
    } else if (!compare) {
     res.status(442).json({message: "incorrect password"})
     return next()
    }
  } else if (!candidate) {
    res.status(442).json({message: "incorrect username"})
  }
}

