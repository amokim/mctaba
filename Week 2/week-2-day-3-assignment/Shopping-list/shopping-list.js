// Selecting the elements needed
const itemNameInput = document.querySelector("#item-name-input");
const itemQtyInput = document.querySelector("#item-qty-input");
const addItemBtn = document.querySelector("#add-item-btn");
const errorMessage = document.querySelector("#error-message");
const remainingCount = document.querySelector("#remaining-count");
const shoppingList = document.querySelector("#shopping-list");

// Function to count remaining items on the shopping list
const updateRemainingCount = () => {
  const remainingItems = document.querySelectorAll(
    ".shopping-item:not(.bought)",
  );
  remainingCount.textContent = remainingItems.length + " items remain";
};

// Function to add a new item to the list
const addItem = () => {
  const itemName = itemNameInput.value.trim();
  const itemQty =
    itemQtyInput.value.trim() === "" ? "1" : itemQtyInput.value.trim();

  // Show an error is the item name field is empty
  if (itemName === "") {
    errorMessage.textContent = "Please enter an item name.";
    itemNameInput.classList.add("input-error");
    return;
  }

  // Clear any previous error state
  errorMessage.textContent = "";
  itemNameInput.classList.remove("input-error");

  // Building the list item using createElement
  const li = document.createElement("li");
  li.classList.add("shopping-item");

  const details = document.createElement("span");
  details.classList.add("item-details");
  details.textContent = itemName + " ";

  const qty = document.createElement("span");
  qty.classList.add("item-qty");
  qty.textContent = "(x" + itemQty + ")";
  details.appendChild(qty);

  const actions = document.createElement("div");
  actions.classList.add("item-actions");

  const boughtBtn = document.createElement("button");
  boughtBtn.classList.add("bought-btn");
  boughtBtn.textContent = "Bought";

  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("delete-btn");
  deleteBtn.textContent = "Delete";

  actions.appendChild(boughtBtn);
  actions.appendChild(deleteBtn);

  li.appendChild(details);
  li.appendChild(actions);

  // Creating the bought state (strikethrough + grey text)
  boughtBtn.addEventListener("click", function () {
    li.classList.toggle("bought");
    updateRemainingCount();
  });

  // Removing item when delete button is pressed
  deleteBtn.addEventListener("click", function () {
    (li.remove(), updateRemainingCount());
  });

  shoppingList.appendChild(li);

  // Resetting the inputs
  itemNameInput.value = "";
  itemQtyInput.value = "1";
  itemNameInput.focus();

  updateRemainingCount();
};

// Listening for when the add button is clicked
addItemBtn.addEventListener("click", addItem);

// Setting the initial count on page load
updateRemainingCount();
