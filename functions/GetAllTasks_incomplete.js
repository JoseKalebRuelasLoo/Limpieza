exports = async function(request, response){
  // Find the name of the MongoDB service you want to use (see "Linked Data Sources" tab)
  var serviceName = "mongodb-atlas";

  // Update these to reflect your db/collection
  var dbName = "todo";
  var collName = "Item";

  // Get a collection from the context
  var collection = context.services.get(serviceName).db(dbName).collection(collName);


  return collection.find({ "isComplete": "false"})
  .toArray()
  .then(items => {
    console.log(`Successfully found ${items.length} documents.`)
    response.setStatusCode(201);
    response.setBody(JSON.stringify(items));
  })
  .catch(error => console.error(`Failed to find documents: ${error}`))
    response.setStatusCode(400);
    response.setBody(error.message);
};