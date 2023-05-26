# Pixelio Api  

## How to set up  
- Create file `.env` in the same directory as `index.js` file;  
- In `.env` file add code:  
  ```
  DATABASE_URL = mongodb+srv://<username>:<password>@free-cluster.mtg3w2f.mongodb.net/
  JWT_SECRET = <jwt_secret>
  JWT_EXPIRATION_SECONDS = <access_token_expiration_time_seconds>
  JWT_AUDIENCE = <jwt_audience>
  JWT_ISSUER = <jwt_issuer>
  ```  
  Where:  
  - `<username>` and `<password>`: `string` properties, credentials for your MongoDB User of cluster `free-cluster`;  
  - `<jwt_secret>`: `string` property that is needed for **JWT Authorization Token** processing. Secret code, that is used for encoding;  
    - May be random generated string. You can generate one by running the code below in console:  
      ```
      node
      require("crypto").randomBytes(32).toString("hex")
      ```  
  - `<access_token_expiration_time_seconds>`: `number` property that is needed for **JWT Authorization Token** processing. Represents the time in seconds after which token is not valid;  
    - Example: `43200` - 12 hours;  
  - `<jwt_audience>`: `string` property that is needed for **JWT Authorization Token** processing. **Audience** name, encoded in **JWT authorization token**;  
    - Example: `PixelioFrontend`;  
  - `<jwt_issuer>`: `string` property that is needed for **JWT Authorization Token** processing. **Issuer** name, encoded in **JWT authorization token**;  
    - Example: `PixelioBackendApi`;  
- Install necessary dependencies by runing in terminal command `npm install`;  
- Run Application by running in terminal command `npm start`;  
