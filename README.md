# ✅ ReactList - React Native Task Manager

ReactList is a simple and stylish mobile task management app built using **React Native**, **Expo**, and **TypeScript**. The app helps you track tasks with due dates and priority levels in a clean, user-friendly interface.

---

## 🚀 Getting Started

This project uses [Expo](https://expo.dev), which simplifies building and testing React Native apps.

### 1. Clone the Repository

```bash
git clone https://github.com/raihanzaman/reactlist.git
cd reactlist
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run the App
```bash
npx expo start
```

This command will open the Expo development tools with options to run the app on:

- 📱 **Expo Go (Download the app and scan the QR code on your mobile device) <- Preferred Method**
- 💻 Android Emulator
- 🍎 iOS Simulator
- 🛠️ Development Build

## 📱 App Features
- **Add Tasks** with:
   - Task description
   - Due date via native date picker
   - Priority level (Urgent, Semi-Urgent, No Urgency)
- **Sort Tasks** by due date (closest first)
- Mark tasks as **completed** or **delete** them
- **Dark mode** toggle on the Options tab
- Clean, user-friendly UI with smooth modal interactions

## 🗂️ Project Structure

```bash
app/
├── (tabs)/
│   ├── _layout.tsx         # Layout for tab navigation
│   ├── index.tsx           # Main tasks tab (task list and add task)
│   ├── options.tsx         # Options tab (theme toggle)
├── components/
│   ├── AddTask.tsx         # Component for adding new tasks (modal with inputs)
│   ├── TaskItem.tsx        # Component displaying a single task item
│   ├── TaskList.tsx        # Component displaying list of tasks (sorted)
├── theme/
│   ├── ThemeContext.tsx    # Theme context provider & hook for light/dark mode
├── types/
│   └── index.ts            # TypeScript types/interfaces (e.g., Task)
└── _layout.tsx             # Root layout file for the app
```

## 🎯 How to Use
1. Use the "+" floating action button to open the "Add Task" modal.
2. Enter a task
3. Select a due date (click date and scroll, tap on the date again to hide the scroll)
4. Pick a priority.
5. Tasks automatically sort by nearest due date.
6. Tap the task bubble to mark complete/incomplete.
7. Delete tasks with the trash icon.

## 🛠️ Development Notes
- **State Management:** 
Tasks are managed locally within React component state — no external storage or libraries required.
- **Date Handling:**
Due dates are stored as JavaScript Date objects and displayed via native date pickers (@react-native-community/datetimepicker).
- **Theming:**
Theme context wraps the app, controlling colors dynamically based on light/dark mode selection.
- **Styling:**
Stylesheets dynamically switch colors based on current theme for backgrounds, text, inputs, buttons, etc.

Thank you for reviewing this project. Looking forward to hearing your thoughts!