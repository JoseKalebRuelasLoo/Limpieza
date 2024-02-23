exports = async function () {
    try {
        const collection = context.services.get("mongodb-atlas").db("todo").collection("logs");
        const month = new Date().getMonth() + 1;
        const year = new Date().getFullYear();
        const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

        const mes =monthNames[month-1];

        const items = await collection.find({ "month": month }, { Logs: 1, date: 1 }).toArray();
        console.log(items);
        
        await collection.insertOne({ Año: year,mes: mes, Logs: items });

        await collection.deleteMany({ "month": month });

        console.log("Deleted logs");
    } catch (error) {
        console.error(`Failed to execute operation: ${error}`);
    }
};