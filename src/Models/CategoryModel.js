import Requester from './RequesterModel';

export default class CategoryModel {
    // static create (name) {
    //     let seedData = {
    //         name: name,
    //         amountOfSeeds: 0,
    //     };

    //     Requester
    //         .post('appdata', 'categories', 'kinvey', seedData)
    //         .then(() => callback(true))
    //         .catch(() => callback(false));
    // }

    static loadAll (callback) {
        Requester.get('appdata', 'categories', 'kinvey')
            .then(callback);
    }

    static getCategoryById (categoryId, callback) {
        Requester.get('appdata', 'categories/' + categoryId, 'kinvey')
            .then(callback);
    }

    // static edit (seedId, name, description, price, location, imageUrl, callback) {
    //     let seedData = {
    //         name: name,
    //         price: price,
    //         description: description,
    //         imageUrl: imageUrl,
    //         location: location
    //     };

    //     Requester
    //         .update('appdata', `seeds/${seedId}`, 'kinvey', seedData)
    //         .then(() => callback(true))
    //         .catch(() => callback(false));
    // }

    // static delete (seedId, callback) {
    //     Requester
    //         .delete('appdata', `seeds/${seedId}`, 'kinvey')
    //         .then(() => callback(true))
    //         .catch(() => callback(false));
    // }

    // static loadSeedsByCategoryId(categoryId, callback) {
    //     Requester.get('appdata', `seeds?query={"categoryId":"${categoryId}"}`, 'kinvey')
    //         .then(callback);
    // }
}
