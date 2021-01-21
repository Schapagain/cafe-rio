## Guide to the API Endpoints
<br/>

> Server deployed at: https://cafe-rio.herokuapp.com <br/>
> Client deployed at: https://cafe-rio.netlify.app

<br/>

### Pre-deployment requirements
* Mongodb - Obtain database name, and password
    - Either install it locally or signup for MongoDB Atlas
* Gmail - Signup for an account, create an application, and obtain:
    - client id
    - client secret
    - refresh token
* Stripe -
* Paypal - 

### Deployment instructions
* clone repository: ```https://github.com/Schapagain/cafe-rio.git```
* Install server dependencies: ```npm install``` at project root
* Install client dependencies: ```npm run client-install``` at project root
* Setup environment variables:
    - Used to connect to MongoDB
        - ```DBNAME```
        - ```DBPASSWORD```
    - Used to send emails via gmail server
        - ```EMAILUSER```
        - ```CLIENTID```
        - ```CLIENTSECRET```
        - ```REFRESHTOKEN```
    - Used to issue JWTs
        - ```SECRET_KEY```
* Start the application: ```npm run dev``` at project root
<br/>
<br/>

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

> Note: All private or admin routes require a bearer token in headers


### Auth routes

|Endpoint|Desc|Method|Access|Payload|Return|Notes|
|-----|-----|-----|-----|-----|-----|-----|
| /api/auth/activate/:code | Activate an account | GET | Public |  |  | this link is sent via email during registration <br/> |
| /api/auth | User login | POST | Public | {email, password } | { token, User } |  |
| /api/auth/admin | Admin login | POST | Public | {password } | { token } |  |

<br/>
<br/>

### User routes
> URL prefix: api/users

|Endpoint|Desc|Method|Access|Payload|Return|Notes|
|-----|-----|-----|-----|-----|-----|-----|
| /signup | Signup a user | POST | Public | {name, email, phone, password, organization, employeeId, idCard } | { user } | idCard must be an image file <br/> Activation link sent via email |
| / | Fetch all users | GET | Admin | {attributes} | { count, data : [ User ] } | ```attributes``` is a list of desired fields |
| /:id | Fetch user info | GET | Private | {attributes} | { count, data : [ User ] } | |
| /:id/id_card | Fetch user id card | GET | Private |  | image file | |
| /:id | Update user info | PATCH | Private | {name, email, phone, password, organization, employeeId, idcard} | {user } | idCard must be an image file |
| /:id | Delete a user | DELETE | Admin |  | { id } | |

### Meal routes
> URL prefix: api/meals <br/>
> \* marks required fields<br/>
> default values are within parenthesis

|Endpoint|Desc|Method|Access|Payload|Return|Notes|
|-----|-----|-----|-----|-----|-----|-----|
| / | Add a new meal | POST | Public | {name*, price*, category(miscellaneous) , available(true)} | { meal } | picture must be an image file |
| / | Fetch all meals | GET | Public |  | { count, data : [ Meal ] } |  |
| /:id | Fetch meal info | GET | Public |  | { count, data : [ Meal ] } | |
| /:id/picture | Fetch meal picture | GET | Public |  | image file | |
| /:id | Update meal info | PATCH | Admin | {name, price, category, available} | { meal } | |
| /:id | Delete a meal | DELETE | Public |  | { id } | |

### Order routes
> URL prefix: api/orders <br/>
> \* marks required fields

|Endpoint|Desc|Method|Access|Payload|Return|Notes|
|-----|-----|-----|-----|-----|-----|-----|
| /create_intent | Create a payment intent | POST | Public | { user*, meals* } | { secret, amount } | ```user``` is id of the user, and ```meals``` is an array of meal ids |
| / | Add a new order | POST | Public | {user*, meals*, payment*, amount*, type(dinein)} | { order } | ```user``` is id of the user<br/>```meals``` is an array of meal ids<br/>```payment``` is payment method id|
| / | Fetch all orders | GET | Public |  | { count, data : [ Meal ] } |  |
| /:id | Fetch order info | GET | Public |  | { count, data : [ Meal ] } | |
| /:id | Update order info | PATCH | Public | {name, price, category, available} | { order } | |
| /:id | Delete an order | DELETE | Admin |  | { id } | |