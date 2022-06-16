const express = require("express");
const routes = express.Router();
const dbo = require("../db/conn");
const ObjectId = require("mongodb").ObjectId;

// Fetches and returns Products
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

//Fetches and returns Comments
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

//Fetches and returns users
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

//Fetches and returns purchases
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

//Fetches and returns specific Comment based on ID
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

//Fetches and returns specific purchase based on ID
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


//Fetches and returns specific user based on ID
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

//Logs purchase to Db
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

//Logs product to Db
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

//Logs Comment to Db
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

//Logs User to Db
//searches for both a User with given Email and user with given Username in DB
//if Found, return false - compare addUser and registre functions in AccountFunctions

routes.route("/users/add").post(function (req, response) {
    let db_connect = dbo.getDb();
    let dbizzle = db_connect
        .collection("users")
    async function emailCheck() {
        try {
            let cursor = await dbizzle.find({"Email": req.body.email.toLowerCase()})
            return cursor.toArray()
        }catch (e) {
            console.error('Error:', e)
            response.send(false)
        }
    }
    async function userNameCheck() {
        try {
            let cursor = await dbizzle.find({"Username": req.body.username.toLowerCase()})
            return cursor.toArray()
        }catch (e) {
            console.error('Error:', e)
            response.send(false)
        }
    }
    (async function() {
        let emailList = await emailCheck()
        let userNameList = await userNameCheck()
        if(emailList.length>=1){
            console.log('Fetched documents:', emailList)
            console.log("email is already in use")
            response.send(false)
            }else if(userNameList.length>=1) {
            console.log('Fetched documents:', userNameList)
            console.log("Username is already in use")
            response.send(false)
        }else{
            let myobj = {
                Email: req.body.email.toLowerCase(),
                Password: req.body.password,
                Admin: req.body.admin,
                Purchases: [],
                Comments: [],
                Username:req.body.username.toLowerCase(),
            };
            db_connect.collection("users").insertOne(myobj, function (err, res) {
                if (err) throw err;
                response.json(res);
            });
            console.log("User added", myobj)
            console.log("email isnt already in use")
            return true
        }
    })();
});

//Checks if User with passed credentials exists, returns found Documents with given credentials
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


//Update Product with passed Data
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

//Update User with passed Data, casts IDs of Coments and Purchases, since these are first added to isLoggedIn
//ObjectID doesnt exist in React, so they must be converted here.
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

//Delete Product with passed ID
routes.route("/delProduct/:id").delete((req, response) => {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId(req.params.id)};
  db_connect.collection("products").deleteOne(myquery, function (err, obj) {
    if (err) throw err;
    console.log("1 Product deleted");
    response.json(obj);
  });
});

//Delete User with passed ID
routes.route("/delUser/:id").delete((req, response) => {
    let db_connect = dbo.getDb();
    let myquery = { _id: ObjectId(req.params.id)};
    db_connect.collection("users").deleteOne(myquery, function (err, obj) {
        if (err) throw err;
        console.log("1 user deleted");
        response.json(obj);
    });
});

//Delete Comment with passed ID
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
