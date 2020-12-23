
var serialize = function(object) {
  return JSON.stringify(object, null, 2)
}

exports.handler = async (event, context) => {
    console.log('## ENVIRONMENT VARIABLES: ' + serialize(process.env));
    console.log('## CONTEXT: ' + serialize(context))
    console.log('## EVENT: ' + serialize(event))

    if (event.Records) {
        event.Records.forEach(record => {
            let message = JSON.parse(record.Sns.Message);
            console.log('Records.Sns.Message = ' + serialize(JSON.parse(message)));
        });
    }

    const response = {
        statusCode: 200,
        body: 'Successful invocation of rubeGoldbergFunction AWS Lambda function'
    };

    console.log('## Response: ' + serialize(response));

    return response;
};
