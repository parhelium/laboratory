Package.describe({
  name: 'parhelium:ui-image-slider',
  summary:  "Ractive's component : Image Slider",
  version: '1.0.0',
  git: ' /* Fill me in! */ '
});

Package.onUse(function(api) {
    api.versionsFrom('METEOR@0.9.0');
    api.use([
        'less',
        'parhelium:bluebird',
        'parhelium:logger',
        'parhelium:ractive@0.6.0',
        'parhelium:ractive-promise-alt',
        'parhelium:templating-ractive'
    ], ['client']);

    api.imply('parhelium:ractive@0.6.0')
    api.addFiles(
        [
            'lib/ImageSlider.js',
            'lib/ImageSlider.ract',
            'lib/ImageSlider.less'
        ],
        'client'
    );
    api.export('ImageSlider')
});