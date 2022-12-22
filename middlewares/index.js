const middlewares = {
  //e un controller normal
  isAuthenticated: (req, res, next) => {
    if (!req.isAuthenticated()) {
      res.status(403).send({ message: "Forbidden" });
    } else {
      return next();//nextul asta ne duce din middlewear in middlewear pana in req res
    }
  },
};

module.exports = middlewares;
