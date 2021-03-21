# Property Demo

## Introduction

The Example Project provides a simple server to provide a RESTful API for properties and a client built in React which will provide the UI for the 3 pages:

## Run the project

Build and run the server:

cd server; npm i; npm start

And the front-end:

cd client; npm i; npm start

### Routes

The client should be running on http://localhost:3000/

The initial list property route is `/`
Clicking on any property card's 'View this property' button will take you to the details page, `/properties/1`
To get to the Add Property Form you should browse to: `/admin/add`

There is no authentication

## Notes

### My Approach

I started off getting the ideas on a piece of paper; I've add a [picture of these notes](initial-notes.jpg) to the root of the project. Really I just wanted to get a feel for what components I would need so that I could structure the project accordingly. This stage took about 15 minutes.

The next step for me, was to build the React pages, getting the UI in place and discovering some extra fields I would need in DB. After I had a rough prototype in place, I did a quick round of refactoring and moved some components that had been used multiple times into a common folder so they could be better re-used. I chose to add them with an atomic design naimg convention, to encourage this approach for re-use. This stage took around 45 minutes.

Moved on to server, was going to use appollo server and GraphQL, but decided to save time and make a very straightforward REST API in express with sqlite as data storage; considered other options. This stage probably took about an hour as I started off thinking along different lines and then changed my mind, the bulk of the work with express was done in 30 minnutes though.

Once this was in place, I change the API client code, which I had initially used Promises with mock data so that I could build out the pages, and I implemented some calls to axios which fetch data from the server. I spent about 45 minutes on this, and need to go and change a few things on the server, and then retest, which slowed things down.

With the basics done, I created an enpoint for receiving and sending files and hooked this into a drag & drop interface from a React library, then started to add some basic form validation. I ran out of time after spending about 30 minutes here and decided to wrap up.

#### Choice of libraries

I chose to use React with mobX for state management as it's something I am comfortable with and I believe that it aids in rapid prototyping, I was quickly able to map the data model from my notes into various viewModels that represented the data I needed to display in specific components. I could quickly connect a client to load in data using Promises and mocked data to allow me to build the UI.

ReactAsync is used as a declarative approach to handle Async requests, and offers a nice way to load data for pages with simple fallbacks.

### What's Missing

There are quite a few parts of the app without good error handling. If the server isn't up and running then we just fallback to a basic error page, but we are missing any understanding of the data, and other than the types to describe the DTOs, there is no actual checking of runtime values.

There needs to be unit & functional tests added, but I decided this was out-of-scope given the time I had taken to get to this point.

Form validation on the add property form isvirtually non-existent, there is some example validation on the price field to show an implementtion, although I would probably want to use a library like Yup here. I would also have allowed for the editing of Properties, which would have been implemented using the same view model, and would just have needed a conditional call to load the data if we had the ID. I would then have used a `PUT` verb for idempotent updates on the server. 

User authentication would be essential for the admin part of the site. This could be implemented by receiving claims via a JWT token, and a simple wrapper on the Route component to conditionally display routes under admin. This could easily be circumvented in the FE, so would need to be paired with a Bearer token sent to API calls to only return restricted data to those that should be able to view it. Likewise you would restrict any endpoints that pushed new data.

### Further work

I would certainly add storybook to this project, or actually look to split the common components into a new library with storybook and have the UX library consistent across the site.

I kept the detail and the project card model seperate but derived from the same base model because I could see the details page getting many more properties in the future, which were likely not going to be needed for the card.

I also started to build out Pagination, and I could see filters working in a similar way. The idaa would be that these pagination and filtering models could live in a state, or provided as context via a provider, and then brought into the client via hooks to help build the get request, and used in the compoents to help easily display selected filters, and current page / total results. They should be built similar to middleware, so that data is just piped into them if they exist and are in use, and if not the system works regardless.
