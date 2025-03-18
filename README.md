# Banking Dashboard

**A simple banking dashboard for managing transactions efficiently.**  
This project was developed as a **technical assessment** to allow users to manage their financial transactions, including **adding, editing, filtering, importing, and exporting transactions.**

---

## **Installation & Setup**

### **Prerequisites**
- **Node.js v20.x** (minimum)
- **npm** (package manager)

### **Local Setup**
1. **Clone the repository:**
   ```bash
   git clone https://github.com/sepehramirkiaee/banking-dashboard.git
   cd banking-dashboard
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open in your browser:**
   ```
   http://localhost:5173
   ```

---

## **Running the Project with Docker**

### **2️⃣ Production Mode (Built & Served via Nginx)**
Run the **built project** using **Nginx**:
```bash
docker-compose up --build
```
- Builds the project and serves it via **Nginx**.
- Available at:
```
http://localhost:8080
```

### **Stopping the Server**
To stop any running container, use:
```bash
docker-compose down
```
---

## **Deployment**

This project is **pre-configured for Vercel**.

### **Deploying on Vercel**
- Simply **import the repository into Vercel** and trigger the **deployment action**.
- No additional configuration is required, as **Vercel settings are already included**.

**Live Demo:** [banking-dashboard-phi.vercel.app](https://banking-dashboard-phi.vercel.app)

---

## **Testing**

This project uses **Vitest** and **React Testing Library** for unit and integration testing.

### **Running Tests**
Run all tests with:
```bash
npm test
```
This will execute all test files in the **`tests` directory**.

### **Testing Frameworks Used**
- **Vitest** – Fast unit testing framework.
- **React Testing Library** – Ensures UI correctness through user interactions.

---

## **Technologies Used**
- **Frontend:** React, Vite  
- **State Management:** Zustand  
- **Styling:** Tailwind CSS  
- **Font:** Inter  
- **Testing:** Vitest, React Testing Library  
- **CSV Handling:** PapaParse  
- **Icons & UI Components:** Heroicons  
- **Deployment:** Vercel  

---

## **License**

This project is **open-source** and available under the **MIT License**.  
You are free to **use, modify, and distribute** it without restrictions.
