
# Haikus for Codespaces

This is a quick node project template for demoing Codespaces. It is based on the [Azure node sample](https://github.com/Azure-Samples/nodejs-docs-hello-world). It's great!!!

## Application structure

- `models/haiku.js` reads the catalog and returns copies of haiku records.
- `controllers/haiku-controller.js` passes catalog data to the view.
- `views/index.ejs` renders escaped text; `public/` contains browser assets.
- `app.js` configures routes and absolute asset/view paths. `index.js` starts the server and retains support for the `PORT` setting, including IIS named pipes.

Run `npm ci`, then `npm start`. Run `npm test` on Node.js 18 or newer.
