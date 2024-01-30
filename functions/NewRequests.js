exports = async function(request, response){
  // Find the name of the MongoDB service you want to use (see "Linked Data Sources" tab)
  var serviceName = "mongodb-atlas";

  // Update these to reflect your db/collection
  var dbName = "todo";
  var collName = "Item";

  // Get a collection from the context
  var collection = context.services.get(serviceName).db(dbName).collection(collName);

  try {
    if (request.body === undefined) {
      throw new Error(`Request body was not defined.`);
    }
    const body = JSON.parse(request.body.text());

    const { insertedId } = await collection.insertOne({isComplete:"false", requestBody: body });
    // 3. Configure the response
    response.setStatusCode(201);
    // tip: You can also use EJSON.stringify instead of JSON.stringify.
    response.setBody(
      JSON.stringify({
        insertedId,
        message: "Successfully saved the request body",
      })
    );
  } catch (error) {
    response.setStatusCode(400);
    response.setBody(error.message);
  }
};