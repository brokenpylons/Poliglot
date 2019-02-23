import packageJson from '../package.json';

export default {
  name: process.env.REACT_APP_TITLE,
  version: packageJson.version
}
