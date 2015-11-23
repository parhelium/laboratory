var imageStore = new FS.Store.GridFS( "images", {
    maxTries: 1, // optional, default 5
    chunkSize: 1024 * 1024  // optional, default GridFS chunk size in bytes (can be overridden per file).
                            // Default: 2MB. Reasonable range: 512KB - 4MB
} );

Images = new FS.Collection( "images", {
    stores: [imageStore]
} );

FilesToDownload = new Mongo.Collection('filesToDownload');



if ( Meteor.isClient ) {


    Meteor.subscribe( "images" );

    Template.imageUploader.images = function () {
        return Images.find();
    };

    Template.imageUploader.events( {
        'change #files': function ( event, temp ) {
            console.log( 'files changed' );
            FS.Utility.eachFile( event, function ( file ) {
                var fileObj = new FS.File( file );
                fileObj.metadata = { };
                Images.insert( fileObj );
            } );
        },
        'dropped #dropzone': function ( event, temp ) {
            console.log( 'files droped' );
            FS.Utility.eachFile( event, function ( file ) {
                var fileObj = new FS.File( file );
                fileObj.metadata = { };
                Images.insert( fileObj );
            } );
        },
        'click .btnRemove': function ( event, temp ) {
            this.remove();
        }
    } );
}

if ( Meteor.isServer ) {

    getBase64Data = function(doc, callback) {
        var buffer = new Buffer(0);
        // callback has the form function (err, res) {}
        var readStream = doc.createReadStream();

        readStream.on('readable', function() {
            buffer = Buffer.concat([buffer, readStream.read()]);
        });
        readStream.on('error', function(err) {
            callback(err, null);
        });
        readStream.on('end', function() {
            // done
            callback(null, buffer.toString('base64'));
        });
    };
    getBase64DataSync = Meteor.wrapAsync(getBase64Data);

    Images.allow( {
        insert: function ( userId, fileObj ) {
            return true
        },
        update: function ( userId, fileObj ) {
            return true
        },
        remove: function ( userId, fileObj ) {
            return true;
        },
        // Allow eg. only the user in metadata
        // the shareId is being discussed - eg. for sharing urls
        download: function ( userId, fileObj/*, shareId*/ ) {
            return true;
        },
        fetch: []
    } );

    Router.map(function() {
        this.route('zip', {
            where: 'server',
            path: 'zippedFiles/:_id',
            action: function() {
                var self = this;
                var files = FilesToDownload.findOne({_id:self.params._id});
                if(!files){
                    self.response.end("Sorry no files to download...");
                };

                // Create zip
                var zip = new JSZip();

                // Add a file to the zip
                zip.file('textfile.txt', 'Hello World');

                // Generate zip stream
                var output = zip.generate({
                    type:        "nodebuffer",
                    compression: "DEFLATE"
                });

                // Set headers
                self.response.setHeader("Content-Type", "application/octet-stream");
                self.response.setHeader("Content-disposition", "attachment; filename=filename.zip");
                self.response.writeHead(200);

                // Send content
                self.response.end(output);
            }
        });
    });

// Publish images with userId in owner - this regulates reading the
// filerecord data - use allow/deny for "download" for restricting the
// access to the actual data.
    Meteor.publish( "images", function () {
        return Images.find( {  } );
    } );
}


