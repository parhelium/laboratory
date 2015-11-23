Package.describe({
  summary: " Wrapper for bows logging library",
  version: "1.0.0"
});

Package.onUse(function(api) {
  api.versionsFrom('METEOR@0.9.0');
  api.addFiles('bows-client.js',['client']);
  api.addFiles('bows-server.js',['server']);
  api.export('bows',['server'])
});
