exports = async function () {
    var collection = context.services.get("mongodb-atlas").db("todo").collection("tasks");
    var logsCollection = context.services.get("mongodb-atlas").db("todo").collection("logs");

    const documentos = await collection.find({}).toArray();

    const fechaActual = new Date();
    const diaSemana = fechaActual.getDay();

    let logs = [];

    for (let documento of documentos) {
        const ejecutarTarea = (documento.Frequency.Cron.includes(`${diaSemana}`) || documento.Frequency.Cron == "q");

        if (ejecutarTarea) {
            // Guarda la tarea para su agregacion a la bitacora
            const log = { ...documento };

            if ((documento.Frequency.LastCompleted == 15&&documento.Frequency.Cron == "q")) {
                await collection.updateOne(
                    { _id: documento._id },
                    { $set: { "Completed": "false", "Frequency.LastCompleted": "0" } }
                );
            } else {
                await collection.updateOne(
                    { _id: documento._id },
                    { $set: { Completed: "false" } }
                );
            }
            // Agrega las tareas al array de logs
            logs.push(log);
        }
    }

    // Agrega todos los logs a la bitacora en un solo objeto
    if (logs.length > 0) {
        await logsCollection.insertOne({ date: new Date(), month: new Date().getMonth()+1,Logs: logs });
    }
};