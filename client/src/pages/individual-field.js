import React, { Component, Fragment } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import DatePickerField from '../components/fields/date-picker'
import Image, { Shimmer } from 'react-shimmer'
import { isEmpty } from 'ramda';
import ReactMapGL from 'react-map-gl';
import axios from 'axios';

import '../App.css';
import { Nav } from '../components/nav'
import Footer from "../components/footer"
import field_image from '../images/tester-image.jpg'; // temp untill imported from AWS bucket


class IndividualField extends Component { 
    // const { params: { owner, fieldId } } = match
    // = ({ match, location }) => {

    state = {
      field: null,
      fieldName: null,
      wedding: null,
      marquee: null,
      camping: null,
      location: null,
      dateStart: null,
      dateEnd: null,
      fieldSize: null,
      fieldCapacity: null,
      viewport: {
        width: 400,
        height: 400,
        latitude: 51.0730,
        longitude: -3.8000,
        zoom: 11,
        loaded:false
    }
    }

    componentDidMount() {
      console.log(this.props.match.params)
      console.log(this.props.match.params.fieldId)
      const { fieldId } = this.props.match.params.fieldId
      console.log('>>>', this.props.match.params.fieldId)


      fetch (`http://localhost:3001/api/fields/${this.props.match.params.owner}/${this.props.match.params.fieldId}`)
      .then( data => {
          console.log(data)
          return data.json()
        })
        .then ( data =>  {
           let fieldData = data.data
          // console.log(fieldData)
          // this.setState({field:fieldData})
         
        this.setState({ 
          field:fieldData,
          fieldName: fieldData.fieldName,
          wedding: fieldData.wedding,
          marquee: fieldData.marquee,
          camping: fieldData.camping,
          location: fieldData.location,
          dateStart: fieldData.dateStart,
          dateEnd: fieldData.dateEnd,
          fieldSize: fieldData.fieldSize,
          fieldCapacity: fieldData.fieldCapacity,
          images: fieldData.images,
        })
        console.log("state", this.state.field)
      }).then(data => {
        this.getLatLong()

      })
    }

    getLatLong = () => {
      console.log('getlat')
      axios.get(`http://api.postcodes.io/postcodes/${this.state.location}`)
      .then(response => this.setState({viewport:{
        ...this.state.viewport,
        latitude: response.data.result.latitude,
        longitude: response.data.result.longitude,
        loaded:true

      }}))
      .then(console.log(this.state))
      .catch(error => console.log(error) )
    }

  convertBool = (type) => (  type === true ? 'Yes' : 'No' )
    

  render(){
    let { fieldName, location, wedding, marquee, camping, images, dateStart, dateEnd, fieldSize, fieldCapacity } = this.state
    console.log(this.state.viewport)
    return (
      <>
      <div className="individual-field-page">
        <div className="wrapper">
            <Nav/>
            <div className="content">
                <div className="field-top-level-details">
                  <div className="image-gallery">
                    {
                      !isEmpty(images) ?
                      <Carousel>
                        { images && images.map(image=>(
                          <div>
                            <img src={image.imageUrl}/>
                          </div>
                        ))}
                      </Carousel> :
                      
                      <Image
                        src='https://source.unsplash.com/random/800x600'
                        fallback={<Shimmer width={800} height={600} />}
                      />

                    }
                  </div>
                  <br/>                  <br/>
                  <br/>
                  <br/>

                  <h1 className="field-name">{fieldName}</h1>
                  <h3 className="field-location">{location}</h3>
                  <div className="field-intro">
                    <p>
                    Perched high above the golden sands of Cornwall's Whitsand Bay, a fusion of
                    designer-led interiors and ever-changing ocean vistas flawlessly combine at Orlagh.
                    Offering an inspirational coastal escape that caters for all, whether it's re-connection for
                    those seeking time for two, adventure that you crave, or simply taking time to unwind in the hot tub;
                    Orlagh seamlessly fuses back-to-the-elements beach cabin appeal with luxe living.
                    </p>
                  </div>
                  <div className="field-inner">
                    <div className="field-details">
                      <div className="field-details-inner">
                          <ul className="field-facts">
                            <li>
                              <strong>Sleeps</strong>Up to 2 guests<br/>From £1,695 per week, £1,195 per short break
                            </li>
                            <li>
                              <strong>Field Capacity</strong>
                              {`The field has a maximum capacity of ${fieldCapacity} people`}
                            </li>
                            <li><strong>Accepts Weddings?</strong>{ this.convertBool(wedding)}</li>
                            <li><strong>Allows Marquees?</strong>{ <span>{this.convertBool(marquee)}</span>}</li>
                            <li><strong>Allows Camping?</strong>{ this.convertBool(camping)}</li>
                            <li><strong>Arrivals and departures</strong><span><span>Arrival Day:</span> Monday or Friday</span><span><span>Arrival Time:</span> 4pm</span><span><span>Departure Time:</span> 10am</span></li>
                            <li><strong>Field Size</strong><span>{`The site vary's in underluation and span depending on seasons but the approximate size is ${fieldCapacity} Hectares. More sizing can be seen via the map or from imagery provided`}</span></li>
                            <li><strong>Location</strong><span>{`The rough location is in ${location}`}</span></li>

                            <li><strong>Homestay includes</strong><span>Luxury welcome hamper, linen and towels, Sonos sound system throughout, TV with full Sky package, hot tub, outdoor shower, and WiFi internet.</span><span><a href="#housebook" onclick="return displayoverlayfacts(4952, 'housebook')" id="displayhousebookintro" class="propertyfactslink">House book</a> - your property and destination guide</span><span><a href="#whatsincluded" onclick="return displayoverlayfacts(4952,'whatsincluded')" id="displaywhatsincluded" class="propertyfactslink">Discover more little luxuries</a></span></li>
                            <li id="propertyotherinfo"><strong>Other information</strong><span><a href="/terms-conditions.asp?uniqueID=4952">Property terms and conditions</a></span><span><a href="/frequently-asked-questions.asp">Frequently asked questions</a></span><span><a href="/mobile-reception.asp" onclick="return displayoverlayfacts(4952, 'mobilereception')">Check mobile signal</a></span><span><a href="/self-catering/uk/cornwall/whitsand-bay/orlagh/share">Recommend to a friend</a></span></li>
                          </ul>
                      </div>                 
                    </div>

                  </div>
                  <div className="map-container">
                    
                    <ReactMapGL
                        {...this.state.viewport}
                        onViewportChange={(viewport) => this.setState({viewport})}
                        mapboxApiAccessToken= {`pk.eyJ1Ijoicmh5c290aG9tYXMiLCJhIjoiY2tiM3pkeGYxMGFzejMwbzJqdjUyd2hmOCJ9.Jtu8t97kvasM_z4qsgvHeQ`}
                        mapStyle='mapbox://styles/mapbox/streets-v11'
                        width="50vw"
                        height="50vh"
                      />
                  </div>
                  
                  <div className="field-enquire">
                    <h3>Enquire</h3>
                      { <DatePickerField fieldName={fieldName}/>}
                      {/* <h3>Get in touch</h3><p><a href="/self-catering/uk/cornwall/whitsand-bay/orlagh/enquire" class="nbutton">Enquire</a> <a href="https://secure.uniquehomestays.com/mybooking/book.asp?uniqueID=4952" class="nbutton">Book</a></p> */}
                  </div>
                </div>
            </div>

        </div>
        <Footer/>
      </div>
        </>
    )
  }
    }

    // <h1>{fieldName}</h1>
    // <h2>{location}</h2>
export default IndividualField




