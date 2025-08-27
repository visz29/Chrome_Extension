# Chrome_Extension
chrome extension with react and and client storage idb data form wallpaper's
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

# 📊 Custom Dashboard Project  

A modern, customizable **Dashboard** application designed with **React** and **Tailwind CSS**, focusing on simplicity, performance, and extensibility. This project can also be converted into a **Chrome Extension**, giving users a fully personalized **New Tab experience**.  

The dashboard is built with the goal of being a **lightweight yet powerful personal productivity tool**. It allows users to quickly access essential information such as **date, time, wallpapers, widgets, and user customization options**.  

---

## 📌 Table of Contents
1. [Project Overview](#-project-overview)  
2. [Features](#-features)  
3. [Tech Stack](#-tech-stack)  
4. [Installation & Setup](#-installation--setup)  
5. [Project Structure](#-project-structure)  
6. [Core Components](#-core-components)  
7. [UI/UX Design Philosophy](#-uiux-design-philosophy)  
8. [Screenshots](#-screenshots)  
9. [Usage](#-usage)  
10. [Customization](#-customization)  
11. [Performance Considerations](#-performance-considerations)  
12. [Extension Conversion](#-extension-conversion)  
13. [Challenges Faced](#-challenges-faced)  
14. [Future Improvements](#-future-improvements)  
15. [Contributing](#-contributing)  
16. [License](#-license)  

---

## 🔎 Project Overview  

The **Dashboard Project** is designed as a modern productivity homepage. Unlike traditional dashboards, this project focuses on a **minimalist design philosophy**, ensuring the interface does not overwhelm the user but instead provides essential features in a clean, elegant way.  

- Built primarily as a **React project**.  
- Styled with **Tailwind CSS** for fast and consistent UI development.  
- Designed with **widgets** (clock, date, wallpapers, etc.) that update in real-time.  
- Can work as a **standalone web app** or as a **Chrome Extension new tab** page.  

The inspiration comes from the idea that **a dashboard should be your personal command center**, a place where you can quickly see time, date, visuals, and access tools you frequently use.  

---

## ✨ Features  

### Core Functionalities
- 🕒 **Real-Time Clock (Analog + Digital)**  
  Displays the current system time with both analog hands and digital numbers.  

- 📅 **Date & Day Display**  
  Shows the current day, month, and date in a clear format.  

- 🖼️ **Custom Wallpapers**  
  - Add wallpapers dynamically.  
  - Wallpapers are stored in **localStorage** for persistence.  
  - Ability to delete or replace wallpapers.  

- 📱 **Responsive Design**  
  Works on **all screen sizes** – mobile, tablet, and desktop.  

### Extended Features
- ⚡ **Local Storage Persistence**  
  Data is stored locally to preserve user customization even after refreshing.  

- 🎨 **TailwindCSS Styling**  
  - Fast prototyping with utility-first classes.  
  - Consistent spacing, typography, and responsiveness.  

- 🔄 **Customizable Widgets**  
  Each widget is independent, making it easy to **add/remove** components.  

---

## 🛠 Tech Stack  

- **React.js** → Core UI library  
- **Tailwind CSS** → Styling framework  
- **JavaScript (ES6+)** → Application logic  
- **Vite** → Development & build tool for fast bundling  
- **LocalStorage API** → Persist user wallpapers and settings  

---

## ⚙️ Installation & Setup  

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/dashboard.git
cd dashboard

### Project Structure 

dashboard/
│── public/                # Static files that Vite serves directly
│   └── favicon.ico         # Example: icons, manifest, etc.
│
│── src/                    # Source code (everything React-related lives here)
│   ├── components/         # Reusable UI components (Clock, Wallpaper, Widgets, etc.)
│   │   ├── Clock.jsx
│   │   ├── DateWidget.jsx
│   │   └── WallpaperUploader.jsx
│   │
│   ├── assets/             # Images, GIFs, icons, wallpapers
│   │   └── background.png
│   │
│   ├── styles/             # Tailwind & custom CSS
│   │   └── index.css
│   │
│   ├── App.jsx             # Main React component (wraps Dashboard, routes, layout)
│   ├── Dashboard.jsx       # Core dashboard UI (time, date, wallpapers, widgets)
│   └── main.jsx            # React entry point, mounts <App /> into index.html
│
│── package.json            # Project metadata, dependencies, scripts
│── vite.config.js          # Vite bundler config (plugins, paths, etc.)
│── tailwind.config.js      # Tailwind custom theme/config

🔎 What each does

public/ → static files copied as-is (favicons, extension manifest if needed).

src/components/ → modular React components you can reuse (Clock, Weather, etc.).

src/assets/ → images, backgrounds, GIFs, site logo.

src/styles/ → Tailwind entry (index.css) and optional overrides.

App.jsx → the root component, usually holds layout & routes.

Dashboard.jsx → your main page/dashboard logic (time, date, wallpapers).

main.jsx → entry point: ReactDOM renders <App />.

package.json → scripts like npm run dev, npm run build.

vite.config.js → config for Vite bundler.

tailwind.config.js → custom colors, fonts, breakpoints.


###  🧩 Core Components

1. Clock Component

-   Displays analog (hour, minute, second hands) and digital format.
-   Angles calculated using math functions:

const hours = time.getHours() % 12;
const minutes = time.getMinutes();
const hourAngle = hours * 30 + minutes * 0.5 - 90;

-   Updates every second.

2. Date Component

-   Shows current day, month, and year.
-   Example: "Wednesday, Jan 8"

3. Wallpaper Component

-   Allows users to set custom wallpapers.
-   Uses localStorage.setItem("wallpapers", JSON.stringify(wallpapers)).

4. Dashboard Layout

-   Grid/Flexbox powered layout.
-   Mobile-first responsive design.

### UI/UX Design Philosophy

🎨 UI/UX Design Philosophy

1. Minimalist Approach
-   Avoid clutter and show only essential information.

2. High Contrast Typography
-   Clear readability for time & date.

3. Personalization
-   Users should feel the dashboard is theirs (wallpapers, widgets).

4. Responsive First
-   Works seamlessly across mobile & desktop.

###     Screenshots

📸 Screenshots

📌 Add your screenshots in the screenshots/ folder and update paths here.

🖥️ Full Dashboard


🕒 Clock & Date Widget

🖼️ Wallpaper Customization