const express = require('express')

const HDWalletProvider = require('@truffle/hdwallet-provider');

var Web3 = require('web3');

const https = require("https")

const fs = require('fs')

require('dotenv').config()

const { MongoClient, Binary } = require('mongodb')

const bodyParser = require('body-parser')

const sendMail = require('./mailservice')

const nodemailer = require('nodemailer')

const multer = require('multer')

const path = require('path')

//const url = "mongodb://renai:mecasso@34.132.175.83:27017/mecasso"
const url = "mongodb://localhost:27017"

const app = express()

const charmabi = require('./charmabi')

const config = {
  private: "3711184aff12f5ae1a779b8c8f9a7ec6aef7cc1de85a896cc3d52ebc3b226c07",
  rpc: "https://speedy-nodes-nyc.moralis.io/5a65aeefd6cc8930e6f47455/polygon/mumbai",
  ownerAddress: "0x8391c675d2f3588ff97a336E0A6b368546e4F322",
  charmAddress: "0x526637f44f0d8979cCE28A5397eafF3471C48f5a",
  charmXnew: "0x2b79cca533f4cbd5c7cd73d436aebf0f11843e62"
}

const owner = new HDWalletProvider(config.private, config.rpc)
const web3 = new Web3(owner)

const dbname = "Renai"
const client = new MongoClient(url)

const charmAbi = JSON.parse(charmabi);

const contract = new web3.eth.Contract(charmAbi, config.charmAddress)

app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

const httpsServer = https.createServer({
  key: fs.readFileSync('server.key'),
  cert: fs.readFileSync('server.cert')
}, app)

httpsServer.listen(7171, () => {
  console.log('HTTPS Server Started @ 7171 ')
})

app.listen(3000, () => {
  console.log('HTTP Server Started @ 3000')
})

//app.use(bodyParser.urlencoded({ extended: true }))
//app.use(express.json())

app.use(express.json({ limit: '15mb' }));
//app.use(express.urlencoded({limit: '25mb'}));
app.use(bodyParser.urlencoded({ limit: "15mb", extended: true }));


//Multer file upload

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '/home/manuareraa/Renai-Backend/kycdocuments')
  },
  filename: function (req, file, cb) {
    var fname = file.originalname + ".jpg";
    cb(null, fname)
  }
})

var upload = multer({ storage: storage })

var multipleUpload = upload.fields([{ name: 'aadhar', maxCount: 1 }, { name: 'pan', maxCount: 1 }, { name: 'image', maxCount: 1 }])

app.post('/kycdocupload', multipleUpload, (req, res) => {
  if (req.files) {
    console.log(req.files);
    res.send("File Uploaded succesfully");
  }
})


app.get('/creators', function (req, res) {

  var sendResponse = {};

  getAllCreatorsByAlpha().then(function (response, error) {
    if (response) {
      console.log(response)
      sendResponse['Creators By Alphabetical order'] = response
      res.status(200).send(sendResponse)
    } else {
      sendResponse['error'] = error
      sendResponse['errmsg'] = "Error getting creators data"
      res.status(500).send(sendResponse)
    }
  })
})

app.get('/getTokenDetails', function (req, res) {

  var sendResponse = {};

  getToken().then(function (response, error) {
    if (response) {
      console.log(response)
      sendResponse['Token Details'] = response
      res.status(200).send(sendResponse)
    } else {
      sendResponse['error'] = error
      sendResponse['errmsg'] = "Error getting token info"
      res.status(500).send(sendResponse)
    }
  })
})

app.get('/creatorprofile/:id', function (req, res) {
  var sendResponse = {}
  getCreatorsProfile(req.params.id).then(function (response, error) {
    if (response) {
      console.log(JSON.stringify(response, null, 2))
      sendResponse['Creator Profile'] = response
      res.status(200).send(sendResponse)
    } else {
      sendResponse['error'] = error
      sendResponse['errmsg'] = "Error getting creators profile"
      res.status(500).send(sendResponse)
    }
  })
})

app.post('/generateEmailLink', function (req, res) {
  var sendResponse = {}
  generateMail(req.body).then(function (response, err) {
    if (response) {
      if (response['modifiedCount'] == 1 || response['upsertedCount'] == 1) {
        sendResponse['msg'] = 'VerifyToken is send to Mail Succesfylly';

        res.status(200).send(sendResponse)
      } else {

        sendResponse['errmsg'] = 'Error Sending Mail'
        res.status(200).send(sendResponse)
      }
    } else {
      sendResponse['error'] = err
      res.status(500).send(sendResponse)
    }
  })
})


app.post('/generateEmailOTP', function (req, res) {
  var sendResponse = {}
  generateMailOTP(req.body).then(function (response, err) {
    if (response) {
      sendResponse['msg'] = 'OTP sent to Mail Succesfylly';
      sendResponse['otp'] = response
      res.status(200).json({ otp: response })
    }
    else {
      sendResponse['errmsg'] = "Error sending OTP to email";
      res.status(500).send(sendResponse)
    }
  })
})

app.post('/verifyEmailToken', function (req, res) {
  console.log(req.body.verifytoken)
  var sendResponse = {}
  verifyMailToken(req.body.verifytoken).then(function (response, err) {
    if (response) {
      if (response['modifiedCount'] == 1 || response['matchedCount'] == 1) {
        sendResponse['msg'] = 'OTP verified Succesfylly';
        res.status(200).json({ response: true })
      } else {
        sendResponse['errmsg'] = "Invalid OTP"
        res.status(200).json({ response: false })
      }
    } else {
      sendResponse['error'] = err
      sendResponse['errmsg'] = "Error Verification Failed"
      res.status(500).send(sendResponse)
    }
  })
})


app.get('/sendOtp', function (req, res) {
  var sendResponse = {}
  sendOTP(req.body.phno).then(function (response, error) {
    if (response) {
      sendResponse['msg'] =
        'OTP succesfully sent to your mobile no ';
      sendResponse['otp'] = response
      res.status(200).json({ otp: response })
    } else {
      sendResponse['error'] = error
      sendResponse['errmsg'] = "Error sending SMS"
      res.status(500).send(sendResponse)
    }
  })
})





//Leaderboard API
app.post('/leaderboard', function (req, res) {
  var sendResponse = {}
  getLeaderboard().then(function (response, error) {
    if (response) {
      sortLeaderboard(response).then(function (res1, err) {
        if (res1) {
          sendResponse['leaderboard'] = response
          //var group= flattenJSON(response)
          //console.log(group)
          res.status(200).send(sendResponse)
        }
        else {
          sendResponse['error'] = err
          sendResponse['errmsg'] = "Error sorting leaderboard"
          res.status(500).send(sendResponse)
        }


      })
    }
    else {
      sendResponse['error'] = error
      sendResponse['errmsg'] = "Error getting leaderboard"
      res.status(500).send(sendResponse)
    }

  })
});


app.post('/basickyc', function (req, res) {
  var sendResponse = {}
  console.log('basic kyc called', req.body)
  updatebasickycdetails(req.body).then(function (response, err) {
    if (response) {
      console.log(1)
      if (response['modifiedCount'] == 1 || response['matchedCount'] == 1) {
        console.log(2)
        sendResponse['msg'] = 'Basic KYC details updated Succesfylly';
        res.status(200).send(sendResponse)
      } else {
        console.log(3)
        // add a statement to handle upsert condition
        //sendResponse['msg'] = 'Invalid user details (not found)';
        sendResponse['msg'] = 'Document Not Found. Created a New One.';
        res.status(200).send(sendResponse)
      }
    } else {
      console.log(4)
      sendResponse['error'] = err
      res.status(500).send(sendResponse)
    }
  })
})


app.post('/advancedKYC', function (req, res) {
  var sendResponse = {}
  updateadvancekycdetails(req.body).then(function (response, err) {
    console.log('REQ called with', req.body)
    if (response) {
      if (response['modifiedCount'] == 1 || response['matchedCount'] == 1) {
        sendResponse['msg'] = 'Advance KYC details updated Succesfylly';
        res.status(200).send(sendResponse)
      } else {
        console.log(response)
        // add a statement to handle upsert condition
        //sendResponse['msg'] = 'Invalid user details (not found)';
        sendResponse['msg'] = 'Document Not Found. Created a New One.';
        res.status(200).send(sendResponse)
      }
    } else {
      console.log(err)
      sendResponse['error'] = err
      res.status(500).send(sendResponse)
    }
  })
})

async function updatebasickycdetails(inputdata) {
  try {

    await client.connect()
    const db = client.db(dbname)
    const coll = db.collection('userRenai')

    return new Promise(function (resolve, reject) {
      const Cursor = coll.updateOne(
        { userid: inputdata.userid },
        { $set: { name: inputdata.name, email: inputdata.email, phoneno: inputdata.phoneno }, }, { upsert: true },
        function (err, result) {
          console.log(result)
          resolve(result)
        },
      )
    })
  } catch (error) {
    console.log(error)
  }
}


async function updateadvancekycdetails(inputdata) {
  try {

    await client.connect()
    const db = client.db(dbname)
    const coll = db.collection('userRenai')

    return new Promise(function (resolve, reject) {
      const Cursor = coll.updateOne(
        { userid: inputdata.userid },
        { $set: { aadharno: inputdata.aadharno, pancardno: inputdata.pancardno } },
        function (err, result) {
          resolve(result)
        },
      )
    })
  } catch (error) {
    console.log(error)
  }
}

async function getLeaderboard() {
  try {
    await client.connect()
    const db = client.db(dbname)
    const coll = db.collection('transactions')
    const Cursor = await coll.aggregate(
      [
        {
          $group:
          {
            _id: { tokenName: "$tokenName", baseAsset: "$baseAsset" },
            sales: { $sum: { $multiply: ["$price", "$amount"] } },
            count: { $sum: 1 }
          }
        },

        {
          $lookup:
          {
            from: "dao",
            localField: "_id.tokenName",
            foreignField: "tokenName",
            as: "DAOdetails"
          }
        },
        {
          $match:
          {
            details:
              { $ne: [] }
          }
        },
        {
          $project:
          {
            "_id": 1,
            "count": 1,
            "sales": 1,
            "tokenName": 1,
            "DAOdetails.tokenName": 1,
            "DAOdetails.tokenSymbol": 1,
            "DAOdetails.creator": 1,
            "DAOdetails.category": 1
          }
        },
      ]
    )

    const allValues = await Cursor.toArray();
    //   var jsondata=JSON.stringify(allValues);
    // var groupbytoken=groupBy(jsondata,jsondata["sales"]);
    coll
    console.log(allValues);
    return allValues
  } catch (error) {
    console.log(error)
  } finally {
    await client.close()
  }
}


async function sortLeaderboard(leaderboard) {
  console.log(leaderboard)
  var tokenName = leaderboard[0]._id.tokenName;
  var leaderboardsorted = [];
  var sales = 0;
  var count = 0;
  var daitomatic = 0.65;
  var ethtomatic = 1480;
  var k = 0;

  for (i = 0; i < leaderboard.length; i++) {
    var t = i;
    if (tokenName != leaderboard[t]._id.tokenName) {
      leaderboardsorted[k] = leaderboard[t - 1];
      leaderboardsorted[k]._id.baseAsset == "MATIC";
      leaderboardsorted[k].sales = sales;
      leaderboardsorted[k].count = count;
      k++;
      tokenName = leaderboard[t]._id.tokenName;
      sales = 0;
      count = 0;

    }

    if (leaderboard[t]._id.baseAsset == "MATIC") {
      sales = sales + leaderboard[t].sales;
      count = count + leaderboard[t].count;
    }
    if (leaderboard[t]._id.baseAsset == "WDAI") {
      sales = sales + (leaderboard[t].sales * daitomatic);
      count = count + leaderboard[t].count;
    }

    if (leaderboard[t]._id.baseAsset == "ETH") {
      sales = sales + (leaderboard[t].sales * ethtomatic);
      count = count + leaderboard[t].count;
    }

  }
  console.log(leaderboard);

  leaderboardsorted.sort(GetSortOrder("sales"));
  console.log(leaderboardsorted);
  return leaderboardsorted;

}


function GetSortOrder(prop) {
  return function (a, b) {
    if (a[prop] > b[prop]) {
      return 1;
    } else if (a[prop] < b[prop]) {
      return -1;
    }
    return 0;
  }
}


async function getAllCreatorsByAlpha() {
  try {
    await client.connect()

    const db = client.db(dbname)
    const coll = db.collection('creator')
    const Cursor = await coll.find({}).sort({ name: 1 })
    const allValues = await Cursor.toArray()
    console.log(allValues)
    return allValues
  } catch (error) {
    console.log(error)
  } finally {
    await client.close()
  }
}

async function getToken() {
  try {
    await client.connect()

    const db = client.db(dbname)
    const coll = db.collection('dao')
    const Cursor = await coll.find({}).project({ tokenName: 1, tokenSymbol: 1, currentPrice: 1, _id: 0 })
    const allValues = await Cursor.toArray()
    return allValues
  } catch (error) {
    console.log(error)
  } finally {
    await client.close()
  }
}

async function getCreatorsProfile(request) {
  try {
    await client.connect()
    const db = client.db(dbname)
    const coll = db.collection('creator')
    const Cursor = await coll.find({ _id: request })
    const profile = await Cursor.toArray()
    return profile
  } catch (error) {
    console.log(error)
  }
}

function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000)
}


async function generateMail(formdata) {
  try {
    console.log(formdata)
    var otp = generateOTP()
    await client.connect()
    const db = client.db(dbname)
    const coll = db.collection('emailverification')

    return new Promise(function (resolve, reject) {
      const Cursor = coll.updateOne(
        { username: formdata.username },
        { $set: { verifytoken: otp, verified: false } },
        { upsert: true },
        function (err, result) {
          if (err) console.log(err)
          else {
            if (result['modifiedCount'] == 1 || result['upsertedCount'] == 1) {
              var Subject = 'Mecasso Verify Token'
              var link = 'https://223.184.127.143/verifyemail/' + otp
              //  var html = stringToHTML("<p> Link to verify token <a href='" +link+ "'></a></p>");
              var HTML =
                "<p> Link to verify token <a href='" + link + "'></a></p>"

              sendMail(formdata.email, Subject, link, function (err, data) {
                if (err) {
                  console.log('Error sending mail Mail not sent' + err)
                  resolve(data)
                } else {
                  console.log(link)
                  console.log('Mail send succesfully' + JSON.stringify(data))

                  resolve(result)
                }
              })
            } else {
              console.log('Error generating OTP')
            }
          }
        },
      )
    })
  } catch (error) {
    console.log(error)
  }
}


async function generateMailOTP(formdata) {
  try {

    return new Promise((resolve, reject) => {
      var otp = generateOTP()
      var Subject = 'Mecasso Verify OTP'
      var text = "OTP for email verification is " + otp;
      sendMail(formdata.email, Subject, text, function (err, data) {
        if (err) {
          console.log('Error sending mail Mail not sent' + err);
          resolve(null, err)
        } else {
          console.log('Mail sent succesfully' + JSON.stringify(data))
          resolve(otp, null)
        }

      })

    })


  } catch (error) {
    console.log(error)
  }
}

async function verifyMailToken(form) {
  try {
    await client.connect()
    const db = client.db(dbname)
    const coll = db.collection('emailverification')
    return new Promise(function (resolve, reject) {
      const Cursor = coll.updateOne(
        { verifytoken: form },
        { $set: { verified: true } },
        function (err, result) {
          if (err) console.log(err)
          else {
            if (result['modifiedCount'] == 1 || result['matchedCount'] == 1) {
              // console.log("OTP verified Succesfully"+JSON.stringify(result))
              resolve(result)
            } else {
              //       console.log("Invalid OTP")
              resolve(result)
            }
          }
        },
      )
    })
  } catch (error) {
    console.log(error)
  }
}



async function sendOTP(request) {
  try {
    otp = generateOTP()
    return otp
  } catch (error) {
    console.log(error)
  }
}

//===================================================
// Services added by Manu

app.post("/viewallPosts", function (req, res) {

  console.log("Reached here", req.body);

  var sendResponseObject = {};

  viewallPosts().then(function (response, err) {

    if (response) {

      sendResponseObject['Posts'] = response;
      console.log(sendResponseObject);
      console.log("sendResponseObject");
      let jsonString = JSON.stringify(sendResponseObject)
      res.send(jsonString);
    }
    else {

      sendResponseObject['error'] = err;

      console.log(sendResponseObject);
      console.log("sendResponseObject");
      let jsonString = JSON.stringify(sendResponseObject)
      res.send(jsonString);
    }
  })
})

async function viewallPosts() {
  //Put a cap on posts fetched on large data volume

  try {

    await client.connect();

    const database = client.db("Renai");

    const coll = database.collection("posts");


    const Cursor = await coll.find({});

    const allValues = await Cursor.toArray();

    //console.log("Values",allValues)    
    //await Cursor.forEach(doc => console.log(doc))

    return allValues;


  } catch (error) {
    console.log(error);
  }
}

app.post("/viewUserDets", function (req, res) {

  console.log("Reached here", req.body);

  var sendResponseObject = {};

  viewUser(req.body.userID).then(function (response, err) {

    if (response) {
      console.log(response)
      if (response === 'No Record') {
        res.status(200).json(response)
      } else {
        res.status(200).json({ DAOs: response[0].DAOs })
      }
    }
    else {

      sendResponseObject['error'] = err;

      console.log(sendResponseObject);
      console.log("sendResponseObject");
      let jsonString = JSON.stringify(sendResponseObject)
      res.send(jsonString);
    }
  })
})

app.post("/viewUserTransactions", function (req, res) {

  console.log("Reached here", req.body);

  var sendResponseObject = {};

  viewUserTransactions(req.body.userID).then(function (response, err) {

    if (response) {

      sendResponseObject['transactions'] = response;
      console.log(sendResponseObject);
      console.log("sendResponseObject");
      let jsonString = JSON.stringify(sendResponseObject)
      res.send(jsonString);
    }
    else {

      sendResponseObject['error'] = err;

      console.log(sendResponseObject);
      console.log("sendResponseObject");
      let jsonString = JSON.stringify(sendResponseObject)
      res.send(jsonString);
    }
  })
})


async function viewUser(userID) {

  try {
    await client.connect();
    const database = client.db("Renai");
    const coll = database.collection("users");
    const Cursor = await coll.find({ _id: userID }).project({ DAOs: 1, _id: 0 });
    const allValues = await Cursor.toArray();
    console.log("User Values", allValues)
    //await Cursor.forEach(doc => console.log(doc))
    if (allValues.length === 0) {
      return "No Record"
    } else {
      return allValues;
    }
  } catch (error) {
    console.log(error)
  }
}

async function viewUserTransactions(userID) {

  try {

    await client.connect();

    const database = client.db("Renai");

    const coll = database.collection("transactions");


    const Cursor = await coll.find(
      { buyerID: userID }
    ).limit(10);

    const allValues = await Cursor.toArray();

    //console.log("Values",allValues)    
    //await Cursor.forEach(doc => console.log(doc))

    return allValues;


  } catch (error) {
    console.log(error);
  }
}

app.post("/queryDAO", function (req, res) {
  console.log("Reached here", req.body);
  var sendResponseObject = {};
  queryDAO(req.body.contractAddress).then(function (response, err) {
    if (response) {
      sendResponseObject['queryresult'] = response;
      console.log(sendResponseObject);
      let jsonString = JSON.stringify(sendResponseObject)
      res.send(jsonString);
    }
    else {
      sendResponseObject['error'] = err;
      console.log(sendResponseObject);
      console.log("sendResponseObject");
      let jsonString = JSON.stringify(sendResponseObject)
      res.send(jsonString);
    }
  })
})

async function queryDAO(contractAddress) {
  try {
    await client.connect();
    const database = client.db("Renai");
    const coll = database.collection("dao");
    console.log("CONTRACT ADDR: " + contractAddress)
    console.log("TYPE: " + typeof (contractAddress))
    const Cursor = await coll.find({ "_id": contractAddress }).toArray();
    //const allValues = await Cursor.toArray();
    return Cursor;
  } catch (error) {
    console.log(error);
  }
}

app.post("/getAllDAOs", function (req, res) {
  console.log("Reached here", req.body);
  var sendResponseObject = {};
  getAllDAOs().then(function (response, err) {
    if (response) {
      // sendResponseObject['creators'] = response;
      // console.log(sendResponseObject);
      // console.log("sendResponseObject");
      // let jsonString= JSON.stringify(sendResponseObject)
      res.status(200).json({ daos: response })
    }
    else {
      // sendResponseObject['error'] = err;
      // console.log(sendResponseObject);
      // console.log("sendResponseObject");
      // let jsonString= JSON.stringify(sendResponseObject)
      // res.send(jsonString);
      res.status(500).json({ error: err })
    }
  })
})

async function getAllDAOs() {
  try {
    await client.connect();
    const database = client.db("Renai");
    const coll = database.collection("dao");
    const Cursor = await coll.find();
    const allValues = await Cursor.toArray();
    return allValues;
  } catch (error) {
    console.log(error);
  }
}

app.post("/mintCharm", function (req, res) {

  //req.body.receiver - Address
  var sendResponseObject = {};
  contract.methods.mint(req.body.receiver, 1).send({ from: config.ownerAddress }, function (error, transactionHash) {
    if (error) {
      console.log("Error at mint charm");
    }
  })
    .on('error', function (error) { console.log("error at mintcharm", error); })
    .on('transactionHash', function (transactionHash) {
      sendResponseObject['txHash'] = transactionHash;
      console.log("txHash", transactionHash);
    })
    .on('receipt', function (receipt) {
      sendResponseObject['receipt'] = receipt;
      console.log("receipt", receipt);


      res.send(sendResponseObject);

    });
})

app.post("/addTransaction", function (req, res) {

  console.log("Reached here", req.body);

  var sendResponseObject = {};

  addTransaction(req.body).then(function (response, err) {

    if (response) {
      sendResponseObject['transactionID'] = response;

      addUser(req.body.userID, req.body.tokenName, req.body.contractAddress).then(function (response, err) {

        if (response) {

          sendResponseObject['userID'] = response;
          console.log(sendResponseObject);
          console.log("sendResponseObject");
          let jsonString = JSON.stringify(sendResponseObject)
          res.send(jsonString);
        }
        else {

          sendResponseObject['error'] = err;
          console.log(sendResponseObject);
          console.log("sendResponseObject");
          let jsonString = JSON.stringify(sendResponseObject)
          res.send(jsonString);
        }
      })

    }

    else {

      sendResponseObject['error'] = err;
      console.log(sendResponseObject);
      console.log("sendResponseObject");
      let jsonString = JSON.stringify(sendResponseObject)
      res.send(jsonString);
    }
  })
})


async function addTransaction(JSdoc) {
  try {
    await client.connect();
    const database = client.db("Renai");
    const coll = database.collection("transactions");
    const doc = JSdoc;
    const results = await coll.insertOne(
      {
        tokenName: JSdoc.tokenName,
        baseAsset: JSdoc.baseAsset,
        buyerID: JSdoc.userID,
        sellerID: JSdoc.creator,
        DAOaddress: JSdoc.contractAddress,
        price: JSdoc.price,
        amount: JSdoc.amount,
        transactionDate: JSdoc.transactionDate
      }
    );
    console.log(
      `${results.insertedCount} documents were inserted with the _id: ${results.insertedId}`,
    );
    return results.insertedId;
  }
  catch (error) {
    console.log(error);
    return error;
  }
}

async function addUser(userID, tokenName, contractAddress) {
  try {
    await client.connect();
    const database = client.db("Renai");
    const coll = database.collection("users");
    const results = await coll.updateOne(
      { _id: userID },
      {
        $push: { DAOs: { tokenName, contractAddress } }
      },
      { upsert: true }
    );
    console.log(
      `${results.result.n} documents were inserted with the _id: ${userID}`,
    );
    return userID;
  }
  catch (error) {
    console.log(error);
    return error;
  }
}

app.post("/createNewUser", function (req, res) {
  console.log("Reached here", req.body);
  var sendResponseObject = {};
  addUser(req.body.userID, req.body.tokenName, req.body.contractAddress).then(function (response, err) {
    if (response) {
      sendResponseObject['result'] = response;
      console.log(sendResponseObject);
      let jsonString = JSON.stringify(sendResponseObject)
      res.send(jsonString);
    }
    else {
      sendResponseObject['error'] = err;
      console.log(sendResponseObject);
      console.log("sendResponseObject");
      let jsonString = JSON.stringify(sendResponseObject)
      res.send(jsonString);
    }
  })
})


app.post('/uploadProfilePhoto', function (req, res) {
  uploadProfilePhoto(req.body.image, req.body.userID).then(function (response, err) {
    //console.log('REQ called with', req.body)
    if (response) {
      res.status(200).json(response)
    } else {
      res.status(500).json(err)
    }
  })
})

async function uploadProfilePhoto(image, userID) {
  try {
    await client.connect();
    const database = client.db("Renai");
    const coll = database.collection("users");
    const results = await coll.updateOne(
      { _id: userID },
      {
        $set: { profilePhoto: image }
      },
      { upsert: true }
    );
    console.log(
      `${results.result.n} documents were inserted with the _id: ${userID}`,
    );
    return userID;
  }
  catch (error) {
    console.log(error);
    return error;
  }
}

app.get('/getProfilePhoto', function (req, res) {
  var sendResponse = {}
  getProfilePhoto(req.query.userID).then(function (response, err) {
    console.log('REQ called with', req.body)
    if (response) {
      res.status(200).json(response)
    } else {
      res.status(500).json(err)
    }
  })
})

async function getProfilePhoto(userID) {
  try {
    await client.connect();
    const database = client.db("Renai");
    const coll = database.collection("users");
    const Cursor = await coll.find({ _id: userID }).project({ profilePhoto: 1, _id: 0 });
    const allValues = await Cursor.toArray();
    //console.log("User Values", allValues)
    if (allValues.length === 0) {
      return "No Record"
    } else {
      return allValues;
    }
  }
  catch (error) {
    console.log(error);
    return error
  }
}

app.post("/addCharmTransaction", function (req, res) {

  console.log("Reached here in addcharm transaction", req.body);

  var sendResponseObject = {};

  addCharmTransaction(req.body).then(function (response, err) {

    if (response) {
      sendResponseObject['transactionID'] = response;

      console.log(sendResponseObject);
      console.log("sendResponseObject");
      let jsonString = JSON.stringify(sendResponseObject)
      res.send(jsonString);

    }

    else {

      sendResponseObject['error'] = err;
      console.log(sendResponseObject);
      console.log("sendResponseObject");
      let jsonString = JSON.stringify(sendResponseObject)
      res.send(jsonString);
    }
  })
})


async function addCharmTransaction(JSdoc) {

  try {

    await client.connect();

    const database = client.db("Renai");

    const coll = database.collection("charmtransactions");

    const results = await coll.insertOne(
      {

        tokenName: JSdoc.tokenName,
        DAOaddress: JSdoc.contract,
        transactionDate: JSdoc.transactionDate,
        charm: 1

      }
    );
    console.log(`documents were inserted with the _id:`, results);
    console.log(results.insertedId);

    const coll2 = database.collection("posts");


    const updateResult = await coll2.updateOne(
      {
        tokenName: JSdoc.tokenName,
        publisheddatetime: JSdoc.publisheddatetime
        //_id: JSdoc.postid
      },
      { $inc: { charm: + 1 } });


    console.log("Update result:", updateResult);

    return results.insertedId;
  }
  catch (error) {
    console.log(error);
    return error;
  }
}


// ==========================================================================
// APIs for Creator's Portal

app.post("/viewCreatorDAOs", function (req, res) {
  console.log("Reached here", req.body);
  var sendResponseObject = {};
  viewallDAOs(req.body.userID).then(function (response, err) {
    if (response) {
      sendResponseObject['DAOs'] = response.DAOs;
      sendResponseObject['profilePhoto'] = response.profilePhoto;
      console.log(sendResponseObject);
      console.log("sendResponseObject");
      let jsonString = JSON.stringify(sendResponseObject)
      res.send(jsonString);
    }
    else {
      sendResponseObject['error'] = err;
      console.log(sendResponseObject);
      console.log("sendResponseObject");
      let jsonString = JSON.stringify(sendResponseObject)
      res.send(jsonString);
    }
  })
})

async function viewallDAOs(userID) {
  try {
    await client.connect();
    const database = client.db("Renai");
    const coll = database.collection("creator");
    console.log("userID", userID);
    //const Cursor = await coll.find({_id: userID},{DAOs:1, _id:0});
    const Cursor = await coll.find({ _id: userID }).project({ DAOs: 1, profilePhoto: 1, _id: 0 });
    const allValues = await Cursor.toArray();
    console.log("All DAOs Values", allValues)
    //await Cursor.forEach(doc => console.log(doc))
    return allValues[0];
  } catch (error) {
    console.log(error);
  }
}

app.post("/returnSalesAgg", function (req, res) {
  var sendResponseObject = {};
  returnSalesaggregates().then(function (response, err) {
    if (response) {
      sendResponseObject['sales'] = response;
      console.log(sendResponseObject);
      console.log("sendResponseObject");
      let jsonString = JSON.stringify(sendResponseObject)
      res.send(jsonString);
    }
    else {
      sendResponseObject['error'] = err;
      console.log(sendResponseObject);
      console.log("sendResponseObject");
      let jsonString = JSON.stringify(sendResponseObject)
      res.send(jsonString);
    }
  })
})

async function returnSalesaggregates() {
  try {
    await client.connect();
    const database = client.db("Renai");
    const coll = database.collection("transactions");
    const Cursor = await coll.aggregate(
      [
        {
          $group:
          {
            _id: { tokenName: "$tokenName", baseAsset: "$baseAsset" },
            sales: { $sum: { $multiply: ["$price", "$amount"] } },
            count: { $sum: 1 }
          }
        },
        {
          $lookup:
          {
            from: "dao",
            localField: "_id.tokenName",
            foreignField: "tokenName",
            as: "DAOdetails"
          }
        },
        { $match: { details: { $ne: [] } } }
      ]
    ).project({
      "_id": 1,
      "sales": 1,
      "count": 1,
      "DAOdetails.tokenName": 1,
      "DAOdetails.tokenSymbol": 1
    });
    const sales = await Cursor.toArray();
    console.log("Values", sales)
    //await Cursor.forEach(doc => console.log(doc))
    return sales;
  } catch (error) {
    console.log(error);
  }
}

app.post("/addnewDAO", function (req, res) {
  console.log("Reached here", req.body);
  var sendResponseObject = {};
  addDAO(req.body).then(function (response, err) {
    if (response) {
      sendResponseObject['DAO_ID'] = response;
      addCreator(req.body).then(function (response, err) {
        if (response) {
          sendResponseObject['creator_ID'] = response;
          console.log(sendResponseObject);
          console.log("sendResponseObject");
          let jsonString = JSON.stringify(sendResponseObject)
          res.send(jsonString);
        }
        else {
          sendResponseObject['error'] = err;
          console.log(sendResponseObject);
          console.log("sendResponseObject");
          let jsonString = JSON.stringify(sendResponseObject)
          res.send(jsonString);
        }
      })
    }
    else {
      sendResponseObject['error'] = err;
      console.log(sendResponseObject);
      console.log("sendResponseObject");
      let jsonString = JSON.stringify(sendResponseObject)
      res.send(jsonString);
    }
  })
});

async function addDAO(JSdoc) {
  try {
    await client.connect();
    const database = client.db("Renai");
    const coll = database.collection("dao");
    const doc = JSdoc;
    var Youtube = JSdoc.socialMedia.Youtube;
    const results = await coll.insertOne(
      {
        _id: JSdoc.contractAddress,
        tokenName: JSdoc.tokenName,
        tokenSymbol: JSdoc.tokenSymbol,
        creator: JSdoc.creator,
        userID: JSdoc.userID,
        category: JSdoc.category,
        contentType: JSdoc.category,
        //creatorType: JSdoc.
        description: JSdoc.description,
        socialURI: JSdoc.socialURI,
        socialMedia: {
          Youtube: {
            channelName: Youtube.channelName,
            url: Youtube.url,
            categories: Youtube.categories,
            description: Youtube.description,
            createdOn: Youtube.createdOn,
            thumbnail: Youtube.thumbnail.url,
            subscribers: Youtube.subscribers,
            media: Youtube.mediaCount,
            views: Youtube.views
          }
        },
        socialURI: JSdoc.socialURI,
        launchPrice: JSdoc.socialURI,
        currentPrice: JSdoc.currentPrice,
        initalCreatorShare: JSdoc.initalCreatorShare
      }
    );
    console.log(
      `${results.insertedCount} documents were inserted with the _id: ${results.insertedId}`,
    );
    return results.insertedId;
  }
  catch (error) {
    console.log(error);
    return error;
  }
}




async function addCreator(JSdoc) {
  try {
    await client.connect();
    const database = client.db("Renai");
    const coll = database.collection("creator");
    var Youtube = JSdoc.socialMedia.Youtube;
    const results = await coll.insertOne(
      {
        _id: JSdoc.creator,
        name: JSdoc.creatorname,
        DAOs: [{
          tokenName: JSdoc.tokenName,
          tokenSymbol: JSdoc.tokenSymbol,
          contractAddress: JSdoc.contractAddress
        }],
        profilePhoto: Youtube.thumbnail.url,
        category: JSdoc.category,
        contentType: JSdoc.category,
        //creatorType: JSdoc.
        socialURI: JSdoc.socialURI,
        socialMedia: {
          Youtube: {
            url: Youtube.url,
            channelName: Youtube.channelName,
            categories: Youtube.categories,
            thumbnail: Youtube.thumbnail.url,
            description: Youtube.description,
            createdOn: Youtube.createdOn,
            subscribers: Youtube.subscribers,
            media: Youtube.mediaCount,
            views: Youtube.views
          }
        }
      }
    );
    console.log(
      `${results.insertedCount} documents were inserted with the _id: ${results.insertedId}`,
    );
    return results.insertedId;
  }
  catch (error) {
    console.log(error);
    return error;
  }
}


app.post("/addnewPost", function (req, res) {
  console.log("Reached here", req.body);
  var sendResponseObject = {};
  addPost(req.body).then(function (response, err) {
    if (response) {
      sendResponseObject['ID'] = response;
      console.log(sendResponseObject);
      console.log("sendResponseObject");
      let jsonString = JSON.stringify(sendResponseObject)
      res.send(jsonString);
    }
    else {
      sendResponseObject['error'] = err;
      console.log(sendResponseObject);
      console.log("sendResponseObject");
      let jsonString = JSON.stringify(sendResponseObject)
      res.send(jsonString);
    }
  })
})

async function addPost(JSdoc) {
  try {
    await client.connect();
    const database = client.db("Renai");
    const coll = database.collection("posts");
    const doc = JSdoc;
    const results = await coll.insertOne(
      {
        tokenName: JSdoc.tokenName,
        tokenSymbol: JSdoc.tokenSymbol,
        profilePhoto: JSdoc.profilePhoto,
        DAOcontract: JSdoc.DAOcontract,
        userID: JSdoc.userID,
        heading: JSdoc.heading,
        description: JSdoc.description,
        image: JSdoc.image,
        medialink: JSdoc.medialink,
        publisheddatetime: JSdoc.publisheddatetime,
        charm: 0
      }
    );
    console.log(
      `${results.insertedCount} documents were inserted with the _id: ${results.insertedId}`,
    );
    return results.insertedId;
  }
  catch (error) {
    console.log(error);
    return error;
  }
}

app.post("/viewCharmOnChainBalance", function (req, res) {
  console.log("Reached here", req.body);
  var sendResponseObject = {};
  contract.methods.balanceOf(req.body.contract).call({ from: config.owner }).then(function (result, err) {
    console.log(result);
    if (result) {
      sendResponseObject['charmBalance'] = result;
      let jsonString = JSON.stringify(sendResponseObject)
      res.send(jsonString);
    }
    else {
      sendResponseObject['error'] = err;
      let jsonString = JSON.stringify(sendResponseObject)
      res.send(jsonString);
    }
  });
})



