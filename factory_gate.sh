#!/bin/bash

# 获取当前文件夹名称
CURRENT_DIR=$(basename "$PWD")
TEMPLATE_NAME="AI-Wrapper-Template"

echo "🔍 Factory Gate: Checking project identity..."

if [ "$CURRENT_DIR" == "$TEMPLATE_NAME" ]; then
    echo "✅ Identity Verified: You are working on the MASTER TEMPLATE."
    echo "🚀 Standard Git operations allowed for the template repository."
else
    echo "⚠️ Identity Detected: You are working on a PRODUCT INSTANCE [$CURRENT_DIR]."
    
    # 检测是否还带着模板的 Git 脐带
    if [ -d ".git" ]; then
        REMOTE_URL=$(git remote get-url origin 2>/dev/null)
        if [[ "$REMOTE_URL" == *"$TEMPLATE_NAME"* ]]; then
            echo "🚨 DANGER: This project is still linked to the MASTER TEMPLATE!"
            echo "⚡ Executing 'Identity Separation' (Ditching the umbilical cord)..."
            
            # 物理隔离：删除旧 Git 记录并重新初始化
            rm -rf .git
            git init
            
            # 强制使用英文名作为新仓库名（防止中文报错）
            SAFE_NAME=$(echo "$CURRENT_DIR" | sed 's/[^a-zA-Z0-9-]/-/g')
            echo "📦 Initializing new repository: seren221/$SAFE_NAME"
            
            # 引导用户进行新仓库绑定
            echo "👉 Next Step: Run 'git remote add origin https://github.com/seren221/$SAFE_NAME.git'"
            exit 1
        fi
    fi
    echo "✅ Project is properly isolated."
fi
