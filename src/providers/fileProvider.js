import { dataProvider } from './dataProvider';

export const fileProvider = {
    ...dataProvider,
    create: (resource, params) => {
        if (resource !== 'users' || !params.data.picture || !params.data.studyRecord) {
            // fallback to the default implementation
            return dataProvider.create(resource, params);
        }

        const pictures = [
            {...params.data.picture, type: "picture"},
            {...params.data.studyRecord, type: "studyRecord"},
        ]

        const newPictures = pictures.filter(
            p => p.rawFile instanceof File
        );

        return Promise.all(newPictures.map(convertFileToBase64))
            .then(base64Pictures => {
                let picture = base64Pictures.find((imgObj) => imgObj.type === "picture")
                let studyRecord = base64Pictures.find((imgObj) => imgObj.type === "studyRecord")
                return dataProvider.create(resource, {
                    data: {
                        ...params.data,
                        picture,
                        studyRecord,
                    },
                })
            });
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
        reader.onload = () => {
            return resolve({
                src: reader.result,
                title: file.title,
                type: file.type
            });
        };
        reader.onerror = reject;

        reader.readAsDataURL(file.rawFile);
    });