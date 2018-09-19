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

	update(callback) {
		const condition = this.payload.condition;
		const update = this.payload.update;
		todoModel.updateOne(condition, {$set:update}, callback)
	}

	get(callback) {
		const condition = this.payload.condition;
		todoModel.findOne(condition, { _id: 0, __v: 0 }, { lean: true }, callback)
	}

	delete(callback) {
		const condition = this.payload.condition;
		todoModel.deleteOne(condition, callback);
	}
};
module.exports = Todo;