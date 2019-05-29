import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../../common/Header";
import EventDesc from "../../events/components/EventDesc";
import { getCookie } from "tiny-cookie";
import { Switch, Route } from "react-router-dom";
import TopicFront from "../TopicFront";
import {
  GET_EVENTS,
  GET_ALL_TOPICS,
  GET_USER,
  SUBCR_USER_TO_TOPIC,
  SUBCR_USER_TO_EVENT,
  UNSUBCR_USER_FROM_EVENT,
  UNSUBCR_USER_FROM_TOPIC,
} from "../../constants";
import { checkTokenTime } from "../../helpers/requests";

const getAllTopics = token => {
  // checkTokenTime(sessionStorage.getItem("tokenTimeOver"));
  return axios({
    method: "get",
    url: GET_ALL_TOPICS,
    headers: {
      Authorization: `Bearer ${token}`,
      mode: "cors",
      "Content-Type": "application/json",
    },
  });
};

const getUser = (token, id) => {
  // checkTokenTime(sessionStorage.getItem("tokenTimeOver"));
  return axios({
    method: "get",
    url: GET_USER(id),
    headers: {
      Authorization: `Bearer ${token}`,
      mode: "cors",
      "Content-Type": "application/json",
    },
  });
  // .then(res => {
  //   console.log(res);
  //   return res;
  // })
  // .catch(err => {
  //   // console.log(err);
  //   return err;
  // });
};

const subscribeUserToTopic = (topicId, userId, token) => {
  // checkTokenTime(sessionStorage.getItem("tokenTimeOver"));
  // const userId = sessionStorage.getItem("id");
  return axios({
    method: "post",
    url: `https://forgeserver.herokuapp.com/api/topics/${topicId}/${userId}/`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const unsubsrcibeUserFromTopic = (topicId, userId, token) => {
  // checkTokenTime(sessionStorage.getItem("tokenTimeOver"));
  // const userId = sessionStorage.getItem("id");
  return axios({
    method: "delete",
    url: `https://forgeserver.herokuapp.com/api/topics/${topicId}/${userId}/`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
//--------------------------------------------------------

const SubscriptionsPage = props => {
  const [events, setEvents] = useState([]);
  const [userData, setUserData] = useState({});
  const [isUserDataLoaded, setIsUserDataLoaded] = useState(false);
  const [currentLoadingEvents, setCurrentLoadingEvents] = useState([]);
  const token = getCookie("token");
  //const userId = "5ce1147ca0c89f001e1c2a4b";
  const userId = sessionStorage.getItem("id");
  // console.log(userData);

  const handleSubscriptionClick = topicId => handleSubscribing(topicId, subscribeUserToTopic);
  const handleUnsubscriptionClick = topicId => handleSubscribing(topicId, unsubsrcibeUserFromTopic);
  const handleSubscribing = async (topicId, subscribingFunction) => {
    setCurrentLoadingEvents([...currentLoadingEvents, topicId]);
    const result = await subscribingFunction(topicId, userId, token);
    // setUserData(result.data);
    // console.log(result);
    setUserData(result.data.data);
    setCurrentLoadingEvents(
      currentLoadingEvents.filter(loadingEventId => loadingEventId !== topicId),
    );
  };
  //--------------------------------------------------------------------------

  useEffect(() => {
    const fetchData = async () => {
      const result = await getAllTopics(token);
      // console.log(result)
      setEvents(result.data.data);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getUser(token, userId);
      // console.log(result.data.data);
      setUserData(result.data.data);
      setIsUserDataLoaded(true);
    };

    fetchData();
  }, []);

  const EventFull = () => (
    <EventDesc
      className="event"
      events={events}
      userEvents={userData.events}
      onSubscriptionClick={topicId => handleSubscriptionClick(topicId)}
      onUnsubscriptionClick={topicId => handleUnsubscriptionClick(topicId)}
      isLoading={!isUserDataLoaded}
      currentLoadingEvents={currentLoadingEvents}
    />
  );
  return (
    <>
      <Header
        isActive={true}
        isAdmin={false}
        hasDepartment={true}
        avatar={sessionStorage.getItem("avatar")}
        name={`${sessionStorage.getItem("firstName")} ${sessionStorage.getItem("lastName")}`}
        location={props}
      />
      <main>
        <Switch>
          <Route exact path="/subscriptions/" component={EventFull} />
          <Route
            path="/subscriptions/:id"
            component={params => (
              <TopicFront
                userEvents={userData.events}
                onSubscriptionClick={topicId => handleSubscriptionClick(topicId)}
                onUnsubscriptionClick={topicId => handleUnsubscriptionClick(topicId)}
                isLoading={!isUserDataLoaded}
                currentLoadingEvents={currentLoadingEvents}
                {...params}
              />
            )}
          />
        </Switch>
      </main>
    </>
  );
};

export default SubscriptionsPage;
