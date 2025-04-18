// ===== Main JavaScript =====

document.addEventListener("DOMContentLoaded", function () {
  // Initialize sidebar toggle functionality
  initSidebar();

  // Initialize dropdown menus
  initDropdowns();

  // Format dates
  formatDates();
});

// Sidebar Toggle
function initSidebar() {
  const menuToggle = document.getElementById("menu-toggle");
  const sidebar = document.querySelector(".sidebar");
  const mainContent = document.querySelector(".main-content");

  if (menuToggle) {
    menuToggle.addEventListener("click", function () {
      sidebar.classList.toggle("open");

      // For mobile view
      if (window.innerWidth <= 992) {
        document.body.classList.toggle("sidebar-open");
      } else {
        // For desktop view
        sidebar.classList.toggle("collapsed");
        mainContent.classList.toggle("expanded");
      }
    });

    // Close sidebar when clicking outside (mobile only)
    document.addEventListener("click", function (event) {
      if (
        window.innerWidth <= 992 &&
        !sidebar.contains(event.target) &&
        !menuToggle.contains(event.target) &&
        sidebar.classList.contains("open")
      ) {
        sidebar.classList.remove("open");
        document.body.classList.remove("sidebar-open");
      }
    });
  }
}

// Dropdown Menus
function initDropdowns() {
  const dropdownToggleList = document.querySelectorAll(".dropdown-toggle");

  dropdownToggleList.forEach(function (dropdownToggle) {
    dropdownToggle.addEventListener("click", function (event) {
      event.preventDefault();
      event.stopPropagation();

      const dropdown = this.nextElementSibling;
      dropdown.classList.toggle("show");

      // Close other dropdowns
      dropdownToggleList.forEach(function (otherToggle) {
        if (otherToggle !== dropdownToggle) {
          otherToggle.nextElementSibling.classList.remove("show");
        }
      });
    });
  });

  // Close dropdowns when clicking outside
  document.addEventListener("click", function (event) {
    dropdownToggleList.forEach(function (dropdownToggle) {
      const dropdown = dropdownToggle.nextElementSibling;
      if (
        dropdown.classList.contains("show") &&
        !dropdown.contains(event.target)
      ) {
        dropdown.classList.remove("show");
      }
    });
  });
}

// Format dates
function formatDates() {
  const currentDateElement = document.getElementById("current-date");

  if (currentDateElement) {
    const now = new Date();
    const options = { year: "numeric", month: "long", day: "numeric" };
    const formattedDate = now.toLocaleDateString("zh-TW", options);
    const dayOfWeek = [
      "星期日",
      "星期一",
      "星期二",
      "星期三",
      "星期四",
      "星期五",
      "星期六",
    ][now.getDay()];

    currentDateElement.textContent = formattedDate;

    if (currentDateElement.nextElementSibling) {
      currentDateElement.nextElementSibling.textContent = dayOfWeek;
    }
  }

  // Format relative times
  document.querySelectorAll(".relative-time").forEach(function (element) {
    const timestamp = parseInt(element.getAttribute("data-timestamp"));
    if (timestamp) {
      element.textContent = getRelativeTimeString(timestamp);
    }
  });
}

// Get relative time string
function getRelativeTimeString(timestamp) {
  const now = Date.now();
  const diff = now - timestamp;

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 7) {
    return new Date(timestamp).toLocaleDateString("zh-TW");
  } else if (days > 0) {
    return `${days} 天前`;
  } else if (hours > 0) {
    return `${hours} 小時前`;
  } else if (minutes > 0) {
    return `${minutes} 分鐘前`;
  } else {
    return "剛剛";
  }
}

// Show notification
function showNotification(message, type = "info", duration = 3000) {
  const notification = document.createElement("div");
  notification.className = `notification ${type}`;
  notification.textContent = message;

  const notificationsContainer = document.querySelector(
    ".notifications-container"
  );

  if (!notificationsContainer) {
    const container = document.createElement("div");
    container.className = "notifications-container";
    document.body.appendChild(container);
    container.appendChild(notification);
  } else {
    notificationsContainer.appendChild(notification);
  }

  // Show notification with animation
  setTimeout(() => {
    notification.classList.add("show");
  }, 10);

  // Remove notification after duration
  setTimeout(() => {
    notification.classList.remove("show");
    setTimeout(() => {
      notification.remove();
    }, 300);
  }, duration);
}

// Confirm dialog
function confirmDialog(message, confirmCallback, cancelCallback = null) {
  const overlay = document.createElement("div");
  overlay.className = "dialog-overlay";

  const dialog = document.createElement("div");
  dialog.className = "confirm-dialog";

  const content = document.createElement("div");
  content.className = "dialog-content";
  content.textContent = message;

  const actions = document.createElement("div");
  actions.className = "dialog-actions";

  const cancelBtn = document.createElement("button");
  cancelBtn.className = "btn btn-outline-secondary";
  cancelBtn.textContent = "取消";
  cancelBtn.addEventListener("click", function () {
    document.body.removeChild(overlay);
    if (cancelCallback) cancelCallback();
  });

  const confirmBtn = document.createElement("button");
  confirmBtn.className = "btn btn-primary";
  confirmBtn.textContent = "確認";
  confirmBtn.addEventListener("click", function () {
    document.body.removeChild(overlay);
    confirmCallback();
  });

  actions.appendChild(cancelBtn);
  actions.appendChild(confirmBtn);

  dialog.appendChild(content);
  dialog.appendChild(actions);

  overlay.appendChild(dialog);
  document.body.appendChild(overlay);

  // Show dialog with animation
  setTimeout(() => {
    overlay.classList.add("show");
    dialog.classList.add("show");
  }, 10);
}

// Form validation
function validateForm(formElement, options = {}) {
  const defaults = {
    errorClass: "error",
    errorMessageClass: "error-message",
    showAllErrors: true,
  };

  const settings = { ...defaults, ...options };
  let isValid = true;

  // Remove existing error messages
  formElement
    .querySelectorAll("." + settings.errorMessageClass)
    .forEach((el) => el.remove());
  formElement
    .querySelectorAll("." + settings.errorClass)
    .forEach((el) => el.classList.remove(settings.errorClass));

  // Check required fields
  formElement.querySelectorAll("[required]").forEach(function (field) {
    if (!field.value.trim()) {
      isValid = false;
      showFieldError(field, "此欄位為必填");

      if (!settings.showAllErrors) {
        return isValid;
      }
    }
  });

  // Check email fields
  formElement.querySelectorAll('input[type="email"]').forEach(function (field) {
    if (field.value.trim() && !isValidEmail(field.value)) {
      isValid = false;
      showFieldError(field, "請輸入有效的電子郵件");

      if (!settings.showAllErrors) {
        return isValid;
      }
    }
  });

  // Show error message for a field
  function showFieldError(field, message) {
    field.classList.add(settings.errorClass);

    const errorElement = document.createElement("div");
    errorElement.className = settings.errorMessageClass;
    errorElement.textContent = message;

    const parent = field.parentElement;
    parent.appendChild(errorElement);

    // Focus on the first error field
    if (formElement.querySelector("." + settings.errorClass) === field) {
      field.focus();
    }
  }

  return isValid;
}

// Check if email is valid
function isValidEmail(email) {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}
