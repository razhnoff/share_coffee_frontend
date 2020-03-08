import React from "react";
import PropTypes from "prop-types";
import "./scss/SectionInfo.scss";

const SectionInfo = ({ value }) => {
    return (
        <div className="section__info">
            <span>{value}</span>
        </div>
    );
};

SectionInfo.propTypes = {
    value: PropTypes.string.isRequired
};

export default SectionInfo;
