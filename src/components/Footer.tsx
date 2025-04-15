import Link from "next/link";

export function Footer() {
  return (
    <footer className="py-6 md:py-8 max-w-7xl mx-auto items-center gap-4 p-4">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0">
          <p className="text-sm text-muted-foreground">
            © 2025 KultHelden.de - Alle Rechte vorbehalten
          </p>
        </div>
        <div className="flex gap-4 text-sm text-muted-foreground">
          <Link
            href="/impressum"
            className="hover:text-foreground transition-colors"
          >
            Impressum
          </Link>
          <Link
            href="/datenschutz"
            className="hover:text-foreground transition-colors"
          >
            Datenschutz
          </Link>
        </div>
      </div>
    </footer>
  );
}
