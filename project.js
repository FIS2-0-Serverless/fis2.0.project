let AWS = require('aws-sdk');

export default class Project {
    dynamodb = new AWS.DynamoDB();

    newProject = (data) => {
        let { projectCode, cst, name } = data;
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

        this.dynamodb.putItem(params, function(err, data) {
            if (err) console.log(err, err.stack); // an error occurred
            else     console.log(data);           // successful response
        });
    };

    getAll = () => {
        return [
            {
                cst: "TBK",
                name: "B2B"
            },
            {
                cst: "TBK",
                name: "eca"
            },
            {
                cst: "ERGO",
                name: "portal"
            }
        ];
    };
}