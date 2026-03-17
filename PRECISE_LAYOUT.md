# AI 工具网站精确布局分析

## 📏 核心布局数据（基于真实网站分析）

### **Anyvoice.net 布局分析**

#### **整体结构**
```
总 Section 数量：7 个
Grid 布局数量：10 个
Container 最大宽度：1280px
```

#### **Section 间距模式**
```
Section 1 (Hero/Tool): padding-top: 64px, padding-bottom: 48px
Section 2 (Features):  padding-top: 48px, padding-bottom: 48px
Section 3 (Pricing):   padding-top: 96px, padding-bottom: 96px
Section 4 (FAQ):       padding-top: 64px, padding-bottom: 64px
Section 5 (Features):  padding-top: 80px, padding-bottom: 80px
```

#### **工具界面详细分析**

**Textarea 输入框:**
```css
/* Tailwind 类名 */
classes: [
  "w-full",                    // 100% 宽度
  "p-5",                       // padding: 20px
  "pb-20",                     // padding-bottom: 80px
  "rounded-2xl",               // border-radius: 16px
  "resize-none",               // 不可调整大小
  "focus:outline-none",        // 聚焦时无外框
  "bg-foreground/8",           // 背景透明度 8%
  "backdrop-blur-md",          // 毛玻璃效果
  "border",                    // 边框
  "border-gray-200",           // 灰色边框
  "text-sm sm:text-base",      // 响应式字体
  "h-[160px] lg:h-[322px]"     // 高度：移动端 160px，桌面 322px
]

/* 计算后的样式 */
width: 585.391px
height: 322px
padding: 20px 20px 80px
border-radius: 16px
border: 1px solid oklch(0.928 0.006 264.531)
```

**搜索框:**
```css
classes: [
  "w-full",
  "px-4 py-2.5",              // padding: 16px 10px
  "bg-foreground/8",
  "backdrop-blur-md",
  "border border-gray-200/50",
  "rounded-xl",                // border-radius: 12px
  "text-sm",
  "focus:outline-none",
  "focus:bg-foreground/12",
  "transition-all duration-200",
  "pr-10"                      // padding-right: 40px (为图标留空间)
]

/* 计算后的样式 */
width: 293.594px
height: 42px
padding: 10px 40px 10px 16px
border-radius: 12px
```

#### **按钮样式分析**

**主按钮 (Text to Speech):**
```css
classes: [
  "px-4 sm:px-8",              // 响应式 padding
  "py-2 sm:py-3",
  "text-xs sm:text-sm",
  "relative",
  "rounded-full",              // 完全圆角
  "flex items-center justify-center",
  "gap-1.5 sm:gap-2.5",
  "font-medium",
  "transition-all duration-300",
  "cursor-pointer",
  "bg-black dark:bg-white",    // 黑白切换
  "text-white dark:text-black",
  "shadow-xl",
  "scale-105",                 // 轻微放大
  "z-20"                       // 层级
]

/* 计算后的样式 */
background-color: rgb(0, 0, 0)
color: rgb(255, 255, 255)
padding: 12px 32px
border-radius: 33554400px (完全圆角)
font-weight: 500
```

**升级按钮 (Upgrade Pro):**
```css
classes: [
  "shrink-0",
  "bg-gradient-to-r from-pink-500 to-blue-500",  // 渐变背景
  "text-white",
  "text-xs",
  "px-2.5 py-1.5",
  "rounded-lg",
  "font-bold",
  "whitespace-nowrap",
  "shadow-sm",
  "active:scale-95"             // 点击时缩小
]

/* 计算后的样式 */
padding: 6px 10px
border-radius: 8px
font-weight: 700
```

---

### **Fast3d.io 布局分析**

#### **整体结构**
```
总 Section 数量：12 个
Grid 布局数量：10 个
Container 最大宽度：1280px
导航栏高度：36px
```

#### **Section 间距模式**
```
Section 1 (Nav/Tool):  padding: 16px
Section 2-4:           padding: 0px (紧凑布局)
Section 5 (Features):  padding: 80px
```

---

## 🎨 精确布局模板（可直接复制）

### **模板 1: Anyvoice.net 风格 - 工具优先型**

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AI Tool Template</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        /* 自定义渐变动画 */
        @keyframes gradient {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
        }
        
        .animate-gradient {
            background-size: 200% 200%;
            animation: gradient 3s ease infinite;
        }
    </style>
</head>
<body class="bg-white dark:bg-black min-h-screen">

    <!-- Navigation -->
    <nav class="fixed top-0 w-full bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 z-50">
        <div class="container mx-auto px-4 h-16 flex items-center justify-between">
            <!-- Logo -->
            <div class="flex items-center space-x-2">
                <div class="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg"></div>
                <span class="text-xl font-bold">YourApp</span>
            </div>
            
            <!-- Menu -->
            <div class="hidden md:flex items-center space-x-8">
                <a href="#" class="text-gray-600 dark:text-gray-400 hover:text-gray-900">Explore</a>
                <a href="#" class="text-gray-600 dark:text-gray-400 hover:text-gray-900">Pricing</a>
                <a href="#" class="text-gray-600 dark:text-gray-400 hover:text-gray-900">FAQ</a>
            </div>
            
            <!-- CTA -->
            <div class="flex items-center space-x-4">
                <button class="text-gray-600 dark:text-gray-400">EN/中文</button>
                <button class="px-4 py-2 bg-black dark:bg-white text-white dark:text-black rounded-lg font-medium">
                    Login
                </button>
            </div>
        </div>
    </nav>

    <!-- Main Content -->
    <main class="min-h-screen pt-16">
        
        <!-- Section 1: Tool Interface (padding: 64px 48px) -->
        <section class="py-16 sm:py-20">
            <div class="container mx-auto px-4 max-w-5xl">
                
                <!-- Title -->
                <div class="text-center mb-12">
                    <h1 class="text-4xl sm:text-5xl font-bold mb-4">
                        AI Voice Cloning
                    </h1>
                    <p class="text-lg text-gray-600 dark:text-gray-400">
                        The Fastest, Most Accurate AI Voice Cloning Technology
                    </p>
                </div>
                
                <!-- Tab Switcher -->
                <div class="flex justify-center mb-8">
                    <div class="inline-flex bg-gray-100 dark:bg-gray-900 rounded-full p-1">
                        <button class="px-6 sm:px-8 py-2 sm:py-3 bg-black dark:bg-white text-white dark:text-black rounded-full font-medium transition-all duration-300">
                            Text to Speech
                        </button>
                        <button class="px-6 sm:px-8 py-2 sm:py-3 text-gray-600 dark:text-gray-400 hover:text-gray-900 rounded-full font-medium transition-all duration-300">
                            Voice Cloning
                        </button>
                        <button class="px-6 sm:px-8 py-2 sm:py-3 text-gray-600 dark:text-gray-400 hover:text-gray-900 rounded-full font-medium transition-all duration-300">
                            Voice Design
                        </button>
                    </div>
                </div>
                
                <!-- Tool Interface Card -->
                <div class="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-6 border border-gray-200 dark:border-gray-800">
                    
                    <!-- Textarea -->
                    <textarea 
                        class="w-full p-5 pb-20 rounded-2xl resize-none focus:outline-none bg-gray-50 dark:bg-gray-800/50 backdrop-blur-md border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 text-sm sm:text-base focus:bg-gray-100 dark:focus:bg-gray-800 focus:border-gray-300 dark:focus:border-gray-700 transition-all duration-300 h-[160px] lg:h-[322px]"
                        placeholder="Enter what you want to say in your voice..."
                    ></textarea>
                    <div class="flex justify-between items-center mt-2 text-sm text-gray-500">
                        <span>0/120</span>
                        <button class="text-purple-600 hover:text-purple-700">🎲 Random</button>
                    </div>
                    
                    <!-- Voice Selection -->
                    <div class="mt-6">
                        <label class="block text-sm font-medium mb-2">Select a voice</label>
                        <div class="relative">
                            <input 
                                type="text"
                                class="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800/50 backdrop-blur-md border border-gray-200 dark:border-gray-800/30 rounded-xl text-sm focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-800 focus:border-gray-300 transition-all duration-200 pr-10"
                                placeholder="Search voices"
                            >
                            <span class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
                        </div>
                    </div>
                    
                    <!-- Action Buttons -->
                    <div class="flex flex-wrap items-center justify-between gap-4 mt-6 pt-6 border-t border-gray-200 dark:border-gray-800">
                        <button class="px-4 sm:px-8 py-2 sm:py-3 bg-gradient-to-r from-pink-500 to-blue-500 text-white text-xs sm:text-sm rounded-lg font-bold shadow-sm hover:shadow-md transition-all">
                            ✨ Generate
                        </button>
                        
                        <button class="px-4 py-2 bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 text-white text-xs rounded-full font-bold shadow-lg hover:scale-110 transition-transform animate-gradient">
                            ✨ Upgrade Pro
                        </button>
                    </div>
                    
                </div>
                
            </div>
        </section>

        <!-- Section 2: Features (padding: 48px 48px) -->
        <section class="py-12 sm:py-16 bg-gray-50 dark:bg-gray-900/50">
            <div class="container mx-auto px-4 max-w-5xl">
                <div class="text-center mb-12">
                    <h2 class="text-3xl font-bold mb-4">Key Features</h2>
                    <p class="text-gray-600 dark:text-gray-400">Discover what makes us different</p>
                </div>
                
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <!-- Feature Card 1 -->
                    <div class="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                        <div class="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mb-4">
                            <span class="text-2xl">⚡</span>
                        </div>
                        <h3 class="text-xl font-semibold mb-2">3-Second Cloning</h3>
                        <p class="text-gray-600 dark:text-gray-400">
                            Clone any voice in just 3 seconds with our advanced AI
                        </p>
                    </div>
                    
                    <!-- Feature Card 2 -->
                    <div class="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                        <div class="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mb-4">
                            <span class="text-2xl">🎙️</span>
                        </div>
                        <h3 class="text-xl font-semibold mb-2">Ultra-Realistic</h3>
                        <p class="text-gray-600 dark:text-gray-400">
                            Incredibly lifelike voiceovers with natural intonation
                        </p>
                    </div>
                    
                    <!-- Feature Card 3 -->
                    <div class="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                        <div class="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mb-4">
                            <span class="text-2xl">🆓</span>
                        </div>
                        <h3 class="text-xl font-semibold mb-2">Free to Start</h3>
                        <p class="text-gray-600 dark:text-gray-400">
                            Try it for free, no credit card required
                        </p>
                    </div>
                    
                    <!-- Feature Card 4 -->
                    <div class="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                        <div class="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center mb-4">
                            <span class="text-2xl">🔒</span>
                        </div>
                        <h3 class="text-xl font-semibold mb-2">Secure & Private</h3>
                        <p class="text-gray-600 dark:text-gray-400">
                            Your data is encrypted and never shared
                        </p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Section 3: Pricing (padding: 96px 96px) -->
        <section class="py-24 bg-white dark:bg-black">
            <div class="container mx-auto px-4 max-w-5xl">
                <div class="text-center mb-12">
                    <h2 class="text-3xl font-bold mb-4">Simple Pricing</h2>
                    <p class="text-gray-600 dark:text-gray-400">Choose the plan that works for you</p>
                    
                    <!-- Toggle -->
                    <div class="inline-flex items-center bg-gray-100 dark:bg-gray-900 rounded-lg p-1 mt-6">
                        <button class="px-6 py-2 bg-white dark:bg-gray-800 rounded-lg shadow-sm font-medium">
                            Monthly
                        </button>
                        <button class="px-6 py-2 text-gray-600 dark:text-gray-400">
                            Yearly
                            <span class="ml-2 text-xs bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 px-2 py-1 rounded-full">
                                33% OFF
                            </span>
                        </button>
                    </div>
                </div>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <!-- Free Plan -->
                    <div class="bg-white dark:bg-gray-900 rounded-2xl p-8 border-2 border-gray-200 dark:border-gray-800">
                        <h3 class="text-2xl font-bold mb-2">Free</h3>
                        <p class="text-gray-600 dark:text-gray-400 mb-6">Perfect for trying out</p>
                        <div class="mb-6">
                            <span class="text-4xl font-bold">$0</span>
                            <span class="text-gray-600 dark:text-gray-400">/month</span>
                        </div>
                        <ul class="space-y-3 mb-8 text-gray-700 dark:text-gray-300">
                            <li class="flex items-center">
                                <span class="text-green-500 mr-3">✓</span>
                                Up to 120 characters
                            </li>
                            <li class="flex items-center">
                                <span class="text-green-500 mr-3">✓</span>
                                900 seconds per month
                            </li>
                            <li class="flex items-center">
                                <span class="text-green-500 mr-3">✓</span>
                                Basic voice models
                            </li>
                        </ul>
                        <button class="w-full py-3 border-2 border-purple-600 text-purple-600 rounded-lg font-medium hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors">
                            Get Started Free
                        </button>
                    </div>
                    
                    <!-- Pro Plan -->
                    <div class="bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl p-8 text-white relative overflow-hidden">
                        <div class="absolute top-4 right-4 bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-sm font-bold">
                            Popular
                        </div>
                        <h3 class="text-2xl font-bold mb-2">Pro</h3>
                        <p class="text-purple-100 mb-6">For serious creators</p>
                        <div class="mb-6">
                            <span class="text-4xl font-bold">$29</span>
                            <span class="text-purple-100">/month</span>
                        </div>
                        <ul class="space-y-3 mb-8">
                            <li class="flex items-center">
                                <span class="mr-3">✓</span>
                                Unlimited characters
                            </li>
                            <li class="flex items-center">
                                <span class="mr-3">✓</span>
                                All voice models
                            </li>
                            <li class="flex items-center">
                                <span class="mr-3">✓</span>
                                Commercial use
                            </li>
                            <li class="flex items-center">
                                <span class="mr-3">✓</span>
                                Priority support
                            </li>
                        </ul>
                        <button class="w-full py-3 bg-white text-purple-600 rounded-lg font-medium hover:bg-gray-100 transition-colors">
                            Start Pro Trial
                        </button>
                    </div>
                </div>
            </div>
        </section>

    </main>

    <!-- Footer -->
    <footer class="py-12 bg-gray-900 text-white">
        <div class="container mx-auto px-4">
            <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div>
                    <div class="flex items-center space-x-2 mb-4">
                        <div class="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg"></div>
                        <span class="text-xl font-bold">YourApp</span>
                    </div>
                    <p class="text-gray-400">AI Voice Cloning for everyone</p>
                </div>
                <div>
                    <h4 class="font-semibold mb-4">Product</h4>
                    <ul class="space-y-2 text-gray-400">
                        <li><a href="#" class="hover:text-white">Features</a></li>
                        <li><a href="#" class="hover:text-white">Pricing</a></li>
                    </ul>
                </div>
                <div>
                    <h4 class="font-semibold mb-4">Company</h4>
                    <ul class="space-y-2 text-gray-400">
                        <li><a href="#" class="hover:text-white">About</a></li>
                        <li><a href="#" class="hover:text-white">Blog</a></li>
                    </ul>
                </div>
                <div>
                    <h4 class="font-semibold mb-4">Legal</h4>
                    <ul class="space-y-2 text-gray-400">
                        <li><a href="#" class="hover:text-white">Privacy</a></li>
                        <li><a href="#" class="hover:text-white">Terms</a></li>
                    </ul>
                </div>
            </div>
        </div>
    </footer>

</body>
</html>
```

---

## 📐 关键布局参数总结

### **Container 宽度**
```css
/* 标准 Container */
max-width: 1280px;  /* 桌面端 */
margin: 0 auto;     /* 居中 */
padding: 0 16px;    /* 移动端 */
padding: 0 24px;    /* 桌面端 */
```

### **Section 间距**
```css
/* Hero/Tool Section */
padding-top: 64px;    /* 移动端 */
padding-bottom: 48px;

/* Features Section */
padding: 48px 0;

/* Pricing Section */
padding: 96px 0;      /* 大间距突出重要性 */

/* FAQ Section */
padding: 64px 0;
```

### **Grid 布局**
```css
/* 响应式网格 */
grid-template-columns: repeat(1, 1fr);    /* 移动端 1 列 */
gap: 16px;                                /* 间距 */

@media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr); /* 平板 2 列 */
    gap: 24px;
}

@media (min-width: 1024px) {
    grid-template-columns: repeat(4, 1fr); /* 桌面 4 列 */
    gap: 32px;
}
```

### **按钮尺寸**
```css
/* 主按钮 */
padding: 12px 32px;     /* py-3 px-8 */
border-radius: 9999px;  /* rounded-full */
font-weight: 500;

/* 小按钮 */
padding: 6px 10px;      /* py-1.5 px-2.5 */
border-radius: 8px;     /* rounded-lg */
font-weight: 700;
```

### **输入框尺寸**
```css
/* Textarea */
height: 160px;          /* 移动端 */
height: 322px;          /* 桌面端 */
padding: 20px;
border-radius: 16px;    /* rounded-2xl */

/* Input */
height: 42px;
padding: 10px 16px;
border-radius: 12px;    /* rounded-xl */
```

---

## 🎯 设计要点

1. **层次分明**: 使用不同的 padding 区分 Section 重要性
2. **响应式**: 所有元素都有移动端和桌面端两套样式
3. **圆角统一**: 使用 rounded-xl (12px), rounded-2xl (16px), rounded-full
4. **阴影层次**: shadow-sm, shadow-md, shadow-lg, shadow-xl
5. **渐变强调**: 重要按钮使用渐变背景
6. **深色模式**: 所有颜色都有 dark: 变体

---

*精确布局分析完成，可以直接用于开发！*
