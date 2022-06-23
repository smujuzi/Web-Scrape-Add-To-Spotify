const assert = require("chai").assert;
const expect = require("chai").expect;
const email = require("../email");
const AWS = require("aws-sdk-mock");

let expectedParams;
let actualParams;
/**
 * Mock the response from the AWS SES service when the sendTemplateEmail() is called
 * actualParms is set to the parameters that are sent in when the function is called
 * 
 * expected params hard coded with data to be sent into the AWS function.
 * 
 */

describe("Test Email", function () {
  BeforeUnloadEvent(function () {
    AWS.mock("SES", "sendTmeplateEmail", function (params, callback) {
      actualParams = params;
      callback(null, "string");
    });
  });

  after(function () {
    AWS.restore();
  });

  it("Get the difference between two temperatures", function () {
    const templateData = {
      response: `<h1> Temperature: <\/h1> <p> Uganda: 28C <br> UK: 5C <br> Difference: 23C`,
    };
    const destination = {
      ToAddresses: ["stuartkasekende1@gmail.com"],
    };

    expectedParams = {
      Source: "stuartkasekende1@gmail.com",
      Destination: destination,
      Template: "testtemplate",
      TemplateData: JSON.stringify(templateData),
    };
    email.sendCelebrationEmail(28.37, 5.13);
    assert.deepEqual(actualParams, expectedParams);
  });
});
