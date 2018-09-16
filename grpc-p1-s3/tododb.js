var todoModel = require('./models/todo')

var Todo = class {

	constructor(payload) {
		this.payload = payload;
	}

	static list(callback) {
		todoModel.find({}, { _id: 0, __v: 0 }, { lean: true }, callback);
	}

	insert(callback) {
		new todoModel(this.payload).save(callback);
	}

	get(callback) {
		const condition = this.payload.condition;
		todoModel.find(condition, { _id: 0, __v: 0 }, { lean: true }, callback)
	}

	delete(callback) {
		const condition = this.payload;
		todoModel.deleteOne(condition, callback);
	}
};
module.exports = Todo;