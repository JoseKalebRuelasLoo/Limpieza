exports = async function(request, response){
  var serviceName = "mongodb-atlas";
  var dbName = "todo";
  var collName = "tasks";

  var collection = context.services.get(serviceName).db(dbName).collection(collName);

  console.log("Atlas request", request)
  try {
    if (request.body === undefined) {
      throw new Error(`Request body was not defined.`);
    }
    if (!request.body || request.body === "{}") {
      throw new Error(`Request body is nully.`);
    }

    const body = JSON.parse(request.body.text());
    
    const { Place, Task, Frequency } = body;

    const result = await collection.insertOne({Place, Task, Frequency,Completed:"false"});
    response.setStatusCode(201);
    response.setBody(
      JSON.stringify({
        atlasRequestBody: body,
        result,
        message: "Successfully saved the request body",
      })
    );
  } catch (error) {
    response.setStatusCode(400);
    response.setBody(error.message);
  }
};