#!/bin/bash

# سكريبت تثبيت تلقائي لنظام بناء التقارير الديناميكي
# Dynamic Report Builder - Auto Install Script

echo "🚀 بدء تثبيت نظام بناء التقارير الديناميكي..."
echo ""

# التحقق من Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js غير مثبت!"
    echo "📥 يرجى تثبيت Node.js 18.x أو أحدث من https://nodejs.org/"
    exit 1
fi

NODE_VERSION=$(node -v)
echo "✅ Node.js مثبت: $NODE_VERSION"

# التحقق من npm
if ! command -v npm &> /dev/null; then
    echo "❌ npm غير مثبت!"
    exit 1
fi

NPM_VERSION=$(npm -v)
echo "✅ npm مثبت: $NPM_VERSION"
echo ""

# تنظيف الكاش
echo "🧹 تنظيف كاش npm..."
npm cache clean --force

# حذف node_modules القديم إن وجد
if [ -d "node_modules" ]; then
    echo "🗑️  حذف node_modules القديم..."
    rm -rf node_modules
fi

# حذف package-lock.json القديم إن وجد
if [ -f "package-lock.json" ]; then
    echo "🗑️  حذف package-lock.json القديم..."
    rm -f package-lock.json
fi

echo ""
echo "📦 تثبيت المكتبات... (قد يستغرق بضع دقائق)"
echo ""

# تثبيت المكتبات
npm install

# التحقق من نجاح التثبيت
if [ $? -eq 0 ]; then
    echo ""
    echo "✅ تم التثبيت بنجاح!"
    echo ""
    echo "🎉 جاهز للاستخدام!"
    echo ""
    echo "لتشغيل المشروع، استخدم:"
    echo "   npm run dev"
    echo ""
    echo "ثم افتح المتصفح على:"
    echo "   http://localhost:3000"
    echo ""
else
    echo ""
    echo "❌ فشل التثبيت!"
    echo ""
    echo "💡 جرب الحلول التالية:"
    echo "   1. npm cache clean --force"
    echo "   2. sudo npm install (على macOS/Linux)"
    echo "   3. تحقق من اتصال الإنترنت"
    echo ""
    exit 1
fi

