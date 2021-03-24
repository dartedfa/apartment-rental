const User = require('../models/user')

const permission = async (req, res, next) => {
  try {
    if (req.user.role < 2) {
      return res.status(403).send({error: `Insufficient permission.`})
    }

    const target = req.body.target || req.query.target || req.params.id

    if (!target) {
      return next()
    }
    const user = await User.findOne({_id: target})

    req.user = user
    return next()
  } catch (e) {
    res.send(e)
  }
}

const canCrudApartment = async (req, res, next) => {
  const role = req.user.role

  if (role < 1) {
    return res.status(403).send({error: `Insufficient permission.`})
  }

  return next()
}

module.exports = {permission, canCrudApartment}
