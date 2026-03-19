export const dynamic = "force-static";

export async function generateStaticParams() {
  console.log("TEST generateStaticParams called");
  return [{ locale: "zh", keyword: "test" }];
}

export default function TestPage() {
  return <h1>Test Page Works!</h1>;
}