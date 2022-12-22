const middlewares = {
  isAuthenticated: (req, res, next) => {
    if (!req.isAuthenticated()) {
      res.status(403).send({ message: "Forbidden" });
    } else {
      return next();
    }
  },
};

module.exports = middlewares;
