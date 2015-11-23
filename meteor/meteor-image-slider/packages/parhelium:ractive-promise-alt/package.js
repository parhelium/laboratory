Package.describe({
  name: 'parhelium:ractive-promise-alt',
  summary: ' /* Fill me in! */ ',
  version: '1.0.0',
  git: ' /* Fill me in! */ '
});

Package.onUse(function(api) {
  api.versionsFrom('1.0');
  api.use([
        'less',
        'parhelium:bluebird',
        'parhelium:ractive@0.6.0'
  ], ['client']);
  api.imply('parhelium:ractive@0.6.0')
  api.addFiles('parhelium:ractive-promise-alt.js');
});


