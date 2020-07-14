require('dotenv').config();

let uri = 'mongodb+srv://';
uri += process.env.DB_NAME + ':';
uri += process.env.DB_PASSWORD;
uri += '@sandbox-vyjju.mongodb.net/test?retryWrites=true&w=majority&';


const express = require('express');
const logger  = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors  = require('cors');
const path = require('path');
const nocache = require('nocache');

const Owner = require("./models/owner")
const Test2 = require("./models/owner")
const Field = require("./models/field")
const User = require("./models/users")
const LandImage = require("./models/images")


const app = express();
// app.use(express.static(path.join(__dirname, '/build')));   

// console.log(path.join(__dirname, '/build'))

console.log(process.env.DB_NAME)
const router = express.Router();

const API_PORT = process.env.PORT || 3001;


// db config -- set your URI from mLab in secrets.js
mongoose.connect(uri);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(cors());
app.use(logger('dev'));
app.use(nocache());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

router.get("/", (req, res) => {
    res.json({ message: "HELLOW WORLDUUHHHH" });
});



/* S3 UPLOAD BUCKET */
const sign_s3 = require('./controllers/sign_s3');

router.post('/sign_s3', sign_s3.sign_s3);

/* S3 UPLOAD BUCKET */
const email_send = require('./controllers/mailsend');

router.post('/mailjet', email_send.mailjet);


//HARD SECURE ALL THESE ROUTES WITH JWT ACCESS TOKENS
//ANY LOGGED IN STATUS CAN BE ALTERED IN THE JS ON CLIENT SIDE
//BUT AS LONG AS THESE ROUTES ARE PROTECTED WITH JWT./FIREBASE AUTH
//SHOULDNT BE ABLE TO CAUSE TOO MUCH TROUBLE

/*
Get Profile or Setup new Profile
*/
//Secure this route with JWT
//https://medium.com/@joenjenga/securing-your-apis-node-js-using-jwt-46c5d5d99ccd

router.post('/:uid/profile/create', (req,res) => {
    const uid = req.params.uid

    console.log(req.body)
   // res.json({ message: "test" });
   const { firstName, surname, email } = req.body

   //see if one exists first
   Owner.findOne({fb_uid: uid }, async (err, user) => {
        if (err) {
                res.status(400).send('Owner already exists');
        }

        
            if (!user) {
                const owner = new Owner()

                owner.firstName = firstName
                owner.lastName = surname
                owner.email = email
                owner.fb_uid = uid


                await owner.save()
                .then((user) => {
                    res.send({user})
                    // return res.status(201).json({
                    //     success: true,
                    //     uid: uid,
                    //     message: 'New Owner created',
                    // })
                })
            }
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Owner not created!',
            })
        })
    
  
});

router.get('/:uid/profile', (req,res) => {
    const uid = req.params.uid
    console.log(uid)
   // res.json({ message: "test" });

   Owner.find({ fb_uid: uid }, (err, result) => {
    // my new or existing model is loaded as result
    res.send({result});
  },(err) =>{
    res.status(400).send(err);
    });
  
//     
});


/*
Get All users
*/
router.get('/getOwners', (req,res) => {
	Owner.find().then( (owners) =>{
		res.send({owners});
	},(err) =>{
		res.status(400).send(err);
   });
});

router.get('/:fb_uid/getDBUID', (req,res) => {
    const fireBaseUID = req.params.fb_uid;
    var user;

    Owner.findOne({fb_uid: fireBaseUID }, function(err,pro){
        user=pro;
        try {  res.send({"user":user._id });}
        catch(e) { console.log(e) }
      });

});


/*
Get All Fields
*/
router.get('/getFields', (req,res) => {
	Field.find().populate("images")
    .then( (fields) =>{
		res.send({fields});
	},(err) =>{
		res.status(400).send(err);
   });
});

app.get("/api/fields/:owner/:fieldId",(req,res,next)=>{
    console.log(req.params.fieldId);

    const field = req.params.fieldId

    Field.findById(field)
    .populate("images")
    .exec(function (err, data) {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true, data: data });

    })
});

/*
Get fields by owner
*/
router.get('/:owner/fields', (req,res) => {
    const dBUID = req.params.owner

  Owner.findById(dBUID)
        .populate("fields")
        .exec(function (err, fields) {
            console.log(fields)
            return res.json({ success: true, fields: fields.fields });

        })
    })

/*
Delete fields by owner
*/ 

router.post('/:owner/field/:fieldId/delete', (req,res) => {
    const fieldId = req.params.fieldId
    console.log(fieldId)
    const owner = req.params.owner
    Field.findByIdAndDelete(fieldId, function (err) {
        if(err) console.log(err);
        console.log("Successful deletion");
      });
})

router.get("/getData", (req, res) => {

    Owner.findById('5ddffbc8fa12de47c60c3683', function (err, data) {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true, data: data });
    })

    //for multiple responses
//     Owner.find().then( (owner) =>{
//         res.status(200)
//         // res.json( users);
//         return res.json({ success: true, owner: owner });

// 	},(err) =>{
// 		res.status(400).send(err);
//    });

});

router.get("/getAllFieldsByOwner", (req,res) => {
    //return fields without any owner data
    Field.find({"owner": '5ddffbc8fa12de47c60c3683'},
        (err, fields) => {
        return res.status(200).json({ success: true, fields: fields })
    })

    //fields with owner data populted
    // Fields.find({"owner": '5ddffbc8fa12de47c60c3683'})
    //     .populate("owner")
    //     .exec(function (err, fields) {
    //         console.log(fields)
    //     });
})

router.get("/owner/get/:uid",(req,res,next)=>{
    console.log(req.params.fieldId);

    const user = req.params.uid

    Owner.findById(user, function (err, data) {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true, data: data });
    })
});

//maybe too much of a basic route (add uid as param?)
router.post("/owner/:uid/addField", (req, res) => {
    console.log('add field post area')

    // Owner.findById(req.body.owner, async (err, owner) => {
    //     const ownersImage = new LandImage(req.body);
    //     owner.images.push(ownersImage._id);
    //     await ownersImage.save();
    //     await owner.save();
    //   })
    //   .then(() => {
    //     return res.status(201).json({
    //         success: true,
    //         message: 'New Image added for field created!',
    //     })
    // })
    // .catch(error => {
    //     return res.status(400).json({
    //         error,
    //         message: 'Field image not saved!',
    //     })
    // })

    const uid = req.params.uid

    const { owner, fieldName, location, dateStart, dateEnd, wedding, marquee,
     camping, fieldSize, fieldCapacity } = req.body

    if (!fieldName || !location ) {
        return res.status(400).json({
            success: false,
            error: 'You must provide details',
        })
    }

    const field = new Field()

    field.owner = owner
    field.fieldName = fieldName
    field.location = location
    field.dateStart = dateStart
    field.dateEnd = dateEnd
    field.wedding = wedding || false
    field.marquee = marquee || false
    field.camping = camping || false
    field.fieldSize = fieldSize
    field.fieldCapacity = fieldCapacity

    Owner.findOne({fb_uid: uid }, async (err, owner) => {
        owner.fields.push(field._id);
        await field.save();
        await owner.save();
      })
      .then(() => {
        return res.status(201).json({
            success: true,
            id: field.fieldName,
            message: 'New Field created!',
        })
    })
    .catch(error => {
        return res.status(400).json({
            error,
            message: 'Field not created!',
        })
    })

    // field
    //     .save()
    //     .then(() => {
    //         return res.status(201).json({
    //             success: true,
    //             id: field.fieldName,
    //             message: 'New Field created!',
    //         })
    //     })
    //     .catch(error => {
    //         return res.status(400).json({
    //             error,
    //             message: 'Field not created!',
    //         })
    //     })


})


router.post("/addFieldImage", (req, res) => {
    console.log('add land image post area')

    if (!req.body.owner || !req.body.field || !req.body.imageUrl ) {
            return res.status(400).json({
                success: false,
                error: 'You must provide details',
            })
        }



        Field.findById(req.body.field, async (err, field) => {
            const fieldImage = new LandImage(req.body);
            field.images.push(fieldImage._id);
            await field.save();
            await fieldImage.save();
            })  


      .then(() => {
        return res.status(201).json({
            success: true,
            message: 'New Image added for field created!',
        })
    })
    .catch(error => {
        return res.status(400).json({
            error,
            message: 'Field image not saved!',
        })
    })


    console.log(req.body)

})


router.post("/addOwner", (req, res) => {
        const { firstName, surname, bio, alias, email } = req.body
        if ( !firstName || !bio || !alias || !email) {
            return res.status(400).json({
                success: false,
                error: 'You must provide details',
            })
        }
        const owner = new Owner()

        if (!owner) {
            return res.status(400).json({ success: false, error: 'error' })
        }

        owner.firstName = firstName;
        owner.lastName = surname;
        owner.alias = alias;
        owner.biography = bio;
        owner.email = email;

        owner
            .save()
            .then(() => {
                return res.status(201).json({
                    success: true,
                    id: owner._id,
                    message: 'New Owner created!',
                })
            })
            .catch(error => {
                return res.status(400).json({
                    error,
                    message: 'Owner not created!',
                })
            })
    })





/*
BOOKING 
*/
router.post('/booking',function(req,res){
	
    var fullName = req.body.fullName;
    var email = req.body.email;
    var arrivalDate = new Date(req.body.arrivalDate).getTime() / 1000 ; //converting to unix 
    var departureDate = new Date(req.body.departureDate).getTime() / 1000 ;

    // Validate departure date & arrival date are max 3 days using unix epich time
    // https://www.epochconverter.com/
    if(departureDate < arrivalDate){
    	return res.status(400).send("Depature Date cannot be before than arrival date!!");
    }
    console.log(Date.parse(departureDate) > Date.parse(arrivalDate))
    if(Date.parse(departureDate) > Date.parse(arrivalDate)) {
    	return res.status(400).send("Wrong Dates Selected !");
    }

    var reservedDates = [];

    //Check if departure date & arrival date are already booked
    User.find().then( (users) =>{

	for (var i = users.length - 1; i >= 0; i--) {
			reservedDates.push(users[i].arrivalDate);
			reservedDates.push(users[i].departureDate);
		}

		if(reservedDates.includes(arrivalDate) && reservedDates.includes(departureDate) ){
			return res.status(400).send("Wrong Dates Selected !");
		} 
	});


    let user = new User({
	    name: fullName, 
	    email: email,
	    arrivalDate: arrivalDate,
	    departureDate: departureDate 
	});

    user.save().then((doc) =>{
		res.send("Reservation for " + doc.name + ' done Successfully! Booking Id : ' + doc._id);
	},(err)=>{
		res.status(400).send(err);
	});
});


router.get("/getUsers", (req, res) => {
    User.find().then( (users) =>{
        res.status(200)
        // res.json( users);
        return res.json({ success: true, users: users });

	},(err) =>{
		res.status(400).send(err);
   });
});



router.get("/getOwners", (req, res) => {

    Owner.find((err, fields) => {
        console.log(fields)

        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true, fields: fields });
    });
});

router.get("/getTest2", (req, res) => {

    Test2.find((err, fields) => {
        console.log(fields)

        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true, fields: fields });
    });
});


router.post("/Test2", (req, res) => {
    let data = new Test2();

    const { name } = req.body;
    //check the form is valie
    if (!name) {
        return res.json({
            success: false,
            error: "INVALID INPUTS"
        });
    }

    data.name = name;

    //save into collection the response body
    data.save(err => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true });
    });
});



router.post("/putData", (req, res) => {
    let data = new Owner();

    const { name } = req.body;
    //check the form is valie
    if (!name) {
        return res.json({
            success: false,
            error: "INVALID INPUTS"
        });
    }

    data.name = name;

    //save into collection the response body
    data.save(err => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true });
    });
});


router.post("/putData", (req, res) => {
    let data = new Owner();

    const { id, name, alias, email } = req.body;
    console.log(name)
    //check the form is valie
    if (!name) {
        return res.json({
            success: false,
            error: "INVALID INPUTS"
        });
    }


    data.name = name;
    data.alias = alias;
    data.email = email;
    data.id = id;
    //save into collection the response body
    data.save(err => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true });
    });
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
// app.get('*', (req, res) => {
//     console.log(__dirname)
//     res.sendFile(path.join(__dirname + '/build/index.html'));
// });

app.use("/api", router);

app.listen(process.env.PORT || API_PORT, () => console.log(`LISTENING ON UHH PORT ${API_PORT}`));
