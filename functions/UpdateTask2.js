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

    if (request.body === undefined) {
      throw new Error(`Request body was not defined.`);
    }
    if (!request.body || request.body === "{}") {
      throw new Error(`Request body is nully.`);
    }

    const body = JSON.parse(request.body.text());

    const { Task, Frequency } = body;
    
    const update = {
      $set: {
        Task: Task,
        Frequency: Frequency,
      },
    };
    return collection
      .findOneAndUpdate(query, update)
      .then((updatedDocument) => {
        if (updatedDocument) {
          console.log(`Successfully updated document: ${updatedDocument}.`);
          response.setStatusCode(201);
          response.setBody(
            JSON.stringify({
              updatedDocument: updatedDocument,
              message: "Successfully updated document",
            })
          );
        } else {
          console.log(`No document matches the provided query`);
          response.setStatusCode(400);
          response.setBody(
            JSON.stringify({
              updatedDocument: updatedDocument,
              message: "No document matches the provided query",
            })
          );
        }
      })
      .catch((error) => {
        console.error(`Failed to update documents: ${error}`);
        response.setStatusCode(400);
        response.setBody(error.message);
      });
  } catch (error) {
    response.setStatusCode(400);
    response.setBody(error.message);
  }
};
