The Example Project provides a simple server to provide a RESTful API for properties and a client built in React which will provide the UI for the 3 pages:

Build and run the server:

cd server; npm i; npm start

And the front-end:

cd client; npm i; npm start

My Approach

Started off getting the ideas on a piece of paper (see photo)

Built the React pages first, getting the UI in place and discovering some extra fields I would need in DB. Did a quikc round of refactoring and moved some components that had been used multiple times into a common folder so they could be better re-used. I chose to add them with an atomic design naimg convention, to encourage this approach for re-use.

Moved on to server, was going to use appollo server and GraphQL, but decided to save time and make a very straightforward REST API in express with sqlite as data storage; considered other options.

With the basics done, created and enpoint for receiving and sending files and hooked this into a drag & drop interface from a React library, then started to add some basic form validation.

Further work

There needs to be unit & functional tests added, but I decided this was out-of-scope. I would certainly add storybook to this project, or actually look to split the common components into a new library with storybook and have the UX library consistent across the site.

I kept the detail and the project card model seperate but derived from the same base model because I could see the details page getting much more properties in the future, which were likely not going to be needed for the card.

I also started to build out Pagination, and I could see filters working in a similar way. The idaa would be that these pagination and filtering models could live in a state, or provided as context via a provider, and then brought into the client via hooks to help build the get request, and used in the compoents to help easily display selected filters, and current page / total results. They should be built similar to middleware, so that data is just piped into them if they exist and are in use, and if not the system works regardless.
