import {group, version} from './config';

const url = 'http://164.8.230.207:5984/'
const dbname = 'editorgenerator2'

async function tryAccess(auth) {
  return new Promise((resolve, reject) => {
    fetch(`${url}${dbname}`, {
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

function storeAst(auth, user, task, action, ast) {
  fetch(`${url}${dbname}`, {
    method: 'POST',
    body: JSON.stringify({
      timestamp: Date.now(),
      group,
      version,
      user,
      task,
      action,
      ast,
    }),
    headers: {
      'Authorization': `Basic ${auth}`,
      'Content-Type': 'application/json'
    }
  });
}

function tabSwitch(auth, user, tabName) {
  fetch(`${url}${dbname}`, {
    method: 'POST',
    body: JSON.stringify({
      timestamp: Date.now(),
      group,
      version,
      user,
      tabName,
    }),
    headers: {
      'Authorization': `Basic ${auth}`,
      'Content-Type': 'application/json'
    }
  });
}

export default {
  tryAccess,
  storeAst,
  tabSwitch
}
