exports = async function() {
	var collection = context.services.get("mongodb-atlas").db("todo").collection("tasks");

  const documentos = await collection.find({}).toArray();

  const fechaActual = new Date();
  const diaSemana = fechaActual.getDay();
  
  documentos.forEach(async (documento) => {
    const cronDocumento = documento.Frequency.Cron; 

    const ejecutarTarea = cronDocumento.includes(`${diaSemana}`);

    if (ejecutarTarea) {
      //Guarda la tarea para su agregacion a la bitacora
      
      await collection.updateOne(
        { _id: documento._id },
        { $set: { Completed: "false" } }
      );
    }
  });
  //Agrega las tareas a la bitacora 
  
};