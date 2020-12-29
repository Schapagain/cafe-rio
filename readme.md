
# Guide to the backend API
> Note: All routes return with { error } in case of failure

## User handling
1. Register a user

  * **Endpoint**: /api/users
  * **Method**: POST
  * **Payload**: User { name, email, password }
  * **Response**: { User, token } 

2. Authenticate a user

  * **Endpoint**: /api/auth
  * **Method**: POST
  * **Payload**: {email, password}
  * **Response**: { User, token } 

3. Get user info
  * **Endpoint**: /api/auth/user
  * **Method**: GET
  * **Header**: Authorization : token
  * **Response**: { name, email } 
## Transaction handling

1. Add a new transaction

  * **Endpoint**: /api/transactions
  * **Method**: POST
  * **Header**: Authorization : token
  * **Payload**: Transaction { amount, title, date, category, type }
  * **Response**: { transaction: Transaction } 

2. View all transactions

  * **Endpoint**: /api/transactions
  * **Method**: GET
  * **Header**: Authorization : token
  * **Optional parameters**: startDate, endDate, category, type
  * **Response**: { transactions: [ Transaction ] } 
  * **Note**: Only startDate is inclusive
