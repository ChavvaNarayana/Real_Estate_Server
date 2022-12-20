const router = require('express').Router()

router.get('/', (req, res) => {
    res.send('index')
})

module.exports = router;