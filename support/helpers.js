const chakram = require('chakram'),
      generate = new chance;

function createUserModel(){
    return {
        "firstName": generate.first(),
        "lastName": generate.last(),
        "email": generate.email({domain: 'apitest.com'}),
        "password": "Automation!",
        "repeatPassword": "Automation!"
    };
}

module.exports = {
    createUserModel
};