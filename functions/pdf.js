exports = async function () {

    const PDFDocument = require('pdfkit');

    const generarPDF = async (datos) => {
        // Crea un nuevo documento PDF
        const doc = new PDFDocument();

        // Agrega contenido al PDF
        doc.fontSize(12).text(`ID: ${datos._id}`);
        doc.fontSize(16).text(`Datos: ${JSON.stringify(datos)}`);

        // Guarda o envía el PDF según tus necesidades
        const pdfBuffer = await new Promise((resolve) => {
            const buffers = [];
            doc.on('data', buffers.push.bind(buffers));
            doc.on('end', () => {
                resolve(Buffer.concat(buffers));
            });
            doc.end();
        });
        // Aquí podrías almacenar el PDF o enviarlo por correo electrónico
        // Por ejemplo, almacenar en MongoDB Atlas:
        const Bitacoras = context.services.get("mongodb-atlas").db("todo").collection("bitacora");
        await Bitacoras.insertOne({ pdf: pdfBuffer, createdAt: new Date() });
    };
};