import $ from 'jquery';

const kinveyBaseUrl = 'https://baas.kinvey.com';
const kinveyAppKey = 'kid_S1xqDgAGe';
const kinveyAppSecret = 'c50e91b08e084933a6a58b109492d445';

function getHeaders (auth) {
    let headers = {
        'Authorization': '',
        'Content-Type': 'application/json'
    };

    switch (auth) {
        case 'basic':
            headers['Authorization'] = 'Basic ' + btoa(`${kinveyAppKey}:${kinveyAppSecret}`)
            break;
        case 'kinvey':
            headers['Authorization'] = `Kinvey ${sessionStorage.getItem('authToken')}`;
            break;
        default:
            headers = undefined;
            break;
    }

    return headers;
}

export default class Requester {
    static get (module, url, auth) {
        let hostUrl = `${kinveyBaseUrl}/${module}/${kinveyAppKey}/${url}`;
        let headers = getHeaders(auth);
    
        return $.ajax({
            method: 'GET',
            url: hostUrl,
            headers: headers
        });
    }

    static post (module, url, auth, data) {
        let hostUrl = `${kinveyBaseUrl}/${module}/${kinveyAppKey}/${url}`;
        let headers = getHeaders(auth);
        let request = {
            method: 'POST',
            url: hostUrl,
            headers: headers
        };

        if (data) {
            request.data = JSON.stringify(data);
        }

        return $.ajax(request);
    }

    static update (module, url, auth, data) {
        let hostUrl = `${kinveyBaseUrl}/${module}/${kinveyAppKey}/${url}`;
        let headers = getHeaders(auth);
        let request = {
            method: 'PUT',
            url: hostUrl,
            headers: headers,
            data: JSON.stringify(data)
        };

        return $.ajax(request);
    }

    
    static delete (module, url, auth) {
        let hostUrl = `${kinveyBaseUrl}/${module}/${kinveyAppKey}/${url}`;
        let headers = getHeaders(auth);
        let request = {
            method: 'DELETE',
            url: hostUrl,
            headers: headers
        };

        return $.ajax(request);
    }
}
