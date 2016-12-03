import $ from 'jquery';

const kinveyBaseUrl = 'https://baas.kinvey.com';
const kinveyAppKey = 'kid_SJqfW4lXg';
const kinveyAppSecret = '44b591000b3240c3a759a3a10859fbd8';

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

let a = $('a');
$(document).on({
    ajaxStart: function () {
        a.unbind("click");
        a.unbind("keyup");
    },
    ajaxStop: function () {
        a.bind("click");
        a.bind("keyup");
    }
});

