import {ajax} from "rxjs/ajax";

class Api {

    static BASE_URL = "http://localhost:3333";
    //static BASE_URL = "https://linkedin-api-be.herokuapp.com";

    static get USER() {
        console.log("USER", sessionStorage.getItem("username"));
        return sessionStorage.getItem("username");
    }

    static get PASSWORD() {
        return sessionStorage.getItem("password");
    }

    static get AUTH() {
        const user = Api.USER;
        const pass = Api.PASSWORD;
        const b = btoa(user + ':' + pass);
        console.log(b);
        return b
    }

    static get BASE_HEADERS() {
        return {
            Authorization: 'Basic ' + Api.AUTH
        };
    }

    static async ajax(endpoint, method = 'GET', body, contentType = 'application/json') {
        const headers = {...Api.BASE_HEADERS};
        if (contentType) headers["Content-type"] = contentType;
        console.log(headers);
        const res = await ajax({
            url: Api.BASE_URL + endpoint,
            method,
            headers,
            body,
            //withCredentials: true
        }).toPromise();
        return JSON.parse(res);
    }

    static async fetch(endpoint, method = 'GET', body, contentType = 'application/json') {
        console.log(endpoint);
        const headers = {...Api.BASE_HEADERS};
        if (contentType) headers["Content-type"] = contentType;
        console.log(headers)
        try {
            let resp = await fetch(Api.BASE_URL + endpoint, {
                headers: headers,
                //mode: 'no-cors',
                //credentials: 'include',
                method,
                body
            });
            return await resp.json();
        } catch (e) {
            console.error(e);
            return null;
        }

    }

    static async checkAuth(endpoint, method = 'GET', body, contentType = 'application/json') {
        console.log(endpoint);
        if (contentType) Api.BASE_HEADERS["Content-type"] = contentType;
        try {
            let resp = await fetch(Api.BASE_URL + endpoint, {
                headers: Api.BASE_HEADERS,
                // mode: 'no-cors',
                method,
                body
            });
            return resp;
        } catch (e) {
            console.error(e);
            return null;
        }

    }

    static request(endpoint, method = 'GET', body) {
        return new Promise((resolve, reject) => {
            var request = new XMLHttpRequest();
            request.open(method, Api.BASE_URL + endpoint, true);
            request.setRequestHeader("Authorization", "basic " + Api.AUTH);
            request.onload = (res) => resolve(JSON.parse(request.response));
            request.onerror = (error) => reject(error);
            request.send(body);
        });
    }
}

export default Api;