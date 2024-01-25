// js to trigger the file input when the text is clicked
function triggerFileInput() {
  document.getElementById("img").click();
}

// --------------------------- Validation for author -----------------------------
let nameInput = document.getElementById("name");
let instructionList = document.getElementById("instruction-list");
let instructionItems = instructionList.querySelectorAll("li");
let nameInputField = document.getElementById("name");
// console.log(nameInput, instructionList, instructionItems);

nameInput.addEventListener("input", function () {
  // const georgianRegex = /^[\u10A0-\u10FF]+$/;

  // Check and apply conditions to the first child
  if (nameInput.value.length >= 1 && nameInput.value.length <= 3) {
    instructionItems[0].classList.add("invalid");
    nameInputField.classList.add("invalid");
  } else {
    instructionItems[0].classList.remove("invalid");
    nameInputField.classList.remove("invalid");
  }

  // Check and apply conditions to the second child
  const words = nameInput.value.split(" ");
  if (words.length === 1) {
    instructionItems[1].classList.add("invalid");
    nameInputField.classList.add("invalid");
  } else {
    instructionItems[1].classList.remove("invalid");
    nameInputField.classList.remove("invalid");
  }

  // Check and apply conditions to the third child
  if (!georgianRegex.test(nameInput.value)) {
    instructionItems[2].classList.add("invalid");
    nameInputField.classList.add("invalid");
  } else {
    instructionItems[2].classList.remove("invalid");
    nameInputField.classList.remove("invalid");
  }
});

// --------------------------- Validation for title -----------------------------
let titleInput = document.getElementById("title-heading");
let titleInstruction = document.getElementById("title-instruction");
let titleHeading = document.getElementById("title-heading");
// console.log(titleInput, titleInstruction);

titleInput.addEventListener("input", function () {
  // Check the length of the input value
  if (titleInput.value.length >= 1 && titleInput.value.length <= 3) {
    // If length is between 1 and 3, add or remove 'invalid' class
    titleInstruction.classList.add("invalid");
    titleHeading.classList.add("invalid");
  } else {
    titleInstruction.classList.remove("invalid");
    titleHeading.classList.remove("invalid");
  }
});

// --------------------------- Validation for description -----------------------------
let descriptionInput = document.getElementById("about-title");
let descInstruction = document.getElementById("desc-instruction");

descriptionInput.addEventListener("input", function () {
  if (descriptionInput.value.length === 1) {
    descInstruction.classList.add("invalid");
  } else {
    descInstruction.classList.remove("invalid");
  }
});

// --------------------------- Validation for publish_date -----------------------------
let publish_dateInput = document.getElementById("todayDate");
// actual date placeholder for publish date input
let today = new Date().toISOString().split("T")[0];
publish_dateInput.setAttribute("value", today);

// --------------------------- Validation for category -----------------------------

let categoriesInput = document.querySelector("#categories");

// __ fetch from Api, response body is like
// [ { "id": 2, "title": "მარკეტი", "text_color": "#D6961C",  "background_color": "#FFB82F"  },
//   { "id": 3,   "title": "აპლიკაცია",  "text_color": "#15C972", "background_color": "#1CD67D" }, ]
async function getCategories() {
  const response = await fetch(
    "https://george.pythonanywhere.com/api/categories/",
    {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    }
  );
}

// Create a function to find by title:
const matchedCategory = (categoriesInput) => {
  return categoriesInput === "title.value";
};

// --------------------------- Validation for email -----------------------------
let emailInput = document.querySelector("#email");

/* ----------------------- submit button ----------------------- */
let popup = document.getElementById("popup");

async function openPopup() {
  const response = await fetch(
    "https://george.pythonanywhere.com/api/blogs/create/",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${localStorage.getItem("token")}`,
      },
      // TODO: დაამატე ყველა წამოსაღები მნიშვნელობა, ამ Edit Value | Model-ის მიხედვით
      // {
      //   "categories": [
      //     {
      //       "title": "string",
      //       "text_color": "string",
      //       "background_color": "string"
      //     }
      //   ],
      // ^  "title": "string",
      // ^  "publish_date": "2024-01-24T16:47:55.715Z",
      // ^  "description": "string",
      //   "image": "string",
      // ^  "email": "user@example.com",
      // ^  "author": "string"
      // }

      body: JSON.stringify({
        title: titleInput.value,
        author: nameInput.value,
        description: descriptionInput.value,
        publish_date: publish_dateInput.value,
        categories: [
          {
            // title: selectedCategory,
            // text_color: ,
            // background_color: ,
          },
        ],
        email: emailInput.value,
      }),
    }
  );

  const data = await response.json();
  console.log(data);
}
function closePopup() {
  popup.classList.remove("open-popup");
}
