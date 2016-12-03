import Requester from './RequesterModel';

export default class Seed {
    static create (name, price, description, imageUrl, location, callback) {
        let seedData = {
            name: name,
            price: price,
            description: description,
            imageUrl: imageUrl,
            location: location
        };

        Requester
            .post('appdata', 'seeds', 'kinvey', seedData)
            .then(() => callback(true))
            .catch(() => callback(false));
    }

    static loadSeeds (callback) {
        Requester.get('appdata', 'seeds', 'kinvey')
            .then(callback);
    }

    static loadDetails (teamId, callback) {
        Requester.get('appdata', `seeds/${teamId}`, 'kinvey')
            .then(callback);
    }

    static edit (seedId, name, description, price, location, imageUrl, callback) {
        let seedData = {
            name: name,
            price: price,
            description: description,
            imageUrl: imageUrl,
            location: location
        };

        Requester
            .update('appdata', `seeds/${seedId}`, 'kinvey', seedData)
            .then(() => callback(true))
            .catch(() => callback(false));
    }

    static delete (seedId, callback) {
        Requester
            .delete('appdata', `seeds/${seedId}`, 'kinvey')
            .then(() => callback(true))
            .catch(() => callback(false));
    }
}
