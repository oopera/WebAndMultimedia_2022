const express = require("express");

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const routes = express.Router();

// This will help us connect to the database
const dbo = require("../db/conn");

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;


routes.route("/webweb/products").get(function (req, res) {
  let db_connect = dbo.getDb("webweb");
  db_connect
    .collection("products")
    .find({})
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

routes.route("/webweb/comments").get(function (req, res) {
  let db_connect = dbo.getDb("webweb");
  db_connect
      .collection("comments")
      .find({})
      .toArray(function (err, result) {
        if (err) throw err;
        res.json(result);
      });
});

routes.route("/webweb/users").get(function (req, res) {
    let db_connect = dbo.getDb("webweb");
    db_connect
        .collection("users")
        .find({})
        .toArray(function (err, result) {
            if (err) throw err;
            res.json(result);
        });
});

routes.route("/webweb/purchases").get(function (req, res) {
    let db_connect = dbo.getDb("webweb");
    db_connect
        .collection("purchases")
        .find({})
        .toArray(function (err, result) {
            if (err) throw err;
            res.json(result);
        });
});



routes.route("/comments/:id").get(function (req, res) {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId( req.params.id )};
  db_connect
      .collection("comments")
      .findOne(myquery, function (err, result) {
        if (err) throw err;
        res.json(result);
      });
});

routes.route("/purchases/:id").get(function (req, res) {
    let db_connect = dbo.getDb();
    let myquery = { _id: ObjectId( req.params.id )};
    db_connect
        .collection("purchases")
        .findOne(myquery, function (err, result) {
            if (err) throw err;
            res.json(result);
        });
});

routes.route("/purchases/add").post(function (req, response) {
    let db_connect = dbo.getDb();
    let myobj = {
        date: new Date(req.body.date),
        price: req.body.price,
        email: req.body.email,
        products: req.body.products
    };
    db_connect.collection("purchases").insertOne(myobj, function (err, res) {
        if (err) throw err;
        response.json(res);
    });
});

routes.route("/products/add").post(function (req, response) {
  let db_connect = dbo.getDb();
  let myobj = {
      Name: req.body.Name,
      Description: req.body.Description,
      Price: req.body.Price,
      Availability: req.body.Availability,
      img: req.body.img
  };
  db_connect.collection("products").insertOne(myobj, function (err, res) {
      console.log(myobj._id)
      if (err) throw err;
      response.json(res);
  });
});

routes.route("/comments/add").post(function (req, response) {
    let db_connect = dbo.getDb();
    let myobj = {
        name: req.body.name,
        comment: req.body.comment,
        productID: ObjectId(req.body.productID),
        userID: ObjectId(req.body.userID)
    };
    db_connect.collection("comments").insertOne(myobj, function (err, res) {
        console.log(myobj._id)
        if (err) throw err;
        response.json(res);
    })
});

routes.route("/users/add").post(function (req, response) {
    let db_connect = dbo.getDb();
    let dbizzle = db_connect
        .collection("users")
    async function getDocs() {
        try {
            let cursor = await dbizzle.find({"Email": req.body.email.toLowerCase()})
            return cursor.toArray()
        }catch (e) {
            console.error('Error:', e)
            response = false
        }
    }
    (async function() {
        let docsList = await getDocs()
        if(docsList.length>=1){
            console.log('Fetched documents:', docsList)
            console.log("email is already in use")
            return "WHAAAT"
            }else{
            let myobj = {
                Email: req.body.email.toLowerCase(),
                Password: req.body.password,
                Admin: req.body.admin,
                Purchases: [],
                Comments: [],
                Username:req.body.username,
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

routes.route("/users/login").post(function (req, res) {
    let db_connect = dbo.getDb();
    db_connect
        .collection("users")
        .find({"Email": req.body.email.toLowerCase(), "Password": req.body.password})
        .toArray(function (err, result) {
            if (err) throw err;
            res.json(result);
        });

});

routes.route("/updateProduct/:id").post(function (req, response) {
    let db_connect = dbo.getDb();
    let myquery = { _id: ObjectId( req.params.id )};
    let newvalues = {
        $set: {
            Name: req.body.Name,
            Description: req.body.Description,
            Availability: req.body.Availability,
            Price: req.body.Price,
            img: req.body.img,
        },
    };
    db_connect
        .collection("products")
        .updateOne(myquery, newvalues, function (err, res) {
            if (err) throw err;
            response.json(res);
        });
});


routes.route("/updateUser/:id").post(function (req, response) {
    let db_connect = dbo.getDb();
    let myquery = { _id: ObjectId( req.params.id )};

    req.body.Comments.forEach(castIDs)
    function castIDs(Comment){
            Comment.id = ObjectId(Comment.id)
    }
    req.body.Purchases.forEach(castPurchaseIDs)
    function castPurchaseIDs(purchase){
        purchase.PurchaseID = ObjectId(purchase.PurchaseID)
    }

    let newvalues = {
        $set: {
            Email: req.body.Email,
            Password: req.body.Password,
            Admin: req.body.Admin,
            Purchases: req.body.Purchases,
            Comments: req.body.Comments,
            Username: req.body.Username,
        },
    };
    db_connect
        .collection("users")
        .updateOne(myquery, newvalues, function (err, res) {
            if (err) throw err;
            response.json(res);
        });
});


routes.route("/delProduct/:id").delete((req, response) => {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId(req.params.id)};
  db_connect.collection("products").deleteOne(myquery, function (err, obj) {
    if (err) throw err;
    console.log("1 Product deleted");
    response.json(obj);
  });
});


routes.route("/delUser/:id").delete((req, response) => {
    let db_connect = dbo.getDb();
    let myquery = { _id: ObjectId(req.params.id)};
    db_connect.collection("users").deleteOne(myquery, function (err, obj) {
        if (err) throw err;
        console.log("1 user deleted");
        response.json(obj);
    });
});

routes.route("/user/:id").get(function (req, res) {
    let db_connect = dbo.getDb();
    let myquery = { _id: ObjectId( req.params.id )};
    db_connect
        .collection("user")
        .findOne(myquery, function (err, result) {
            if (err) throw err;
            res.json(result);
        });
});


routes.route("/delComment/:id").delete((req, response) => {
    let db_connect = dbo.getDb();
    let myquery = { _id: ObjectId(req.params.id)};
    db_connect.collection("comments").deleteOne(myquery, function (err, obj) {
        if (err) throw err;
        console.log("1 comment deleted");
        response.json(obj);
    });
});

module.exports = routes;
