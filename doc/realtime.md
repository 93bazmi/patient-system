# 🔄 Real-Time Synchronization Flow

## Overview

Both patient and staff clients establish a WebSocket connection to the backend server and join a specific room. Each room represents a shared session between a patient and staff.

All updates are handled through event-based communication, allowing data to be sent and received instantly between both sides.

## 1. Room Connection Flow

```mermaid
sequenceDiagram
    participant Patient
    participant Server
    participant Staff

    Patient->>Server: connect(roomId)
    Staff->>Server: connect(roomId)

    Server-->>Patient: joined room
    Server-->>Staff: joined room
```

### Explanation

- Both patient and staff connect to the same room using a shared `roomId`
- The room acts as a communication channel for that session
- All data is isolated within the room and only shared between the connected users

## 2. Form Update & Submission Flow

```mermaid
sequenceDiagram
    participant Patient
    participant Server
    participant Staff

    Note over Patient: Filling form

    Patient->>Server: emit("form:update", data)
    Server-->>Staff: broadcast update

    Patient->>Server: emit("form:submit", data)
    Server-->>Staff: broadcast submission
```

### Explanation

- While filling the form → `form:update` events are sent in real time
- When submitting → a `form:submit` event is emitted
- Staff receives and views updates instantly without needing to refresh the page

## 3. Session Completion Flow

```mermaid
sequenceDiagram
    participant Staff
    participant Server
    participant Patient

    Staff->>Server: emit("session:complete")
    Server-->>Patient: notify completion

    Note over Patient: Reset for next user
```

### Explanation

- Staff marks the session as completed after finishing the interaction
- The system sends the completion status back to the patient
- The session is reset, allowing the next patient to use the same room without reselecting it

## 🔗 Communication Model

The system follows a **bidirectional communication model**:

- Patient → **Server** → Staff
- Staff → **Server** → Patient

This ensures both sides remain synchronized at all times.

## ⚡ Key Characteristics

- Real-time synchronization without page refresh
- Room-based isolation for independent sessions
- Event-driven architecture using Socket.IO
- Continuous data streaming during form input
- Seamless session reset for consecutive users
