exports = async function (request, response) {

	var collection = context.services.get("mongodb-atlas").db("todo").collection("tasks");
	const query = { "_id": BSON.ObjectId(request.query.id) };

	const projection = {
		"Completed": 1
	}

	collection.findOne(query, projection)
		.then(result => {
			if (result) {
			  var state;
				if (result.Completed === "true" ) {
					state = "false";
				} else {
					state = "true";
				}

				const update = {
					"$set": {
						"Completed": state
					}
				};

				return collection.findOneAndUpdate(query, update)
					.then(updatedDocument => {
						if (updatedDocument) {
							console.log(`Successfully updated document`)
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
						console.error(error.message)
						response.setStatusCode(400)
						response.setBody(error.message)
					})

			} else {
			  console.log(`No document matches the provided query`)
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