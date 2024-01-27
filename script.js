const image = Array.from(document.getElementsByClassName("image"));
const blogSection = document.querySelector(".cards");
const categorySection = document.querySelector(".categories");
let isClicked = false;

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

// -- Blog from API
async function render() {
  const response = await fetch("https://george.pythonanywhere.com/api/blogs/");
  const data = await response.json();
  console.log(data);
  let blogs = data
    .map(
      (item) => `<div class="card">
<section class="image">
  <img src = "${item.image}" style="width: 400px; height: 320px" alt="">
</section>

<section class="title">
  <section class="title-author-releaseDate">
    <h5>${item.author}</h5>
    <span>${item.publish_date}</span>
  </section>
  
  <section class="title-heading">
<h3>${item.title}</h3>
  </section>
    
    <ul class="mutual-categories">
    
    ${item.categories.map(
      (cat) =>
        `<li style="color: ${cat.text_color}; border-radius:30px; height:28px; background-color: ${cat.background_color}">${cat.name}</li>`
    )}
 
    </ul>
     <p class="about-title">${item.description}</p>
     <section class="see-more">
      <a href="pages/Blog/blog.html">სრულად ნახვა</a>
      <img src="./assets/Arrow.svg" alt="">
     </section>
</section>


</div>`
    )
    .join(" ");

  blogSection.innerHTML = blogs;
}

render();

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

  //მივმართოთ POST method-ით API-ის
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

// * API endpoint-ზე POST request-ის გაგზავნის მერე
//      email: emailInp.value
// მივრუნებს responces
