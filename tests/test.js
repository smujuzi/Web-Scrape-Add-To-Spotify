//mock API and AWS.SES

const assert = require("chai").assert;
const sinon = require("sinon");
const axios = require("axios");
const AWS = require('aws-sdk-mock');

const index = require('../index');
const { isTag } = require("domhandler");

let expectedParams;
let actualParams;

describe('Project Test', function(){
    let mockGet;

    before(function() {

        mockGet = sinon.stub(axios, 'get');

        AWS.mock('SES', 'sendTemplateEmail', function(params, callback) {
            actualParams = params
            callback(null, 'EXPECTED RESPONSE FROM AWS SES MOCK');
        })
    })

    after(function() {
        mockGet.resetHistory();

        AWS.restore();
    })

    beforeEach(function(){

    })

    afterEach(function() {
        mockGet.resetHistory();
    })

    describe('Hotter in Uganda', function(){

        before(funciton() {

        mockGet.withArgs("https://api.openweathermap....")
        .returns(Promise.resolve({
                data: {
                    main: {
                        temp_min: 298.15,
                        temp_max: 300.15
                    }
                }
            })),
        
        mockGet.withArgs("https://api.openweathermap...")
        .returns(Promise.resolve({
                data: {
                    main: {
                        temp_min: 279.15,
                        temp_max: 281.15
                    }
                }
            }))
        
        })

        it('Celebration Email not called', async function(){

            await index.handler();
            result = actualParams == undefined? true : false;
            assert.equal(true, result)
        })
    })

    describe('Hotter in UK', function() {

        before(function() {

            mockGet.withArgs("https://api.openweatherapi...")
            .returns(Promise.resolve({
                data: {
                    main: {
                        temp_min: 279.15,
                        temp_max: 281.15
                    }
                }
            }))

            mockGet.withArgs("https://api.openweatherapi...")
            .returns(Promise.resolve({
                data: {
                    main: {
                        temp_min: 298.15,
                        temp_max: 300.15
                    }
                }
            }))
        })

        it('Get the difference between two temperatures', async function(){

            const templateData = {
                response: `<h1> Temperature: <\/h1> <p> Uganda: 7C <br> UK: 26C <br> Difference: -19C`
            }
            const destination = {
                "ToAddresses": ["stuartkasekende1@gmail.com"]
            };

            expectedParams = {
                Source: "stuartkasekende1@gmail.com",
                Destination: destination,
                Template: "testtemplate",
                TemplateData: JSON.stringify(templateData)
              };


              await index.handler();
              assert.deepEqual(actualParams, expectedParams)
        })
    })

    after(function() {
        mockGet.restore();
    })
})