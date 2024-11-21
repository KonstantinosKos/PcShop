const Server = "http://localhost:8080/api/"

export const login = async (username, password) => {
    try {
        const response= await fetch(Server + `webUser/user?username=${username}&password=${password}`, {
            method: "POST",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {"Content-Type": "application/json"},
            redirect: "follow",
            referrerPolicy: "no-referrer",
        });
        const data = await response.json();

        return {
            data,
            statusCode: response.status,
        };
    } catch (error) {
        console.error('Error during login:', error);
        throw error;
    }
};

export const signup = async (user) => {
    try {
        const response= await fetch(Server + `webUser`, {
            method: "POST",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {"Content-Type": "application/json"},
            redirect: "follow",
            referrerPolicy: "no-referrer",
            body: JSON.stringify(user),
        });
        const data = await response.json();
        return {data, statusCode: response.status, };
    } catch (error) {
        console.error('Error during signup:', error);
        throw error;
    }
}