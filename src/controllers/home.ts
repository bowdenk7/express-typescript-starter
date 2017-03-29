/**
 * GET /
 * Home page.
 */
export var index = (req, res) => {
  res.render('home', {
    title: 'Home'
  });
};
