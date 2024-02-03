const blogSection = document.getElementById("cards");
const image = Array.from(document.getElementsByClassName("image"));
const categorySection = document.querySelector(".categories");

let isClicked = false;

const enter = document.getElementById("enter");
console.log(enter);
const login = document.querySelector(".login");
const exit = document.querySelector(".exit");
const submit = document.querySelector("#submit");
const loginHeader = document.querySelector(".login-header");
const authorization = document.querySelector(".authorization");
const emailInp = document.querySelector("#login-email");
const errorMessage = document.querySelector("#error-message");
const okay = document.querySelector(".okay");
const addBlogBtn = document.querySelector("#add-blog-btn");

// (შესვლა)enter-ზე დაკლიკებისას
enter.addEventListener("click", () => {
  login.style.display = "flex";
});

exit.addEventListener("click", () => {
  login.style.display = "none";
});
// submit-ზე დაკლიკებისას avoid to reload the page
submit.addEventListener("click", async (e) => {
  e.preventDefault();

  let category = "  ";

  // -- categories
  categorySection.addEventListener("click", (e) => {
    const button = e.target.closest("button");
    if (!button) return;
    console.log(button);

    if (!isClicked) {
      isClicked = true;
      button.style.border = "2px solid black";
      category = button.textContent.trim();
      getUserData();
      render();
    } else {
      isClicked = false;
      button.style.border = "none";
    }
  });

  // -- Blog from API FIXME:
  async function render() {
    try {
      const response = await fetch("http://localhost:3000/api/blogs/", {
        method: "GET",
        headers: {
          "content-type": "application/json",
        },
      });

      const apiResponse = await response.json();
    } catch {
      console.error(error);
    }

    // Flatten the structure to match the previous response
    const flattenedData = apiResponse.reduce(
      (acc, current) => [...acc, ...current.data],
      []
    );

    console.log(flattenedData);

    let blogs = flattenedData
      .map(
        (item) => `<div class="card">
        <section class="image">
          <img src="${item.image}" style="width: 400px; height: 320px" alt="">
        </section>

        <section class="title">
          <section class="title-author-releaseDate">
            <h5>${item.author}</h5>
            <span>${item.publication_date}</span>
          </section>

          <section class="title-heading">
            <h3>${item.title}</h3>
          </section>

          <ul class="mutual-categories">
            ${item.categories.map((catId) => {
              // Assuming there is a separate category array available
              // You need to implement a function to get the category by ID
              const category = getCategoryById(catId);
              return `<li style="color: ${category.text_color}; border-radius:30px; height:28px; background-color: ${category.background_color}">${category.name}</li>`;
            })}
          </ul>

          <p class="about-title">${item.description}</p>

          <section class="see-more">
            <a href="pages/Blog/blog.html">სრულად ნახვა</a>
            <img src="${item.image}" alt="">
          </section>
        </section>
      </div>`
      )
      .join(" ");

    blogSection.innerHTML = blogs;
  }

  //____________________________________ Get the category by ID ______________________
  function getCategoryById(categoryId) {
    // Implementation to retrieve the category by ID from a separate array or source
    const categories = [
      {
        id: 1,
        name: "Category 1",
        text_color: "#60BE16",
        background_color: "#70CF25",
      },
    ];
    return categories.find((cat) => cat.id === categoryId);
  }
  // Call the render function
  render();

  //____________________________ POST email in API __________________________________
  const response = await fetch("https://george.pythonanywhere.com/api/login/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    // API-ს გადავცეთ/POST emailInp.value
    body: JSON.stringify({
      email: emailInp.value,
    }),
  });

  //_______ data დავარქვათ, რესპონსს API-დან parsed as JSON. და შევინახოთ local Storage-ში
  const data = await response.json();
  if (response.ok) {
    localStorage.setItem("token", data.token);

    authorization.style.display = "flex";
    login.style.display = "none";

    okay.addEventListener("click", (e) => {
      e.preventDefault();

      enter.style.display = "none";
      addBlogBtn.style.display = "flex";
      authorization.style.display = "none";
    });
  }
});

// * API endpoint-ზე POST request-ის გაგზავნის მერე
//      email: emailInp.value
// მივრუნებს responces
