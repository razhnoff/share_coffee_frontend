import React, { Fragment, useState, useEffect } from "react";
import Header from "../../components/Header";
import EventDesc from "../../events/components/EventDesc";
import { Switch, Route } from "react-router-dom";
import SingleTopic from "../SingleTopic";
import Preloader from "../../components/Preloader";
import Client from "../../services/api";

const Topics = props => {
    const [topics, setTopics] = useState([]);
    // eslint-disable-next-line no-unused-vars
    const [userData, setUserData] = useState({});
    // eslint-disable-next-line no-unused-vars
    const [userTopics, setUserTopics] = useState([]);
    const [userTopicsIds, setUserTopicsIds] = useState([]);
    const [isUserDataLoading, setIsUserDataLoading] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [pageCount, setPageCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentLoadingEvents, setCurrentLoadingEvents] = useState([]);

    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("_id");

    useEffect(() => {
        const fetchData = async () => {
            const subscriptionsDataResponse = await Client.getAllSubscriptions(userId, token);
            const userDataResponse = await Client.getUserData(userId, token);
            const topicsDataResponse = await Client.getAllTopics(token);

            setUserData(userDataResponse.data.data);
            setTopics(topicsDataResponse.data.data);
            setPageCount(topicsDataResponse.data.pages.total);
            setUserTopics(subscriptionsDataResponse.data.data);
            setUserTopicsIds(subscriptionsDataResponse.data.data.map(event => event.topicId));
            setIsUserDataLoading(true);
            setCurrentPage(1);
            setIsLoading(false);
        };

        fetchData();
    }, []);

    /**
     * For <BUTTON> subscribe/unsubscribe
     **/

    const handleSubscribing = async (topicId, func) => {
        setCurrentLoadingEvents([...currentLoadingEvents, topicId]);

        const response = await func(topicId, userId, token);

        await setUserData(response.data.data);
        await setCurrentLoadingEvents(currentLoadingEvents.filter(loadingEventId => loadingEventId !== topicId));
    };

    const handleSubscriptionClick = topicId => {
        handleSubscribing(topicId, Client.subscribeToTopic);
        setUserTopicsIds([...userTopicsIds, topicId]);
    };

    const handleUnsubscriptionClick = topicId => {
        handleSubscribing(topicId, Client.unsubscribeFromTopic);
        setUserTopicsIds(userTopicsIds.filter(id => id !== topicId));
    };

    /**
     * End <BUTTON> subscribe/unsubscribe
     **/

    const pagination = async pageNumber => {
        const topicsData = await Client.getAllTopics(pageNumber - 1);

        setTopics(topicsData.data.data);
        setCurrentPage(pageNumber);
    };

    const getEventsList = () => (
        <EventDesc
            className="event"
            events={topics}
            userEventsIds={userTopicsIds}
            onSubscriptionClick={topicId => handleSubscriptionClick(topicId)}
            onUnsubscriptionClick={topicId => handleUnsubscriptionClick(topicId)}
            isLoading={!isUserDataLoading}
            currentLoadingEvents={currentLoadingEvents}
            pageCount={pageCount}
            currentPage={currentPage}
            pagination={pageNumber => pagination(pageNumber)}
        />
    );

    const updateTopicsIds = async () => {
        const subscriptionsData = await Client.getAllSubscriptions(userId);

        setUserTopics(subscriptionsData.data.data);
        setUserTopicsIds(subscriptionsData.data.data.map(event => event.topicId));
    };

    if (isLoading) {
        return <Preloader />;
    }

    return (
        <Fragment>
            <Header
                isActive
                hasDepartment
                avatar={localStorage.getItem("avatar")}
                name={localStorage.getItem("firstName")}
                surName={localStorage.getItem("lastName")}
                permission={Number(localStorage.getItem("permission"))}
                location={props}
            />
            <main>
                <Switch>
                    <Route exact path="/subscriptions/" component={getEventsList} />
                    <Route
                        exact
                        path="/subscriptions/:id"
                        component={params => <SingleTopic userEventsIds={updateTopicsIds} {...params} />}
                    />
                </Switch>
            </main>
        </Fragment>
    );
};

export default  Topics;
