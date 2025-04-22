let initialRows = [];

function updateBusTimes() {
    let buses = [];

    // Generating bus numbers from 1 to 100
    for (let i = 1; i <= 100; i++) {
        buses.push({ number: i, arrival: "" });
    }

    let tableBody = document.getElementById("busTable");
    if (!tableBody) {
        console.error("Error: Element with ID 'busTable' not found!");
        return;
    }
    tableBody.innerHTML = "";
    initialRows = []; // Clear the array when the table is updated

    buses.forEach(bus => {
        let row = document.createElement("tr");
        row.dataset.routeNumber = bus.number; // Store the route number in a data attribute
        row.innerHTML = `
            <td><input type='checkbox' onchange='updateArrivalTime(this)'></td>
            <td>Route number ${bus.number}</td>
            <td class='arrival-time'></td>
        `;
        tableBody.appendChild(row);
        initialRows.push({
            routeNumber: bus.number,
            element: row,
        }); // Store the initial row data
    });
}

function updateArrivalTime(checkbox) {
    const parentRow = checkbox.closest('tr');
    const tableBody = parentRow.parentNode;

    if (checkbox.checked) {
        let now = new Date();
        let hours = now.getHours().toString().padStart(2, '0');
        let minutes = now.getMinutes().toString().padStart(2, '0');
        let formattedTime = `${hours}:${minutes} ${hours >= 12 ? 'PM' : 'AM'}`;
        parentRow.querySelector('.arrival-time').textContent = formattedTime;

        // Ensure the tick appears first, then move the row
        setTimeout(() => {
            tableBody.appendChild(parentRow); // Move the row to the end
        }, 50);
    } else {
        parentRow.querySelector('.arrival-time').textContent = "";

        // Move the row back to its original position
        const routeNumber = parentRow.dataset.routeNumber;
        const originalIndex = initialRows.findIndex(item => item.routeNumber === routeNumber);

        if (originalIndex !== -1) {
            const originalElement = initialRows[originalIndex].element;
            const rows = Array.from(tableBody.rows);
            const currentIndex = rows.indexOf(parentRow);

            if (currentIndex !== -1 && currentIndex !== originalIndex) {
                tableBody.insertBefore(parentRow, originalElement);
            }
        }
    }
}

function filterRows() {
    const searchValue = document.getElementById('searchBar').value.toLowerCase();
    const rows = document.querySelectorAll('#busTable tr');

    rows.forEach(row => {
        const routeNumber = row.dataset.routeNumber;
        if (routeNumber.includes(searchValue)) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
}

// Initialize table on load
document.addEventListener("DOMContentLoaded", updateBusTimes);

window.addEventListener("DOMContentLoaded", function () {
    const userName = localStorage.getItem("userName") || "Guest";

    const span = document.createElement("span");
    span.className = "guard-name";
    span.textContent = userName;

    const guardInfo = document.getElementById("guard-info");
    if (guardInfo) {
        guardInfo.appendChild(span);
    }
});
