# 📁 Project Structure

The project is structured to separate routing, UI components, reusable logic, and real-time communication.

```bash
src/
├── app/                      # Next.js App Router
│   ├── room/                 # Patient interface (room-based)
│   ├── staff/                # Staff dashboard per room
│   ├── layout.tsx            # Global layout
│   └── page.tsx              # Entry page (redirects users to /room)
├── components/               # Reusable UI components
│   ├── form/                 # Form building components (Input, Select, Section)
│   ├── patient/              # Patient-specific components (PatientForm)
│   └── ui/                   # Shared UI (Popup, TopBar)
├── hook/                     # Custom React hooks
│   └── useScrollToError.ts   # Form validation helper
├── lib/                      # Core logic and services
│   ├── socket.ts             # Connects frontend to backend via Socket.IO
│   └── validation/           # Form validation logic
├── types/                    # TypeScript type definitions
│   ├── form.ts
│   └── patient.ts

server/
└── server.js                 # WebSocket backend server using Socket.IO
```

This structure separates routing, UI, and real-time communication logic, making the system easier to maintain, extend, and debug.

## 🧭 App Routing Structure

```bash
├── app/                            # Next.js App Router
│   ├── room/
│   │   ├── page.tsx                # Room selection page (patient chooses a room)
│   │   └── [id]/page.tsx           # Patient interface for a specific room
│   ├── staff/
│   │   ├── page.tsx                # Staff entry / room selection
│   │   └── [id]/page.tsx           # Staff dashboard for a specific room
│   ├── layout.tsx                  # Global layout
│   └── page.tsx                    # Entry page
```

- Users first enter through a selection page (`/room` for patients and `/staff` for staff), where they choose a specific room. After selecting a room, they are routed to a dynamic path (`/room/[id]` or `/staff/[id]`) that represents a specific session.
- The `[id]` dynamic route allows the system to handle multiple rooms independently, enabling parallel interactions between patients and staff.

## 🧩 Components Structure

```bash
├── components/               # Reusable UI components
│   ├── form/                 # Form building components
│   │   ├── InputField.tsx    # Text input component
│   │   ├── Select.tsx        # Basic select dropdown
│   │   ├── SelectField.tsx   # Combined label + select input
│   │   └── Section.tsx       # Groups related form fields
│   ├── patient/
│   │   └── PatientForm.tsx   # Main patient form component
│   └── ui/                   # Shared UI components
│       ├── Popup.tsx         # Displays alerts or messages
│       └── TopBar.tsx        # Header / navigation component
```

- The `form/` directory contains low-level, reusable form elements used to build the patient form.
- The `patient/` directory contains higher-level components that combine multiple form elements into a complete feature.
- The `ui/` directory includes shared interface components used across different parts of the application.
