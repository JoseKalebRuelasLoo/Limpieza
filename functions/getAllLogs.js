exports = async function(request, response){

  var collection = context.services.get("mongodb-atlas").db("todo").collection("logs");
  const month = new Date().getMonth()+1;

  return collection.find({ "month":month })
  .toArray()
  .then(items => {
    console.log(`Successfully found ${items.length} documents.`)

    
  })
  .catch(error => console.error(`Failed to find documents: ${error}`))
    response.setStatusCode(400);
    response.setBody(error.message);
};

/*
    response.setStatusCode(201);
    response.setBody(JSON.stringify(items));

*/