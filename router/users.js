import router from("express").Router();
import Users from("./users-model.js");
import secret from("../auth/secret-middleware.js");


const usersRouter = Router();
// gets a list of users
router.get("/",secret, (req, res) => {
  Users.find()
    .then(users => {
      res.json(users);
    })
    .catch(error => res.send(error));
});
// GET localhost:5000/api/users tested in Postman

// gets a specific user
router.get("/:id", restricted, (req, res) => {
  const { id } = req.params;
  Users.findById(id)
    .then(user => {
      if (user) {
        res.json(user);
      } else {
        res
          .status(404)
          .json({ message: "Could not find user with gviven ID." });
      }
    })
    .catch(error => {
      res.status(500).json({ message: "Failed to get user" });
    });
});
// GET localhost:5000/api/users/3 tested in Postman

// add user
router.post("/", restricted, (req, res) => {
  const userData = req.body;

  Users.add(userData)
    .then(user => {
      res.status(201).json(user);
    })
    .catch(error => {
      res.status(500).json({ message: "Failed to add new user." });
    });
});
// POST http://localhost:5000/api/users/ tested in Postman

// update User
router.put("/:id", restricted, (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  Users.findById(id)
    .then(user => {
      if (user) {
        Users.update(changes, id).then(updatedUser => {
          // this will remove the password that gets
          //generated when updating only fullname, username and phonenumber should show
          // https://stackoverflow.com/questions/37294371/node-js-remove-a-field-from-the-returning-json
          delete updatedUser.password;
          res.json(updatedUser);
        });
      } else {
        res.status(404).json({ message: "Could not find user with given Id." });
      }
    })
    .catch(error => {
      res.status(500).json({ message: "Failed to update user." });
    });
});

// remove user
router.delete("/:id", restricted, (req, res) => {
  const { id } = req.params;

  Users.remove(id)
    .then(deleted => {
      if (deleted) {
        res.json({ removed: deleted });
      } else {
        res.status(404).json({ message: "Could not find user with given Id." });
      }
    })
    .catch(error => {
      res.status(500).json({ message: "Failed to delete user." });
    });
});

export default usersRouter;