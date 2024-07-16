exports = async function (request, response) {
  var serviceName = "mongodb-atlas";
  var dbName = "todo";
  var collName = "tasks";

  var collection = context.services
    .get(serviceName)
    .db(dbName)
    .collection(collName);

  try {
    const query = { _id: BSON.ObjectId(request.query.id) };

    //const result = await collection.deleteOne(query);

    response.setStatusCode(200);
    response.setBody(
      JSON.stringify({
        message: query,
      })
    );

    /*
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
    }*/
  } catch (error) {
    response.setStatusCode(400);
    response.setBody(error.message);
  }
};
