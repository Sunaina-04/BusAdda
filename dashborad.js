
const userName = localStorage.getItem("userName") || "Guest";
document.getElementById("welcome-message").textContent = `Welcome, ${userName}!`;

const span = document.createElement("span");
span.className = "guard-name";
span.textContent = userName;
document.getElementById("guard-info").appendChild(span);

document.querySelector(".arrival-btn").addEventListener("click", () => {
    window.location.href = `arrival.html?name=${encodeURIComponent(userName)}`;
});

document.querySelector(".departure-btn").addEventListener("click", () => {
    window.location.href = `departure.html?name=${encodeURIComponent(userName)}`;
});

document.addEventListener("DOMContentLoaded", () => {
    const guardInfo = document.getElementById("guard-info");
    const modal = document.getElementById("employee-modal");
    const closeButton = document.querySelector(".close-button");

    console.log("UserName:", localStorage.getItem("userName"));
    console.log("EmployeeID:", localStorage.getItem("employeeId"));

    guardInfo.addEventListener("click", () => {
        const userName = localStorage.getItem("userName") || "Guest";
        const employeeId = localStorage.getItem("employeeId") || "Unknown";

        document.getElementById("employee-name").textContent = userName;
        document.getElementById("employee-id").textContent = `Employee ID: ${employeeId}`;

        modal.style.display = "flex";
    });

    closeButton.addEventListener("click", () => {
        modal.style.display = "none";
    });

    window.addEventListener("click", (event) => {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });
});
