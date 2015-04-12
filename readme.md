Requirements:
- nodeJS
- npm
- mongoDB
- supervisor (npm install -g supervisor)

- Clone the project
- Create a branch
- npm install
- npm start for "live reload"
	- node app.js for production


Reasonings:

Q: Why are comments treated as embedded documents in a Post model?

A: Because comments are unique to a single post.
