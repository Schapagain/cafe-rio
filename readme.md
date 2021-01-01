## Guide to the API Endpoints
<br/>

> Server deployed at: https://cafe-rio.herokuapp.com/

### Responses and Error Codes
All responses are JSON objects. In cases of failure, an 'error' property shall always exist with an appropriate error message. The following are all possible http response types:

|Code|Title|Description|
|-----|-----|-----|
|200|OK|Everything went smoothly!|
|201|Created|Content was posted successfully|
|400|Bad request|At least one required field, or a JWT, was not provided|
|401|Unauthorized|Login credentials mismatch, or JWT invalid|
|404|Not Found|Page, or resource (user, file) not found on the server|
|409|Conflict|A resource with the provided unique identifier (email, phone) already exists|
|500|Internal Server Error|Something unexpected happened! Please report an issue asap|

<br/>

### User routes

|Endpoint|Desc|Method|Access|Payload|Return|Notes|
|-----|-----|-----|-----|-----|-----|-----|
| /api/users/signup | Signup a user | POST | Public | {name, email, phone, password, organization, employeeId, idCard } | { user, token } | idCard must be an image file |