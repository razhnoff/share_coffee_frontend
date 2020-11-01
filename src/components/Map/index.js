import React from "react";
import PropTypes from "prop-types";
import YandexMap from "./maps/yandex";
import marker from "../../assets/icons/marker-icon.png";

/**
 * @params zoom: number, center: array of numbers, type: string
 * example: zoom: 5, center: [55.751574, 37.573856], type: "yandex#map"
 */

const TAG_ICON = {
    iconLayout: "default#image",
    iconImageHref: marker,
    iconImageSize: [30, 60],
    iconImageOffset: [0, 0],
    iconContentOffset: [0, 0]
};

const Map = ({ zoom, type, location }) => {
    const optionsMap = {
        type,
        zoom,
        center: location
    };
    return <YandexMap optionsMap={optionsMap} icon={TAG_ICON} />;
};

Map.propTypes = {
    type: PropTypes.string,
    zoom: PropTypes.number,
    location: PropTypes.array
};

Map.defaultProps = {
    type: "yandex#map",
    zoom: 5
};

export default Map;
