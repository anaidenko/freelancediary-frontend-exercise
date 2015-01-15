Freelance Diary front-end coding exercise 
===================

Your task is to write an authentication handler for an AngularJS app.

Here's how the authentication handler works: (paste the code into https://www.websequencediagrams.com)
`https://github.com/neog399/freelancediary-frontend-exercise/blob/master/POST.auth.seq`

There's also a PHP implementation of the API, which can be found on this URL: `https://github.com/neog399/freelancediary-frontend-exercise-php-api`

**The PHP implementation of the API is deployed at and can be used to complete the task:** 
`http://h139-233.rackhostvps.com/auth`
 **NOTE**: A valid {applicationToken} for the PHP api is: e4d909c290d0fb1ca068ffaddf22cbd0

**TASK**
Your task is to create an app which sends the {applicationToken} (which is hardcoded into the app), and receives a {clientToken}. The received {clientToken} has to be stored somewhere so it is accessible in subsequent request without authenticating the app again. (eg. localstorage). The code should be well-tested (unit and integration) and developed accordingly to the TDD principles.

The app should consist of one page with a button labeled 'Send authentication request'. When the user presses this button, the app sends the hardcoded {applicationToken} to the server, and display the received {clientToken} under the button. The user should be informed if there was an error during the authentication.

**Specifications**:

 1. The request body is an object in JSON format. The object has one property: 'applicationToken' - the value of this property is the {applicationToken} you want to authenticate with. **NOTE**: A valid {applicationToken} for the PHP api is: e4d909c290d0fb1ca068ffaddf22cbd0
 2.  You have to add an Authentication header to every request, the value of the header must be the SHA1 hash of the {applicationToken} you are sending.
 3. If the JSON is not well-formed, the API will return an HTTP 404
 4. If the Authorization header is not valid (ie. not the SHA1 hash of the {applicationToken} you are trying to authenticate with), the API will return an HTTP 403
 5. If the {applicationToken} is not a valid application token, the API will return an HTTP 403
 6. If the {applicationToken} is valid and the Authorization header is also valid, the API will return an HTTP 200 and the response's body will be an object in JSON format with one property: clientToken - the value of this property is the {clientToken} you have to save somewhere.
