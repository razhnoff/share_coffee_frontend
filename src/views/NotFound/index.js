import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Button from "../../components/Button";

const NotFound = props => {
    const clearify = history => {
        history.push("/");
        localStorage.clear();
    };

    return (
        <Fragment>
            <Header permission={0} />
            <div className="notfound_container">
                <div className="login_container">
                    <h1>404</h1>
                    <h2>Page not found</h2>
                    <div className="btn_container">
                        <Button onClick={() => clearify(props.history)}>Back to main page</Button>
                    </div>
                </div>
            </div>
            <Footer />
        </Fragment>
    );
};

NotFound.propTypes = {
    history: PropTypes.object
};

export default NotFound;
