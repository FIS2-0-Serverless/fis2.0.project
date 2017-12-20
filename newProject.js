import Project from './project';

// eslint-disable-next-line import/prefer-default-export
export const handler = (event, context, callback) => {
  const promise = new Promise((resolve) => {
    resolve('success');
  });

  let project = new Project();

  project.newProject(JSON.parse(event.body));

    const response = {
        statusCode: 200,
        body: JSON.stringify(event)
    };

  promise
    .then(() => callback(null, response))
    .catch(e => callback(e));
};
