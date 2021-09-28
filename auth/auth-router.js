import router from("express").Router();
import bcrypt from("bcryptjs");
import jwt from("jsonwebtoken");
import Users from ("../users/users-model.js");

// register new user
router.post("/register", (req, res) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 12); // 2 ^ n
  user.password = hash;

  Users.add(user)
    .then(saved => {
      // a jwt should be generated
      const token = generateToken(saved);
      res.status(201).json({
        user: saved,
        token
      });
    })
    .catch(error => {
      res.status(500).json(error);
    });
});
// tested POST localhost:5000/api/auth/register in Postman

// login user
router.post("/login", (req, res) => {
  let { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        // a jwt should be generated
        const token = generateToken(user);
        // console.log('token', token);

        res.status(200).json({
          message: `Welcome ${user.username}!`,
          token
        });
      } else {
        res.status(401).json({ message: "Invalid Credentials" });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});
// tested POST http://localhost:5000/api/auth/login in Postman

function generateToken(user) {
  // header payload and verify signature
  // payload -> username, id, roles, expiration date
  const payload = {
    sub: user.id,
    fullname: user.fullname,
    username: user.username,
    phonenumber: user.phonenumber
  };

  const options = {
    expiresIn: "1d"
  };
  // verify signature -> a secret
  return jwt.sign(payload, process.env.JWT_SECRET, options);
}

module.exports = router;