
// ===============================
// ENQUIRY FORM FUNCTIONALITY
// ===============================

// Find the enquiry form on the page
const enquiryForm = document.querySelector("#enquiryForm");

// Find the area where the response will appear
const enquiryResponse = document.querySelector("#enquiryResponse");

// Set today's date as the earliest selectable service date
const preferredDate = document.querySelector("#preferredDate");

if (preferredDate) {
  const today = new Date();

  // Format today's date as YYYY-MM-DD
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  preferredDate.min = `${year}-${month}-${day}`;
}

// Check the enquiry form when the customer submits it
if (enquiryForm) {

  enquiryForm.addEventListener("submit", function(event) {

    // Stop the form from refreshing the page
    event.preventDefault();

    // Collect the customer's information
    const name = document.querySelector("#fullName").value.trim();
    const email = document.querySelector("#email").value.trim();
    const phone = document.querySelector("#phone").value.trim();
    const service = document.querySelector("#service").value;
    const date = document.querySelector("#preferredDate").value;
    const notes = document.querySelector("#notes").value.trim();

    // Check that all required information is provided
    if (!name || !email || !phone || !service || !date) {

      enquiryResponse.textContent =
        "Please complete all required fields before submitting.";

      enquiryResponse.className = "error";
      return;
    }

    // Check that the selected date is not in the past
    const selectedDate = new Date(date + "T00:00:00");
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    if (selectedDate < currentDate) {

      enquiryResponse.textContent =
        "Please select today or a future date.";

      enquiryResponse.className = "error";
      return;
    }

    // Responding to the customer
    
let responseMessage =
  "Thank you, " + name + "! " +
  "Here is a summary of your laundry enquiry. " +
  "Selected service: " + service + ". " +
  "Preferred date: " + date + ". " +
  "Availability and pricing will need to be confirmed " +
  "before a booking can be made. " 
     

    // Display the response
    enquiryResponse.textContent = responseMessage;
    enquiryResponse.className = "success";

    // Clear the form after successful submission
    enquiryForm.reset();

    // Set the minimum date again after resetting the form
    preferredDate.min = `${year}-${month}-${day}`;

  });
}


// ===============================
// BOOK BUTTON ANIMATION
// ===============================

// Find the Book Now button
const bookBtn = document.querySelector(".book-button");

// Add a hover animation if the button exists
if (bookBtn) {

  bookBtn.addEventListener("mouseover", function() {
    bookBtn.style.transform = "scale(1.05)";
  });

  bookBtn.addEventListener("mouseout", function() {
    bookBtn.style.transform = "scale(1)";
  });

}


// ===============================
// CONTACT FORM FUNCTIONALITY
// ===============================

// Find the contact form
const contactForm = document.querySelector("#contactForm");

if (contactForm) {

  contactForm.addEventListener("submit", function(event) {

    // Stop the page from refreshing
    event.preventDefault();

    // Check HTML5 validation rules
    if (!contactForm.reportValidity()) {
      return;
    }

    // Get the customer's information
    const name = document.querySelector("#contactName").value.trim();
    const email = document.querySelector("#contactEmail").value.trim();
    const messageType = document.querySelector("#messageType").value;
    const message = document.querySelector("#contactMessage").value.trim();

    const response = document.querySelector("#contactResponse");

    // Prevent messages containing only spaces
    if (name.length < 2 || message.length < 10) {
      response.textContent =
        "Please enter a valid name and a message of at least 10 characters.";
      response.className = "error";
      return;
    }

    // Create the email subject
    const subject = "Swellies Contact: " + messageType;

    // Create the email body
    const body =
      "Name: " + name + "\n" +
      "Email: " + email + "\n" +
      "Message Type: " + messageType + "\n\n" +
      "Message:\n" + message;

    // Prepare an email using the visitor's email application
    const emailLink =
      "mailto:info@swellieslaundry.co.za" +
      "?subject=" + encodeURIComponent(subject) +
      "&body=" + encodeURIComponent(body);

    // Explain what happens next
    response.textContent =
      "Your email is ready. Please review it and click Send in your email application.";

    response.className = "success";

    // Open the default email application
    window.location.href = emailLink;

  });

}


// ===============================
// SERVICES SEARCH AND FILTERING
// ===============================

// Find the search bar and service cards
const serviceSearch = document.querySelector("#serviceSearch");
const serviceCards = document.querySelectorAll(
  "#servicesGrid .services-section"
);

const filterButtons = document.querySelectorAll(".filter-btn");
const noServicesMessage = document.querySelector("#noServicesMessage");
const serviceCount = document.querySelector("#serviceCount");

// Only run this code on the Services page
if (serviceSearch && noServicesMessage) {

  // Start by showing all categories
  let selectedCategory = "all";

  // Function to update the visible services
  function filterServices() {

    // Get the search text in lowercase
    const searchText = serviceSearch.value.trim().toLowerCase();

    let visibleCount = 0;

    serviceCards.forEach(function(card) {

      // Get the service's category
      const category = card.dataset.category;

      // Get the service title and description
      const serviceText = card.textContent.toLowerCase();

      // Check if it matches the search
      const matchesSearch = serviceText.includes(searchText);

      // Check if it matches the selected category
      const matchesCategory =
        selectedCategory === "all" ||
        category === selectedCategory;

      // Show the card only when both conditions match
      const shouldShow = matchesSearch && matchesCategory;

      card.hidden = !shouldShow;

      if (shouldShow) {
        visibleCount++;
      }
    });

    // Show a message if no services match
    noServicesMessage.hidden = visibleCount > 0;
  
if (serviceCount) {
  serviceCount.textContent =
    "Showing " + visibleCount + " of " +
    serviceCards.length + " services";
    filterServices();
}
 }

  // Search immediately as the customer types
  serviceSearch.addEventListener("input", filterServices);

  // Respond when a category button is clicked
  filterButtons.forEach(function(button) {

    button.addEventListener("click", function() {

      // Update the selected category
      selectedCategory = button.dataset.filter;

      // Remove active styling from all buttons
      filterButtons.forEach(function(otherButton) {
        otherButton.classList.remove("active");
      });

      // Highlight the selected button
      button.classList.add("active");

      // Update the displayed services
      filterServices();
    });
  });

}


// ===============================
// INTERACTIVE IMAGE LIGHTBOX
// ===============================

const lightbox = document.querySelector("#imageLightbox");
const lightboxImage = document.querySelector("#lightboxImage");
const lightboxCaption = document.querySelector("#lightboxCaption");
const closeLightbox = document.querySelector("#closeLightbox");

const galleryImages = document.querySelectorAll(
  ".services-grid .service-img"
);

if (lightbox && lightboxImage && closeLightbox) {

  let previousFocus = null;

  // Open an enlarged image when clicked
  function openGallery(image) {
    previousFocus = document.activeElement;

    lightboxImage.src = image.src;
    lightboxImage.alt = image.alt;
    lightboxCaption.textContent = image.alt;

    lightbox.hidden = false;
    document.body.style.overflow = "hidden";
    closeLightbox.focus();
  }

  // Close the enlarged image
  function closeGallery() {
    lightbox.hidden = true;
    lightboxImage.removeAttribute("src");
    document.body.style.overflow = "";

    if (previousFocus) {
      previousFocus.focus();
    }
  }

  // Make each image clickable and keyboard accessible
  galleryImages.forEach(function(image) {
    image.setAttribute("tabindex", "0");
    image.setAttribute("role", "button");
    image.setAttribute("aria-label", "Enlarge: " + image.alt);

    image.addEventListener("click", function() {
      openGallery(image);
    });

    image.addEventListener("keydown", function(event) {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openGallery(image);
      }
    });
  });

  // Close using the X button
  closeLightbox.addEventListener("click", closeGallery);

  // Close by clicking the dark background
  lightbox.addEventListener("click", function(event) {
    if (event.target === lightbox) {
      closeGallery();
    }
  });

  // Close using Escape; keep keyboard focus in the dialog
  document.addEventListener("keydown", function(event) {
    if (lightbox.hidden) return;

    if (event.key === "Escape") {
      closeGallery();
    }

    if (event.key === "Tab") {
      event.preventDefault();
      closeLightbox.focus();
    }
  });
}


// ===============================
// FAQ ACCORDION FUNCTIONALITY
// ===============================

// Find all FAQ question buttons
const faqQuestions = document.querySelectorAll(".faq-question");

// Add a click event to each question
faqQuestions.forEach(function(question) {

  question.addEventListener("click", function() {

    // Find the answer belonging to this question
    const answer = question.nextElementSibling;

    // Check whether the question is currently open
    const isOpen = question.getAttribute("aria-expanded") === "true";

    // Close all FAQ answers
    faqQuestions.forEach(function(otherQuestion) {

      otherQuestion.setAttribute("aria-expanded", "false");

      const otherAnswer = otherQuestion.nextElementSibling;
      otherAnswer.hidden = true;

      const otherIcon = otherQuestion.querySelector(".faq-icon");
      otherIcon.textContent = "+";
    });

    // Open the clicked question if it was previously closed
    if (!isOpen) {

      question.setAttribute("aria-expanded", "true");
      answer.hidden = false;

      const icon = question.querySelector(".faq-icon");
      icon.textContent = "-";
    }

  });

});
