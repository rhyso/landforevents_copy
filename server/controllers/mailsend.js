const mailjet = require ('node-mailjet')
.connect('29d7591a990c7018b16480efa5de3217', '1cd14fb53371b93a9d59c027c64f88c7')


// Now lets export this function so we can call it from somewhere else
exports.mailjet = (req,res) => {
 
    console.log('hit mail send')

   const startDate = req.body.startDate 
   const endDate = req.body.endDate;
   const fieldName = req.body.fieldName;
   const email = req.body.email;



  const request = mailjet
.post("send", {'version': 'v3.1'})
.request({
  "Messages":[
    {
      "From": {
        "Email": "rhyswork@gmail.com",
        "Name": "Rhys"
      },
      "To": [
        {
          "Email": "rhyswork@gmail.com",
          "Name": "Rhys"
        }
      ],
      "Subject": `Enquiry about ${fieldName}`,
      "TextPart": "My first Mailjet email",
      "HTMLPart": `A user would like to enquire about ${fieldName} for the dates ${startDate} to ${endDate}. Their email is ${email}`,
      "CustomID": "AppGettingStartedTest"
    }
  ]
})
request
  .then((result) => {
    console.log(result.body)
    return (result.body)
  })
  .catch((err) => {
    console.log(err.statusCode)
  })

}