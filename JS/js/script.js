// Form validation (only runs if a form exists)
const form = document.querySelector("form");
if (form) {
  form.addEventListener("submit", function(e) {
    const nameInput = document.querySelector("#name");
    const emailInput = document.querySelector("#email");

    const name = nameInput ? nameInput.value.trim() : "";
    const email = emailInput ? emailInput.value.trim() : "";

    if (!name || !email) {
      e.preventDefault();
      alert("Please fill in all required fields.");
    }
  });
}

// Hover animation for "Book Now" button (only runs if button exists)
const bookBtn = document.querySelector(".btn");
if (bookBtn) {
  bookBtn.addEventListener("mouseover", () => {
    bookBtn.style.transform = "scale(1.1)";
  });
  bookBtn.addEventListener("mouseout", () => {
    bookBtn.style.transform = "scale(1)";
  });
}
