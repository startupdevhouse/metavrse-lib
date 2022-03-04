const fs = require('fs');
const { createFilter } = require('rollup-pluginutils');
const versionInjector = require('rollup-plugin-version-injector');
const analyze = require('rollup-plugin-analyzer');
const uglify = require('uglify-js');
const generatePackageJson = require('rollup-plugin-generate-package-json');

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

        if (process.env.NODE_ENV === 'production') {
          const mini = uglify.minify(content, { warnings: true }).code;
          return {
            code: `export default ${JSON.stringify(mini)};`,
            map: { mappings: '' },
          };
        }

        return {
          code: `export default ${JSON.stringify(content)};`,
          map: { mappings: '' },
        };
      }
    },
  };
}

module.exports = {
  rollup(config, options) {
    config.plugins.push(versionInjector());
    config.plugins.push(analyze({ summaryOnly: true }));
    config.plugins.push(string({ include: './src/assets/scripts/**/*.js' }));
    config.plugins.push(
      generatePackageJson({
        outputFolder: 'dist',
        baseContents: (pkg) => ({
          name: pkg.name,
          version: pkg.version,
          description: pkg.description,
          main: 'metavrse-lib.esm.js',
          module: 'metavrse-lib.esm.js',
          typings: 'index.d.ts',
          repository: pkg.repository,
          license: pkg.license,
          bugs: pkg.bugs,
          homepage: pkg.homepage,
          engineStrict: pkg.engineStrict,
          engine: pkg.engine,
        }),
      })
    );
    return config;
  },
};
