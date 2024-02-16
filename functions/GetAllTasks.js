exports = async function(request, response){
  // Find the name of the MongoDB service you want to use (see "Linked Data Sources" tab)
  var serviceName = "mongodb-atlas";

  // Update these to reflect your db/collection
  var dbName = "todo";
  var collName = "tasks";

  // Get a collection from the context
  var collection = context.services.get(serviceName).db(dbName).collection(collName);
  
  const apiKeyClient = Stitch.defaultAppClient.auth.getProviderClient(UserApiKeyAuthProviderClient.factory);

	const diaSemana = request.query.dia;
  
  return collection.find({$or : [ {"Frequency.Cron": {$regex: diaSemana} },{"Frequency.Cron": "q", "Completed": "false" }]}).sort({ Place: 1 })
  .toArray()
  .then(items => {
    console.log(`Successfully found ${items.length} documents. `)
    response.setStatusCode(201);
    response.setBody(JSON.stringify(items));
  })
  .catch(error => console.error(`Failed to find documents: ${error}`))
    response.setStatusCode(400);
    response.setBody(error.message);
};//