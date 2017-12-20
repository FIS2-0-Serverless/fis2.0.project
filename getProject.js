// eslint-disable-next-line import/prefer-default-export
export const handler = (event, context, callback) => {
    const promise = new Promise((resolve) => {
        resolve('success');
    });

    const response = {
        statusCode: 200,
        body: JSON.stringify(event,),
    };

    promise
        .then(() => callback(null, response))
        .catch(e => callback(e));
};
