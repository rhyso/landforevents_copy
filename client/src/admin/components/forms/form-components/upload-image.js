import React, { Component, useEffect } from 'react';
import axios from 'axios';
import { serverPath } from '../../../constants.js'
import getCurrentOwner from '../../../../api/getCurrentOwner'

class UploadImage extends Component {
  
  constructor(props){
    super(props);
    this.state = {
      success : false,
      url : "",
      //uid: `8oxQ3Op45HOfjisFqgIOhD0uqTX2`, //this needs to be got from login (maybe from admin redux store)hardcoded for now,
      uid: this.props.user, //hardcoded test just to get a user
      field: this.props.fieldId, //hardcoded for now, this should be asscoaited to the exact field the onwer is uploading images for
      userObject: null
    }
  }
  
  handleChange = (ev) => {
    this.setState({success: false, url : ""});
  }


  componentDidMount() {
    console.log(this.props)
    getCurrentOwner(this.props.user)
    .then ( response => console.log('tes', response))
  }

  // Perform the upload
  handleUpload = (ev) => {
    let file = this.uploadInput.files[0];
    // Split the filename to get the name and type
    let fileParts = this.uploadInput.files[0].name.split('.');
    let fileName = fileParts[0];
    let fileType = fileParts[1];
    console.log("Preparing the upload");
    axios.post("http://localhost:3001/api/sign_s3",{
      fileName : fileName,
      fileType : fileType
    })
    .then(response => {
      var returnData = response.data.data.returnData;
      var signedRequest = returnData.signedRequest;
      var url = returnData.url;
      this.setState({url: url})
      console.log("Recieved a signed request " + signedRequest);
      
     // Put the fileType in the headers for the upload
      var options = {
        headers: {
          'Content-Type': fileType
        }
      };
      axios.put(signedRequest,file,options)
      .then(result => {
        console.log("Response from s3")
        this.setState({success: true});
      })
      .catch(error => {
        console.log('error from s3?')
        alert("ERROR " + JSON.stringify(error));
      })
    })
    .catch(error => {
      alert(JSON.stringify(error));
    })
  }
  
  
  render() {
    const Success_message = () => {

      useEffect(() => {
          alert(this.state.url)
          alert(this.state.user)
          let values = {
            owner: this.state.uid,
            field: this.state.field,
            imageUrl: this.state.url
          }
          axios.post(`${serverPath}/api/addFieldImage`, values)
          .then(response => console.log(response))
          .catch((err) => console.log(err))
          .then(setTimeout(() =>
          window.alert(`You submitted:\n\n${JSON.stringify(values, null, 2)}`)
          , 700) )
  
      },[])

      return (
        <div style={{padding:50}}>
          <h3 style={{color: 'green'}}>SUCCESSFUL UPLOAD</h3>
          <a href={this.state.url}>Access the file here</a>
          <br/>
        </div>
      )
    }
    return (
      <div className="App">
        <center>
          <h1>UPLOAD YOUR IMAGE</h1>
          {this.state.success ? <Success_message/> : null}
          <input onChange={this.handleChange} ref={(ref) => { this.uploadInput = ref; }} type="file"/>
          <br/>
          <button onClick={this.handleUpload}>UPLOAD</button>
        </center>
      </div>
    );
  }
}
export default UploadImage;