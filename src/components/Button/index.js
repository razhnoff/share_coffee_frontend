import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { SUBSCRIBE, EVENT, DEFAULT, PRIMARY, UNSUBSCRIBE, SELECT } from "./constants";
import styles from "./scss/Button.module.scss";

const Button = ({ children, onClick, disabled, type, ...rest }) => {
    const ClassName = classNames({
        [styles.subscribe]: type === SUBSCRIBE,
        [styles.unsubscribe]: type === UNSUBSCRIBE,
        [styles.primary]: type === PRIMARY,
        [styles.default]: type === DEFAULT,
        [styles.event]: type === EVENT,
        [styles.select]: type === SELECT
    });

    return (
        <button className={`${styles.section__btn} ${ClassName}`} onClick={onClick} disabled={disabled} {...rest}>
            {children}
        </button>
    );
};

Button.propTypes = {
    children: PropTypes.node,
    onClick: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
    type: PropTypes.string
};

Button.defaultProps = {
    type: PRIMARY
};

export default Button;
