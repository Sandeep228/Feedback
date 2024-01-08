# How to start guide?

1. Install dependencies:
```
npm install
```

2. Start the code:
```
npm start
```
# Postman Collection 
[https://elements.getpostman.com/redirect?entityId=11318463-956ffdc0-0085-4f51-b184-7421a1a64abb&entityType=collection]

# Endpoints Documentation

This documentation provides information about the payload structure required for each endpoint.

## 1. POST: /login

**Description:**

Login with ur credentials.

**Request Payload:**

```json
{
     "email":"sd769113@gmail.com",
     "password":"Sandeep@123"
}
```

**Response Body:**
```json
{
    "message": "Login Successful",
    "userID": "6599197b0dcd6d22d4047c84",
    "name": "Sandeep kumar Srivatstava",
    "email": "sd769113@gmail.com",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTk5MTk3YjBkY2Q2ZDIyZDQwNDdjODQiLCJlbWFpbCI6InNkNzY5MTEzQGdtYWlsLmNvbSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzA0NzIwOTcwLCJleHAiOjE3MDUzMjU3NzB9.QiHAIFsmehKK18sGblDi2Ug3LpgPyTSSDKLWwRJOxVk",
    "role": "user"
}
```


## 2. POST: /signup
**Description:**

Do signup with all fields 

**Request Payload:**
```json
{
    "name":"Sandeep",
    "email":"sd@gmail.com",
    "password":"12345678",
    "role":"user"
}
```

**Response Body:**
```json
{
    "message": "User registered successfully"
}
```


## 3. POST: /feedback

**Description:**

Add a feedback 

**Request Payload:**

```json
{
    "customerName":"Sandsddeep232",
    "feedback":"wewwe",
    "date":"11/02/2023"
}

```

**Response Body:**
```json
{
    "message": "Feddback  created successfully",
    "id": "659bfb57362a968bcfe909ac"
}

```

## 4. GET: /get-my-feedback

**Description:**

Get current user feedback

**Request Payload:**
```json
{
    "email":"sd769113@gmail.com"
}
```


**Response Body:**
```json
[
    {
        "_id": "659b9b5f621c600d934b1b5a",
        "user_id": "6599197b0dcd6d22d4047c84",
        "customerName": "sds",
        "feedback": "good",
        "date": "2023-11-01T18:30:00.000Z",
        "__v": 0
    },
    {
        "_id": "659bb026621c600d934b1c9b",
        "user_id": "6599197b0dcd6d22d4047c84",
        "customerName": "dfs",
        "feedback": "sfsdf",
        "date": "2024-01-11T00:00:00.000Z",
        "__v": 0
    }
]
```

## 5. DELETE: /delete-feedback

**Description:**

Delete current user feedback

**Request Payload:**
```json
{
    "feedbackId":"659aa3140269d1608f561475"
}

```

**Response Body:**
```json
 {
    "message": "Feedback report deleted successfully"
}
```

## 6. PUT: /update-my-feedback

**Description:**

Update current user feedback

**Request Payload:**
```json
{
    "feedbackId":"659b9b5f621c600d934b1b5a",
    "customerName":"sds",
    "feedback":"good",
    "date":"11/02/2023"
}

```

**Response Body:**
```json
{
    "message": "feedback  updated successfully"
}
```

## 7. GET: /get-all-feedback - (Only Admin can acess)

**Description:**

Get all feedback

**Response Body:**
```json
[
    {
        "_id": "659b9b5f621c600d934b1b5a",
        "user_id": "6599197b0dcd6d22d4047c84",
        "customerName": "sds",
        "feedback": "good",
        "date": "2023-11-01T18:30:00.000Z",
        "__v": 0
    },
    {
        "_id": "659bb026621c600d934b1c9b",
        "user_id": "6599197b0dcd6d22d4047c84",
        "customerName": "dfs",
        "feedback": "sfsdf",
        "date": "2024-01-11T00:00:00.000Z",
        "__v": 0
    }
]
```


