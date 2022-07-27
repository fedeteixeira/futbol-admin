const apiUrl = 'http://localhost:4000/api/v1';

export const authProvider = {
    // called when the user attempts to log in
    login: ({ username, password }) =>  {
        const request = new Request(`${apiUrl}/auth`, {
            method: 'POST',
            body: JSON.stringify({
                "identification": username,
                password
            }),
            headers: new Headers({ 'Content-Type': 'application/json' }),
        });
        return fetch(request)
            .then(response => {
                return response.json();
            })
            .then(auth => {
                if (auth.statusCode < 200 || auth.statusCode >= 300) {
                    if(auth.error) {
                        throw new Error(auth.error);
                    }
                    throw new Error(auth.statusError);
                }
                localStorage.setItem('auth', JSON.stringify(auth.data.user));
                // store the token in local storage
                localStorage.setItem('token', auth.data.token);
            })
            .catch((error) => {
                throw new Error(error);
            });
    },
    // called when the user clicks on the logout button
    logout: () => {
        localStorage.removeItem('auth');
        return Promise.resolve();
    },
    // called when the API returns an error
    checkError: ({ status }) => {
        if (status === 401 || status === 403) {
            localStorage.removeItem('auth');
            return Promise.reject();
        }
        return Promise.resolve();
    },
    // called when the user navigates to a new location, to check for authentication
    checkAuth: () => {
        return localStorage.getItem('auth')
            ? Promise.resolve()
            : Promise.reject();
    },
    // called when the user navigates to a new location, to check for permissions / roles
    getPermissions: () => Promise.resolve(),

    getIdentity: () => {
        try {
            const auth = JSON.parse(localStorage.getItem('auth'));
            const {identification, name, lastName, picture} = auth;
            return Promise.resolve({
                "id" : identification,
                "fullName": `${name} ${lastName}`,
                "avatar": picture,
            });
        } catch (error) {
            return Promise.reject(error);
        }
    }
};

export default authProvider;