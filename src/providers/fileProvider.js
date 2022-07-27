import { dataProvider } from './dataProvider';

export const fileProvider = {
    ...dataProvider,
    create: (resource, params) => {
        console.log("here");
        if (resource !== 'users') {
            // fallback to the default implementation
            return dataProvider.create(resource, params);
        }

        return convertFileToBase64(params.data.picture)
            .then(base64Picture =>
                ({
                    src: base64Picture,
                    title: `${params.data.title}`,
                })
            )
            .then(transformedNewPicture =>
                dataProvider.create(resource, {
                    data: {
                        ...params.data,
                        picture: transformedNewPicture,
                    },
                })
            );
    },
};

/**
 * Convert a `File` object returned by the upload input into a base 64 string.
 * That's not the most optimized way to store images in production, but it's
 * enough to illustrate the idea of data provider decoration.
 */
const convertFileToBase64 = file =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;

        reader.readAsDataURL(file.rawFile);
    });