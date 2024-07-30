exports = async function (request, response) {
  var collection = context.services
    .get("mongodb-atlas")
    .db("todo")
    .collection("tasks");
  const query = { _id: BSON.ObjectId(request.query.id) };
  const Task = request.query.Task;
  const Frequency = request.query.Frequency;

  const update = {
    $set: {
      Task: Task,
      Frequency: {
        Cron: Frequency,
        Days: " ",
      },
    },
  };

  return collection
    .findOneAndUpdate(query, update)
    .then((updatedDocument) => {
      if (updatedDocument) {
        console.log(`Successfully updated document`);
        response.setStatusCode(200);
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
      console.error(error.message);
      response.setStatusCode(400);
      response.setBody(
        JSON.stringify({
          error: error.message,
        })
      );
    });
};