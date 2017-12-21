let AWS = require('aws-sdk');

export default class Project {
  dynamodb = new AWS.DynamoDB();

  newProject = (data) => {
    let {projectCode, cst, name} = data;
    let params = {
      Item: {
        "projectCode": {
          S: projectCode
        },
        "cst": {
          S: cst
        },
        "name": {
          S: name
        }
      },
      ReturnConsumedCapacity: "TOTAL",
      TableName: "fisProjects"
    };

    this.dynamodb.putItem(params, function (err, data) {
      if (err) console.log(err, err.stack); // an error occurred
      else console.log(data);           // successful response
    });
  };

  getProject = (projectCode) => {
    let promise = new Promise((resolve, reject) => {
      let params = {
        Key: {
          "projectCode": {
            S: projectCode
          }
        },
        TableName: "fisProjects"
      };

      this.dynamodb.getItem(params, (err, data) => {
        if (err) {
          console.log(err, err.stack);
          reject(err);
        } else {
          console.log(JSON.stringify(data));
          resolve(data);
        }
      });
    });

    return promise
      .then((data) => {
        return {
          projectCode: data.Item.projectCode.S,
          name: data.Item.name.S,
          cst: data.Item.cst.S
        };
      });
  };

  getAll = () => {
    let promise = new Promise((resolve, reject) => {
      let params = {
        TableName: "fisProjects"
      };

      this.dynamodb.scan(params, (err, data) => {
        if (err) {
          console.log(err, err.stack);
          reject(err);
        } else {
          console.log(JSON.stringify(data));
          resolve(data);
        }
      });
    });

    return promise
      .then((data) => {
        let items = data.Items.map((item) => {
          return {
            projectCode: item.projectCode.S,
            name: item.name.S,
            cst: item.cst.S
          };
        });

        return {
          count: data.Count,
          items: items
        }
      });

  };
}
