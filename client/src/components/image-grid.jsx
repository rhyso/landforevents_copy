// https://codepen.io/tvweinstock/pen/wegZEW/

import React from 'react';

const imgUrls = ['https://source.unsplash.com/PC_lbSSxCZE/800x600','https://source.unsplash.com/lVmR1YaBGG4/800x600','https://source.unsplash.com/5KvPQc1Uklk/800x600','https://source.unsplash.com/GtYFwFrFbMA/800x600','https://source.unsplash.com/Igct8iZucFI/800x600','https://source.unsplash.com/M01DfkOqz7I/800x600','https://source.unsplash.com/MoI_cHNcSK8/800x600','https://source.unsplash.com/M0WbGFRTXqU/800x600','https://source.unsplash.com/s48nn4NtlZ4/800x600','https://source.unsplash.com/E4944K_4SvI/800x600','https://source.unsplash.com/F5Dxy9i8bxc/800x600','https://source.unsplash.com/iPum7Ket2jo/800x600'
];
export class ImageGrid extends React.Component {
    constructor(props) {
        super(props);
        this.renderImageContent = this.renderImageContent.bind(this);
    }
    renderImageContent(src, index) {
        return (
            // <div onClick={(e) => this.openModal(e, index)}>
            <div>
                <img src={src} key={src} />
            </div>
        )
    }

    render() {
        return (
            <div className="gallery-container">
                <div className="gallery-grid">
                    {imgUrls.map(this.renderImageContent)}
                </div>

            </div>
        )
    }
}

