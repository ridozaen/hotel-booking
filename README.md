# hotel-booking
Simple hotel booking application

## Admin Login Info
>username: admin

>password: admin

## Routes

| Route             | HTTP   | Parameter                                                                          | Description                                      |
|-------------------|--------|------------------------------------------------------------------------------------|--------------------------------------------------|
| /admin            | GET    |                           Header {Authorization : Token}                           | get all users info list (admin only)             |
| /admin/:id        | GET    | Header {Authorization : Token}                                                     | get single user info by id (admin only)          |
| /admin/register   | POST   | Header {Authorization : Token} Body: { fullName, username, password }              | create new user with role admin (admin only)     |
| /admin/signin     | POST   | Header: {Authorization : Token} Body: { username, password }                       | sign in to admin (admin only)                    |
| /admin/delete/:id | DELETE | Header {Authorization : Token}                                                     | delete user record (admin only)                  |
| /users/signup     | POST   | Body: { fullName, username, password }                                             | sign up / create user record                     |
| /users/signin     | POST   | Body: { username, password }                                                       | sign in user                                     |
| /rooms            | GET    |                                                                                    | get all rooms records                            |
| /rooms/avail      | GET    |                                                                                    | get all rooms available                          |
| /rooms/:id        | GET    |                                                                                    | get single rooms by id                           |
| /rooms/add        | POST   | Header {Authorization : Token} Body: { type, description, image, quantity, price } | add new room record (admin only)                 |
| /rooms/update/:id | PUT    | Header {Authorization : Token} Body: {type,description,image,quantity,price}       | update/edit room record based on ID (admin only) |
| /rooms/delete/:id | DELETE | Header {Authorization : Token}                                                     | delete rooms records (admin only)                |
| /reservations     |        |                                                                                    |                                                  |