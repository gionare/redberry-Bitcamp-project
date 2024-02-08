const image = Array.from(document.getElementsByClassName("image"));
const blogSection = document.querySelector(".cards");
let seeMoreBtn = document.querySelectorAll(".see-more-link");
const enter = document.getElementById("enter");
const login = document.querySelector(".login");
const exit = document.querySelector(".exit");
const submit = document.querySelector("#submit");
const loginHeader = document.querySelector(".login-header");
const authorization = document.querySelector(".authorization");
const emailInp = document.querySelector("#login-email");
const errorMessage = document.querySelector("#error-message");
const okay = document.querySelector(".okay");
const addBlogBtn = document.querySelector("#add-blog-btn");

// -- CATEGORIES --
// 1. წვდომა კატეგორიების კლასსთან (categorySection)
// 2. მოიპოვე მასივი (categoryArr)
// 3. გაფილტრე (categoryArr) იმის მიხედვით თუ რას დაეკლიკება ვებგვერდზე
//  3.1 კატეგორიებზე დაკლიკებისას მოიპოვე კატეგორია (choosenCategory)
// closest(selectors)
//  3.2 categoryArr.filter(choosenCategory) დატოვე მხოლოდ გაფილტრული choosenCategoryForDisplay

let categoryArr = Array.from(document.querySelectorAll(".categories button"));
// categoryArr = [ button.market, button.application, ... ] .object
let choosenCategory = [];
categoryArr.forEach((button) => {
  button.addEventListener("click", (event) => {
    if (choosenCategory.indexOf(event.target.textContent) == -1) {
      choosenCategory.push(event.target.textContent);
      button.style.border = "solid";
    } else {
      choosenCategory.splice(
        choosenCategory.indexOf(event.target.textContent),
        1
      );
      button.style.border = "none";
    }
    console.log(Array.isArray({}));
    render();
  });
});

// -- Blog from API -- dynamically generated HTML
async function render() {
  const response = await fetch("https://george.pythonanywhere.com/api/blogs/");
  const data = await response.json();
  console.log(data);

  // Filter blogs based on the chosen category, using QUERY SELECTOR
  const filteredBlogs =
    choosenCategory.length > 0
      ? data.filter((blog) =>
          blog.categories.some((cat) => choosenCategory.indexOf(cat.title) > -1)
        )
      : data;

  let blogs = filteredBlogs
    .map(
      (item) => `
      <div class="card">
        <section class="image">
          <img src = "${item.image}" alt="">
        </section>
        <section class="title">
          <section class="title-author-releaseDate">
            <h5>${item.author}</h5>
            <span>${item.publish_date}</span>
          </section>
          <section class="title-heading">
            <h3>${item.title} ${item.id}</h3>
          </section>
          <ul class="mutual-categories">
            ${item.categories
              .map(
                (cat) =>
                  `<li style="background-color: ${cat.background_color}">${cat.title}</li>`
              )
              .join(" ")}
          </ul>
          <p class="about-title">${item.description}</p>
          <section class="see-more">
            <a href="pages/Blog/blog.html" data-id="${
              item.id
            }" class="see-more-link">სრულად ნახვა</a>
            <img src="./assets/Arrow.svg" alt="">
          </section>
        </section>
      </div>`
    )
    .join(" ");

  blogSection.innerHTML = blogs;
}

//  retrieve the data-id attribute when the "See More" link is clicked.
seeMoreBtn.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    let seeMoreChoosenId = event.currentTarget.getAttribute("data-id");
    console.log(seeMoreChoosenId);
  });
});

// Event delegation for "See More" links
blogSection.addEventListener("click", (event) => {
  const seeMoreLink = event.target.closest(".see-more-link");
  if (seeMoreLink) {
    event.preventDefault();
    let seeMoreChoosenId = seeMoreLink.getAttribute("data-id");
    console.log(seeMoreChoosenId);

    // Store seeMoreChoosenId in local storage
    localStorage.setItem("seeMoreChoosenId", seeMoreChoosenId);

    // Navigate to the specified URL manually
    window.location.href = seeMoreLink.getAttribute("href");
  }
});

render();

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
  //მივმართოთ POST method-ით API-ის
  const response = await fetch("https://george.pythonanywhere.com/api/login/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    // API-ს გადავცეთ/POST emailInp.value
    body: JSON.stringify({ email: emailInp.value }),
  });
  // data დავარქვათ, რესპონსს API-დან parsed as JSON. და შევინახოთ local Storage-ში
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
