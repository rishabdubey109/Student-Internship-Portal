# Student Internship Portal

## Project Overview

Student Internship Portal is a simple web-based application created using HTML, CSS and JavaScript.

The main purpose of this project is to provide students with a platform where they can browse internship opportunities, search for internships, apply for them and keep track of their applications.

The project uses browser Local Storage to save student profile information and internship applications.

## Technologies Used

- HTML5
- CSS3
- JavaScript
- Browser Local Storage

## Features

1. Home page with information about the portal
2. Browse available internships
3. Search internships by role or company
4. Filter internships by location
5. Filter internships by category
6. Apply for an internship
7. Application form validation
8. Save applications in Local Storage
9. Prevent duplicate applications
10. View submitted applications
11. Withdraw an application
12. Create and save a student profile
13. Responsive layout for desktop and mobile devices

## Project Structure

```text
student-internship-portal/
├── index.html
├── internships.html
├── applications.html
├── profile.html
├── css/
│   └── style.css
├── js/
│   ├── internships.js
│   └── script.js
└── README.md
```

## How to Run the Project

1. Download or copy the complete project folder.
2. Make sure all files are placed in their correct folders.
3. Open `index.html` in a web browser.
4. The application will start from the home page.

No server or database setup is required.

For development, the project can also be opened using the Live Server extension in Visual Studio Code.

## How It Works

Internship information is stored inside a JavaScript array in
`internships.js`.

When a student applies for an internship, JavaScript stores the application inside the browser's Local Storage.

The My Applications page reads this saved data and displays all submitted applications.

Student profile information is also stored in Local Storage. Saved profile details are automatically filled in the internship application form.

## Limitations

This is a front-end project, so it does not contain a real backend or database.

The information saved using Local Storage is available only in the same browser. Clearing browser storage will remove the saved profile and applications.

## Future Improvements

The following features can be added in future versions:

- Student login and registration
- Company login
- Admin dashboard
- Backend integration
- MySQL database
- Resume upload
- Email notifications
- Real-time application status
- Company internship posting system

## Author

Rishab Dubey