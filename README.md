# E-Commerce App Project

This project was created with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm run server`

Runs the backend server.\
Open [http://localhost:5000](http://localhost:5000) to view it in your browser.

The page will reload when you make changes.\

### `npm run client`

Runs the client side app.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run dev`

Use this command to run both the backend and the frontend servers with one command.\

### `Server Routes`

**notes:** <br>
-routes tagged with **Protected** will need a token to be accessed<br>
-user type inputs **Admin** and **User** with the capital letters<br>
-user status inputs **Active**, **Inactive** and **Suspended** with the capital letters<br>

#### Protected `api/users` GET
gets all users from DB

```
const axios = require('axios');

let config = {
  method: 'get',
  url: 'http://localhost:8080/api/users',
  headers: {
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNjZmODg5NGEwNmZjMzQ4YzczNzlmOSIsImlhdCI6MTY1MDkxNTUwMywiZXhwIjoxNjUwOTE5MTAzfQ.B-YHLOhbjNdKyuqLYer027YjRU-GXFzSqGOYEgwQoRE'
  }
};

axios(config)
.then((response) => {
  console.log(JSON.stringify(response.data));
})
.catch((error) => {
  console.log(error);
});

```

#### `api/users` POST

```
const axios = require('axios');
let data = JSON.stringify({
  "firstName": "firstName",
  "lastName": "lastName",
  "email": "email@email.com",
  "password": "password",
  "address": "address",
  "phone": "phone",
  "type": "type",
  "status": "status"
});

let config = {
  method: 'post',
  url: 'http://localhost:8080/api/users',
  headers: {
    'Content-Type': 'application/json'
  },
  data : data
};

axios(config)
.then((response) => {
  console.log(JSON.stringify(response.data));
})
.catch((error) => {
  console.log(error);
});
```

#### `api/users/login` POST

```
const axios = require('axios');
let data = JSON.stringify({
  "email": "email@email.com",
  "password": "password"
});

let config = {
  method: 'post',
  url: 'http://localhost:8080/api/users/login',
  headers: {
    'Content-Type': 'application/json'
  },
  data : data
};

axios(config)
.then((response) => {
  console.log(JSON.stringify(response.data));
})
.catch((error) => {
  console.log(error);
});
```

#### Protected `api/users/:id` PUT

```
const axios = require('axios');
let data = JSON.stringify({
  "firstName": "firstName",
  "lastName": "lastName",
  "email": "email@email.com",
  "password": "password",
  "address": "address",
  "phone": "phone",
  "type": "type",
  "status": "status"
});

let config = {
  method: 'put',
  url: 'http://localhost:8080/api/users/6266f8894a06fc348c7379f9',
  headers: {
    'Content-Type': 'application/json'
  },
  data : data
};

axios(config)
.then((response) => {
  console.log(JSON.stringify(response.data));
})
.catch((error) => {
  console.log(error);
});
```

#### Protected `api/users/:id` DELETE

```
const axios = require('axios');

let config = {
  method: 'delete',
  url: 'http://localhost:8080/api/users/6266f8894a06fc348c7379f9',
  headers: { }
};

axios(config)
.then((response) => {
  console.log(JSON.stringify(response.data));
})
.catch((error) => {
  console.log(error);
});
```

#### Protected `api/users/:id/:location` PUT

```
const axios = require('axios');
let data = JSON.stringify({
  "itemID": "6266285eb39dea1f1bf0c434"
});

let config = {
  method: 'put',
  url: 'http://localhost:8080/api/users/6266f8894a06fc348c7379f9/cartItems',
  headers: { 
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNjZmODg5NGEwNmZjMzQ4YzczNzlmOSIsImlhdCI6MTY1MDkxNTUwMywiZXhwIjoxNjUwOTE5MTAzfQ.B-YHLOhbjNdKyuqLYer027YjRU-GXFzSqGOYEgwQoRE', 
    'Content-Type': 'application/json'
  },
  data : data
};

axios(config)
.then((response) => {
  console.log(JSON.stringify(response.data));
})
.catch((error) => {
  console.log(error);
});
```

#### Protected `api/users/:id` DELETE

```
const axios = require('axios');
let data = JSON.stringify({
  "itemID": "6266285eb39dea1f1bf0c434"
});

let config = {
  method: 'delete',
  url: 'http://localhost:8080/api/users/6266f8894a06fc348c7379f9/cartItems',
  headers: { 
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNjZmODg5NGEwNmZjMzQ4YzczNzlmOSIsImlhdCI6MTY1MDkxNTUwMywiZXhwIjoxNjUwOTE5MTAzfQ.B-YHLOhbjNdKyuqLYer027YjRU-GXFzSqGOYEgwQoRE', 
    'Content-Type': 'application/json'
  },
  data : data
};

axios(config)
.then((response) => {
  console.log(JSON.stringify(response.data));
})
.catch((error) => {
  console.log(error);
});
```

#### Protected `api/users/:id` PUT

```
const axios = require('axios');
let data = JSON.stringify({
  "firstName": "firstName",
  "lastName": "lastName",
  "email": "email@email.com",
  "password": "password",
  "address": "address",
  "phone": "phone",
  "type": "type",
  "status": "status"
});

let config = {
  method: 'put',
  url: 'http://localhost:8080/api/users/6266f8894a06fc348c7379f9',
  headers: {
    'Content-Type': 'application/json'
  },
  data : data
};

axios(config)
.then((response) => {
  console.log(JSON.stringify(response.data));
})
.catch((error) => {
  console.log(error);
});
```
