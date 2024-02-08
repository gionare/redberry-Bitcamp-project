const blogSection = document.querySelector(".cards");
console.log(blogSection);

async function render() {
  try {
    const response = await fetch(
      "https://george.pythonanywhere.com/api/blogs/"
    );
    //გაისროლე ერრორი თუ დატა თუ სტატუს კოდი 200 არ არის
    if (!response.ok) throw new Error("Failed to fetch");
    const data = await response.json();
    console.log(data);

    // retrive seeMoreChoosenId from localStorage
    const seeMoreChoosenId = Number(localStorage.getItem("seeMoreChoosenId"));
    console.log(`"see More" Choosen ID is: ` + seeMoreChoosenId);

    // Find the blog with choosen id
    const choosenBlog = data.find((item) => item.id === seeMoreChoosenId);
    console.log(choosenBlog);

    // Display only the chosen blog
    if (choosenBlog) {
      let blogHtml = `
        <div class="card">
          <section class="image">
            <img src = "${choosenBlog.image}" alt="">
          </section>

          <section class="title-author-releaseDate">
            <h5>${choosenBlog.author}</h5>
            <span>${choosenBlog.publish_date}</span>
          </section>

          <section class="title-heading">
            <h3>${choosenBlog.title} ${choosenBlog.id}</h3> 
          </section>

          <ul class="mutual-categories">
            ${choosenBlog.categories
              .map(
                (cat) =>
                  `<li style=" background-color: ${cat.background_color}">${cat.title}</li>`
              )
              .join(" ")}
          </ul>

          <p class="about-title">${choosenBlog.description}</p>
          
          )}
          ${choosenBlog.description}
    </div>
    `;

      blogSection.innerHTML = blogHtml;
    } else {
      console.error("Blog not found with the chosen ID");
    }
  } catch (error) {
    console.error(error.message);
  }
}
render();
