# R.S Heritage - Marriage & Event Venue

👑 **R.S Heritage Eco Huts** is a premier luxury wedding, banquet, and celebration destination located in Hajipur, Punjab.

---

## 🚀 Technology Stack

- **Frontend**: React.js (Vite), Tailwind CSS, Lucide Icons, Context API (Auth & RBAC)
- **Backend**: Node.js, Express.js, JWT Authentication, Role-Based Access Control
- **Email System**: Nodemailer with Gmail SMTP (`service: "gmail"`)
- **Venue Location**: Hajipur, opposite Aryan JCB Spare Parts, Road, Talwara, Depur, Punjab 144222

---

## 🛠️ Getting Started

### 1. Backend Setup
```bash
cd backend
npm install
npm run dev
```

Create a `backend/.env` file with your credentials:
```env
PORT=5000
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587

EMAIL_USER=divyanshthakur327@gmail.com
EMAIL_PASS=your_16_character_app_password
ADMIN_EMAIL=divyanshthakur327@gmail.com

ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123
JWT_SECRET=rs_heritage_secret_key_2026
```

### 2. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

---

## 🌟 Key Features

- **Luxury Responsive Layout**: Optimized for Desktop, Tablet, and Mobile screens.
- **Role-Based Access Control**: "Check Date Availability" feature visible exclusively to authenticated Admin users.
- **Gmail Nodemailer Integration**: Instant booking form inquiries delivered directly to `divyanshthakur327@gmail.com`.
- **Interactive Calendar Modal**: Month-by-month venue availability calendar with pre-fill booking capability.
- **Google Maps Integration**: Direct location pin for *R.S Heritage Eco Huts, Hajipur, Punjab*.
