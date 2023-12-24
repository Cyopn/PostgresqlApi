const Pool = require("pg").Pool;
require("dotenv").config();
const { user, host, database, password, port } = process.env;
const pool = new Pool({
	user: user,
	host: host,
	database: database,
	password: password,
	port: port,
	ssl: { rejectUnauthorized: false },
});
const getUsers = (request, response) => {
	pool.query(
		"SELECT * FROM public.user ORDER BY id_user ASC",
		(error, results) => {
			if (error) {
				throw error;
			}
			response.status(200).json(results.rows);
		},
	);
};

const getUserByRegister = (request, response) => {
	const register = request.params.register;
	pool.query(
		"SELECT * FROM public.user WHERE register = $1",
		[register],
		(error, results) => {
			if (error) {
				throw error;
			}
			response.status(200).json(results.rows);
		},
	);
};

module.exports = {
	getUsers,
	getUserByRegister,
};
