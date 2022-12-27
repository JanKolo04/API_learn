[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)

# API_learn

REpo to create some cool functions to learn api in NodeJS


## Deployment

Install Compass Mongodb to have view on data base
[Install Compass](https://www.mongodb.com/try/download/compass).

Install required library

```bash
  npm install mogoose
  npm install joi
  npm install config
  npm install express
  npm install express-session
```

Run main file
```bash
  node index.js
```
## API Reference

#### Login 

```
  POST /api/login
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `token`   | `string` | **Required**. You have to be authorizated to have access into data |

</br>


#### Fetch all users

```
  POST /api/users
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `null`    | `string` | **Required**. If you are authorizated and in `admin` group you have acces inyo this page |



## Documentation
In first step we have to install library which I have given above.
Second step in our API is login page when you have account, but if no you have to go to register page where you can create your account.
When you are in admin group you have access into `user` nad `user/:id` pages (Currently group can change in MongoDB Compass, but I work on this).


## Code

### Login

Here I paste piece of code from login file. This code get data (email, password) from body nad find user with this `email`.
When found someone with this email, compare passwords from db and from body, when compare return `true`.
After whole security we are createing auth_token to check user for is login, and save this in `session`.
In `session` we are also saveing group of user to until later validation on others pages.

```node
router.post('/', async (req, res) => {
    // First Validate The Request
    const { error } = validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    // Check if this user already exisits
    const user = await User.findOne({ email: req.body.email });
    if (user) {
        //check password correct
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if(validPassword) {
            //create token
            const token = jwt.sign({_id: user._id}, config.get("PrivateKey"));

            //save data in session
            session.token = token;
            session.group = user.group;

            res.send("You are in, and your token is: "+ session.token);

            //return res.send("You are in!");
        }
        else {
            return res.send("Wrong password!");
        }
    } 
    else {
        return res.status(400).send('This email doesnt exist!');
    }
});

module.exports = router;
```

## To do
- [ ] Connect webiste with API
- [ ] Create page to logout user (create column in db to check login)
- [ ] Find place where active session are storing
- [ ] Check why data from `form` is uundefined 
