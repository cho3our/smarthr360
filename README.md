# SmartHR 360 🚀

> نظام إدارة موارد بشرية احترافي متكامل (HRMS) | Professional HR Management System

[![Laravel](https://img.shields.io/badge/Laravel-10-red.svg)](https://laravel.com)
[![React](https://img.shields.io/badge/React-18-blue.svg)](https://reactjs.org)
[![MySQL](https://img.shields.io/badge/MySQL-8.0-orange.svg)](https://www.mysql.com)
[![Docker](https://img.shields.io/badge/Docker-Ready-blue.svg)](https://www.docker.com)

## 📋 نظرة عامة | Overview

**SmartHR 360** هو نظام إدارة موارد بشرية حديث مصمم للشركات، يوفر:

- ✅ إدارة الموظفين الكاملة
- ✅ نظام الحضور والانصراف
- ✅ إدارة الرواتب + ملفات WPS و Mudad
- ✅ نظام الإجازات مع سير عمل
- ✅ إدارة العقود والتجديد
- ✅ المخالفات والتقييم الوظيفي
- ✅ تقارير ذكية + تنبيهات تلقائية
- ✅ لوحة تحكم احترافية
- ✅ متعدد اللغات (عربي + إنجليزي)
- ✅ داكن/فاتح + دعم RTL/LTR

---

## 🏗️ البنية التقنية | Tech Stack

### Backend
- **Laravel 10** - PHP Framework
- **MySQL 8.0** - Database
- **Sanctum** - Authentication
- **Spatie Permissions** - Roles & Permissions
- **DomPDF** - PDF Generation
- **Maatwebsite Excel** - Excel Exports

### Frontend
- **React 18** - UI Framework
- **Vite** - Build Tool
- **Axios** - HTTP Client
- **i18next** - Internationalization
- **Recharts** - Data Visualization
- **Lucide React** - Icons
- **TailwindCSS** - Styling

### DevOps
- **Docker** - Containerization
- **Docker Compose** - Orchestration
- **Nginx** - Web Server

---

## 🚀 التثبيت السريع | Quick Setup

### المتطلبات | Prerequisites

- Docker & Docker Compose
- Git

### الخطوات | Steps

```bash
# 1. استنساخ المستودع | Clone repository
git clone https://github.com/cho3our/smarthr360.git
cd smarthr360

# 2. نسخ ملف البيئة | Copy environment file
cp backend/.env.example backend/.env

# 3. تشغيل Docker | Start Docker containers
docker-compose up -d --build

# 4. دخول لحاوية Laravel | Enter Laravel container
docker exec -it smarthr360-laravel bash

# 5. تثبيت التبعيات | Install dependencies
composer install

# 6. إنشاء مفتاح التطبيق | Generate app key
php artisan key:generate

# 7. تشغيل الهجرات | Run migrations
php artisan migrate --seed

# 8. ربط التخزين | Link storage
php artisan storage:link

# 9. تعيين الصلاحيات | Set permissions
chown -R www-data storage bootstrap/cache

# 10. الخروج والانتهاء | Exit and done!
exit
```

### الوصول للتطبيق | Access

- **Backend API**: http://localhost:8000
- **Frontend**: http://localhost:5173
- **Database**: localhost:3307

---

## 📁 هيكل المشروع | Project Structure

```
smarthr360/
├── backend/              # Laravel Backend
│   ├── app/
│   │   ├── Models/       # Database Models
│   │   ├── Http/
│   │   │   └── Controllers/
│   │   ├── Services/     # Business Logic
│   │   └── Jobs/         # Background Jobs
│   ├── config/
│   ├── database/
│   │   └── migrations/
│   ├── routes/
│   │   └── api.php       # API Routes
│   └── .env              # Environment Variables
│
├── frontend/             # React Frontend
│   ├── src/
│   │   ├── components/   # Reusable Components
│   │   ├── pages/        # Page Components
│   │   ├── contexts/     # React Contexts
│   │   ├── locales/      # i18n Translations
│   │   └── App.jsx       # Main App
│   ├── vite.config.js    # Vite Configuration
│   └── package.json
│
├── docker-compose.yml    # Docker Services
├── nginx/
│   └── default.conf      # Nginx Configuration
└── README.md             # This file
```

---

## 🔧 حل المشاكل الشائعة | Troubleshooting

### 1️⃣ مشكلة اتصال قاعدة البيانات
**Error**: `SQLSTATE[HY000] [2002] Connection refused`

**الحل**:
```env
# في backend/.env
DB_HOST=mysql  # اسم service في docker-compose
DB_PORT=3306
```

### 2️⃣ مشكلة CORS
**Error**: `CORS policy: No 'Access-Control-Allow-Origin'`

**الحل**: تأكد من `config/cors.php`:
```php
'allowed_origins' => ['http://localhost:5173'],
'supports_credentials' => true,
```

**وفي `.env`**:
```env
SANCTUM_STATEFUL_DOMAINS=localhost:5173,127.0.0.1:5173
SESSION_DOMAIN=localhost
```

### 3️⃣ مشكلة 401 Unauthorized
**Error**: `401` بعد login

**الحل**: احصل على CSRF token أولاً:
```javascript
await axios.get('/sanctum/csrf-cookie');
await axios.post('/login', { email, password });
```

### 4️⃣ مشكلة Vite HMR
**الحل**: في `vite.config.js`:
```javascript
server: {
  host: true,  // مهم للـ Docker
  port: 5173
}
```

---

## 📚 الوثائق | Documentation

- [دليل المستخدم | User Guide](docs/USER_GUIDE.md)
- [دليل المطور | Developer Guide](docs/DEVELOPER_GUIDE.md)
- [API Reference](docs/API_REFERENCE.md)
- [مخطط قاعدة البيانات | ERD](docs/ERD.md)

---

## 🤝 المساهمة | Contributing

نرحب بجميع المساهمات! يرجى:

1. Fork المشروع
2. إنشاء branch جديد (`git checkout -b feature/amazing`)
3. Commit التغييرات (`git commit -m 'إضافة ميزة رائعة'`)
4. Push للـ branch (`git push origin feature/amazing`)
5. فتح Pull Request

---

## 📄 الترخيص | License

MIT License - يمكنك استخدام هذا المشروع بحرية.

---

## 📞 الدعم | Support

إذا واجهت أي مشكلة:

- 📧 Email: support@smarthr360.com
- 🐛 [فتح Issue](https://github.com/cho3our/smarthr360/issues)
- 📖 [الوثائق الكاملة](https://smarthr360.com/docs)

---

**صنع بـ ❤️ في المملكة العربية السعودية**
