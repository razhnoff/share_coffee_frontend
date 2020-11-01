import axios from "axios";

const SERVER = "https://forgeserver.herokuapp.com/";

class Client {
    constructor() {
        this.client = axios.create({
            baseURL: SERVER
        });

        this.subscribeToTopic = this.subscribeToTopic.bind(this);
        this.unsubscribeFromTopic = this.unsubscribeFromTopic.bind(this);
    }

    get getCommonHeaders() {
        return {
            "Content-Type": "application/json"
        };
    }

    getAuthHeader(token) {
        return {
            Authorization: `Bearer ${token}`
        };
    }

    changeUserPosition(error) {
        if (error.response.status === 401) {
            window.location.replace("/");
            localStorage.clear();
        }
    }

    async getDepartments(token) {
        const response = await this.client
            .get("api/departments/", {
                headers: {
                    ...this.getAuthHeader(token),
                    ...this.getCommonHeaders
                }
            })
            .catch(e => {
                this.changeUserPosition(e);
                console.error(e.message);
            });

        return response;
    }

    async userAuth(data) {
        const response = await this.client.post("login/", data, { headers: this.getCommonHeaders }).catch(e => {
            this.changeUserPosition(e);
            console.error(e.message);
        });

        return response;
    }

    async setUserDepartment(userId, data, token) {
        const response = await this.client
            .put(`api/users/${userId}`, data, { headers: { ...this.getCommonHeaders, ...this.getAuthHeader(token) } })
            .catch(e => {
                this.changeUserPosition(e);
                console.error(e.message);
            });

        return response;
    }

    async getUpcomingEvents(userId, token) {
        const response = await this.client
            .get(`api/users/${userId}/upcoming`, {
                headers: { ...this.getCommonHeaders, ...this.getAuthHeader(token) }
            })
            .catch(e => {
                this.changeUserPosition(e);
                console.error(e.message);
            });

        return response;
    }

    async getAllTopics(token, page = 0, limit = 5) {
        const response = await this.client
            .get(`api/topics/?page=${page}&limit=${limit}`, {
                headers: { ...this.getCommonHeaders, ...this.getAuthHeader(token) }
            })
            .catch(e => {
                this.changeUserPosition(e);
                console.error(e.message);
            });

        return response;
    }

    async getAllSubscriptions(userId, token) {
        const response = await this.client
            .get(`api/subscriptions/?userId=${userId}`, {
                headers: {
                    ...this.getCommonHeaders,
                    ...this.getAuthHeader(token)
                }
            })
            .catch(e => {
                this.changeUserPosition(e);
                console.error(e.message);
            });

        return response;
    }

    async subscribeToTopic(topicId, userId, token) {
        const response = await this.client
            .post(`api/topics/${topicId}/${userId}/`, {
                headers: {
                    ...this.getCommonHeaders,
                    ...this.getAuthHeader(token)
                }
            })
            .catch(e => {
                this.changeUserPosition(e);
                console.error(e.message);
            });

        return response;
    }

    async unsubscribeFromTopic(topicId, userId, token) {
        const response = await this.client
            .delete(`api/topics/${topicId}/${userId}/`, {
                ...this.getCommonHeaders,
                ...this.getAuthHeader(token)
            })
            .catch(e => {
                this.changeUserPosition(e);
                console.error(e.message);
            });

        return response;
    }

    async getTopic(topicId, token) {
        const response = await this.client
            .get(`api/topics/${topicId}`, {
                headers: {
                    ...this.getCommonHeaders,
                    ...this.getAuthHeader(token)
                }
            })
            .catch(e => {
                this.changeUserPosition(e);
                console.error(e.message);
            });

        return response;
    }

    async getSubscription(topicId, userId, token) {
        const response = await this.client
            .get(`api/subscriptions/?userId=${userId}&topicId=${topicId}`, {
                headers: {
                    ...this.getCommonHeaders,
                    ...this.getAuthHeader(token)
                }
            })
            .catch(e => {
                this.changeUserPosition(e);
                console.error(e.message);
            });

        return response;
    }

    async getAllEvents() {
        const response = await this.client.get("api/events/").catch(e => {
            this.changeUserPosition(e);
            console.error(e.message);
        });

        return response;
    }

    async getUserData(userId, token) {
        const response = await this.client
            .get(`api/users/${userId}`, {
                headers: {
                    ...this.getCommonHeaders,
                    ...this.getAuthHeader(token)
                }
            })
            .catch(e => {
                this.changeUserPosition(e);
                console.error(e.message);
            });

        return response;
    }
}

export default new Client();
