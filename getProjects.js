import Project from './project';

// eslint-disable-next-line import/prefer-default-export
export const handler = (event, context, cb) => {
  const promise = new Promise((resolve) => {
    resolve('success');
  });

  let project = new Project();

  const response = {
    statusCode: 200,
    body: JSON.stringify(project.getAll()),
  };

  promise
    .then(() => cb(null, response))
    .catch(e => cb(e));
};