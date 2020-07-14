import React, { Fragment } from 'react';
import { Intro } from '../components/intro'
import FullWidthBanner from '../components/full-width-banner'
import { ImageGrid } from '../components/image-grid'

export default class Home extends React.Component {

      
    render() {
  
        return (
        <Fragment>
            <Intro />
            <FullWidthBanner />
            <ImageGrid />
        </Fragment>

        );
    }
}
