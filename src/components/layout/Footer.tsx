import { Link } from '@/navigation';

export function Footer() {
  return (
    <footer className="border-t py-6 md:py-0">
      <div className="max-w-standard mx-auto flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row px-4 md:px-6">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            Built by{" "}
            <a
              href="https://twitter.com/seren221"
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              Seren
            </a>
            . The source code is available on{" "}
            <a
              href="https://github.com/seren221/AI-Wrapper-Template"
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              GitHub
            </a>
            .
          </p>
        </div>
        {/* SEO Gallery Section */}
        <div className="flex gap-4">
           <Link href="/tools/dream-interpreter" className="text-xs text-muted-foreground hover:underline">
              Dream Interpreter
           </Link>
           <Link href="/tools/market-scanner" className="text-xs text-muted-foreground hover:underline">
              Market Scanner
           </Link>
        </div>
      </div>
    </footer>
  );
}
