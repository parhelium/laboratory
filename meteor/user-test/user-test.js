if ( Meteor.isClient ) {
    Meteor.loginWithPassword( 'a@a.pl', 'a', function ( err ) {
        if ( err ) {
            console.error( err )
        } else {
            console.log( 'logged in !' )
        }
    } )
}

if ( Meteor.isServer ) {
    Meteor.startup( function () {
        Accounts.createUser( {
            email: 'a@a.pl',
            password: 'a'
        } );
        OrbitPermissions.delegate()
    } );
}
