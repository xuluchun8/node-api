const express = require('express')
const router = express.Router()

// GET api/users
router.get('/login',(req,res) => {
  res.send('/api/login')
})

module.exports = router
