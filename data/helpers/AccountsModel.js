const db = require("../dbConfig");
const mappers = require("./mapper");

module.exports = {
    get,
    insert,
    update,
    remove,
};

function get(id) {
  let query = db('accounts');

  if (id) {
    return query
      .where('id', id)
      .first()
      .then((action) => {
        if (action) {
          return mappers.accountToBody(action);
        } else {
          return null;
        }
      });
  } else {
    return query.then((accounts) => {
      return accounts.map((account) => mappers.accountToBody(account));
    });
  }
}
  

  function insert(account) {
    return db("accounts")
      .insert(account, "id")
      .then(([id]) => get(id));
  }

  function update(id, changes) {
    return db("accounts")
      .where("id", id)
      .update(changes)
      .then(count => (count > 0 ? get(id) : null));
  }
  
  function remove(id) {
    return db("accounts")
      .where("id", id)
      .del();
  }