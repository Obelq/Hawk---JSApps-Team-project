import Requester from './RequesterModel';

export default class SeedModel {
    static create (name, price, description, imageUrl, location, categoryId, discount, producer, model, callback) {
        let seedData = {
            name: name,
            price: Number(price),
            description: description,
            imageUrl: imageUrl,
            location: location,
            dateCreated: new Date(),
            likes: 0,
            discount: Number(discount),
            categoryId: categoryId,
            producer: producer,
            model: model
        };

        Requester
            .post('appdata', 'seeds', 'kinvey', seedData)
            .then((response) => callback(response))
            .catch(() => callback(false));
    }

    static loadSeeds (callback) {
        Requester.get('appdata', 'seeds', 'guest')
            .then(callback);
    }
    
    static loadNewestSeeds (callback) {
        Requester.get('appdata', 'seeds', 'guest')
            .then(callback);
    }

    static loadPromoSeeds (callback) {
        Requester.get('appdata', 'seeds', 'guest')
            .then(callback);
    }

    static loadDetails (seedId, callback) {
        Requester.get('appdata', `seeds/${seedId}`, 'kinvey')
            .then(callback);
    }

    static edit (seedId, name, description, price, location, imageUrl, discount, categoryId, model, producer, callback) {
        let seedData = {
            name: name,
            price: Number(price),
            description: description,
            imageUrl: imageUrl,
            location: location,
            discount: Number(discount),
            model: model,
            producer: producer,
            categoryId: categoryId,
            dateCreated: new Date()
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

    static loadSeedsByCategoryId(categoryId, callback) {
        Requester.get('appdata', `seeds?query={"categoryId":"${categoryId}"}`, 'kinvey')
            .then(callback);
    }

    static getSeedById(seedId, callback) {
        Requester.get('appdata', `seeds/` + seedId, 'guest')
            .then(callback);
    }
}

