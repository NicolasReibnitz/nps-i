const execa = require('execa')

module.exports = command => {
  execa(command, { shell: true, env: { FORCE_COLOR: true }, stdio: 'inherit' });
}
