import React, { Fragment } from "react";
import PropTypes from "prop-types";
import styles from "./scss/PageTitle.module.scss";

const PageTitle = ({ title, description, mouseOver, mouseOut, click, isShadowContainer }) => {
    const styleCheck = mouseOver ? styles.main__header__link : styles.main__header;

    return (
        <Fragment>
            <div className={styles.main}>
                <h1 className={styleCheck} onMouseOver={mouseOver} onMouseOut={mouseOut} onClick={click}>
                    {title}
                </h1>
                <p className={styles.main__description}>{description}</p>
            </div>
            {isShadowContainer && <div className={styles.shadow_container} />}
        </Fragment>
    );
};

PageTitle.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    mouseOver: PropTypes.func,
    mouseOut: PropTypes.func,
    click: PropTypes.func,
    isShadowContainer: PropTypes.bool
};

PageTitle.defaultProps = {
    isShadowContainer: true
};

export default PageTitle;
