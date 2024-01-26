exports = async function() {
	var collection = context.services.get("mongodb-atlas").db("todo").collection("tasks");

  const documentos = await collection.find({}).toArray();

  const fechaActual = new Date();
  const diaSemana = fechaActual.getDay();
  
  documentos.forEach(async (documento) => {
    const cronDocumento = documento.Frequency.Cron; 

    const ejecutarTarea = cronDocumento.includes(`${diaSemana}`);

    if (ejecutarTarea) {
      await collection.updateOne(
        { _id: registro._id },
        { $set: { Completed: "false" } }
      );
    }
  });
};