exports = async function (request, response) {

	var collection = context.services.get("mongodb-atlas").db("todo").collection("Item");
	const query = { "_id": BSON.ObjectId(request.query.id) };

	const projection = {
		"isComplete": 1
	}

	collection.findOne(query, projection)
		.then(result => {
			if (result) {
			  var state;
				if (result.isComplete === "true" ) {
					state = "true";
				} else {
					state = "true";
				}

				const update = {
					"$set": {
						"isComplete": state
					}
				};

				return collection.findOneAndUpdate(query, update)
					.then(updatedDocument => {
						if (updatedDocument) {
							console.log(`Successfully updated document: ${updatedDocument}.`)
							response.setStatusCode(200);
							response.setBody(JSON.stringify({
									updatedDocument: updatedDocument,
									message: "Successfully updated document",
								}));
						} else {
							console.log(`No document matches the provided query`)
							response.setStatusCode(400);
							response.setBody(
								JSON.stringify({
									updatedDocument: updatedDocument,
									message: "No document matches the provided query",
								})
							);
						}
					})
					.catch(error => {
						console.error(`Failed to update documents: ${error}`)
						response.setStatusCode(400)
						response.setBody(error.message)
					})

			} else {
				response.setStatusCode(400);
				response.setBody(
					JSON.stringify({
						result: result,
						message: "No document matches the provided query",
					})
				);
			}
		})
		.catch(error => {
			console.error(`Failed to find documents: ${error}`)
			response.setStatusCode(400)
			response.setBody(error.message)
		})
};