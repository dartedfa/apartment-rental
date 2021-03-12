const jwt = require('jsonwebtoken')
const User = require('../models/user')

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '')
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const user = await User.findOne({_id: decoded._id, 'tokens.token': token})

    if (!user) {
      throw new Error()
    }

    req.token = token
    req.user = user
    next()
  } catch (e) {
    res.status(401).send({error: 'Please authenticate.'})
  }
}

const handleBasicAuth = async (req, res, next) => {
  try {
    const basicString = req.header('Authorization').replace('Basic ', '')
    const basicBuffer = new Buffer.from(basicString, 'base64')

    const asciiString = basicBuffer.toString('ascii')

    const [email, password] = asciiString.split(':')

    req.body = {
      ...req.body,
      email,
      password
    }

    next()
  } catch (error) {
    console.log(error)
  }
}

module.exports = {auth, handleBasicAuth}