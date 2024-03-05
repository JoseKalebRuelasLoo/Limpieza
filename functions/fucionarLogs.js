exports = async function () {
    try {
        const collection = context.services.get("mongodb-atlas").db("todo").collection("logs");
        var month = new Date().getUTCMonth();

        const year = new Date().getFullYear();
        const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

        const mes =monthNames[month];

        const items = await collection.find({ "month": month+1 }, { Logs: 1, date: 1 }).toArray();
        
        await collection.insertOne({ Año: year,mes: mes, Logs: items });

        await collection.deleteMany({ "month": month+1 });

        console.log("Deleted logs");
    } catch (error) {
        console.error(`Failed to execute operation: ${error}`);
    }
};