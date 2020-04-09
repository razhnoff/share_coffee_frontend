import React from "react";
import PropTypes from "prop-types";
import { BAN_MSG, ERROR_MSG } from "./constants";
import styles from "./scss/ErrorMessage.module.scss";

const getClassName = messageType => {
    switch (messageType) {
        case BAN_MSG:
            return styles.form__ban;
        case ERROR_MSG:
            return styles.form__error;
        default:
            return styles.form__error;
    }
};

const ErrorMessage = ({ type, value, ...rest }) => {
    const className = getClassName(type);

    return (
        <div className={`${styles.form__error_wrapper} ${styles.js_form__err_animation}`} {...rest}>
            <p className={className}>{value}</p>
        </div>
    );
};

ErrorMessage.propTypes = {
    type: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired
};

export default ErrorMessage;
