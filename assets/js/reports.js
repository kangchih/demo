document.addEventListener("DOMContentLoaded", function () {
  // Initialize all report charts if Chart.js is loaded
  if (typeof Chart !== "undefined") {
    initAttendanceChart();
    initEmployeeStructureChart();
    initSalaryAnalysisChart();
    initPerformanceChart();

    // Handle tab switching to display the correct chart
    setupTabNavigation();
  } else {
    console.warn("Chart.js is not loaded. Charts will not be initialized.");
    document.querySelectorAll(".chart-container").forEach((container) => {
      container.innerHTML =
        '<div class="chart-error">無法載入圖表。請確認Chart.js已正確載入。</div>';
    });
  }
});

/**
 * Initialize the attendance statistics chart
 */
function initAttendanceChart() {
  const ctx = document.getElementById("attendance-chart");
  if (!ctx) return;

  // Sample data for attendance chart
  const months = ["一月", "二月", "三月", "四月", "五月", "六月"];

  const attendanceChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: months,
      datasets: [
        {
          label: "出勤率",
          data: [96.2, 95.8, 97.1, 96.5, 96.7, 97.3],
          borderColor: "rgba(75, 192, 192, 1)",
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          tension: 0.4,
          fill: true,
        },
        {
          label: "遲到率",
          data: [2.3, 2.8, 1.9, 2.5, 2.1, 1.8],
          borderColor: "rgba(255, 159, 64, 1)",
          backgroundColor: "rgba(255, 159, 64, 0.2)",
          tension: 0.4,
          fill: true,
        },
        {
          label: "請假率",
          data: [1.5, 1.4, 1.0, 1.0, 1.2, 0.9],
          borderColor: "rgba(153, 102, 255, 1)",
          backgroundColor: "rgba(153, 102, 255, 0.2)",
          tension: 0.4,
          fill: true,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: "top",
        },
        title: {
          display: true,
          text: "月度出勤率統計",
        },
        tooltip: {
          mode: "index",
          intersect: false,
        },
      },
      scales: {
        y: {
          beginAtZero: false,
          min: 0,
          max: 100,
          ticks: {
            callback: function (value) {
              return value + "%";
            },
          },
        },
      },
    },
  });
}

/**
 * Initialize the employee structure chart
 */
function initEmployeeStructureChart() {
  const ctx = document.getElementById("employee-structure-chart");
  if (!ctx) return;

  // Sample data for employee structure chart
  const employeeStructureChart = new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: [
        "業務組",
        "工程部",
        "營運部",
        "人資部",
        "行政部",
        "財務部",
        "其他",
      ],
      datasets: [
        {
          data: [45, 20, 15, 5, 5, 5, 5],
          backgroundColor: [
            "rgba(75, 192, 192, 0.8)",
            "rgba(54, 162, 235, 0.8)",
            "rgba(255, 99, 132, 0.8)",
            "rgba(255, 159, 64, 0.8)",
            "rgba(153, 102, 255, 0.8)",
            "rgba(255, 205, 86, 0.8)",
            "rgba(201, 203, 207, 0.8)",
          ],
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: "right",
        },
        title: {
          display: true,
          text: "員工部門分布",
        },
        tooltip: {
          callbacks: {
            label: function (context) {
              const label = context.label || "";
              const value = context.raw || 0;
              const total = context.chart.data.datasets[0].data.reduce(
                (a, b) => a + b,
                0
              );
              const percentage = Math.round((value / total) * 100);
              return `${label}: ${percentage}% (${value}人)`;
            },
          },
        },
      },
    },
  });
}

/**
 * Initialize the salary analysis chart
 */
function initSalaryAnalysisChart() {
  const ctx = document.getElementById("salary-analysis-chart");
  if (!ctx) return;

  // Sample data for salary analysis chart
  const salaryAnalysisChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["業務組", "工程部", "營運部", "人資部", "行政部", "財務部"],
      datasets: [
        {
          label: "平均基本薪資",
          data: [48000, 65000, 55000, 52000, 47000, 58000],
          backgroundColor: "rgba(75, 192, 192, 0.8)",
        },
        {
          label: "平均加班費",
          data: [8500, 12000, 7500, 4000, 3500, 4200],
          backgroundColor: "rgba(255, 159, 64, 0.8)",
        },
        {
          label: "平均獎金",
          data: [10000, 15000, 12000, 9000, 8000, 12000],
          backgroundColor: "rgba(153, 102, 255, 0.8)",
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: "top",
        },
        title: {
          display: true,
          text: "各部門薪資分析",
        },
        tooltip: {
          mode: "index",
          intersect: false,
          callbacks: {
            label: function (context) {
              let label = context.dataset.label || "";
              let value = context.raw || 0;
              return `${label}: $${value.toLocaleString()}`;
            },
          },
        },
      },
      scales: {
        x: {
          stacked: false,
        },
        y: {
          stacked: false,
          ticks: {
            callback: function (value) {
              return "$" + value.toLocaleString();
            },
          },
        },
      },
    },
  });
}

/**
 * Initialize the performance evaluation chart
 */
function initPerformanceChart() {
  const ctx = document.getElementById("performance-chart");
  if (!ctx) return;

  // Sample data for performance chart
  const performanceChart = new Chart(ctx, {
    type: "radar",
    data: {
      labels: ["業務組", "工程部", "營運部", "人資部", "行政部", "財務部"],
      datasets: [
        {
          label: "上季度績效",
          data: [85, 92, 88, 90, 86, 91],
          fill: true,
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          borderColor: "rgba(75, 192, 192, 1)",
          pointBackgroundColor: "rgba(75, 192, 192, 1)",
          pointBorderColor: "#fff",
          pointHoverBackgroundColor: "#fff",
          pointHoverBorderColor: "rgba(75, 192, 192, 1)",
        },
        {
          label: "本季度績效",
          data: [87, 90, 89, 92, 88, 93],
          fill: true,
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          borderColor: "rgba(255, 99, 132, 1)",
          pointBackgroundColor: "rgba(255, 99, 132, 1)",
          pointBorderColor: "#fff",
          pointHoverBackgroundColor: "#fff",
          pointHoverBorderColor: "rgba(255, 99, 132, 1)",
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: "top",
        },
        title: {
          display: true,
          text: "各部門績效評估",
        },
        tooltip: {
          callbacks: {
            label: function (context) {
              let label = context.dataset.label || "";
              let value = context.raw || 0;
              return `${label}: ${value}分`;
            },
          },
        },
      },
      scales: {
        r: {
          min: 70,
          max: 100,
          ticks: {
            stepSize: 5,
          },
        },
      },
    },
  });
}

/**
 * Set up tab navigation to show different charts
 */
function setupTabNavigation() {
  const tabs = document.querySelectorAll(".report-tab");
  const chartContainers = document.querySelectorAll(".chart-content");

  // Hide all chart containers except the first one
  if (chartContainers.length > 1) {
    for (let i = 1; i < chartContainers.length; i++) {
      chartContainers[i].style.display = "none";
    }
  }

  // Add click event listeners to tabs
  tabs.forEach((tab, index) => {
    tab.addEventListener("click", function () {
      // Remove active class from all tabs
      tabs.forEach((t) => t.classList.remove("active"));

      // Add active class to clicked tab
      this.classList.add("active");

      // Hide all chart containers
      chartContainers.forEach((container) => {
        container.style.display = "none";
      });

      // Show the selected chart container
      if (chartContainers[index]) {
        chartContainers[index].style.display = "block";
      }
    });
  });
}
