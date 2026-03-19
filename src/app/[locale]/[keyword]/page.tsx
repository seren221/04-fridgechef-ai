import { notFound } from "next/navigation";
import { Metadata } from "next";

const SEO_KEYWORDS = [
  { keyword: "鸡蛋怎么做", slug: "eggs-recipe" },
  { keyword: "土豆怎么做", slug: "potato-recipe" },
];

export const dynamic = "force-static";

export async function generateStaticParams() {
  const params = [];
  for (const item of SEO_KEYWORDS) {
    params.push({ locale: "zh", keyword: item.slug });
    params.push({ locale: "en", keyword: item.slug });
  }
  return params;
}

export async function generateMetadata({ params }: { params: Promise<{ keyword: string; locale: string }> }): Promise<Metadata> {
  const { keyword } = await params;
  const seoData = SEO_KEYWORDS.find(item => item.slug === keyword);
  if (!seoData) return { title: "未找到" };
  return { title: `${seoData.keyword} - 冰箱 AI 厨神`, description: `AI 智能识别冰箱食材` };
}

export default async function SeoPage({ params }: { params: Promise<{ keyword: string; locale: string }> }) {
  const { keyword } = await params;
  const seoData = SEO_KEYWORDS.find(item => item.slug === keyword);
  if (!seoData) notFound();
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-amber-50 p-8">
      <h1 className="text-4xl font-bold mb-4">{seoData.keyword}</h1>
      <p>SEO 页面测试成功！</p>
    </div>
  );
}