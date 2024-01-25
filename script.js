const stators = [
  {
    fullName: "ნია გოგსაძე",
    releaseDate: "02.11.2023",
    title: "EOMM-ის მრჩეველთა საბჭოს ნინო ეგაძე შეუერთდა",
    categories: ["მარკეტი", "აპლიკაცია", "ხელოვნური ინტელექტი"],
    about:
      "6 თვის შემდეგ ყველის ბრმა დეგუსტაციის დროც დადგა. მაქსიმალური სიზუსტისთვის, ეს პროცესი...",
  },
  {
    fullName: " თორნიკე მამასახლისი",
    releaseDate: "02.11.2023",
    title: "მოსმენა ყველს უფრო გემრიელს ხდის?",
    categories: ["UI/UX", "კვლევა"],
    about:
      "6 თვის შემდეგ ყველის ბრმა დეგუსტაციის დროც დადგა. მაქსიმალური სიზუსტისთვის, ეს პროცესი...",
  },
  {
    fullName: "კობა ბელთაძე",
    releaseDate: "02.11.2023",
    title:
      "მობილური ფოტოგრაფიის კონკურსის გამარჯვებულთა ვინაობა ცნობილია. მ...",
    categories: ["Figma", " UI/UX"],
    about:
      "6 თვის შემდეგ ყველის ბრმა დეგუსტაციის დროც დადგა. მაქსიმალური სიზუსტისთვის, ეს პროცესი...",
  },
];

const image = Array.from(document.getElementsByClassName("image"));
const blogSection = document.querySelector(".cards");
const categorySection = document.querySelector(".categories");
let isClicked = false;

let category = "  ";

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

async function render() {
  const response = await fetch("https://george.pythonanywhere.com/api/blogs/");
  const data = await response.json();
  console.log(data);
  let blogs = data
    .map(
      (item) => `<div class="card">
<section class="image">
<img src = "${item.image}" style="width: 200px; height: 200px" alt="">
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
      <a href="">სრულად ნახვა</a>
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

enter.addEventListener("click", () => {
  login.style.display = "flex";
});

exit.addEventListener("click", () => {
  login.style.display = "none";
});

submit.addEventListener("click", async (e) => {
  e.preventDefault();

  const response = await fetch("https://george.pythonanywhere.com/api/login/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: emailInp.value,
    }),
  });
  const data = await response.json();
  localStorage.setItem("token", data.token);
});

const okay = document.querySelector(".okay");

okay.addEventListener("click", (e) => {
  e.preventDefault();
  login.style.display = "none";
});
