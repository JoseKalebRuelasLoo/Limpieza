exports = async function () {
    try {
        const collection = context.services.get("mongodb-atlas").db("todo").collection("logs");
        const month = new Date().getMonth() + 1;
        const year = new Date().getFullYear();

        const items = await collection.find({ "month": month }, { Logs: 1, date: 1 });
        
        await collection.insertOne({ Año: year,mes: month, Logs: items });

        await collection.deleteMany({ "month": month });

        console.log("Deleted logs");
    } catch (error) {
        console.error(`Failed to execute operation: ${error}`);
    }
};