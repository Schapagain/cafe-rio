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
|403|Forbidden|Inactive account attempting login|
|404|Not Found|Page, or resource (user, file) not found on the server|
|409|Conflict|A resource with the provided unique identifier (email, phone) already exists|
|500|Internal Server Error|Something unexpected happened! Please report an issue asap|

<br/>

### Auth routes

|Endpoint|Desc|Method|Access|Payload|Return|Notes|
|-----|-----|-----|-----|-----|-----|-----|
| /api/auth/activate/:code | Activate an account | GET | Public |  |  | this link is sent via email during registration <br/> |
| /api/auth | User login | POST | Public | {email, password } | { token, User } |  |
| /api/auth/admin | Admin login | POST | Public | {password } | { token } |  |

<br/>
<br/>

### User routes

|Endpoint|Desc|Method|Access|Payload|Return|Notes|
|-----|-----|-----|-----|-----|-----|-----|
| /api/users/signup | Signup a user | POST | Public | {name, email, phone, password, organization, employeeId, idCard } | { user } | idCard must be an image file <br/> Activation link sent via email |
| /api/users | Fetch all users | GET | Admin |  | { count, data : [ User ] } |  |
| /api/users/:id | Fetch user info | GET | Private |  | { count, data : [ User ] } | |
| /api/users/:id/id_card | Fetch user id card | GET | Private |  | image file | |
| /api/users/:id | Delete a user | DELETE | Admin |  | { id } | |