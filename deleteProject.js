import Project from './project';
import {DynamoDB} from 'aws-sdk';

// eslint-disable-next-line import/prefer-default-export
export const handler = (event, context, callback) => {
  const promise = new Promise((resolve) => {
    resolve('success');
  });

  let project = new Project(new DynamoDB());

  promise
    .then(() => project.deleteProject(event.pathParameters.proxy))
    .then((data) => {
      const response = {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Origin": "*", // Required for CORS support to work
          "Access-Control-Allow-Credentials": true // Required for cookies, authorization headers with HTTPS
        },
        body: JSON.stringify(data),
      };

      callback(null, response)
    })
    .catch(e => callback(e));
};
