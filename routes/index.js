// routes/index.js
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('index', { 
    user: req.user,
    title: 'Task App',
  });
});

module.exports = router;
