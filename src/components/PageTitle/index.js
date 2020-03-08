import React, { Fragment } from "react";
import PropTypes from "prop-types";
import "./scss/PageTitle.scss";

const PageTitle = ({ title, description, mouseOver, mouseOut, click, withShadowContainer }) => {
    const styleCheck = mouseOver ? "main__header__link" : "main__header";
    return (
        <Fragment>
            <div className="main">
                <h1 className={styleCheck} onMouseOver={mouseOver} onMouseOut={mouseOut} onClick={click}>
                    {title}
                </h1>
                <p className="main__description">{description}</p>
            </div>
            {withShadowContainer && <div className="shadow_container" />}
        </Fragment>
    );
};

PageTitle.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    mouseOver: PropTypes.bool,
    mouseOut: PropTypes.bool,
    click: PropTypes.func,
    withShadowContainer: PropTypes.bool
};

PageTitle.defaultProps = {
    withShadowContainer: true,
    mouseOver: false
};

export default PageTitle;
