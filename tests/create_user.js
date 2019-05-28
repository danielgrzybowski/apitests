const chakram = require('chakram'),
    expect = chakram.expect,
    test_data = require('../support/test_data.js'); 
    helpers = require('../support/helpers.js');

describe("User creation", function() {

    let valid = helpers.createUserModel(),
        incorrect_repeat = helpers.createUserModel(),
        invalid_password = helpers.createUserModel();

    incorrect_repeat.repeatPassword = "Automation?";
    invalid_password.password = "automation!";

    [
        {name:"valid data",                    
            user_data: valid, json: null, expected_code: 201},
        {name:"incorrect repeat password",             
            user_data: incorrect_repeat, json: {
                "NewUser.RepeatPassword": [
                    "Repeat Password does not match Password."
                ]
            }, expected_code: 400},
        {name:"invalid password", 
            user_data: invalid_password, json: {
                "NewUser.Password": [
                    "Password must contain at least 3 of the following 4 elements: 1 letter in upper case, 1 letter in lower case, 1 number, 1 special character (such as !,*,&,%, etc.)."
                ]
            }, expected_code: 400},
    ].forEach(test => {
        it (`When fill the fields with ${test.name}`, function(){

            let response = chakram.post(test_data.url, test.user.data);
            return expect(response).to.have.status(test.expected_code)
                                   .to.comprise.of.json(test.json);
        });
    });    
})