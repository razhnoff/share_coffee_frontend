import React, { Fragment } from "react";
import PropTypes from "prop-types";
import InfoAboutEvent from "../../modules/InfoAboutEvent";
import PageTitle from "../../../components/PageTitle";
import EventName from "../../modules/EventName";
import SpinButton from "../../../components/SpinButton";
import { SUBSCRIBE, UNSUBSCRIBE } from "../../../constants";
import { Link } from "react-router-dom";
import { regularity } from "../../../helpers/helpers";
import Pagination from "../../../components/Pagination";

const EventDesc = ({
    events,
    onSubscriptionClick,
    onUnsubscriptionClick,
    userEventsIds,
    isLoading,
    pagination,
    pageCount,
    currentPage,
    currentLoadingEvents
}) => {
    const elements = events.map(event => {
        const isSubscribed = userEventsIds.includes(event._id);
        return (
            <div key={event._id} className="eventDescItem">
                <div className="eventContainer">
                    {isSubscribed ? (
                        <div className="selectedEvent">
                            <Link to={{ pathname: `/subscriptions/${event._id}` }}>
                                <EventName eventName={event.title} isSubscribed={event.active} />
                            </Link>
                            <span>Subscribed</span>
                        </div>
                    ) : (
                        <Link to={{ pathname: `/subscriptions/${event._id}` }}>
                            <EventName eventName={event.title} isSubscribed={event.active} />
                        </Link>
                    )}
                    <InfoAboutEvent
                        adress={event.address}
                        eventFrequency={event.cyclic && `Every ${regularity[event.weekDay]}, ${event.time}`}
                    />
                </div>
                {event.active ? (
                    <SpinButton
                        value={isSubscribed ? UNSUBSCRIBE : SUBSCRIBE}
                        type={isSubscribed ? UNSUBSCRIBE : SUBSCRIBE}
                        isLoading={isLoading || currentLoadingEvents.includes(event._id)}
                        onClick={() => {
                            if (isSubscribed) {
                                onUnsubscriptionClick(event._id);
                            } else {
                                onSubscriptionClick(event._id);
                            }
                        }}
                    />
                ) : (
                    <SpinButton
                        value={isSubscribed ? UNSUBSCRIBE : SUBSCRIBE}
                        type={isSubscribed ? UNSUBSCRIBE : SUBSCRIBE}
                        isLoading={isLoading || currentLoadingEvents.includes(event._id)}
                        disabled
                        onClick={() => {
                            if (isSubscribed) {
                                onUnsubscriptionClick(event._id);
                            } else {
                                onSubscriptionClick(event._id);
                            }
                        }}
                    />
                )}
            </div>
        );
    });
    return (
        <Fragment>
            <PageTitle title="Current topics" />
            <div className="eventDesc">{elements}</div>
            <Pagination pageCount={pageCount} change={pagination} startingPage={currentPage} />
        </Fragment>
    );
};

EventDesc.propTypes = {
    events: PropTypes.array,
    onSubscriptionClick: PropTypes.func,
    onUnsubscriptionClick: PropTypes.func,
    userEventsIds: PropTypes.array,
    isLoading: PropTypes.bool,
    pagination: PropTypes.func,
    pageCount: PropTypes.number,
    currentPage: PropTypes.number,
    currentLoadingEvents: PropTypes.array
};

EventDesc.defaultProps = {
    currentLoadingEvents: [],
    userEventsIds: []
};

export default EventDesc;
