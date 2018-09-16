var todoModel = require('./models/todo')

var Todo = class {

	constructor(payload) {
		this.payload = payload;
	}	

	static list(callback) {
		const projections = {
			_id: 0
		};
		todoModel.find({}, projections, callback);
	}

	add(callback) {
		new todoModel(this.payload).save(callback);
	}

	fetch(callback) {
		const criteria = this.payload.criteria;
		const projections = this.payload.projections;
		todoModel.find(criteria, projections, callback)
	}

	remove(callback) {
		const criteria = this.payload;
		todoModel.remove(criteria, callback);
	}
};
module.exports = Todo;