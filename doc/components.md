# 🧱 Component Architecture

The application is built using a modular component architecture, where components are organized based on their level of responsibility and reusability.

---

### 📄 Form Components (`components/form`)

This layer contains low-level, reusable form elements that are used to construct the patient form.

- **InputField.tsx**  
  A reusable text input component for capturing user input.

- **Select.tsx**  
  A basic dropdown component for selecting predefined options.

- **SelectField.tsx**  
  A combined component that includes a label and a select input, improving consistency across form fields.

- **Section.tsx**  
  Groups related form fields into logical sections, improving readability and structure.

These components are designed to be reusable and independent, allowing consistent form behavior across the application.

---

### 👤 Feature Component (`components/patient`)

This layer contains higher-level components that combine multiple form elements into a complete feature.

- **PatientForm.tsx**  
  The main form component responsible for managing patient input, handling form state, validation, and submission.

This component is shared between both patient and staff views. Patients interact with the form to input data, while staff access the same structure in a read-only mode for reviewing submitted information.

---

### 🎨 Shared UI Components (`components/ui`)

This layer includes general-purpose UI elements used across the application.

- **Popup.tsx**  
  Displays alerts, confirmations, or important messages to the user.

- **TopBar.tsx**  
  Provides a consistent header or navigation element across different pages.

These components help maintain a consistent look and feel throughout the system.

---

### 🧠 Architecture Summary

The component architecture follows a layered approach:

- Low-level components (`form/`) → reusable building blocks
- Feature-level components (`patient/`) → combine logic and UI
- Shared UI components (`ui/`) → global interface elements

This structure improves reusability, reduces duplication, and makes the system easier to maintain and extend.
