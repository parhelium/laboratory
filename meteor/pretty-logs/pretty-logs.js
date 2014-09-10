if (Meteor.isClient) {

}

if (Meteor.isServer) {
    Meteor.startup(function () {
        var chalk = Meteor.npmRequire('chalk');
        chalk.enabled = true;
        console.log( chalk.red('AAAAAAAAAAAAAAAAAA' ))
    });
}
