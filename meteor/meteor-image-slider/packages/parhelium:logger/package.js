Package.describe({
  name:'parhelium:logger',
  version: "1.0.1"
});

Package.onUse(function(api) {
  api.versionsFrom('METEOR@0.9.0');
  Npm.depends({
        "chalk": "0.5.1"
  });
  api.use('underscore', ['client', 'server']);
  api.imply('parhelium:bows');
  api.addFiles('logger.js');
  api.export('loggerFactory',['client','server']);
});

