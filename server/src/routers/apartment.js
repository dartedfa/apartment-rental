const express = require('express')
const Apartment = require('../models/apartment')
const User = require('../models/user')
const {auth} = require('../middleware/auth')
const router = new express.Router()

router.post('/apartments', auth, async (req, res) => {
  const apartment = new Apartment({
    ...req.body,
    realtor: req.user._id,
  })

  try {
    await apartment.save()
    res.status(201).send(apartment)
  } catch (e) {
    res.status(400).send(e)
  }
})

router.get('/apartments', auth, async (req, res) => {
  const isRealtor = req.user.role >= 1
  const filters = isRealtor ? {} : {isAvailable: true}

  const match = {...filters} // will use later to filter by floor etc.

  const apartments = await Apartment.find(match).sort({_id: -1})
  try {
    res.status(200).send(apartments)
  } catch (e) {
    res.status(500).send()
  }
})

router.get('/apartments/:id', auth, async (req, res) => {
  const _id = req.params.id

  try {
    const apartment = await Apartment.findOne({_id})
    const {firstName, lastName, email} = await User.findById(apartment.realtor)

    if (!apartment) {
      return res.status(404).send()
    }

    res.send({apartment, realtor: {firstName, lastName, email}})
  } catch (e) {
    res.status(500).send()
  }
})

router.patch('/apartments/:id', auth, async (req, res) => {
  const updates = Object.keys(req.body)

  try {
    const apartment = await Apartment.findOne({_id: req.params.id})

    if (!apartment) {
      return res.status(404).send()
    }

    updates.forEach(update => (apartment[update] = req.body[update]))
    apartment['realtor'] = req.user._id

    await apartment.save()
    res.send(apartment)
  } catch (e) {
    res.status(400).send(e)
  }
})

router.delete('/apartments/:id', auth, async (req, res) => {
  try {
    const apartment = await Apartment.findOneAndDelete({_id: req.params.id})

    if (!apartment) {
      res.status(404).send()
    }

    res.status(200).send(apartment)
  } catch (e) {
    res.status(500).send()
  }
})

module.exports = router
