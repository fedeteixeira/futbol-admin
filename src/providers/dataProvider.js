import { fetchUtils } from 'react-admin';
import { stringify } from 'query-string';

const apiUrl = 'http://localhost:4000/api/v1';
const httpClient = fetchUtils.fetchJson;
let options = {};
options.user = {
    authenticated: true,
    // use the token from local storage
    token: `Bearer ${localStorage.getItem('token')}`
};
options.headers = new Headers({ Accept: 'application/json' });

export const dataProvider = {
    getList: (resource, params) => {
        const { page, perPage } = params.pagination;
        const { field, order } = params.sort;
        const query = {
            sort: JSON.stringify([field, order]),
            range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
            filter: JSON.stringify(params.filter),
        };
        const url = `${apiUrl}/${resource}?${stringify(query)}`;

        return httpClient(url, options).then(({ headers, json }) => {
            const resourceById = json.data[`${resource}ById`];
            const resourcesIds = json.data[`${resource}Ids`];
            const data = resourcesIds.map(resourceId=>({...resourceById[resourceId], id: resourceId}));
            return {
                data,
                total: 10,
            }
        });
    },

    getOne: (resource, params) => {
        const url = `${apiUrl}/${resource}/${params.id}`;

        return httpClient(url, options).then(({ headers, json }) => {
            json = json.data;
            json.id = json._id;
            return {
                data: json
            };
        });
    },

    getMany: (resource, params) => {
        const query = {
            filter: JSON.stringify({ id: params.ids }),
        };
        const url = `${apiUrl}/${resource}?${stringify(query)}`;
        return httpClient(url, options).then(({ json }) => {
            const resourceById = json.data[`${resource}ById`];
            const resourcesIds = json.data[`${resource}Ids`];
            const data = resourcesIds.map(resourceId=>({...resourceById[resourceId], id: resourceId}));
            return {
                data,
                total: 10,
            }
        });
    },

    getManyReference: (resource, params) => {
        const { page, perPage } = params.pagination;
        const { field, order } = params.sort;
        const query = {
            sort: JSON.stringify([field, order]),
            range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
            filter: JSON.stringify({
                ...params.filter,
                [params.target]: params.id,
            }),
        };
        const url = `${apiUrl}/${resource}?${stringify(query)}`;

        return httpClient(url, options).then(({ headers, json }) => ({
            data: json,
            total: parseInt(headers.get('content-range').split('/').pop(), 10),
        }));
    },

    update: (resource, params) =>
        httpClient(`${apiUrl}/${resource}`, {
            method: 'PUT',
            body: JSON.stringify(params.data),
            user: options.user,
        }).then(({ json }) => {
            json = json.data;
            json.id = json._id;
            return {
                data: json
            };
        }),

    updateMany: (resource, params) => {
        const query = {
            filter: JSON.stringify({ id: params.ids}),
        };
        return httpClient(`${apiUrl}/${resource}?${stringify(query)}`, {
            method: 'PUT',
            body: JSON.stringify(params.data),
            user: options.user,
        }).then(({ json }) => ({ data: json }));
    },

    create: (resource, params) =>
        httpClient(`${apiUrl}/${resource}`, {
            method: 'POST',
            body: JSON.stringify(params.data),
            user: options.user,
        }).then(({ json }) => ({
            data: { ...params.data, id: json.id },
        })),

    delete: (resource, params) =>
        {
            return httpClient(`${apiUrl}/${resource}/${params.id}`, {
                method: 'DELETE',
                user: options.user,
            }).then(({ json }) => ({ data: json }));
        },

    deleteMany: (resource, params) => {
        const query = {
            filter: JSON.stringify({ id: params.ids}),
        };
        return httpClient(`${apiUrl}/${resource}?${stringify(query)}`, {
            method: 'DELETE',
            user: options.user,
        }).then(({ json }) => ({ data: json }));
    }
};