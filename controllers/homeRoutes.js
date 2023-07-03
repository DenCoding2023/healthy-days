const router = require('express').Router();
const { User } = require('../models');
const withAuth = require('../utils/auth');

// Prevent non logged in users from viewing the homepage
router.get('/', withAuth, async (req, res) => {
  try {
    const userData = await User.findAll({
      attributes: { exclude: ['password'] },
      order: [['username', 'ASC']],
    });

    const users = userData.map((project) => project.get({ plain: true }));

    res.render('homepage', {
      users,
      // Pass the logged in flag to the template
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If a session exists, redirect the request to the homepage
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});



router.get('/register', (req, res) => {
  // If a session exists, redirect the request to the homepage

  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('register');

});

// Add a new route for the nutrition page
router.get('/nutrition', withAuth, (req, res) => {
  res.render('nutrition', {
    // Pass any necessary data to the nutrition template
    logged_in: req.session.logged_in,
  });
});

// Add a new route for the about page
router.get('/about.handlebars', withAuth, (req, res) => {
  res.render('about.handlebars', {
    // Pass any necessary data to the nutrition template
    logged_in: req.session.logged_in,
  });
});


module.exports = router;