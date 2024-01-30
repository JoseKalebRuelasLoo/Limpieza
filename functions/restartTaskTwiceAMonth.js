exports = async function() {
	var collection = context.services.get("mongodb-atlas").db("todo").collection("tasks");

  const documentos = await collection.find({}).toArray();

  const fechaActual = new Date();
  const diaMes = fechaActual.getDate();

  documentos.forEach(async (documento) => {
    const cronDocumento = documento.Frequency.Cron; 

    const ejecutarTarea = cronDocumento.includes("q") && diaMes.includes(1) ||diaMes.includes(16);

    if (ejecutarTarea) {
      await collection.updateOne(
        { _id: documento._id },
        { $set: { Completed: "false" } }
      );
    }
  });
};