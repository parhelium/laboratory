if (Meteor.isClient) {
    Company = new Meteor.Collection(Injected.obj('collection').name);
    Deps.autorun(function(){
        var companyData = Company.findOne();
        if(companyData)
            console.log("CompanyData : ", companyData);
    });
    Router.map(function () {
        this.route('test', {
            where: 'client',
            path: '*',
            action: function () {
            }
        });
    });
}

if (Meteor.isServer){
    Company1 = new Meteor.Collection("company1");
    Company2 = new Meteor.Collection("company2");

    Meteor.startup(function(){
        if(Company1.find().count() == 0){
            Company1.insert({
                name:"onlyForCompany1",
                data:1
            })
            Company1.insert({
                name:"onlyForCompany1",
                data:2
            })
        }
        if(Company2.find().count() == 0){
            Company2.insert({
                name:"onlyForCompany2",
                data:1
            })
            Company1.insert({
                name:"onlyForCompany2",
                data:2
            })
        }

    })
    var subdomainToCollectionName = {
        "localhost":"company2",
        "company1.localhost":"company1",
        "company2.localhost":"company2"
    }
    Router.map(function () {
        this.route('matchSubdomains', {
            where: 'server',
            path: '*',
            action: function () {
                // filter requests to static files, like favicon.ico
                if(/(css|js|html|map|ico)/.test(this.path)) {
                    console.log("### Router.onAllRoutes: INVALID :   "+this.path)
                    return;
                }
                var subdomain = this.request.headers.host.split(":")[0];
                console.log("### Router.onAllRoutes: VALID :   "+this.path)
                var collectionName = subdomainToCollectionName[subdomain];
                if(collectionName){
                    Inject.obj('collection', {name:collectionName} );
                }else{
                    throw new Error("Cannot find collection for subdomain : " + subdomain);
                }

                this.next();
            }
        });
    });
}