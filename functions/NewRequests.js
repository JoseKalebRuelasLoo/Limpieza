exports = async function(request, response){
  var serviceName = "mongodb-atlas";
  var dbName = "todo";
  var collName = "Item";

  var collection = context.services.get(serviceName).db(dbName).collection(collName);

  try {
    if (request.body === undefined) {
      throw new Error(`Request body was not defined.`);
    }

    const { place, task, requester } = request.body;

    const result = await collection.insertOne({isComplete:"false", place, task, requester });
    response.setStatusCode(201);
    response.setBody(
      JSON.stringify({
        result,
        message: "Successfully saved the request body",
      })
    );
  } catch (error) {
    response.setStatusCode(400);
    response.setBody(error.message);
  }
};