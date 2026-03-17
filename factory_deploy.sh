#!/bin/bash
set -e
git add .
git commit -m "AutoDeploy: $(date '+%Y-%m-%d %H:%M:%S')"
echo "🔍 Running local build check..."
npm run build
echo "✅ Build passed. Pushing to origin..."
git push origin main
echo "🔗 Preview URL: https://serenmuse.vercel.app/tools/amazon-poa-generator"
echo "🚀 Deployment triggered! Check Vercel dashboard."
