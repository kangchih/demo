// ===== Dashboard Specific JavaScript =====

document.addEventListener("DOMContentLoaded", function () {
  // Initialize charts if Chart.js is loaded
  if (typeof Chart !== "undefined") {
    initAttendanceChart();
  } else {
    console.warn("Chart.js is not loaded. Charts will not be initialized.");
  }

  // Initialize todo items
  initTodoItems();

  // Initialize quick action buttons
  initQuickActions();
});

// Initialize attendance chart
function initAttendanceChart() {
  const attendanceChartElement = document.getElementById("attendanceChart");

  if (attendanceChartElement) {
    try {
      // Monthly attendance data (example data)
      const attendanceData = {
        labels: [
          "6/1",
          "6/2",
          "6/3",
          "6/4",
          "6/5",
          "6/8",
          "6/9",
          "6/10",
          "6/11",
          "6/12",
          "6/15",
        ],
        datasets: [
          {
            label: "出勤率",
            data: [95, 92, 94, 97, 93, 90, 96, 98, 95, 93, 96],
            borderColor: "#28a745",
            backgroundColor: "rgba(40, 167, 69, 0.1)",
            borderWidth: 2,
            tension: 0.3,
            fill: true,
          },
          {
            label: "遲到率",
            data: [3, 5, 4, 2, 5, 6, 2, 1, 3, 4, 2],
            borderColor: "#ffc107",
            backgroundColor: "rgba(255, 193, 7, 0.1)",
            borderWidth: 2,
            tension: 0.3,
            fill: true,
          },
          {
            label: "請假率",
            data: [2, 3, 2, 1, 2, 4, 2, 1, 2, 3, 2],
            borderColor: "#17a2b8",
            backgroundColor: "rgba(23, 162, 184, 0.1)",
            borderWidth: 2,
            tension: 0.3,
            fill: true,
          },
        ],
      };

      // Chart configuration
      const config = {
        type: "line",
        data: attendanceData,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: "top",
              labels: {
                font: {
                  size: 10,
                },
              },
            },
            tooltip: {
              mode: "index",
              intersect: false,
            },
          },
          scales: {
            y: {
              beginAtZero: true,
              max: 100,
              ticks: {
                callback: function (value) {
                  return value + "%";
                },
              },
            },
          },
        },
      };

      // Create chart
      new Chart(attendanceChartElement, config);
    } catch (error) {
      console.error("Error initializing attendance chart:", error);
      attendanceChartElement.innerHTML =
        '<div class="chart-error">無法載入圖表。請確認Chart.js已正確載入。</div>';
    }
  }
}

// Initialize todo items
function initTodoItems() {
  const todoItems = document.querySelectorAll(".todo-item");

  todoItems.forEach(function (item) {
    const actionBtn = item.querySelector(".todo-actions button");

    if (actionBtn) {
      actionBtn.addEventListener("click", function () {
        // Show modal or redirect to task handling page
        // For demo, we'll just toggle a 'completed' class
        item.classList.toggle("completed");

        if (item.classList.contains("completed")) {
          this.textContent = "已處理";
          this.classList.add("btn-success");

          // Show notification
          showNotification("任務已標記為完成！", "success");
        } else {
          this.textContent = "處理";
          this.classList.remove("btn-success");
        }
      });
    }
  });
}

// Initialize quick action buttons
function initQuickActions() {
  const quickAccessItems = document.querySelectorAll(".quick-access-item");

  quickAccessItems.forEach(function (item) {
    item.addEventListener("click", function (event) {
      // For demo purposes, we'll prevent navigation for some items
      const href = this.getAttribute("href");

      // If href is # or javascript:void(0), it's a placeholder
      if (href === "#" || href === "javascript:void(0)") {
        event.preventDefault();

        const actionType = this.querySelector("span").textContent;

        // Show a notification about the action
        showNotification(`即將開始${actionType}操作，請稍候...`, "info");

        // In a real app, you would redirect or open a modal here
        setTimeout(() => {
          showNotification(
            `${actionType}功能正在開發中，敬請期待！`,
            "warning"
          );
        }, 1500);
      }
    });
  });
}

// Create simple notification system if not defined in main.js
if (typeof showNotification !== "function") {
  function showNotification(message, type = "info", duration = 3000) {
    // Create notification element
    const notification = document.createElement("div");
    notification.className = `dashboard-notification ${type}`;
    notification.textContent = message;

    // Add to document
    document.body.appendChild(notification);

    // Show with animation
    setTimeout(() => {
      notification.classList.add("show");
    }, 10);

    // Hide and remove after duration
    setTimeout(() => {
      notification.classList.remove("show");
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 300);
    }, duration);
  }
}
