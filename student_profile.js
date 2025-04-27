document.addEventListener("DOMContentLoaded", () => {
    // Fetch user data from localStorage
    const studentName = localStorage.getItem("studentName") || "Guest";
    const studentGender = localStorage.getItem("gender") || "male";
    const studentRollNo = localStorage.getItem("rollNo") || "Unknown";
    const studentRouteNo = localStorage.getItem("routeNo") || "Not Available";
    const studentCity = localStorage.getItem("city") || "Not Available";
    const studentFeeStatus = localStorage.getItem("feeStatus") || "Paid";
    const studentFees = localStorage.getItem("fees") || "Not Available";

    // Corrected fetching avatar
    let studentAvatar = localStorage.getItem("avatarUrl") || getAvatarByGender(studentGender);

    // Function to get avatar based on gender
    function getAvatarByGender(gender) {
        switch (gender.toLowerCase()) {
            case "male":
                return "https://github.com/Sunaina-04/BusAdda/blob/main/assets/male_avatar.png?raw=true";
            case "female":
                return "https://github.com/Sunaina-04/BusAdda/blob/main/assets/avatar.jpg?raw=true";
            default:
                return "assets/default_avatar.png";
        }
    }

    // Function to update UI with student data
    function updateUIWithStudentData() {
        document.getElementById("student-avatar").src = studentAvatar;
        document.getElementById("student-name").textContent = studentName;
        document.getElementById("student-roll-no").textContent = studentRollNo;
        document.getElementById("student-route-no").textContent = studentRouteNo;
        document.getElementById("student-city").textContent = studentCity;
        document.getElementById("student-fee-status").textContent = studentFeeStatus;
        document.getElementById("student-fees").textContent = studentFees;
        document.getElementById("edit-gender").value = studentGender;
    }

    updateUIWithStudentData();

    // Modal handling
    const editProfileBtn = document.getElementById("edit-profile-btn");
    const closeBtn = document.getElementById("close-btn");
    const editProfileModal = document.getElementById("edit-profile-modal");

    editProfileBtn.addEventListener("click", () => {
        editProfileModal.style.display = "block";

        // Fill form with current data
        document.getElementById("edit-name").value = studentName;
        document.getElementById("edit-rollno").value = studentRollNo;
        document.getElementById("edit-route").value = studentRouteNo;
        document.getElementById("edit-city").value = studentCity;
        document.getElementById("edit-fee-status").value = studentFeeStatus;
        document.getElementById("edit-fees").value = studentFees;
        document.getElementById("edit-gender").value = studentGender;
    });

    closeBtn.addEventListener("click", () => {
        editProfileModal.style.display = "none";
    });

    // Close the modal if the user clicks outside of it
    window.addEventListener("click", (event) => {
        if (event.target == editProfileModal) {
            editProfileModal.style.display = "none";
        }
    });

    // Save changes from the edit profile form
    const editProfileForm = document.getElementById("edit-profile-form");
    editProfileForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const newName = document.getElementById("edit-name").value.trim();
        const newRollNo = document.getElementById("edit-rollno").value.trim();
        const newRouteNo = document.getElementById("edit-route").value.trim();
        const newCity = document.getElementById("edit-city").value.trim();
        const newFeeStatus = document.getElementById("edit-fee-status").value;
        const newFees = document.getElementById("edit-fees").value;
        const newGender = document.getElementById("edit-gender").value;
        const newAvatar = getAvatarByGender(newGender);

        // Save updated data to localStorage
        localStorage.setItem("studentName", newName);
        localStorage.setItem("rollNo", newRollNo);
        localStorage.setItem("routeNo", newRouteNo);
        localStorage.setItem("city", newCity);
        localStorage.setItem("feeStatus", newFeeStatus);
        localStorage.setItem("fees", newFees);
        localStorage.setItem("gender", newGender);
        localStorage.setItem("avatarUrl", newAvatar);

        // Reload page to apply changes immediately
        location.reload();
    });

    // Define the fees structure based on city (case insensitive)
    const cityFees = {
        "ambala": 45000,
        "patiala": 40000,
        "punchkula": 40000,
        "chandigarh": 40000,
        "rajpura": 20000,
        "mohali": 40000,
        // Add more cities and their fees as needed
    };

    // Function to get fees based on city (case-insensitive)
    function getFeesByCity(city) {
        const lowercaseCity = city.toLowerCase();
        return cityFees[lowercaseCity] || "Not Available";
    }

    // Update fees when the city input changes in the edit modal
    document.getElementById("edit-city").addEventListener("input", () => {
        const currentCity = document.getElementById("edit-city").value.trim();
        const fees = getFeesByCity(currentCity);
        document.getElementById("edit-fees").value = fees === "Not Available" ? "" : fees; // If "Not Available", clear the fees field
    });

    // Open the edit profile modal and load the student data for editing
    editProfileBtn.addEventListener("click", () => {
        const storedCity = localStorage.getItem('city') || "";
        const storedFees = localStorage.getItem('fees') || getFeesByCity(storedCity);
        
        document.getElementById("edit-name").value = localStorage.getItem('studentName') || "";
        document.getElementById("edit-rollno").value = localStorage.getItem('rollNo') || "";
        document.getElementById("edit-route").value = localStorage.getItem('routeNo') || "";
        document.getElementById("edit-city").value = storedCity;
        document.getElementById("edit-fee-status").value = localStorage.getItem('feeStatus') || "Paid";
        
        // Set the fees based on the current city when the modal opens
        document.getElementById("edit-fees").value = storedFees;

        // Set gender based on localStorage
        document.getElementById("edit-gender").value = localStorage.getItem('gender') || "male";

        editProfileModal.style.display = "block";
    });
});
