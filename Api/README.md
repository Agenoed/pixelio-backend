# Pixelio Api  

## How to set up  
- Create file `.env` in the same directory as `index.js` file;  
- In `.env` file add code:  
  ```
  DATABASE_URL = <mongo_connection_string>
  JWT_SECRET = <jwt_secret>
  JWT_EXPIRATION_SECONDS = <access_token_expiration_time_seconds>
  JWT_AUDIENCE = <jwt_audience>
  JWT_ISSUER = <jwt_issuer>
  MQTT_URL = <mqtt_url>
  ```  
  Where:  
  - `<mongo_connection_string>`: `string` property, connection string to your MongoDB database;  
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
  - `<mqtt_url>`: `string` property, url of MQTT Broker to use;  
    - Example: `mqtt://test.mosquitto.org`;  
- Install necessary dependencies by runing in terminal command `npm install`;  
- Run Application by running in terminal command `npm start`;  
