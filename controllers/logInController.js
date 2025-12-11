function getLogIn(req, res) {
  if (req.user) {
    res.redirect("/");
  }

  res.render("log-in", {
    user: req.username,
  });
}

export default { getLogIn };
