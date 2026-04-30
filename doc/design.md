# 🎨 Design (UI/UX Decisions)

The system is designed to support a clear, role-based workflow with different usage patterns for patients and staff. The interface prioritizes simplicity, real-time feedback, and device-specific optimization.

---

### 👤 Patient Flow

1. Select a room (first-time access)
2. Fill out the form
3. Submit information
4. Wait for staff interaction

The patient interface is optimized for mobile devices and tablets, allowing quick and easy form input. In practice, patients may use a device provided in each room. After a session is completed by staff, the system remains in the same room, allowing the next patient to continue without needing to reselect the room.

---

### 🧑‍⚕️ Staff Flow

1. Access `/staff`
2. Select assigned room
3. Monitor incoming patient data in real time
4. Interact with the patient
5. Mark the session as completed

The staff interface is designed primarily for desktop and tablet (e.g., iPad) usage, focusing on clarity, readability, and efficient interaction.

---

### 📱 Responsive & Device-Oriented Design

- Patient side → optimized for mobile and tablet (fast input, minimal UI)
- Staff side → optimized for desktop and tablet (data visibility and control)
- Layout adapts across screen sizes to maintain usability

---

### ⚡ Real-Time Feedback

The system provides immediate updates when data changes, allowing both patient and staff to stay synchronized without requiring page refresh.

---

### 🎯 Design Principles

- Simple and linear workflow (join → fill → submit → complete)
- Role-based interface (patient vs staff)
- Minimized user actions to reduce friction
- Consistent experience across devices
