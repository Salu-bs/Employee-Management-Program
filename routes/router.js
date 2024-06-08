const express = require('express');
const router = express.Router();

router.get('/success', (req, res) => {
    res.render('successfully', { title: 'Successfully Popup' });
});

module.exports = router;
