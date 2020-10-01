const db = require('../helper/db');
const query = require('../helper/sqlQuery');

const tableName = 'product_colors';
const tableJoin = 'products';

const Colors = function (colors) {
	this.product_id = colors.product_id;
	this.color = colors.color;
	this.status = colors.status;
};

Colors.create = (colors, result) => {
	const contents = [
		tableName,
		{
			...colors
		}
	];

	db.query(query.insert, contents, (err) => {
		if (!err) {
			result(null, { ...colors });
		} else {
			result(err, null);
		}
	});
};

Colors.update = (colors, id, result) => {
	const contents = [
		tableName,
		{
			...colors
		},
		{ id: id },
	];

	db.query(query.update, contents, (err, res) => {
		if (!err) {
			if (res.affectedRows != 0) {
				result(null, colors);
			} else {
				result({ kind: 'not_found' }, null);
			}
		} else {
			result(err, null);
		}
	});
};

Colors.findById = (id, result) => {
	const contents = [
		tableName,
		{ id: id }
	];

	db.query(query.findById, contents, (err, res) => {
		if (!err) {
			if (res.length) {
				result(null, res);
			} else {
				result({ kind: 'not_found' }, null);
			}
		} else {
			result(err, null);
		}
	});
};

Colors.findAll = (id, result) => {
	const contents = [
		tableName
	];

	db.query(query.findById, contents, (err, res) => {
		if (!err) {
			if (res.length) {
				result(null, res);
			} else {
				result({ kind: 'not_found' }, null);
			}
		} else {
			result(err, null);
		}
	});
};

Colors.delete = (id, result) => {
	const contents = [
		tableName,
		{ id: id }
	];
	db.query(query.delete, contents, (err, res) => {
		if (!err) {
			if (res.affectedRows != 0) {
				result(null, res);
			} else {
				result({ kind: 'not_found' }, null);
			}
		} else {
			result(err, null);
		}
	});
};

//Custom

Colors.createByProductId = (colors, result) => {
	const contentsValidate = [
		tableJoin,
		{ id: colors.product_id }
	];
	const contents = [
		tableName,
		{
			...colors
		}
	];

	db.query(query.findById, contentsValidate, (err, res) => {
		if (res.length) {
			db.query(query.insert, contents, (err) => {
				if (!err) {
					result(null, { ...colors });
				} else {
					result(err, null);
				}
			});
		} else {
			result('Product is not found', null);
		}
	});
};

Colors.findByProductId = (id, result) => {
	const contents = [
		[
			'product_colors.id',
			'product_colors.color',
			'product_colors.status',
			'product_colors.product_id',
			'products.name',
		],
		tableName,
		tableJoin,
		'product_colors.product_id',
		'products.id',
		{'products.id': id}
	];

	db.query(query.findJoinTable, contents, (err, res) => {
		if (!err) {
			if (res.length) {
				result(null, res);
			} else {
				result({ kind: 'not_found' }, null);
			}
		} else {
			result(err, null);
		}
	});
};

Colors.deleteByProductId = (id, result) => {
	const contents = [
		tableName,
		{product_id: id}
	];
	db.query(query.delete, contents, (err, res) => {
		if (!err) {
			if (res.affectedRows != 0) {
				result(null, res);
			} else {
				result({ kind: 'not_found' }, null);
			}
		} else {
			result(err, null);
		}
	});
};

module.exports = Colors;