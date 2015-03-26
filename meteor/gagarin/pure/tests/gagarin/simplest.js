describe('Example test suite', function () {
    var server = meteor();

    it('execute should work', function () {
        // return a promise
        return server.execute(function () {
            return Meteor.release;
        })
            .then(function (value) {
                expect(value).not.to.be.empty;
            });
    });
});