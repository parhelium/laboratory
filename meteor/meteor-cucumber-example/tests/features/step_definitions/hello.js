module.exports = function () {

   this.Given(/^the application has been created$/, function (callback) {
      callback();
   });

   this.When(/^I go to the home page and enter "([^"]*)" in the name field$/, function (name, callback) {
      var z = this.zombie
      z.home(function(){
         z.browser.fill("#name", name)
         z.browser.evaluate("$('#name').change()");
         z.browser.wait(1000, callback);
      })
   });

   this.Then(/^I should see "([^"]*)" on the page$/, function (greeting, callback) {
      var browser = this.zombie.browser;
      var actualGreeting = browser.text("#greeting");
      if(greeting == actualGreeting) {
         callback();
      } else {
         callback.fail(actualGreeting + " not equal to expected " + greeting);
      }
   });
}
