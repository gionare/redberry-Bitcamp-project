//  -- Upload Image --
const dropArea = document.getElementById("drop-area");
const inputFile = document.getElementById("input-file");
const imageView = document.getElementById("img-view");

inputFile.addEventListener("change", uploadImage);

function uploadImage() {
  // inputFile.files[0];  gives us in object format, but we need image link
  let imgLink = URL.createObjectURL(inputFile.files[0]); // convert to image link
  dropArea.style.backgroundImage = `url(${imgLink})`;
  dropArea.textContent = "";
}
dropArea.addEventListener("dragover", function (e) {
  e.preventDefault();
});
dropArea.addEventListener("drop", function (e) {
  e.preventDefault();
  inputFile.files = e.dataTransfer.files;
  uploadImage();
});

// js to trigger the file input when the text is clicked
// function triggerFileInput() {
//   document.getElementById("input-file").click();
// }

// ----------------- Validation for author -----------------------
let nameInput = document.getElementById("name");
let instructionList = document.getElementById("instruction-list");
let instructionItems = instructionList.querySelectorAll("li");
let nameInputField = document.getElementById("name");
// console.log(nameInput, instructionList, instructionItems);

nameInput.addEventListener("input", function () {
  const georgianRegex = /^[\u10A0-\u10FF]+$/;

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
  if (georgianRegex.test(nameInput.value)) {
    instructionItems[2].classList.add("invalid");
    nameInputField.classList.add("invalid");
  } else {
    instructionItems[2].classList.remove("invalid");
    nameInputField.classList.remove("invalid");
  }
});

// ------------------- Validation for title ------------------------
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

// ---------------- Validation for description ------------------
let descriptionInput = document.getElementById("about-title");
let descInstruction = document.getElementById("desc-instruction");

descriptionInput.addEventListener("input", function () {
  if (descriptionInput.value.length === 1) {
    descInstruction.classList.add("invalid");
  } else {
    descInstruction.classList.remove("invalid");
  }
});

// -------------- Validation for publish_date --------------
let publish_dateInput = document.getElementById("todayDate");
// actual date placeholder for publish date input
let today = new Date().toISOString().split("T")[0];
publish_dateInput.setAttribute("value", today);

// ----------- Validation for email -------------
let emailInput = document.querySelector("#email");

// ------------------------------- C A T E G O R I E S ---------------------------------------
// - API - [{ "id": 2, "title":"..","text_color":"#..","background_color": "#.."}]
// - categoriesInput.value
// 1. submit ღილაკმა გადასცეს გიორგის Aპი-დან მიღებული object
// 2. API-ს ობჯექტის title შედარდეს categoriesInput.value-ზე, და იპოვოს მსგავსი
let categoriesInput = document.querySelector("#categories");
let selectedCategory;

categoriesInput.addEventListener("change", function () {
  console.log(categoriesInput.value);
});
async function getCategories() {
  try {
    const response = await fetch(
      "https://george.pythonanywhere.com/api/categories/",
      // [ { "id": 2, "title": "მარკეტი", "text_color": "#D6961C",  "background_color": "#FFB82F"  },
      //   { "id": 3,   "title": "აპლიკაცია",  "text_color": "#15C972", "background_color": "#1CD67D" }, ]
      {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      }
    );
    let categories = await response.json();
    selectedCategory = categories.find(
      (category) => category.title === categoriesInput.value
    );

    // Check if a matching category was found
    if (selectedCategory) {
      // Get all keys and values from the selected category
      const categoryKeys = Object.keys(selectedCategory);
      console.log("Keys:", categoryKeys);
      const categoryValues = Object.values(selectedCategory);
      console.log("Values:", categoryValues);
    } else {
      console.log("Category not found");
    }
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

/* ----------------------- submit button ----------------------- */
let popup = document.getElementById("popup");
let formField = document.querySelector(".information-form");
let submitButton = document.getElementById("submitBtn");

// Add an event listener to the submit button
submitButton.addEventListener("click", async function () {
  try {
    await getCategories(); // Call getCategories to fetch and find the selected category

    // Check if selectedCategory is defined
    if (selectedCategory) {
      // Make the POST request with the selected category
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
            categories: [
              {
                title: selectedCategory.title,
                text_color: selectedCategory.text_color,
                background_color: selectedCategory.background_color,
              },
            ],
            title: titleInput.value,
            publish_date: publish_dateInput.value,
            description: descriptionInput.value,
            // TODO: image
            image: imageInput.value,
            email: emailInput.value,
            author: nameInput.value,
          }),
        }
      );
      // Check the response status or do other handling as needed
      if (response.ok) {
        // Success
      } else {
        console.error(
          "Server returned an error:",
          response.status,
          response.statusText
        );
      }
    } else {
      console.log("Category not found");
    }
  } catch (error) {
    console.error("An error occurred:", error);
  }
});

// ------- popup windows open and close ----------
function openPopup() {
  //on popup blur bg.
  popup.style.visibility = "visible";
  formField.style.filter = "blur(2px) grayscale(0.7)";
}
function closePopup() {
  popup.style.visibility = "hidden";
  formField.style.filter = "";
}
