import React, { Fragment, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { isEmpty } from "lodash-es";
import htmlParser from "html-react-parser";
import EventMap from "../../components/Map";
import PageTitle from "../../components/PageTitle";
import SpinButton from "../../components/SpinButton";
import Preloader from "../../components/Preloader";
import Client from "../../services/api";
import { SUBSCRIBE, UNSUBSCRIBE } from "../../constants";

const SingleTopic = props => {
    const [linkHover, setLinkHover] = useState(false);
    const [eventData, setEventData] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [events, setEvents] = useState([]);

    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("_id");

    useEffect(() => {
        const fetchData = async () => {
            const topicId = props.match.params.id;
            const eventDataResponse = await Client.getTopic(topicId, token);
            const subscriptionData = await Client.getSubscription(topicId, userId, token);

            setEventData(eventDataResponse.data.data[0]);
            setIsSubscribed(!!subscriptionData.data.data[0]);
            setIsLoading(false);
        };

        fetchData();
    }, []);

    /**
     * For <BUTTON> subscribe/unsubscribe
     **/

    const handleSubscribing = async (topicId, func) => {
        setIsSubscribed(!isSubscribed);
        setEvents([...events, topicId]);
        await func(topicId, userId, token);
        await setEvents(events.filter(loadingEventId => loadingEventId !== topicId));
    };

    const handleSubscriptionClick = topicId => {
        handleSubscribing(topicId, Client.subscribeToTopic);
    };

    const handleUnsubscriptionClick = topicId => {
        handleSubscribing(topicId, Client.unsubscribeFromTopic);
    };

    /**
     * End <BUTTON> subscribe/unsubscribe
     **/

    /**
     *  Mouse events for <PAGETITLE> link
     **/

    const mouseClick = () => {
        props.userEventsIds();
        props.history.goBack();
    };

    const mouseOver = () => {
        setLinkHover(true);
    };

    const mouseOut = () => {
        setLinkHover(false);
    };

    /**
     * End mouse events for <PAGETITLE> link
     * */

    // eslint-disable-next-line no-unused-vars
    const toEdit = () => {
        props.history.push(`/admin/topic-create/${userId}`);
    };

    if (isLoading) {
        return <Preloader />;
    }

    return (
        <Fragment>
            <PageTitle
                title={linkHover ? "← Back" : eventData.title}
                mouseOver={mouseOver}
                mouseOut={mouseOut}
                click={mouseClick}
            />
            <div className="topic-wrapper">
                <div className="map-section_container">
                    <div className="section_header">
                        <h2>{`Topic: ${eventData.title}`}</h2>
                        <SpinButton
                            value={isSubscribed ? UNSUBSCRIBE : SUBSCRIBE}
                            type={isSubscribed ? UNSUBSCRIBE : SUBSCRIBE}
                            isLoading={isLoading || events.includes(props.match.params.id)}
                            disabled={!eventData.active}
                            onClick={() => {
                                if (isSubscribed) {
                                    handleUnsubscriptionClick(props.match.params.id);
                                } else {
                                    handleSubscriptionClick(props.match.params.id);
                                }
                            }}
                        />
                    </div>
                    <p className="section__descr">{htmlParser(eventData.description)}</p>
                    <div className="section__place">
                        <h3 className="section__topic__title">Place:</h3>
                        <p className="place__descr">{eventData.address}</p>
                    </div>
                    <div className="time__descr">
                        <h3 className="section__topic__title">Time:</h3>
                        <p className="time__descr">{eventData.time}</p>
                    </div>
                    <div className="map__descr">
                        <h3 className="section__topic__title">Map:</h3>
                        {isEmpty(eventData.location) ? (
                            <span>Map is not ready</span>
                        ) : (
                            <EventMap location={eventData.location} />
                        )}
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

SingleTopic.propTypes = {
    history: PropTypes.object,
    match: PropTypes.shape({
        params: PropTypes.shape({
            id: PropTypes.string
        })
    }),
    isLoading: PropTypes.bool,
    isAdmin: PropTypes.bool,
    userEventsIds: PropTypes.func
};

export default SingleTopic;
