import {api as Api} from '@poliglot/shared';
import config from './config';

const api = new (Api(window.fetch))('http://localhost:8080');

async function signIn(username, password) {
  const response = await api.post('signin', {
    username,
    password
  });
  const data = await response.json();
  sessionStorage.setItem('token', data.token);
}

async function storeAst(task, action, ast) {
  const token = sessionStorage.getItem('token');
  const headers = api.authorization(token);
  await api.post('log/change', {
    version: config.version,
    task,
    action,
    ast,
  }, headers);
}

async function tabSwitch(tabName) {
  const token = sessionStorage.getItem('token');
  const headers = api.authorization(token);
  await api.post('log/tabswitch', {
    version: config.version,
    tabName
  }, headers);
}

export default {
  signIn,
  storeAst,
  tabSwitch
}
