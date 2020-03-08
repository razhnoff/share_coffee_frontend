import React, { useState } from "react";
import PropTypes from "prop-types";
import List from "./List";
import "./scss/Dropdown.scss";
import { ReactComponent as DropdownArrowIcon } from "./assets/DropdownArrow.svg";

let timeOutId = null;

const getLabelByValue = (options, value) => {
    const option = (options || []).find(item => item.value === value);

    return option.label;
};

/**
 * Atomic dropdown component
 * @param options (array of label-value objects)
 * example: [{label: "label1", value: "value1"}, {label: "label2", value: "value2"}]
 */
const Dropdown = ({ options, selectedValue, onSelect }) => {
    const [isOpened, setIsOpened] = useState(false);
    const selection = selectedValue ? getLabelByValue(options, selectedValue) : "Select department";

    return (
        <div
            onFocus={() => clearTimeout(timeOutId)}
            onBlur={() => {
                timeOutId = setTimeout(() => {
                    setIsOpened(false);
                });
            }}
            className={`department-dropdown_container ${isOpened ? "department-focused" : ""}`}>
            <div tabIndex="0" className="department-selection" onClick={() => setIsOpened(!isOpened)}>
                {selection}
                <DropdownArrowIcon className={`department-arrow ${isOpened ? "department-rotated" : undefined}`} />
            </div>
            {isOpened && (
                <List
                    onItemClick={value => {
                        onSelect(value);
                        setIsOpened(false);
                    }}
                    options={options}
                />
            )}
        </div>
    );
};

Dropdown.propTypes = {
    selectedValue: PropTypes.string,
    onSelect: PropTypes.func,
    options: PropTypes.array
};

export default Dropdown;
