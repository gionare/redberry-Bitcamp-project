const categorySection = document.querySelector(".categories"); // object
let categoryArr = Array.from(categorySection.querySelectorAll("button"));
let categoryArrTextContent = categoryArr.map((button) => button.textContent);
// console.log(categorySection);
// console.log(categoryArr); // categoryArr = [ button.market, button.application, ... ] .object
// console.log(categoryArrTextContent); // array

let choosenCategory = " ";
categorySection.addEventListener("click", (eachBtn) => {
  let clickedBtn = eachBtn.target.closest("button");
  let clickedBtnTitle = clickedBtn.textContent;
  // console.log(clickedBtnTitle);
  let choosenCategory = categoryArrTextContent.filter(
    (category) => category == clickedBtnTitle
  );
  // console.log(categoryArrClassList);
  // console.log(clickedBtnClass); //string
  console.log(choosenCategory); // Output: ["market"], ["application"], etc. object
  render();
});

// -- Blog from API
// dynamically generated HTML
async function render() {
  const response = await fetch("https://george.pythonanywhere.com/api/blogs/");
  const data = await response.json();
  console.log(data);

  FIXME: choosenCategory = "კვლევა";
  // Filter blogs based on the chosen category
  const filteredBlogs = data.filter((blog) =>
    blog.categories.some((cat) => cat.title === choosenCategory)
  );

  let blogs = filteredBlogs
    .map(
      (item) => `
      <div class="card">
        <section class="image">
          <img src = "${item.image}" style="width: 400px; height: 320px" alt="">
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
            ${item.categories.map(
              (cat) =>
                `<li style="color: ${cat.text_color}; border-radius:30px; height:28px; background-color: ${cat.background_color}">${cat.name}</li>`
            )};
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
