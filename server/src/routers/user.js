const express = require('express')
const User = require('../models/user')
const {handleBasicAuth, auth} = require('../middleware/auth')
const router = new express.Router()

router.post('/register', handleBasicAuth, async (req, res) => {
  const user = new User(req.body)
  try {
    await user.save()
    const token = await user.generateAuthToken()

    res.status(201).send({user, token})
  } catch (error) {
    if (error.code) {
      return res.status(400).send({error: {email: 'Email is already taken.'}})
    }
    return res.status(400).send(error)
  }
})

router.post('/third-party-auth', handleBasicAuth, async (req, res) => {
  try {
    let user = await User.findOne({email: req.body.email})

    if (!user) {
      const externalId = req.body.externalId

      user = new User({...req.body, userType: req.body.userType, externalId})
    }

    let token = await user.generateAuthToken(req.body.accessToken)
    token += `type=${req.body.userType}`

    res.status(201).send({user, token})
  } catch (error) {
    return res.status(400).send(error)
  }
})

router.post('/login', handleBasicAuth, async (req, res) => {
  try {
    const user = await User.findByCredentials(req.body.email, req.body.password)
    const token = await user.generateAuthToken()

    res.status(200).send({user, token})
  } catch (error) {
    res.status(400).send({error: "User with provided email doesn't exist."})
  }
})

router.post('/logout', auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(token => {
      return token.token !== req.token
    })
    await req.user.save()

    res.send()
  } catch (e) {
    res.status(500).send()
  }
})

router.get('/me', auth, async (req, res) => {
  try {
    const user = req.user

    res.status(200).send({user})
  } catch (e) {
    res.status(401).send({error: 'Please authenticate.'})
  }
})

module.exports = router
