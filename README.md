1) First Create a .env file with below structure:
    CLIENT_ID=
    CLIENT_SECRET=
    MONGO_URI=mongodb://localhost:27017/KnowledgeBaseApp
    CALL_BACK=http://localhost:4000/google/callback


----------------------------------------------------------------------------------------------------------------------

2) Run: npm install 
   at this path: Knowledge_Base_App/Backend/node-google-oauth2-jwt 

3) Run: npm install 
   at this path: Knowledge_Base_App/Frontend

4) Below are the REST API's developed in Express Framework:

A) Local-Public (Register and Login API)                                 

    Post Login Request- http://localhost:4000/local/login
    Body:{
        "email": "your-email@gmail.com",
        "password": "your-password"
        }
    Response: 
    {
        "message": "Logged in successfully !!",
        "token": "token-value"
    }

B)   Post Register Request- http://localhost:4000/local/register
    Body:{
        "fullname":"Fullname"
        "email": "your-email@gmail.com",
        "password": "your-password-with-6-length"
        }
    Response:
    {
        "message": "Account created and user logged inside the app",
        "token": "token-value"
    }

C) Google-Public (Register and Login API)

    Get Login and Register Request- http://localhost:4000/google
    Response: 
    {
        "message":"Account created and user logged inside the app",
        "token":"token-value"
    }

Note: If social media account created user will try to login with Local Credentials:
Get an error in Response: 
    {
        "errors": [
            {
                "msg": "Please Login with your Google Account !!"
            }
        ]
    }

Protected API's

D)   Post Request Add Category - http://localhost:4000/auth/addCategory

    auth-token- <token-value> pass in header
    Body:{
        "CategoryName": "Clothes"
        }
    Response: 
    {
        "contents": [],
        "_id": "6097bc869e9e491e68323513",
        "CategoryName": "Clothes",
        "__v": 0
    }



E)    Post Request Add Content for the Specific Category - http://localhost:4000/auth/addContent
    
    auth-token- <token-value> pass in header
    Body:{
        "CategoryName":"Fullname"
        "ContentDetails": "ContentDetails_value",
        "profile": "select an image file"
        }
    Response:
    {
        "_id": "6098459dfdd20d39e84308e2",
        "CategoryName": "Cars",
        "ProfileImage": "https://res.cloudinary.com/socialadda/image/upload/v1620592029/Knowlede-Base-app-Images/ptx3x6du3m70rdqwmriy.jpg",
        "ContentDetails": "This is about shubham's car",
        "__v": 0
    }



F)   Get Request to get all the contents - http://localhost:4000/auth/allContents
    
    auth-token- <token-value> pass in header
    Response:
    [
        {
            "_id": "6097267eeb056d3628448b32",
            "CategoryName": "Television",
            "ContentDetails": "This is about the television and first post",
            "__v": 0
        }
        {
            "_id": "609730aadf9e03071c2c7531",
            "CategoryName": "Cars",
            "ContentDetails": "This is my car",
            "__v": 0
        },
        {
            "_id": "6097378025c90423f422e1c2",
            "CategoryName": "Furnitures",
            "ContentDetails": "This is my Furniture-1",
            "__v": 0
        }
    ]

G)   Get Request to get all the categories - http://localhost:4000/auth/allCategory
    auth-token- <token-value> pass in header
    Response:
[
    {
        "contents": [
            "6097060ddce76e4b0cb4d6c9"
        ],
        "_id": "6096fc76a9fbe6357846b9a3",
        "CategoryName": "Bikes",
        "__v": 1
    },
    {
        "contents": [
            "609730aadf9e03071c2c7531",
            "609827a3917e5635382388a7",
            "60982855ba1e773c4408c2e6",
            "60982eac36e1ae1a84f6ac74"
        ],
        "_id": "6096fd12d4cb5028e8c31798",
        "CategoryName": "Cars",
        "__v": 4
    }
]

Note: Each category can have so many contents. 

H)    Get Request to search the contennts by passing keywords in query parameters
    http://localhost:4000/auth/search/car {car is value to search} 
    auth-token: <token-value> pass in header
    Response:
    {
        "status": "success",
        "message": "Content has been fetched",
        "data": [
            {
                "_id": "609730aadf9e03071c2c7531",
                "CategoryName": "Cars",
                "ContentDetails": "This is my car",
                "__v": 0
            },
            {
                "_id": "609827a3917e5635382388a7",
                "CategoryName": "Cars",
                "ContentDetails": "i am car",
                "__v": 0
            },
            {
                "_id": "60982eac36e1ae1a84f6ac74",
                "CategoryName": "Cars",
                "ContentDetails": "vadvdfb-new car",
                "__v": 0
            }
        ]
    }

I) Get Request for user Profile 
    http://localhost:4000/auth/UserData 
    auth-token: <token-value> pass in header
    Response:
    {
    "fullname": "ABC",
    "id": "6098348cff64ca052068a337",
    "email": "abc@gmail.co",
    "iat": 1620590152,
    "exp": 1620590452
    }
    
--------------------------------------------------------------------------------------------------


