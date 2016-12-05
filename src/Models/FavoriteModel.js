import Requester from './RequesterModel';

export default class SeedModel {
    static create (userId, favorites, callback) {
        let favoriteData = {
            userId: userId,
            favorites: [null]
        };

        Requester
            .post('appdata', 'favorites', 'kinvey', favoriteData)
            .then((response) => callback(response))
            .catch(() => callback(false));
    }

    static loadFavorites (callback) {
        Requester.get('appdata', 'favorites', 'kinvey')
            .then(callback);
    }

    static loadDetails (seedId, callback) {
        Requester.get('appdata', `favorites/${seedId}`, 'kinvey')
            .then(callback);
    }

    static edit (userId, favorites, callback) {
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


    // static loadSeedsByCategoryId(categoryId, callback) {
    //     Requester.get('appdata', `seeds?query={"categoryId":"${categoryId}"}`, 'kinvey')
    //         .then(callback);
    // }

    // static getSeedById(seedId, callback) {
    //     Requester.get('appdata', `seeds/` + seedId, 'kinvey')
    //         .then(callback);
    // }
}

