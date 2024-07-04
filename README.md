# BusyBuy

BusyBuy is a simple e-commerce web application built with React.js, Firebase/Firestore, and other modern libraries. The application includes functionalities for user authentication, product listing, cart management, order history, and more.

## Tech Stack

- **Frontend**: React.js
- **Backend**: Firebase/Firestore
- **Routing**: react-router-dom
- **Notifications**: react-toastify
- **Loading Spinner**: react-spinner

## Live Website

[BusyBuy](https://busybuywebsite.netlify.app/)

## Features

1. **User Authentication**: 
   - Register: Allows new users to register.
   - Login: Allows existing users to log in.
   - Google+ Authentication: Provided by Firebase.

2. **Home Page**:
   - Displays a list of products.
   - Search functionality to search products by name.
   - Filter functionality based on product price and categories.

3. **Product Card Component**:
   - Displays product image, title, price, and buttons to add/remove the product from the cart.
   - If the product is already in the cart, its quantity can be increased/decreased.

4. **Cart Page**:
   - Displays the products added to the cart.
   - Allows users to increase/decrease the quantity of each product or remove products.
   - Shows the total cost of the products in the cart.
   - Provides a button to purchase the items in the cart.

5. **Orders Page**:
   - Displays the products the user has purchased along with the order date.

6. **Notifications**:
   - Toast messages for asynchronous actions and error conditions using react-toastify.

## Project Structure

```plaintext
BUSYBUY1
├── node_modules
├── public
├── src
│   ├── Assets
│   ├── Components
│   │   ├── Authentication
│   │   │   ├── SignIn.jsx
│   │   │   ├── SignUp.jsx
│   │   ├── Cart.jsx
│   │   ├── ErrorPage.jsx
│   │   ├── Home.jsx
│   │   ├── Navbar.jsx
│   │   ├── Orders.jsx
│   │   ├── ProductCard.jsx
│   ├── Config
│   │   ├── auth.js
│   │   ├── firestore.js
│   ├── Context
│   │   ├── authContext.jsx
│   │   ├── productContext.jsx
│   ├── Styles
│   │   ├── common.css
│   ├── App.js
│   ├── index.css
│   ├── index.js
│   ├── productData.js
├── .gitignore
├── package-lock.json
├── package.json
└── README.md
```

## Getting Started

### Prerequisites

- Node.js and npm installed on your machine.
- A Firebase project set up with Firestore and Authentication enabled.

### Installation

1. Clone the repository:

```sh
git clone [<repository-url>](https://github.com/gautamuniverse/BusyBuy_Ecommerce/)
```

2. Navigate to the project directory:

```sh
cd BusyBuy
```

3. Install dependencies:

```sh
npm install
```

4. Create a `.env` file in the root directory and add your Firebase configuration:

```env
REACT_APP_FIREBASE_API_KEY=<your-api-key>
REACT_APP_FIREBASE_AUTH_DOMAIN=<your-auth-domain>
REACT_APP_FIREBASE_PROJECT_ID=<your-project-id>
REACT_APP_FIREBASE_STORAGE_BUCKET=<your-storage-bucket>
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=<your-messaging-sender-id>
REACT_APP_FIREBASE_APP_ID=<your-app-id>
```

5. Start the development server:

```sh
npm start
```

## Usage

- **Register**: Create a new account using the sign-up form.
- **Login**: Log in using your credentials or Google+.
- **Browse Products**: View the products on the home page and use the search and filter features.
- **Manage Cart**: Add products to the cart, adjust quantities, or remove items.
- **Place Orders**: Purchase the items in your cart and view your order history on the orders page.

## Acknowledgements

- React.js
- Firebase
- react-router-dom
- react-toastify
- react-spinner

## Contact Information

- **Author**: Gautam
- **GitHub**: [gautamuniverse](https://github.com/gautamuniverse)
- **LinkedIn**: [Gautam](https://www.linkedin.com/in/gautam-116307bb/)
- **Instagram**: [@gautamuniverse.in](https://www.instagram.com/gautamuniverse.in/)


# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
