import Requester from './RequesterModel';

function saveSession (userInfo) {
    sessionStorage.setItem('authToken', userInfo._kmd.authtoken);
    sessionStorage.setItem('userId', userInfo._id);
    sessionStorage.setItem('username', userInfo.username);
}

export default class User {
    static login (username, password, callback) {
        let userData = {
            username: username,
            password: password
        };

        Requester
            .post('user', 'login', 'basic', userData)
            .then((responseData) => {
                saveSession(responseData);
                callback(true);
            })
            .catch((error) => {
                callback(false)
            });
    }

    static register (username, password, callback) {
        let userData = {
            username: username,
            password: password
        };

        Requester
            .post('user', '', 'basic', userData)
            .then((responseData) => {
                saveSession(responseData);
                callback(true);
            })
            .catch((error) => {
                callback(false)
            });
    }

    static logout (callback) {
        Requester
            .post('user', '_logout', 'kinvey', null)
            .then((responseData) => {
                sessionStorage.clear();
                callback(true);
            })
            .catch((error) => {
                callback(false)
            });
    }
}
