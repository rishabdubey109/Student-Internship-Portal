const internships = [
    {
        id: 1,
        title: "Frontend Developer Intern",
        company: "TechNova Solutions",
        location: "Remote",
        category: "Web Development",
        stipend: "₹10,000/month",
        duration: "3 Months",
        skills: ["HTML", "CSS", "JavaScript"]
    },

    {
        id: 2,
        title: "UI/UX Design Intern",
        company: "PixelCraft Studio",
        location: "Delhi",
        category: "Design",
        stipend: "₹8,000/month",
        duration: "2 Months",
        skills: ["Figma", "Canva", "UI Design"]
    },

    {
        id: 3,
        title: "Data Science Intern",
        company: "DataWorks India",
        location: "Bangalore",
        category: "Data Science",
        stipend: "₹15,000/month",
        duration: "6 Months",
        skills: ["Python", "Excel", "Data Analysis"]
    },

    {
        id: 4,
        title: "Digital Marketing Intern",
        company: "GrowthSpark",
        location: "Mumbai",
        category: "Marketing",
        stipend: "₹7,000/month",
        duration: "3 Months",
        skills: ["SEO", "Social Media", "Content"]
    },

    {
        id: 5,
        title: "Web Development Intern",
        company: "CodeSquare Technologies",
        location: "Pune",
        category: "Web Development",
        stipend: "₹12,000/month",
        duration: "4 Months",
        skills: ["HTML", "CSS", "JavaScript"]
    },

    {
        id: 6,
        title: "Graphic Design Intern",
        company: "Creative Minds",
        location: "Remote",
        category: "Design",
        stipend: "₹6,000/month",
        duration: "2 Months",
        skills: ["Photoshop", "Canva", "Figma"]
    }
];

function showPage(pageId, clickedButton) {

    const pages = document.querySelectorAll(".page");

    pages.forEach(function(page) {
        page.classList.remove("active-page");
    });

    document.getElementById(pageId).classList.add("active-page");


    const buttons = document.querySelectorAll(".nav-btn");

    buttons.forEach(function(button) {
        button.classList.remove("active");
    });

    if (clickedButton) {
        clickedButton.classList.add("active");
    }


    if (pageId === "applications") {
        displayApplications();
    }

    if (pageId === "profile") {
        loadProfile();
    }

    window.scrollTo(0, 0);
}


function openInternships() {

    const buttons = document.querySelectorAll(".nav-btn");

    showPage("internships", buttons[1]);
}

const internshipList = document.getElementById("internshipList");

function displayInternships(data) {

    internshipList.innerHTML = "";

    document.getElementById("internshipCount").innerText =
        data.length + " internships";


    if (data.length === 0) {

        internshipList.innerHTML = `
            <div class="empty-box">
                <h3>No internships found</h3>
                <p>Try changing your search or filters.</p>
            </div>
        `;

        return;
    }


    data.forEach(function(internship) {

        const card = document.createElement("div");

        card.className = "internship-card";


        let skillHTML = "";

        internship.skills.forEach(function(skill) {

            skillHTML += `
                <span class="skill">${skill}</span>
            `;

        });


        card.innerHTML = `
            <h2>${internship.title}</h2>

            <p class="company-name">
                ${internship.company}
            </p>

            <div class="job-details">

                <p>
                    <strong>Location:</strong>
                    ${internship.location}
                </p>

                <p>
                    <strong>Duration:</strong>
                    ${internship.duration}
                </p>

                <p>
                    <strong>Stipend:</strong>
                    ${internship.stipend}
                </p>

                <p>
                    <strong>Category:</strong>
                    ${internship.category}
                </p>

            </div>

            <div class="skill-container">
                ${skillHTML}
            </div>

            <button
                class="main-btn"
                onclick="openApplication(${internship.id})"
            >
                Apply Now
            </button>
        `;


        internshipList.appendChild(card);

    });

}

displayInternships(internships);

const searchInput = document.getElementById("searchInput");
const locationFilter = document.getElementById("locationFilter");
const categoryFilter = document.getElementById("categoryFilter");


searchInput.addEventListener("input", filterInternships);

locationFilter.addEventListener("change", filterInternships);

categoryFilter.addEventListener("change", filterInternships);


function filterInternships() {

    const searchText =
        searchInput.value.toLowerCase().trim();

    const selectedLocation =
        locationFilter.value;

    const selectedCategory =
        categoryFilter.value;


    const filteredData = internships.filter(function(internship) {

        const searchMatch =
            internship.title.toLowerCase().includes(searchText) ||
            internship.company.toLowerCase().includes(searchText);

        const locationMatch =
            selectedLocation === "all" ||
            internship.location === selectedLocation;

        const categoryMatch =
            selectedCategory === "all" ||
            internship.category === selectedCategory;


        return searchMatch && locationMatch && categoryMatch;

    });


    displayInternships(filteredData);
}

function openApplication(id) {

    const internship = internships.find(function(item) {
        return item.id === id;
    });


    if (!internship) {
        return;
    }


    document.getElementById("internshipId").value =
        internship.id;


    document.getElementById("selectedInternship").innerText =
        internship.title + " at " + internship.company;


    const profile =
        JSON.parse(localStorage.getItem("studentProfile"));


    if (profile) {

        document.getElementById("studentName").value =
            profile.name || "";

        document.getElementById("studentEmail").value =
            profile.email || "";

        document.getElementById("studentCollege").value =
            profile.college || "";

        document.getElementById("studentCourse").value =
            profile.course || "";

        document.getElementById("studentSkills").value =
            profile.skills || "";
    }


    document.getElementById("applicationModal").style.display =
        "block";

}

function closeApplication() {

    document.getElementById("applicationModal").style.display =
        "none";

}

const applicationForm =
    document.getElementById("applicationForm");


applicationForm.addEventListener("submit", function(event) {

    event.preventDefault();


    const internshipId =
        Number(document.getElementById("internshipId").value);


    const internship = internships.find(function(item) {
        return item.id === internshipId;
    });


    if (!internship) {
        alert("Internship not found.");
        return;
    }


    let applications =
        JSON.parse(localStorage.getItem("applications")) || [];


    const alreadyApplied =
        applications.some(function(application) {

            return application.internshipId === internshipId;

        });


    if (alreadyApplied) {

        alert("You have already applied for this internship.");

        return;
    }


    const application = {

        internshipId: internshipId,

        title: internship.title,

        company: internship.company,

        name: document.getElementById("studentName").value.trim(),

        email: document.getElementById("studentEmail").value.trim(),

        college: document.getElementById("studentCollege").value.trim(),

        course: document.getElementById("studentCourse").value.trim(),

        skills: document.getElementById("studentSkills").value.trim(),

        status: "Applied",

        appliedDate: new Date().toLocaleDateString()

    };


    applications.push(application);


    localStorage.setItem(
        "applications",
        JSON.stringify(applications)
    );


    alert("Application submitted successfully!");


    applicationForm.reset();

    closeApplication();

});

function displayApplications() {

    const container =
        document.getElementById("applicationsList");


    const applications =
        JSON.parse(localStorage.getItem("applications")) || [];


    container.innerHTML = "";


    if (applications.length === 0) {

        container.innerHTML = `
            <div class="empty-box">

                <h3>No Applications Yet</h3>

                <p>
                    Internships you apply for will appear here.
                </p>

            </div>
        `;

        return;
    }


    applications.forEach(function(application, index) {

        const card =
            document.createElement("div");


        card.className =
            "application-card";


        card.innerHTML = `
            <h2>${application.title}</h2>

            <p>
                <strong>Company:</strong>
                ${application.company}
            </p>

            <p>
                <strong>Applied By:</strong>
                ${application.name}
            </p>

            <p>
                <strong>Applied On:</strong>
                ${application.appliedDate}
            </p>

            <span class="status">
                ${application.status}
            </span>

            <br>

            <button
                class="withdraw-btn"
                onclick="withdrawApplication(${index})"
            >
                Withdraw Application
            </button>
        `;


        container.appendChild(card);

    });

}

function withdrawApplication(index) {

    const answer =
        confirm(
            "Do you want to withdraw this application?"
        );


    if (!answer) {
        return;
    }


    let applications =
        JSON.parse(localStorage.getItem("applications")) || [];


    applications.splice(index, 1);


    localStorage.setItem(
        "applications",
        JSON.stringify(applications)
    );


    displayApplications();

}

const profileForm =
    document.getElementById("profileForm");


profileForm.addEventListener("submit", function(event) {

    event.preventDefault();


    const profile = {

        name:
            document.getElementById("profileName").value.trim(),

        email:
            document.getElementById("profileEmail").value.trim(),

        college:
            document.getElementById("profileCollege").value.trim(),

        course:
            document.getElementById("profileCourse").value.trim(),

        skills:
            document.getElementById("profileSkills").value.trim()

    };


    localStorage.setItem(
        "studentProfile",
        JSON.stringify(profile)
    );


    const message =
        document.getElementById("profileMessage");


    message.innerText =
        "Profile saved successfully!";


    setTimeout(function() {

        message.innerText = "";

    }, 3000);

});

function loadProfile() {

    const profile =
        JSON.parse(localStorage.getItem("studentProfile"));


    if (!profile) {
        return;
    }


    document.getElementById("profileName").value =
        profile.name || "";

    document.getElementById("profileEmail").value =
        profile.email || "";

    document.getElementById("profileCollege").value =
        profile.college || "";

    document.getElementById("profileCourse").value =
        profile.course || "";

    document.getElementById("profileSkills").value =
        profile.skills || "";

}

window.addEventListener("click", function(event) {

    const modal =
        document.getElementById("applicationModal");


    if (event.target === modal) {

        closeApplication();

    }

});

loadProfile();

displayApplications();
