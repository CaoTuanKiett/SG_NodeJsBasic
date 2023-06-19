const db = require('../database/connectDB');

class Poll {
  tableName = 'polls';
  idPoll = 'id';
  title = 'title';
  create_at = 'create_at';
  create_by = 'create_by';

  selectAllPolls = () => {
    return db(this.tableName).select(this.idPoll, this.title, this.create_at, this.create_by);
  }

  getOnePoll = (id) => {
    return db(this.tableName).where(this.idPoll, id).select(this.idPoll, this.title, this.create_at, this.create_by);
  }

  createPoll = (data) => {
    return db(this.tableName).insert({
      title: data.title,
      create_at: data.create_at,
      create_by: data.create_by
    });
  }

  updatePoll = (id, data) => {
    return db(this.tableName).where(this.idPoll, id).update({
      title: data.title,
      create_at: data.create_at,
      create_by: data.create_by
    });
  }

  deletePoll = (id) => {
    return db(this.tableName).where(this.idPoll, id).del();
  }
} 


module.exports = new Poll();