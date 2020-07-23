module.exports = () => {
    return (req, res, next) => {
      if (Object.keys(req.body).length === 0) {
        res.status(400).json({ error: "Please provide an account body" });
      } else if (
        !req.body.name ||
        !req.body.budget
      ) {
        res.status(400).json({
          error: "Please provide a name and budget field.",
        });
      } else {
        next();
      }
    };
  };