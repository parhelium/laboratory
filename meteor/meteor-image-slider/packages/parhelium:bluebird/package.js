Package.describe( {
    summary: "Wrapper for bluebird",
    version: "2.3.4",
    documentation: null
} );

Package.onUse( function ( api ) {
    api.versionsFrom( 'METEOR@0.9.3' );
//  Library itself expose Promise as window.P = window.Promise = Promise;
//  api.export('Promise', ['client'])
    api.add_files( 'lib/bluebird/js/browser/bluebird.js', ['client', 'server'] );
} );
