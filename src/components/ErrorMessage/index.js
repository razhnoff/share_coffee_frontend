import React from "react";
import PropTypes from "prop-types";
import { BAN_MSG, ERROR_MSG } from "./constants";
import "./scss/ErrorMessage.scss";

const getClassName = messageType => {
    switch (messageType) {
        case BAN_MSG:
            return "form__ban";
        case ERROR_MSG:
            return "form__error";
        default:
            return "form__error";
    }
};

const ErrorMessage = ({ type, value, ...rest }) => {
    const className = getClassName(type);

    return (
        <div className={"form__error-wrapper js-form__err-animation"} {...rest}>
            <p className={className}>{value}</p>
        </div>
    );
};

ErrorMessage.propTypes = {
    type: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired
};

export default ErrorMessage;
