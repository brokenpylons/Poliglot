const url = 'http://164.8.230.207:5984/'

async function tryAccess(auth) {
  return new Promise((resolve, reject) => {
    fetch(`${url}editorgenerator`, {
      method: 'HEAD',
      headers: {
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }).then(response => {
      resolve(true);
    }).catch(error => {
      resolve(false);
    });
  });
}

function storeAst(auth, group, user, task, action, ast) {
  /*console.log(auth);
  fetch(`${url}/editorgenerator`, {
    method: 'POST',
    body: JSON.stringify({
      group,
      user,
      task,
      action,
      ast,
    }),
    headers: {
      'Authorization': `Basic ${auth}`,
      'Content-Type': 'application/json'
    }
  });*/
}

export default {
  tryAccess,
  storeAst
}
