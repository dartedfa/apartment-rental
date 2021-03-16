const express = require('express')
const User = require('../models/user')
const {sendActivationEmail} = require('../emails/account')
const {handleBasicAuth, auth} = require('../middleware/auth')
const router = new express.Router()

const CLIENT_URL = process.env.CLIENT_URL

router.post('/register', handleBasicAuth, async (req, res) => {
  let user = new User(req.body)
  try {
    await user.save()

    const token = await user.generateAuthToken()
    sendActivationEmail(
      user.email,
      user.firstName,
      `${CLIENT_URL}/verify/${token}`,
    )

    res.status(201).send({invitation_sent: true})
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

      user = new User({
        ...req.body,
        userType: req.body.userType,
        externalId,
        verified: true,
      })

      await user.save()
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

    if (!user.verified) {
      return res.status(400).send({error: 'Account is not activated.'})
    }

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

    res.send({success: true})
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

router.get('/verify', auth, async (req, res) => {
  try {
    req.user.tokens = []
    req.user.verified = true
    await req.user.save()

    res.status(200).send({verified: true})
  } catch (error) {
    res.status(400).send()
  }
})

module.exports = router
