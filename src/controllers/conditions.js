const Conditions = require('../models/conditions');
const schema = require('../helper/userValidated');
const globalSchema = schema.schemaGlobal;
const responeStandart = require('../helper/respone');


module.exports = {
	create: async (req, res) => {
		try {
			const result = await globalSchema.validateAsync(req.body);
			const conditions = {
				status: result.status
			};
			Conditions.create(conditions, (err, data) => {
				if (!err) {
					return responeStandart(res, 'Insert Data Success', { data });
				} else {
					console.log(err);
					return responeStandart(res, 'Insert Data Failled', {}, 500, false);
				}
			});
		} catch (err) {
			return responeStandart(res, err.details[0].message, {}, 400, false);
		}
	},

	update: async (req, res) => {
		try {
			const result = await globalSchema.validateAsync(req.body);
			const conditions = {
				status: result.status
			};

			Conditions.update(conditions, req.params.id, (err, data) => {
				if (!err) {
					return responeStandart(res, 'Update Data Success', { data });
				} else {
					return responeStandart(res, 'Update Data Failled', {}, 500, false);
				}
			});
		} catch (err) {
			return responeStandart(res, err.details[0].message, {}, 400, false);
		}
	},

	findAll: (req, res) => {
		Conditions.findAll((err, data) => {
			if (!err) {
				return responeStandart(res, 'SELECT ALL SUCCESS', { data });
			} else {
				console.log(err);
				return responeStandart(res, 'SELECT ALL FAILLED', {}, 500, false);
			}
		});
	},

	delete: (req, res) => {
		Conditions.delete(req.params.id, (err, data) => {
			if(!err){
				return responeStandart(res, `Delete ${req.params.id} Success`, { data });
			}else{
				if (err.kind === 'not_found') {
					return responeStandart(res, `Not found User with id ${req.params.id}.`, {}, 404, false);
				} else {
					return responeStandart(res, `Error retrieving User with id ${req.params.id}.`, {}, 500, false);
				}
			}
		});
	}
};