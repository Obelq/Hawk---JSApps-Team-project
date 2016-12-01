import Requester from './RequesterModel';

export default class Team {
    static create (name, description, callback) {
        let teamData = {
            name: name,
            description: description
        };

        Requester
            .post('appdata', 'teams', 'kinvey', teamData)
            .then(() => callback(true))
            .catch(() => callback(false));
    }

    static loadTeams (callback) {
        Requester.get('appdata', 'teams', 'kinvey')
            .then(callback);
    }

    static loadDetails (teamId, callback) {
        Requester.get('appdata', `teams/${teamId}`, 'kinvey')
            .then(callback);
    }

    static edit (teamId, name, description, callback) {
        let teamData = {
            name: name,
            description: description
        };

        Requester
            .update('appdata', `teams/${teamId}`, 'kinvey', teamData)
            .then(() => callback(true))
            .catch(() => callback(false));
    }

    static delete (teamId, callback) {
        Requester
            .delete('appdata', `teams/${teamId}`, 'kinvey')
            .then(() => callback(true))
            .catch(() => callback(false));
    }
}
