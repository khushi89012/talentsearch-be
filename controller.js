import { GoogleGenerativeAI } from "@google/generative-ai";
const genAI = new GoogleGenerativeAI("AIzaSyCG5rndWFmoH_STqXBd-VHMEf_U8Q2xgjc");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
const chat = model.startChat({
  history: [
    {
      role: "user",
      parts: [
        {
          text: "Your task is to generate API test cases for a given API endpoint. These test cases should validate various aspects of the API response including status codes, response structure, data types, error handling, headers, and more",
        },
      ],
    },
    {
      role: "model",
      parts: [{ text: "Got it" }],
    },
    {
      role: "user",
      parts: [
        {
          text: "Each test case should follow this format: Test Case Description (e.g., 'Verify the API returns a 200 OK status code'), Expected Result (e.g., 'Status code is 200'), and Test Assertion (e.g., chai.expect(response.status).to.equal(200);).",
        },
      ],
    },
    {
      role: "model",
      parts: [{ text: "I will follow the provided instruction" }],
    },
    {
      role: "user",
      parts: [
        {
          text: "Test case types include Positive Test Cases for valid requests and correct responses, Negative Test Cases for invalid requests (e.g., missing parameters, incorrect data), Error Handling for responses when the API fails (e.g., invalid token, bad request), and Boundary Testing for edge values (e.g., very large or small numbers, long strings).",
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: "I will follow the provided instruction and provide the result accordingly",
        },
      ],
    },
    {
      role: "user",
      parts: [
        {
          text: `Generated Test Cases:
Test Case 1: Validate Successful Response (200 OK)


Expected Result: Status code is 200

Chai Assertion:

chai.expect(response.status).to.equal(200);


Test Case 2: Validate Response Body Structure


Expected Result: Response should include userId, id, title, and body fields.

Chai Assertion:

chai.expect(response.body[0]).to.have.all.keys('userId', 'id', 'title', 'body');


Test Case 3: Handle Unauthorized Error (401 Unauthorized)


Expected Result: Status code is 401 and error message is Unauthorized.

Chai Assertion:

chai.expect(response.status).to.equal(401);

chai.expect(response.body.error).to.equal('Unauthorized');`,
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: "I will follow the provided instruction and provide the result accordingly!",
        },
      ],
    },
    {
      role: "user",
      parts: [
        {
          text: `Evaluation Criteria:
Test Coverage: Include a variety of test cases, covering valid, invalid, error, and boundary scenarios.
Chai Assertion Quality: Use proper Chai assertions to validate the expected behavior.`,
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: "I will make sure to cover all the necessary test cases and use proper Chai"
        }
      ]
    }

  ],
});


export const generateTestCase = async (req, res) => {
  try {
    let result =
      await chat.sendMessage(`Please provide the test case for the given API : API Request:
  Method: ${req.body.method}
  
  URL: ${req.body.url}
  
  
  Headers: Authorization: Bearer <token>
  
  Query Parameters: None
  
  Sample Response: 
  Success Response:
  
  ${req.body.successResponse}
  
  
  Error Response:
  
  ${req.body.errorResponse}
  
  `);
    console.log(result.response.text());
    return res.status(200).send(result.response.text())
  }
  catch (err) {
    console.log(err);
    return res.status(400).send(err)
  }


}



