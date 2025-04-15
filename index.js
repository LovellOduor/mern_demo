const express = require('express');
const app = express();
const port = 3000;
const { MongoClient, ServerApiVersion } = require("mongodb");

app.get(
  '/',
   (req, res) => {
  res.sendFile("/Users/lovell/Desktop/exp/index.html")
});

app.get('/login', async (req, res) => {
    var uri = "mongodb://localhost:27017/";
  try{
        // Create a MongoClient with a MongoClientOptions object to set the Stable API version
    const client = new MongoClient(uri,  {
          serverApi: {
          version: ServerApiVersion.v1,
          strict: true,
          deprecationErrors: true,
      }
  }
  );
  

  await client.connect();

  var dbo = client.db("test");
  var userData = { username:req.query.username, email:req.query.email };

  await dbo.collection("users").insertOne(userData);

  console.log("1 user inserted");

  res.send("login success Username: " + req.query.username + " email: "+req.query.email);

  await client.close();

  }catch(e){
    console.log(e);
    res.send("Failed to insert user");
    await client.close();
  }

});

app.listen(port, 
  () => {
  console.log(`Example app listening on port ${port}`)
});