# Bootcamp, Redberry Assignment

This repository contains the assignment, which includes information about the API and Figma designs.
Colaborative Project - [https://redberry.gitbook.io/bootcamp-7-assignment/gverdebi/damatebuli-blogebis-sia]

## Assignment Details

- **Assignment Description**: The assignment details, including tasks and requirements, can be found [here](https://redberry.gitbook.io/bootcamp-7-assignment/).
- **Backend URL for Blogs**: [https://george.pythonanywhere.com/api/blogs/](https://george.pythonanywhere.com/api/blogs/) (additional Sandro's API: barcametro.pythonanywhere.com/blogs)
- **API Documentation**: [george.pythonanywhere.com/swagger/](https://george.pythonanywhere.com/swagger/)
- **API Endpoint for Blogs**: [george.pythonanywhere.com/api/blogs/](https://george.pythonanywhere.com/api/blogs/)
- **Adding a New Blog Post**: (Username: admin, Password: admin). Send a POST request to API with the required data in the request body.

## Usage

1. Clone this repository to your local machine.
2. Follow the assignment details provided in the link above.
3. Utilize the provided backend URL and API documentation for fetching blogs and adding new blog posts.

# Blog Website

This is a web application for a blog website where users can view various blog posts. The website allows users to filter the displayed blog posts based on different categories and provides a login feature for authorized users.

### Table of Contents

1. [Bootcamp, Redberry Assignment](#bootcamp-redberry-assignment)
2. [Assignment Details](#assignment-details)
3. [Usage](#usage)
4. [Blog Website](#blog-website)
   - [Features](#features)
   - [Technologies Used](#technologies-used)
   - [How to Use](#how-to-use)
5. [Credits](#credits)
6. [License](#license)
7. [Notes on JavaScript Function in Blog.js](#notes-on-javascript-function-in-blogjs)
8. [JavaScript Functions and Event Handlers in newBlog.js](#javascript-functions-and-event-handlers-in-newblogjs)
   - [Image Upload Functionality](#image-upload-functionality)
   - [Form Field Validation](#form-field-validation)
   - [Category Selection and API Interaction](#category-selection-and-api-interaction)
   - [Form Submission](#form-submission)
   - [Popup Window](#popup-window)

## Features

- **Filter by Categories**: Users can filter the displayed blog posts by selecting one or more categories from the available options.
- **Dynamic Blog Rendering**: Blog posts are fetched from an external API and rendered dynamically on the webpage.
- **Login Popup**: Users can log in using their email address through a login popup window.
- **Authorization**: Upon successful login, users receive authorization to perform certain actions, such as adding new blog posts.
- **See More**: Users can click on the "See More" link to view the full content of a specific blog post.

## Technologies Used

- HTML
- CSS
- JavaScript
- Fetch API for fetching data from the backend
- Local Storage for storing user authentication tokens

## How to Use

1. Clone the repository to your local machine.
2. Open the `index.html` file in a web browser to view the website.
3. Use the category buttons to filter blog posts based on your interests.
4. Click on the "Log in" button to access the login popup window and enter your email address to log in.
5. After logging in, you can navigate through the blog posts and click on the "See More" link to view the full content of a post.

## Credits

- The website design and development are done by

## Giorgi Nareklishvili

## Luka Kavtaradze

## Mentor: Beqa maisuradze

- Blog post data is fetched from [[API Source](https://george.pythonanywhere.com/api/blogs/)].
- Fonts used in the project are provided by Google Fonts.

## License

This project is licensed under the Bitcamp.

## Notes on JavaScript Function in Blog.js

JavaScript function `render()` is responsible for fetching and displaying detailed information about a selected blog post. Below are some additional notes regarding its functionality:

- **Fetching Data**: The function makes an asynchronous HTTP request to the specified API endpoint to fetch blog data.
- **Error Handling**: It includes error handling logic to catch any network or server-related errors during the data fetching process.
- **Retrieving ID**: The function retrieves the ID of the selected blog post from the browser's local storage. This ID is used to identify and retrieve detailed information about the specific blog post.
- **Rendering Blog Content**: Upon successfully fetching the data, the function locates the chosen blog post using its ID and constructs the HTML markup to display its detailed information, including the author, publication date, categories, and description.
- **Displaying HTML**: The constructed HTML markup for the chosen blog post is inserted into the designated blog section of the webpage, replacing any existing content.
- **Error Handling for Missing Blog**: If no blog post is found with the selected ID, an error message is logged to the console, indicating that the blog was not found.
- **Logging Errors**: Any errors encountered during the execution of the function, such as failed API requests or missing blog posts, are logged to the console for debugging and error tracking purposes.

Overall, the `render()` function enhances the user experience by dynamically displaying detailed information about selected blog posts on the webpage.

## JavaScript Functions and Event Handlers in newBlog.js

### Image Upload Functionality

- The script allows users to upload an image either by selecting a file using the file input or by dragging and dropping the image onto a designated area.
- Upon selecting an image, its preview is displayed within the designated drop area.

### Form Field Validation

- Validation is implemented for different form fields such as author name, title, description, and email.
- The script checks for various criteria such as minimum and maximum length for input values and applies visual indicators to highlight invalid inputs.
- For example, for the author name input, the script checks for the length of the name, whether it contains multiple words, and whether it contains Georgian characters.

### Category Selection and API Interaction

- The script retrieves a list of categories from an API endpoint and allows users to select a category from a dropdown menu.
- Upon selecting a category, additional information about the selected category is fetched from the API and logged to the console.
- The selected category is then included in the data payload when submitting the form.

### Form Submission

- When the user submits the form by clicking the submit button, the script retrieves the selected category and sends a POST request to a specified API endpoint with the form data.
- The script includes error handling logic to handle cases where the server returns an error response.
- Upon successful submission, appropriate actions can be taken (not explicitly defined in the provided code).

### Popup Window

- The script includes functions to open and close a popup window, providing a visual overlay for displaying additional information or interactions.

Overall, the JavaScript code enhances the user experience by providing interactive features and ensuring data integrity through form validation before submission.
