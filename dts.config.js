const fs = require('fs');
const { createFilter } = require('rollup-pluginutils');
const analyze = require('rollup-plugin-analyzer');
const uglify = require('uglify-js');

function string(opts = {}) {
  if (!opts.include) {
    throw Error('include option should be specified');
  }

  const filter = createFilter(opts.include, opts.exclude);

  return {
    name: 'string',
    transform(_, id) {
      if (filter(id)) {
        const content = fs.readFileSync(id, { encoding: 'utf-8' });
        const mini = uglify.minify(content, { warnings: true }).code;

        return {
          code: `export default ${JSON.stringify(mini)};`,
          map: { mappings: '' },
        };
      }
    },
  };
}

module.exports = {
  rollup(config, options) {
    config.plugins.push(analyze({ summaryOnly: true }));
    config.plugins.push(string({ include: './src/assets/scripts/**/*.js' }));
    return config;
  },
};
