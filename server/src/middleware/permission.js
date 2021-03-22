const User = require('../models/user')

const permission = async (req, res, next) => {
  try {
    const target = req.body.target || req.query.target
    const role = req.user.role

    if (!target) {
      return next()
    }
    const user = await User.findOne({_id: target})

    if (role === user.role) {
      return res.status(403).send({error: `Insufficient permission.`})
    }

    req.user = user
    return next()
  } catch (e) {
    res.send(e)
  }
}

module.exports = permission
