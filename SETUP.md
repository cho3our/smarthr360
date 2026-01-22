# دليل الإعداد الكامل | Complete Setup Guide

## 📋 الملفات المطلوبة | Required Files

هذا الملف يحتوي على جميع الملفات الإضافية المطلوبة لتشغيل المشروع.

---

## 1️⃣ backend/Dockerfile

أنشئ ملف `backend/Dockerfile`:

```dockerfile
FROM php:8.1-fpm

# Install system dependencies
RUN apt-get update && apt-get install -y \\
    git \\
    curl \\
    libpng-dev \\
    libonig-dev \\
    libxml2-dev \\
    zip \\
    unzip \\
    libfreetype6-dev \\
    libjpeg62-turbo-dev

# Clear cache
RUN apt-get clean && rm -rf /var/lib/apt/lists/*

# Install PHP extensions
RUN docker-php-ext-configure gd --with-freetype --with-jpeg
RUN docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd

# Get latest Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Set working directory
WORKDIR /var/www

# Copy existing application directory contents
COPY . /var/www

# Copy existing application directory permissions
RUN chown -R www-data:www-data /var/www
RUN chmod -R 755 /var/www/storage

# Expose port 9000 and start php-fpm server
EXPOSE 9000
CMD ["php-fpm"]
```

---

## 2️⃣ nginx/default.conf

أنشئ مجلد `nginx` ثم ملف `nginx/default.conf`:

```nginx
server {
    listen 80;
    index index.php index.html;
    error_log  /var/log/nginx/error.log;
    access_log /var/log/nginx/access.log;
    root /var/www/public;

    location ~ \\.php$ {
        try_files $uri =404;
        fastcgi_split_path_info ^(.+\\.php)(/.+)$;
        fastcgi_pass laravel:9000;
        fastcgi_index index.php;
        include fastcgi_params;
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
        fastcgi_param PATH_INFO $fastcgi_path_info;
    }

    location / {
        try_files $uri $uri/ /index.php?$query_string;
        gzip_static on;
    }
}
```

---

## 3️⃣ frontend/Dockerfile

أنشئ ملف `frontend/Dockerfile`:

```dockerfile
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy project files
COPY . .

# Expose port
EXPOSE 5173

# Start dev server
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
```

---

## 4️⃣ frontend/vite.config.js

أنشئ ملف `frontend/vite.config.js`:

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
    strictPort: true,
    watch: {
      usePolling: true
    },
    hmr: {
      host: 'localhost',
      protocol: 'ws',
      port: 5173
    },
    proxy: {
      '/api': {
        target: 'http://nginx:8000',
        changeOrigin: true,
        secure: false
      },
      '/sanctum': {
        target: 'http://nginx:8000',
        changeOrigin: true,
        secure: false
      }
    }
  }
})
```

---

## 5️⃣ backend/config/cors.php

تأكد من تحديث ملف `backend/config/cors.php`:

```php
return [
    'paths' => ['api/*', 'sanctum/csrf-cookie', 'login', 'logout', 'register'],
    'allowed_methods' => ['*'],
    'allowed_origins' => ['http://localhost:5173', 'http://127.0.0.1:5173'],
    'allowed_origins_patterns' => [],
    'allowed_headers' => ['*'],
    'exposed_headers' => [],
    'max_age' => 0,
    'supports_credentials' => true,
];
```

---

## 🚀 خطوات التشغيل | Running Steps

### 1. استنساخ المشروع
```bash
git clone https://github.com/cho3our/smarthr360.git
cd smarthr360
```

### 2. إنشاء الملفات المطلوبة
أنشئ جميع الملفات المذكورة أعلاه في مواقعها الصحيحة.

### 3. إعداد Backend
```bash
# نسخ ملف البيئة
cp backend/.env.example backend/.env

# تعديل DB_HOST في .env
# تأكد أن DB_HOST=mysql وليس localhost
```

### 4. تشغيل Docker
```bash
docker-compose up -d --build
```

### 5. إعداد Laravel
```bash
# دخول لحاوية Laravel
docker exec -it smarthr360-laravel bash

# داخل الحاوية
composer install
php artisan key:generate
php artisan migrate --seed
php artisan storage:link
chown -R www-data:www-data storage bootstrap/cache
exit
```

### 6. إعداد Frontend
```bash
# دخول لحاوية Frontend
docker exec -it smarthr360-vite sh

# داخل الحاوية
npm install
exit
```

---

## 🌐 الوصول للتطبيق | Access

- **Backend API**: http://localhost:8000
- **Frontend**: http://localhost:5173
- **Database**: localhost:3307

---

## 🔧 حل المشاكل | Troubleshooting

### المشكلة 1: Connection refused
**الحل**: تأكد أن `DB_HOST=mysql` في ملف `.env`

### المشكلة 2: CORS Error
**الحل**: تحقق من:
- `config/cors.php` يحتوي على `localhost:5173`
- `.env` يحتوي على `SANCTUM_STATEFUL_DOMAINS=localhost:5173`

### المشكلة 3: 401 Unauthorized
**الحل**: في React، احصل على CSRF token أولاً:
```javascript
await axios.get('/sanctum/csrf-cookie');
await axios.post('/login', { email, password });
```

### المشكلة 4: Vite HMR لا يعمل
**الحل**: تأكد من `host: true` في `vite.config.js`

---

## 📦 إيقاف الخدمات | Stop Services

```bash
docker-compose down

# لحذف البيانات أيضاً
docker-compose down -v
```

---

## 🎯 الخطوات التالية | Next Steps

1. إنشاء Models و Controllers في Laravel
2. إنشاء Components و Pages في React
3. إعداد Authentication باستخدام Sanctum
4. بناء واجهة المستخدم
5. إضافة الوحدات (Employees, Attendance, إلخ)

---

**تم بنجاح! 🎉**
