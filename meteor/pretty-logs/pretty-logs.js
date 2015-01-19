if (Meteor.isClient) {

}

if (Meteor.isServer) {
    var logger = loggerFactory('pretty-logs');
    Meteor.startup(function () {
        var chalk = Meteor.require('chalk');
        console.log("chalk.supportsColor -> ",chalk.supportsColor);
        chalk.enabled = true;
        console.log( chalk.red('AAAAAAAAAAAAAAAAAA' ))
        logger.log("hello");
    });
}
