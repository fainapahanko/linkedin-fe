class Api {

    static BASE_URL = "https://striveschool.herokuapp.com/api";

    static get USER() {
        console.log("USER", sessionStorage.getItem("username"));
        return sessionStorage.getItem("username");
    }

    static get PASSWORD() {
        return sessionStorage.getItem("password");
    }

    static get AUTH() {
        return btoa(Api.USER + ':' + Api.PASSWORD);
    }

    static get BASE_HEADERS() {
        return {
            Authorization: 'basic ' + Api.AUTH
        };
    }

    static async fetch(endpoint, method = 'GET', body, contentType = 'application/json') {
        console.log(endpoint);
        const headers = {...Api.BASE_HEADERS};
        if (contentType) headers["Content-type"] = contentType;
        try {
            let resp = await fetch(Api.BASE_URL + endpoint, {
                headers: headers,
                // mode: 'no-cors',
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
            request.onload = (res) => resolve(res);
            request.onerror = (error) => reject(error);
            request.send(body);
        });
    }
}

export default Api;