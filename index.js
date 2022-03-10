const express = require("express");
const cors = require("cors");
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const userRoutes = require('./routes/users')

const options = {
	definition: {
		openapi: "3.0.0",
		info: {
			title: "ESwagger API",
            description: "Servidor utilizando Express e um banco de dados SQLite."
		},
	},
	apis: ["./routes/*.js"],
};

const app = express();
const PORT = 8080;

app.use(cors());
app.use(express.json());

const specs = swaggerJsDoc(options);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));

app.use('/users', userRoutes)

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});
