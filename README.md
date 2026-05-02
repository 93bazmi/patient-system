# **Patient System** 🩺
A real-time patient management system designed to streamline communication and workflow between patients and medical staff. The system allows patients to submit information while staff can monitor, update, and manage patient status in real time.

## 💚 Live Demo

* For Patient: https://patient-system-beta.vercel.app
* For Staff: https://patient-system-beta.vercel.app/staff

## 📘 Documentation

This folder contains the development planning documentation for the Patient System.
### Contents

- [Project Structure](./doc/project-structure.md)
- [Design](./doc/design.md)
- [Component Architecture](./doc/components.md)
- [Real-Time Synchronization Flow](./doc/realtime.md)


## 👤 Patient Flow
- Open the system
- Select your assigned room
- Fill out the form
- Submit your information
- Wait for staff interaction
- Once finished, the session will be marked as completed by staff

## 🧑‍⚕️ Staff Flow
- Go to `/staff`
- Select your assigned room
- Wait for incoming patients
- View patient information in real time
- Interact with the patient
- Click **Complete** when finished
- The room is ready for the next patient

## 🚀 Features

* **Patient Form Submission** 👤    
Patients can fill out and submit their medical information easily.

* **Real-Time Updates** 🔄   
Uses WebSocket via Socket.IO for instant synchronization between patient and staff views.

* **Live Form Activity Monitoring** 📡   
Staff can see when a patient is actively filling out the form before submission.

* **Staff Dashboard** 🧑‍⚕️   
Staff can monitor patient activity and track their current state (inactive, filling, submitted) in real time.

* **_Room-Based Management_** ⭐    
Supports multiple rooms, allowing staff to handle patients in parallel without interference.

* **_Session Completion_** ⭐     
Once the patient has submitted their information and the interaction is complete, staff can mark the session as completed.

## 🛠️ Tech Stack
* Frontend: Next.js (App Router, Client Components)
* Backend: Node.js + Socket Server
* Realtime Communication: Socket.IO
* Styling: Tailwind CSS
* Deployment: Vercel(Frontend), Render(Backend)

## ⚙️ Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/93bazmi/patient-system.git
cd patient-system
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file in the root directory and add:

```env
// Backend server configuration
PORT=3001
NEXT_PUBLIC_SOCKET_URL=http://localhost:3001

// Frontend configuration
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

### 4. Run the development server

```bash
# frontend
npm run dev

# socket server
node server/server.js
or
npm run socket
```

### 5. Open in your browser
http://localhost:3000

## 📌 Future Improvements
- Authentication system (staff login)
- Database integration (e.g., MongoDB / PostgreSQL)
- Patient history tracking (store and review past sessions)
- Search and filter functionality for patient records


