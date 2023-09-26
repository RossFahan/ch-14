const router = require('express').Router();
const { User } = require('../../models');
const bcrypt = require('bcrypt');

// Route for signing up a new user
router.post('/signup', async (req, res) => {
  try {
      const { username, email, password } = req.body;

      // Create the user
      await User.create({
          username,
          email,
          password
      });

      // Fetch user data from the database
      const userData = await User.findOne({ where: { username } });

      if (!userData) {
          console.log('User data not found');
          return res.status(400).json({ message: 'User data not found' });
      }

      // Save the session and redirect
      req.session.save(() => {
          req.session.user_id = userData.id;
          req.session.logged_in = true;


          res.json({ user: userData, message: 'You are now logged in!' });
      });

  } catch (err) {
      console.error(err);
      res.status(500).json(err);
  }
});

// Route for logging in a user
router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ where: { email: req.body.email } });

    if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
      res.status(400).json({ message: 'Incorrect email or password' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = user.id;
      req.session.logged_in = true;

      res.status(200).json({ user, message: 'Successful login' });
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route for logging out a user
router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(400).end();
  }
});

module.exports = router;
