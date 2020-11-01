import React, { Fragment } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import Button from "../Button";
import { SUBSCRIBE, UNSUBSCRIBE } from "../../constants";
import styles from "./scss/SpinButton.module.scss";

const SpinButton = ({ disabled, isLoading, type, value, onClick }) => {
    return (
        <Button type={type} disabled={disabled || isLoading} onClick={onClick}>
            <Fragment>
                {isLoading && (
                    <div
                        className={classnames(styles.dots, {
                            [styles.greenDots]: type === SUBSCRIBE,
                            [styles.redDots]: type === UNSUBSCRIBE
                        })}>
                        <span />
                        <span />
                        <span />
                    </div>
                )}
                <div className={classnames({ [styles.hidden]: isLoading })}>{value}</div>
            </Fragment>
        </Button>
    );
};

SpinButton.propTypes = {
    type: PropTypes.string,
    isLoading: PropTypes.bool,
    value: PropTypes.string,
    disabled: PropTypes.bool,
    onClick: PropTypes.func
};

SpinButton.defaultProps = {
    isLoading: false
};

export default SpinButton;
