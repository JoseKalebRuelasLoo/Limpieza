exports = async function(request, response){

  var collection = context.services.get("mongodb-atlas").db("todo").collection("logs");
  const month = new Date().getMonth()+1;
  
  let logs = [];

  return collection.find({ "month":month}, { Logs: 1, date: 1 })
  .then(items => {
    logs.push(items);
    //await collection.insertOne({  mes: new Date().getMonth()+1,Logs: logs });


/// moverle aqui

    
  })
  .catch(error => console.error(`Failed to find documents: ${error}`))
    response.setStatusCode(400);
    response.setBody(error.message);
};

/*
    response.setStatusCode(201);
    response.setBody(JSON.stringify(items));

*/