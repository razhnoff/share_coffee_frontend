import React from "react";
import PropTypes from "prop-types";
import { YMaps, Map, Placemark } from "react-yandex-maps";

const YandexMap = ({ optionsMap, icon }) => {
    const { center } = optionsMap;

    return (
        <YMaps>
            <Map defaultState={optionsMap} className="map__container">
                <Placemark geometry={center} options={icon} />
            </Map>
        </YMaps>
    );
};

YandexMap.propTypes = {
    optionsMap: PropTypes.object,
    icon: PropTypes.object
};

export default YandexMap;
