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

const getProducts = (request, response) => {
	pool.query(
		"SELECT * FROM public.product ORDER BY id_product ASC",
		(error, results) => {
			if (error) {
				throw error;
			}
			response.status(200).json(results.rows);
		},
	);
};

const saveSale = (request, response) => {
	const id_user = request.body.id_user;
	const code_product = request.body.code_product;
	const observation = request.body.observation;
	const price = request.body.price;
	const quantity = request.body.quantity;
	const total = request.body.total;
	const status = request.body.status;
	const key = request.body.key;
	pool.query(
		"INSERT INTO public.sale VALUES (DEFAULT, $1, $2, $3, $4, $5, $6, $7, $8)",
		[
			id_user,
			code_product,
			observation,
			parseInt(price),
			parseInt(quantity),
			parseInt(total),
			status,
			key,
		],
		(error, results) => {
			if (error) {
				throw error.message;
			}
			response.status(201).send(`Venta agregada`);
		},
	);
};

const updateSale = (request, response) => {
	const key_sale = request.params.key_sale;
	pool.query(
		"UPDATE public.sale SET status = 'delivered' WHERE \"validatorKey\" = $1",
		[key_sale],
		(error, results) => {
			if (error) {
				throw error.message;
			}
			response.status(201).json("Venta actualizada");
		},
	);
};

module.exports = {
	getUsers,
	getUserByRegister,
	getProducts,
	saveSale,
	updateSale,
};
