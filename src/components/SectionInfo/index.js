import React from "react";
import PropTypes from "prop-types";
import styles from "./scss/SectionInfo.module.scss";

const SectionInfo = ({ value }) => {
    return (
        <div className={styles.section__info}>
            <span>{value}</span>
        </div>
    );
};

SectionInfo.propTypes = {
    value: PropTypes.string.isRequired
};

export default SectionInfo;
