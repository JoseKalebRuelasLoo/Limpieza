exports = async function (request, response) {
  var serviceName = "mongodb-atlas";
  var dbName = "todo";
  var collName = "tasks";

  var collection = context.services
    .get(serviceName)
    .db(dbName)
    .collection(collName);

  console.log("Atlas request", request);
  try {
    if (request.body === undefined) {
      throw new Error(`Request body was not defined.`);
    }
    if (!request.body || request.body === "{}") {
      throw new Error(`Request body is nully.`);
    }

    const body = JSON.parse(request.body.text());

    const { id } = body;

    const result = await collection.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 1) {
      response.setStatusCode(200);
      response.setBody(
        JSON.stringify({
          message: "Successfully deleted the record",
        })
      );
    } else {
      response.setStatusCode(404);
      response.setBody(
        JSON.stringify({
          message: "No record found with the provided ID",
        })
      );
    }
  } catch (error) {
    response.setStatusCode(400);
    response.setBody(error.message);
  }
};
