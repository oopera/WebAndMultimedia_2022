const express = require("express");

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const recordRoutes = express.Router();

// This will help us connect to the database
const dbo = require("../db/conn");

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;


recordRoutes.route("/webweb/products").get(function (req, res) {
  let db_connect = dbo.getDb("webweb");
  db_connect
    .collection("products")
    .find({})
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

recordRoutes.route("/webweb/comments").get(function (req, res) {
  let db_connect = dbo.getDb("webweb");
  db_connect
      .collection("comments")
      .find({})
      .toArray(function (err, result) {
        if (err) throw err;
        res.json(result);
      });
});
// This section will help you get a single record by id
recordRoutes.route("/products/:id").get(function (req, res) {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId( req.params.id )};
  db_connect
      .collection("products")
      .findOne(myquery, function (err, result) {
        if (err) throw err;
        res.json(result);
      });
});

// This section will help you create a new record.
recordRoutes.route("/products/add").post(function (req, response) {
  let db_connect = dbo.getDb();
  let myobj = {
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    availability: req.body.availability
  };
  db_connect.collection("products").insertOne(myobj, function (err, res) {
    if (err) throw err;
    response.json(res);
  });
});

recordRoutes.route("/users/add").post(function (req, response) {
    let db_connect = dbo.getDb();
    let dbizzle = db_connect
        .collection("users")
    async function getDocs() {
        try {
            let cursor = await dbizzle.find({"Email": req.body.email.toLowerCase()})
            return cursor.toArray()
        } catch (e) {
            console.error('Error:', e)
        }
    }
    (async function() {
        let docsList = await getDocs()
        if(docsList.length>=1){
            console.log('Fetched documents:', docsList)
            console.log("email is already in use")
            return false
            }else {
            let myobj = {
                Email: req.body.email.toLowerCase(),
                Password: req.body.password,
                Admin: false,
                Purchases: [],
                Comments: [],
            };
            db_connect.collection("users").insertOne(myobj, function (err, res) {
                if (err) throw err;
                response.json(res);
            });
            console.log("email isnt already in use")
            return true
        }
    })();

});

recordRoutes.route("/users/email").post(function (req, res) {
    console.log("IEXIST")
    let db_connect = dbo.getDb();
    let myquery = { "Email": req.body.email.toLowerCase()
    ,
        "Password": req.body.password.toLowerCase()
    };
    db_connect
        .collection("users")
        .find(myquery, function (err, result) {
            if (err) throw err;
            res.json(result);
        });
});

// This section will help you update a record by id.
recordRoutes.route("/update/:id").post(function (req, response) {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId( req.params.id )};
  let newvalues = {
    $set: {
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      availability: req.body.price,
    },
  };
  db_connect
    .collection("products")
    .updateOne(myquery, newvalues, function (err, res) {
      if (err) throw err;
      console.log("1 document updated");
      response.json(res);
    });
});

// This section will help you delete a record
recordRoutes.route("/:id").delete((req, response) => {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId( req.params.id )};
  db_connect.collection("products").deleteOne(myquery, function (err, obj) {
    if (err) throw err;
    console.log("1 document deleted");
    response.json(obj);
  });
});

module.exports = recordRoutes;
