import Requester from './RequesterModel';

export default class CommentModel {
    static create (content, authorName, seedId, callback) {
        let commentData = {
            content: content,
            authorName: authorName,
            seedId: seedId,
            date: new Date()
        };

        Requester
            .post('appdata', 'comments', 'kinvey', commentData)
            .then((response) => callback(response))
            .catch(() => callback(false));
    }

    static loadComments (callback) {
        Requester.get('appdata', 'comments', 'guest')
            .then(callback);
    }

    static edit (content, authorName, seedId, callback) {
        let seedData = {
            content: content,
            authorName: authorName,
            seedId: seedId,
            date: new Date()
        };

        Requester
            .update('appdata', `comments/${seedId}`, 'kinvey', seedData)
            .then(() => callback(true))
            .catch(() => callback(false));
    }

    static delete (seedId, callback) {
        Requester
            .delete('appdata', `comments/${seedId}`, 'kinvey')
            .then(() => callback(true))
            .catch(() => callback(false));
    }
}

