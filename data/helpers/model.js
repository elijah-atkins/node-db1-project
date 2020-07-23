const db = require("../dbConfig");
const mappers = require("./mapper");

module.exports = {
    get,
    // insert,
    // update,
    // remove,
};

function get(id) {
    let query = db("accounts as a");
  
    if (id) {
      query.where("a.id", id).first();
  
      const promises = [query, getAccountsActions(id)]; // [ accounts, actions ]
  
      return Promise.all(promises).then(function(results) {
        let [account, actions] = results;
  
        if (account) {
          account.actions = actions;
  
          return mappers.projectToBody(account);
        } else {
          return null;
        }
      });
    } else {
      return query.then(accounts => {
        return accounts.map(account => mappers.accountsToBody(account));
      });
    }
  }
