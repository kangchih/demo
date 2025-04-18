// ===== Login Page JavaScript =====

document.addEventListener("DOMContentLoaded", function () {
  // Initialize login form
  initLoginForm();

  // Initialize quick login buttons
  initQuickLogin();
});

// Initialize login form
function initLoginForm() {
  const loginForm = document.getElementById("login-form");

  if (loginForm) {
    loginForm.addEventListener("submit", function (event) {
      event.preventDefault();

      const username = document.getElementById("username").value;
      const password = document.getElementById("password").value;

      // For demo purposes, we'll accept any credentials
      // In a real application, you would validate against a backend service

      // Show loading state
      const submitButton = loginForm.querySelector('button[type="submit"]');
      const originalText = submitButton.textContent;
      submitButton.disabled = true;
      submitButton.textContent = "登入中...";

      // Simulate server request delay
      setTimeout(() => {
        // Check if it's a demo user
        if (isDemoUser(username)) {
          // Redirect to dashboard with user role
          window.location.href = "index.html?user=" + username;
        } else {
          // In a real app, show error for invalid credentials
          // For demo, we'll accept any input
          window.location.href = "index.html";
        }
      }, 1000);
    });
  }
}

// Check if the username matches one of our demo users
function isDemoUser(username) {
  const demoUsers = ["admin", "hrmanager", "hrstaff", "depthead", "employee"];

  return demoUsers.includes(username.toLowerCase());
}

// Initialize quick login buttons
function initQuickLogin() {
  const roleButtons = document.querySelectorAll(".role-btn");

  if (roleButtons.length > 0) {
    roleButtons.forEach(function (button) {
      button.addEventListener("click", function () {
        const username = this.getAttribute("data-username");
        const role = this.getAttribute("data-role");

        // Set form values
        document.getElementById("username").value = username;
        document.getElementById("password").value = "password123";

        // Highlight the button
        roleButtons.forEach((btn) => btn.classList.remove("active"));
        this.classList.add("active");

        // Optional: Auto-submit the form after a short delay
        setTimeout(() => {
          document
            .getElementById("login-form")
            .dispatchEvent(new Event("submit"));
        }, 300);
      });
    });
  }
}

// Show error message
function showLoginError(message) {
  const errorContainer = document.querySelector(".login-error");

  if (!errorContainer) {
    const container = document.createElement("div");
    container.className = "login-error";
    container.textContent = message;

    const loginForm = document.getElementById("login-form");
    loginForm.parentNode.insertBefore(container, loginForm);
  } else {
    errorContainer.textContent = message;
    errorContainer.style.display = "block";
  }
}

// Clear error message
function clearLoginError() {
  const errorContainer = document.querySelector(".login-error");

  if (errorContainer) {
    errorContainer.style.display = "none";
  }
}
