const jwt = require("jsonwebtoken");
const authMiddleware = (req, res, next) => {
  try {
    const { acc_tkn } = req.cookies;
    const decoded = jwt.verify(acc_tkn, process.env.JWT_SEC);
    if (decoded) {
      req.user = decoded;
      next();
    } else {
      res.status(401).send({ message: "Unauthorized request" });
    }
  } catch (error) {
    console.log("AUTH ERROR:", error);
  }
};


const roleCheker = (roles) => {
  return (req, res, next) => {
    if (Array.isArray(roles) && roles.length > 0) {
      if (roles.includes(req.user.role)) {
        next();
      } else {
        return res.status(403).send({ message: "Forbidden: Access is denied" });
      }

    }else {
      return res.status(500).send({ message: "Role is not defined properly" });
    }

};
}

module.exports = { authMiddleware, roleCheker };