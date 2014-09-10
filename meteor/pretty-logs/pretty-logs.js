if (Meteor.isClient) {

}

if (Meteor.isServer) {
    Meteor.startup(function () {
        var chalk = Meteor.require('chalk');
        chalk.enabled = true;
        console.log( chalk.red('AAAAAAAAAAAAAAAAAA' ))
    });
}
