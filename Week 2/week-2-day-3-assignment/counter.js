const limit = 280;

// Selecting the elements needed
const postInput = document.querySelector("#post-input");
const charCount = document.querySelector("#char-count");
const postBtn = document.querySelector("#post-btn");

// Function to update words counter and color states
updateCount = () => {
  const length = postInput.value.length;

  charCount.textContent = length + "/" + limit + " characters";

  // Resetting state classes
  charCount.classList.remove("warning", "over-limit");
  postInput.classList.remove("warning", "over-limit");

  if (length > limit) {
    charCount.classList.add("over-limit");
    postInput.classList.add("over-limit");
  } else if (length >= limit - 20) {
    charCount.classList.add("warning");
    postInput.classList.add("warning");
  }

  // Disable post button when over the limit
  postBtn.disabled = length > limit;
};

// updating the count as user types in their input
postInput.addEventListener("input", updateCount);

// Set the initial state on page load
updateCount();
