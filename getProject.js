import Project from './project';
import { DynamoDB } from 'aws-sdk';

// eslint-disable-next-line import/prefer-default-export
export const handler = (event, context, callback) => {
    const promise = new Promise((resolve) => {
        resolve('success');
    });

  let project = new Project(new DynamoDB());

    promise
      .then(() => project.getProject(event.pathParameters.proxy))
        .then((data) => {
          const response = {
            statusCode: 200,
            body: JSON.stringify(data),
          };

          callback(null, response)
        })
        .catch(e => callback(e));
};
