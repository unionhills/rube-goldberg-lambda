"use strict";

require('dotenv').config();
var DynamoNoteRepository = require('./repos/note.repo.dynamo');

var serialize = (object) => {
  return JSON.stringify(object, null, 2)
}

exports.handler = async (event, context) => {
    console.log('## ENVIRONMENT VARIABLES: ' + serialize(process.env));
    console.log('## CONTEXT: ' + serialize(context))
    console.log('## EVENT: ' + serialize(event))

    if (event.Records) {
        for (const record of event.Records) {
            let message = JSON.parse(record.Sns.Message);
            console.log('Records.Sns.Message = ' + serialize(message));

            const noteRepo = DynamoNoteRepository.getInstance();

            await noteRepo.create(message);
        };
    }

    const response = {
        statusCode: 200,
        body: 'Successful invocation of rubeGoldbergFunction AWS Lambda function'
    };

    console.log('## Response: ' + serialize(response));

    return response;
};
