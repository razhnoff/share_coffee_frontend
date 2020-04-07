import React, { useState } from "react";
import PropTypes from "prop-types";
import { find, isEmpty, isNull } from "lodash-es";
import "./scss/Dropdown.scss";
import Button from "../Button";
import { DEFAULT } from "../Button/constants";
import { ReactComponent as DropdownArrowIcon } from "../../assets/icons/DropdownArrow.svg";

/**
 * Atomic dropdown component
 * @param options (array of label-value objects)
 * example: [{label: "label1", id: "value1"}, {label: "label2", id: "value2"}]
 */

const Dropdown = ({ options, value, defaultValue, onChange }) => {
    const [isOpened, setIsOpened] = useState(false);
    const selectedValue = getLabelById(options, value, defaultValue);

    const handleClick = item => {
        console.warn(item);
        onChange(item);
        setIsOpened(false);
    };

    const filteredOptions = options.filter(item => item.label !== selectedValue);

    return (
        <div className={`department-dropdown_container ${isOpened && "department-focused"}`}>
            <div className="department-selection" onClick={() => setIsOpened(!isOpened)}>
                {selectedValue}
                <DropdownArrowIcon className={`department-arrow ${isOpened ? "department-rotated" : ""}`} />
            </div>
            {isOpened && (
                <div className="department-list">
                    {filteredOptions.map(({ label, id }) => (
                        <Button
                            key={id}
                            type={DEFAULT}
                            onClick={() => {
                                handleClick(label);
                            }}
                            style={{ marginTop: "5px" }}>
                            {label}
                        </Button>
                    ))}
                </div>
            )}
        </div>
    );
};

function getLabelById(options, value, defaultValue) {
    return isEmpty(value) || isNull(value) ? defaultValue : find(options, item => item.label === value).label;
}

Dropdown.defaultProps = {
    options: []
};

Dropdown.propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func,
    options: PropTypes.array,
    defaultValue: PropTypes.string
};

export default Dropdown;
