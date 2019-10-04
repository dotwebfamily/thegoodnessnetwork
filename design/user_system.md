# User System

The user system is in charge of user related tasks such as log in, registration, etc

## Frontend
### Views
  - myProfile
  - userProfile
  - log in
  - register
  - recover password send email
  - change password
  - email verification code page
### Components
    -profile Pic

## Backend

### ApiRoutes
  - Log In
    - receives user or email and password
    - sets session
      - consising of email
    - returns {answer:{true or false},userData:{}}

### Models
  - User
      name: String,
      last_name: String,
      email: String,
      password: String,
      level: String, // idk?
      cellphone: String,
      telephone: String,
      country: String,
      address: String,
      prof_pic: String,
      fb_id: String,
      gcoins: { type: Number, default: 0 },
      e_verified: { type: Boolean, default: false },
      is_allowed: { type: Boolean, default: true },
      created_at: { type: Date, default: Date.now }
