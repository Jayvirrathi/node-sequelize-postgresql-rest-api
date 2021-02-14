const express = require('express');
const User = require('../models/user');

const router = express.Router();

router.post('/register', async (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    const alreadyExistsUser = await User.findOne({ where: { email } }).catch(
        (err) => {
            console.log('Error: ', err);
        }
    );

    if (alreadyExistsUser) {
        return res.json({ message: 'User with email already exists!' });
    }

    const newUser = new User({ firstName, lastName, email, password });
    const savedUser = await newUser.save().catch((err) => {
        console.log('Error: ', err);
        res.json({ error: 'Cannot register user at the moment!' });
    });

    if (savedUser) res.json({ message: 'Thanks for registering' });
});

module.exports = router;
