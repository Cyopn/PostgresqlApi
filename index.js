const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(
	bodyParser.urlencoded({
		extended: true,
	}),
);

app.get("/", (request, response) => {
	response.json({ info: "Api online" });
});

app.listen(port, () => {
	console.log(`App running on port ${port}.`);
});

const db = require("./queries");

app.get("/users/all", db.getUsers);
app.get("/users/register/:register", db.getUserByRegister);
