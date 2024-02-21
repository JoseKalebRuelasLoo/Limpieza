exports = async function() {
  var collection = context.services.get("mongodb-atlas").db("todo").collection("tasks");
  var logsCollection = context.services.get("mongodb-atlas").db("todo").collection("logs");

  const documentos = await collection.find({}).toArray();

  const fechaActual = new Date();
  const diaSemana = fechaActual.getDay();
  
  let logs = [];
  
  for (let documento of documentos) {
    const cronDocumento = documento.Frequency.Cron; 

    const ejecutarTarea = cronDocumento.includes(`${diaSemana}`);

    if (ejecutarTarea) {
      // Guarda la tarea para su agregacion a la bitacora
      const log = { ...documento, UpdatedAt: new Date() };
      
      await collection.updateOne(
        { _id: documento._id },
        { $set: { Completed: "false" } }
      );

      // Agrega las tareas al array de logs
      logs.push(log);
    }
  }

  // Agrega todos los logs a la bitacora en un solo objeto
  if (logs.length > 0) {
    await logsCollection.insertOne({ UpdatedAt: new Date(), Logs: logs });
  }
};