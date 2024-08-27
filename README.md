# Shopation Case Study

Welcome to the Shopation Case Study project! This project was developed as part of a frontend developer technical assessment, focusing on implementing a product listing and detail page with various features including cart management, filtering, and local storage persistence.

**LIVE DEMO: https://shopation-case.vercel.app/**

## Project Description

### General Requirements

- **LocalStorage Persistence:** Save and load operations within the application should be stored in `localStorage`.
- **API Integration:** The application must make at least one service request.
- **Responsive Design:** The project must be responsive and adapt to different screen sizes.
- **Multiple Pages:** The project must include at least two separate pages:
  - **Product Listing Page**
  - **Product Detail Page**
- **Unit Testing:** Unit tests should be written for the project.

### Detailed Task Requirements

1. **Starting Point:** The application begins with the product listing screen.
2. **Data Fetching:** Products are fetched from the API and displayed on the screen. The API used for this project is:
   - **API Endpoint:** [https://5fc9346b2af77700165ae514.mockapi.io/products](https://5fc9346b2af77700165ae514.mockapi.io/products)
3. **Pagination:** Products are displayed 12 items per page. If there are more than 12 products, pagination is implemented.
4. **Product Detail:** When a product is selected, the user is redirected to a detailed view of that product, showing all relevant details.
5. **Add to Cart:** Users can add products to the cart from both the listing and detail pages.
6. **Cart Management:** The cart allows for increasing and decreasing the quantity of items. Changes are reflected in the cart, and the cart persists even if the browser is closed and reopened.
7. **Filtering:** Products can be filtered using the options on the left-hand side of the screen.
8. **Search:** A search field in the header allows users to search for products by name, dynamically updating the product list.
9. **Navigation:** Clicking on any product navigates to the product detail page, where users can also add the item to the cart.
10. **State Management:** The use of state management tools like Redux, Redux-Saga, or Context API is advantageous.

## Technology Stack

### Frontend
- **Framework:** Next.js 14
- **Languages:** TypeScript
- **Styling:** Tailwind CSS
- **Data Fetching:** Axios
- **State Management:** Context API

### Additional Tools
- **Form Handling:** rc-slider
- **Notifications:** React Toastify
- **Testing:** Jest, React Testing Library
- **Bundling:** Webpack (via Babel)

## Key Features

- **Responsive Design:** The application is fully responsive and optimized for various screen sizes.
- **LocalStorage Integration:** Persistent cart functionality that retains items even after the browser is closed.
- **Product Filtering:** Dynamic filtering based on brand, model, and price range.
- **Pagination:** Efficient pagination to handle large sets of products.
- **Search Functionality:** Real-time search for products by name.
- **Context API:** Used for state management across the application, managing the cart state efficiently.
- **Unit Testing:** Comprehensive tests to ensure the reliability of components and functionality.

## Project Structure

- **`components/`**: Contains reusable React components such as the header, footer, product listing, and cart components.
- **`context/`**: Includes the Context API setup for managing global state.
- **`data/`**: Contains API service functions and data types.
- **`layouts/`**: Layout components for wrapping page content.
- **`pages/`**: Next.js pages including the main product listing and detail pages.
- **`__tests__/`**: Jest test files for the components and pages.

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/canptleon/shopation-case.git
   cd shopation-case
