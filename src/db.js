import {Api} from '@poliglot/shared';
import config from './config';

console.log(typeof window)
const api = new Api(process.env.REACT_APP_APIURL || 'http://localhost:8080', window.fetch.bind(window));

async function signIn(username, password) {
  const response = await api.post('signin', {
    username,
    password
  });
  if (!response.ok) {
    throw new Error('Wrong username or password!');
  }

  const data = await response.json();
  sessionStorage.setItem('token', data.token);
}

async function storeAst(task, action, ast) {
  const token = sessionStorage.getItem('token');
  await api.post('log/change', api.authorization(token), {
    version: config.version,
    task,
    action,
    ast,
  });
}

async function tabSwitch(tabName) {
  const token = sessionStorage.getItem('token');
  await api.post('log/tabswitch', api.authorization(token), {
    version: config.version,
    tabName
  });
}

export default {
  signIn,
  storeAst,
  tabSwitch
}
