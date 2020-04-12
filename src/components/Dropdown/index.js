import React, { useState } from "react";
import PropTypes from "prop-types";
import { find, isEmpty, isNull } from "lodash-es";
import styles from "./scss/Dropdown.module.scss";
import Button from "../Button";
import { DEFAULT } from "../Button/constants";
import { getSortedList } from "../../helpers/helpers";
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
        onChange(item);
        setIsOpened(false);
    };

    const filteredOptions = getSortedList(
        options.filter(item => item.label !== selectedValue),
        "label",
        "asc"
    );

    return (
        <div className={`${styles.department_dropdown_container} ${isOpened && styles.department_focused}`}>
            <div className={styles.department_selection} onClick={() => setIsOpened(!isOpened)}>
                {selectedValue}
                <DropdownArrowIcon
                    className={`${styles.department_arrow} ${isOpened ? styles.department_rotated : ""}`}
                />
            </div>
            {isOpened && (
                <div className={styles.department_list}>
                    {filteredOptions.map(({ label, value: id }) => (
                        <Button
                            key={id}
                            type={DEFAULT}
                            onClick={() => {
                                handleClick(id);
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
    return isEmpty(value) || isNull(value) ? defaultValue : find(options, item => item.value === value).label;
}

Dropdown.defaultProps = {
    options: [],
    defaultValue: "Select Department"
};

Dropdown.propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func,
    options: PropTypes.array,
    defaultValue: PropTypes.string
};

export default Dropdown;
