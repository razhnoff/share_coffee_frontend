import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import styles from "./scss/Button.module.scss";

const Button = ({ value, onClick, disabled, type }) => {
    const ClassName = classNames({
        [styles.subscribe]: type === "Subscribe",
        [styles.unsubscribe]: type === "Unsubscribe",
        [styles.primary]: type === "Primary",
        [styles.logout]: type === "Logout"
    });

    return (
        <button className={`${styles.section__btn} ${ClassName}`} onClick={onClick} disabled={disabled}>
            {value}
        </button>
    );
};

export default Button;

Button.propTypes = {
    value: PropTypes.node,
    onClick: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
    type: PropTypes.string
};

Button.defaultProps = {
    type: "Primary"
};
