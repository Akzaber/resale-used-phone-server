const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const port = process.env.PORT || 5000;
require("dotenv").config();
const app = express();

// middle ware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.76fyia6.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    const usedIphoneCollection = client
      .db("resalePhone")
      .collection("usedApples");
    const usedSamsungCollection = client
      .db("resalePhone")
      .collection("usedSamsung");
    const usedOneplusCollection = client
      .db("resalePhone")
      .collection("usedOneplus");
    const usedMobileCollection = client
      .db("resalePhone")
      .collection("usedPhoneCollections");
    const addProductCollection = client
      .db("resalePhone")
      .collection("addProducts");
    const advertiseProductCollection = client
      .db("resalePhone")
      .collection("advertiseProducts");
    const userBookingCollection = client
      .db("resalePhone")
      .collection("bookings");
    const usersCollection = client.db("resalePhone").collection("users");

    app.get("/iphoneCollection", async (req, res) => {
      const query = {};
      const result = await usedIphoneCollection.find(query).toArray();
      res.send(result);
    });

    app.get("/samsungcollection", async (req, res) => {
      const query = {};
      const result = await usedSamsungCollection.find(query).toArray();
      res.send(result);
    });

    app.get("/onepluscollection", async (req, res) => {
      const query = {};
      const result = await usedOneplusCollection.find(query).toArray();
      res.send(result);
    });

    app.get("/usedphonecategory", async (req, res) => {
      const query = {};
      const result = await usedMobileCollection.find(query).toArray();
      res.send(result);
    });

    app.get("/usedphonecategory/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await usedMobileCollection.find(query).toArray();
      res.send(result);
    });

    // app.post("/usedphonecategory/:id", async (req, res) => {
    //   const id = req.params.id;
    //   let query = {};
    //   if (req.query.categoryName) {
    //     query = { categoryName: req.query.categoryName, _id: ObjectId(id) };
    //   }
    //   const result = await usedMobileCollection.insertOne(query);
    //   res.send(result);
    // });

    app.post("/addproducts", async (req, res) => {
      const query = req.body;
      const result = await addProductCollection.insertOne(query);
      res.send(result);
    });

    // app.put('/usedphonecategory/:categoryName', async(req, res) => {
    //   const categoryName = req.params.categoryName;
    //   const filter = {categoryName : categoryName};
    //   const options = {upsert : true};
    //   const updatedDoc = {

    //   }
    // })

    app.get("/addproducts/:email", async (req, res) => {
      const email = req.params.email;
      const query = { email };
      const result = await addProductCollection.find(query).toArray();
      res.send(result);
    });

    app.post("/advertiseproducts", async (req, res) => {
      const query = req.body;
      const result = await advertiseProductCollection.insertOne(query);
      res.send(result);
    });

    app.get("/alladvertise", async (req, res) => {
      const query = {};
      const result = await advertiseProductCollection
        .find(query)
        .limit(3)
        .sort({ _id: -1 })
        .toArray();
      res.send(result);
    });

    app.post("/bookings", async (req, res) => {
      const query = req.body;
      const result = await userBookingCollection.insertOne(query);
      res.send(result);
    });

    app.get("/bookings", async (req, res) => {
      let query = {};
      if (req.query.email) {
        query = { email: req.query.email };
        const result = await userBookingCollection.find(query).toArray();
        res.send(result);
      }
    });

    app.delete("/bookings/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: ObjectId(id) };
      const result = await userBookingCollection.deleteOne(filter);
      res.send(result);
    });

    app.post("/users", async (req, res) => {
      const query = req.body;
      const result = await usersCollection.insertOne(query);
      res.send(result);
    });

    app.delete("/users/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: ObjectId(id) };
      const result = await usersCollection.deleteOne(filter);
      res.send(result);
    });

    app.get("/users", async (req, res) => {
      let query = {};
      const userType = req.query.userType;
      if (userType === "seller") {
        query = { userType: "seller" };
        const result = await usersCollection.find(query).toArray();
        res.send(result);
      } else {
        query = { userType: "user" };
        const result = await usersCollection.find(query).toArray();
        res.send(result);
      }
    });
  } finally {
  }
}
run().catch(console.log);

app.get("/", async (req, res) => {
  res.send("Used Product Resale Server is running");
});

app.listen(port, () => {
  console.log(`used product resale server is runnig on ${port}`);
});
