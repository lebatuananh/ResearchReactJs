var path = require('path');
var fs = require('fs');
const { override, babelInclude, fixBabelImports } = require('customize-cra');

module.exports = function(config, env) {
  return Object.assign(
    config,
    override(
      /*Make sure Babel compiles the stuff in the common folder*/
      babelInclude([
        path.resolve('src'), // don't forget this
        fs.realpathSync('../../node_modules/@shared/lib'),
        fs.realpathSync('../../node_modules/@shared/ui'),
        fs.realpathSync('../../node_modules/@shared/components-admin'),
        fs.realpathSync('../../node_modules/@shared/redux-admin'),
        fs.realpathSync('../../node_modules/@shared/containers-admin'),
        fs.realpathSync('../../node_modules/@shared/config-admin'),
        fs.realpathSync('../../node_modules/@shared/assets-admin'),
      ]),
      fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        // Custom-antd: https://ant.design/docs/react/customize-theme?theme=compact#Not-working?
        //style: 'css',
        style: true,
      })
    )(config, env)
  );
};
