# Inventory Management System 📦 🛠️

This project is an **Inventory Management System** built using **Next.js**, **Firebase**, and **Material-UI**. The system allows users to manage inventory by adding, removing, and searching for items in real-time. The design is responsive, making it accessible on both desktop and mobile devices. This project was developed as part of the **Headstarter SWE Fellowship program**.

## Description 🔍

The implementation follows basic principles of state management and data synchronization with a real-time database:

- **Data Synchronization**: The inventory data is synchronized with Firebase Firestore in real-time, ensuring consistency across different devices.
- **User Interface**: The user interface is built with Material-UI, providing a modern and responsive design.
- **Search and Filter**: The search functionality allows users to filter items in real-time, with an option to reset the search and display all items.

## Technology Stack 🛠️

- **Programming Language**: JavaScript 💻
- **Framework**: Next.js 🌐
- **Database**: Firebase Firestore 🔥
- **UI Library**: Material-UI 🎨

## Environment Setup 🛠️

To set up the environment for this project, follow these steps:

1. Clone the repository to your local machine.
2. Install the necessary dependencies by running the following command:
  ```bash
     npm install
```
3. Add your Firebase configuration directly into the `firebase.js` file. Replace the placeholders with your actual Firebase project details available in the portal:
  ``` const firebaseConfig = {
    apiKey: "your_api_key",
    authDomain: "your_auth_domain",
    projectId: "your_project_id",
    storageBucket: "your_storage_bucket",
    messagingSenderId: "your_messaging_sender_id",
    appId: "your_app_id",
    measurementId: "your_measurement_id"
  };
```

## How to RUN 🕹️

Ensure that your Firebase configuration is correctly added to the `firebase.js` file.  
Start the application by running 
``` npm run dev ```
The application will be live at http://localhost:3000.  
Interact with the inventory management system by adding, removing, and searching for items.

## References 🙌
1. https://medium.com/@billzhangsc/building-an-inventory-management-app-with-next-js-react-and-firebase-e9647a61eb82
2. https://www.youtube.com/watch?v=2HBIzEx6IZA

