
# Test API

### Prerequisites

Following environment variables should be accessible (via a `.env` file or cli):

```
MYSQL_HOST
MYSQL_USER
MYSQL_PASSWORD
MYSQL_DATABASE
```

After making sure you have entered your environment variables and saved ***.env*** file, you need to install Node.js dependencies by navigating to app directory in console and running `npm install` command. After all dependencies are finished installing, build the app with Webpack by running `npm build`.

(Books table will be created automatically if not existing)

### Running

Run the server app by running `./dist/bundle.js ` in your console.

### API

#### /data

#### GET

Gets rows from DB

Query string parameters:

1. id: get row with specified ID
2. sortBy: sort rows by field
3. page: pagination page number
4. size: pagination page size

##### POST

Posts a row into DB

Body parameters:
```
{
    "row": {
        "title": "string",
        "date": "string",
        "author": "string",
        "description": "string",
        "image": "string"
    }
}
```

##### PATCH

Updates a row inside DB

Body parameters:
```
{
    "id": "string",
    "row": {
        "title": "string",
        "date": "string",
        "author": "string",
        "description": "string",
        "image": "string"
    }
}
```

