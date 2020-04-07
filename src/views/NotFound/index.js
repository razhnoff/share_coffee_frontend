import React, { Fragment } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const NotFound = () => {
    return (
        <Fragment>
            <Header/>
            <div className="notfound_container">
                <div className="login_container">
                    <h1>404</h1>
                    <h2>Page not found</h2>
                    <div className="btn_container">
                    </div>
                </div>
            </div>
            <Footer/>
        </Fragment>
    );
};

export default NotFound;
