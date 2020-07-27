import React from 'react';

// https://codepen.io/scanfcode/pen/MEZPNd

//other examples https://onaircode.com/html-css-footer-design-examples/

const Footer = () => (

    <footer className="site-footer">
        <div className="container">
        <small>You are running this application in <b>{process.env.NODE_ENV}</b> mode.</small>

               <div className="title-and-desc">
                    <h1>Fields & Barns</h1>
                    <h4>More than just a collection of fields and barns for hire, we’re sharing and showcasing the best of the British landscape. From coast to country, we’re working with farmers and landowners alike to share with you those special, one of a kind spaces and places.</h4>
               </div>

                <div className="view">
                    <h4>View</h4>
                    <h2>Home</h2>
                    <h2>Fields</h2>
                    <h2>Barns</h2>
                    <h2>Weddings & Events</h2>
                    <h2>Camping</h2>

                </div>

                <div className="book">
                    <h4>Book</h4>
                    <h2>Owners</h2>
                    <h2>FAQ</h2>
                </div>

                <div className="admin">
                    <h4>Admin</h4>
                    <h2>Login</h2>
                </div>
            </div>
            {/* <div className="copyright">
                     <small class="footer__legal">© 2020 Fields and Barns. All Rights Reserved.</small>
            </div> */}
    </footer>
    )


export default Footer


