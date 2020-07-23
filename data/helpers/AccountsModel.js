const db = require("../dbConfig");
const mappers = require("./mapper");

module.exports = {
    get,
    insert,
    update,
    remove,
};

function get(id) {
    let query = db("accounts as a");
  
    if (id) {
      query.where("a.id", id).first();
  
      const promises = [query]; // [ accounts, actions ]
  
      return Promise.all(promises).then(function(results) {
        let [account, actions] = results;
  
        if (account) {
          account.actions = actions;
  
          return mappers.accountToBody(account);
        } else {
          return null;
        }
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