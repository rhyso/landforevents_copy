import React, { Component } from 'react'
import ReactMapGL from 'react-map-gl';
import { Link } from "react-router-dom";
import { isEmpty } from 'ramda';
import Image, { Shimmer } from 'react-shimmer'

export class Search extends Component {

 //https://uber.github.io/react-map-gl/docs
constructor(){
    super();
    this.state = {
        pictures: [],
        viewport: {
            width: 400,
            height: 400,
            latitude: 51.0730,
            longitude: -3.8000,
            zoom: 8
        }
    }

}



//https://blog.hellojs.org/fetching-api-data-with-react-js-460fe8bbf8f2

componentDidMount() {
    fetch ('http://localhost:3001/api/getFields')
    .then( results => {
        return results.json()
    }).then (data => {
        let fields = data.fields.map((field, ix) => {
            console.log(field.images)

            const maxDiv = (ix % 3)
            const box = (maxDiv == 2) ? '<div className="box-lead">' : '';
            const boxEnd = (maxDiv == 2) ? '</div>' : '';

            return (
              
                <div class="activity first-activity">
                <Link to={`/fields/${field._id}`}>
                {isEmpty(field.images) ?
                      <Image
                          src='https://source.unsplash.com/random/800x600'
                          fallback={<Shimmer width={800} height={600} />}
                        />
                    // <img src="https://secure.uniquebookingservices.com/uf/activities-v6/100/thumb.jpg" srcset="https://secure.uniquebookingservices.com/uf/activities-v6/100/thumb.jpg 308w, https://secure.uniquebookingservices.com/uf/activities-v6/100/thumb@2x.jpg 616w" sizes="(max-width: 750px) calc(50vw - 28px), 308px" alt="New and Coming Soon - Collections" />
                    :
                    <Image
                        src={field.images[0].imageUrl} 
                        fallback={<Shimmer width={800} height={600} />}
                  />
                    //  <img src={field.images[0].imageUrl} sizes="(max-width: 750px) calc(50vw - 28px), 308px" alt="New and Coming Soon - Collections" />
                }
                    <h2>{field.fieldName}</h2><p>Be the first to see what´s soon to be joining the portfolio as well as the newest additions to our unique, hand-picked collection.&nbsp;</p><a class="activitylink" href="/unique-escapes/new-and-coming-soon/">View all</a>
                    </Link>
                </div>
            )
        })
        this.setState({fields:fields})
        console.log("state", this.state.fields)
    })
}

    render(){
        
        return (
            <div className="container2">
                {this.state.fields}
            </div>


        )
    }
}


export default Search



{/* <div className="field-box" key={field.results}>
<Link to={`/fields/${field._id}`}>
    <h4>{field.fieldName}</h4>
</Link>
<ul>
<li>Id: {field._id}</li>
    <li>Size: {field.fieldSize}</li>
    <li>Capacity: {field.fieldCapacity}</li>
    <img src="https://source.unsplash.com/random/?field,barn,event" alt="temp" />
    <li>Date Start?:{field.dateStart}</li>
    <li>Date End?:{field.dateEnd}</li>
    <li>Location:{field.location}</li>
    <li>Marquee?:{field.marquee}</li>
    <li>Camping?:{field.camping}</li>
    <li>Wedding?:{field.wedding}</li>
    <ReactMapGL
        {...this.state.viewport}
        mapboxApiAccessToken = 'pk.eyJ1Ijoicmh5c290aG9tYXMiLCJhIjoiY2poZ29ieHBhMDFuZTNjcmVpOTR4YXYxMSJ9._A7Cgg_9d8raGa5uDf2FCg'
        onViewportChange={(viewport) => this.setState({viewport})}
    />

</ul>
</div> */}

// const AllFields = fetched  => {

//     console.log(fetched)


//     return fetched ? (
//         <div>
//         <h1>fetched false</h1>
//         </div>
//     ) :  (
//         <div>
//         <h1>fetched true</h1>
//       </div>
//     )
// }

// export default AllFields