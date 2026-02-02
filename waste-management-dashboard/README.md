# EcoTrack - Waste Management & Recycling Solutions Dashboard

**EcoTrack** is a SaaS-based digital platform designed for commercial waste management, recycling compliance, and operational analytics. It features a modern public website and two fully distinctive, role-based dashboards (Admin & Client).

![Version](https://img.shields.io/badge/version-1.0.0-green.svg)

## 🚀 Key Features

### 🌐 Public Website
- **Modern Landing Page**: High-conversion hero section, feature grid.
- **Multi-Page Structure**: Includes Home v1/v2, Services, Blog, and Pricing.
- **Responsive Design**: Mobile-first architecture.
- **Dark/Light Mode**: Built-in theme toggle with local storage persistence.
- **Eco-Friendly Aesthetic**: Premium design using deep greens and clean typography.

### 🏢 Admin Dashboard (`dashboard/admin/index.html`)
- **Operational Overview**: Real-time stats on waste collection and fleet status.
- **Waste Analytics**: Interactive charts showing recycling vs landfill trends.
- **Route Planning**: Management of pickup schedules and truck status.
- **Messages System**: Dedicated interface for client support and inquiries.
- **Live Updates**: Real-time alerts for bin status and fleet issues.

### 👤 Client Portal (`dashboard/client/index.html`)
- **Bin Management**: Visual fill-level indicators for client bins.
- **Pickup Scheduling**: Easy interface to request pickups.
- **Impact Reports**: Personalized environmental impact data (Recycled vs Landfill).
- **Billing**: Access to invoices and payment history.

## 🛠️ Technology Stack
- **HTML5**: Semantic and accessible structure.
- **CSS3**: Modern Utility-First Design System (Tailwind-compatible naming) with Dark Mode support.
- **JavaScript**: Chart.js for analytics visualization, Vanilla JS for interactions.
- **Icons**: FontAwesome 6.

## 📂 Project Structure

```text
waste-management-dashboard/
├── assets/
│   ├── css/            # Global styles (style.css)
│   ├── js/             # Logic scripts
│   └── img/            # Images
├── dashboard/
│   ├── admin/          # Admin Portal HTML files
│   └── client/         # Client Portal HTML files
├── pages/              # Public Website HTML files
└── README.md           # This file
```

## ⚡ Quick Start

1.  **Open locally**:
    Navigate to `pages/index.html` and open it in your browser.
2.  **Explore Dashboards**:
    - **Admin Link**: Click "Admin Portal" in the nav.
    - **Client Link**: Click "Client Login" in the nav.

## 🎨 Customization
- **Colors**: Edit the `:root` variables in `assets/css/style.css` to change the brand palette globally.
