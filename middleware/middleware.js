const jwt = require("jsonwebtoken");

const authMiddleWare = (req, res, next) => {
  try {
    const token = req.header("x-auth-token");
    if (!token)
      return res.json({ errors: [{ msg: "No token, No authorization" }] });
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = authMiddleWare;
