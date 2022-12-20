const router = require('express').Router()

router.post('/', (req, res) => {
    res.send('post ')
})

module.exports = router;