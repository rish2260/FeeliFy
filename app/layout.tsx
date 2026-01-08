import "./globals.css";
import { CustomCursor } from "@/components/CustomCursor";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { ScrollPersistence } from "@/components/hooks/useScrollPersistence";

export const metadata = {
  title: "Feelify Solutions - Digital Growth Partners",
  description: "We don't just market - we build brands that people feel.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[var(--bg)] text-[var(--fg)] selection:bg-[var(--acc)] selection:text-white cursor-none font-sans overflow-x-hidden transition-colors duration-700 ease-in-out">
        <ThemePersistenceWrapper>
          <CustomCursor />
          <Navigation />
          <div
            className="fixed inset-0 pointer-events-none z-[50] opacity-[0.07] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"
            style={{ mixBlendMode: "overlay" }}
          />

          <main className="min-h-screen">{children}</main>

          <Footer />
        </ThemePersistenceWrapper>
      </body>
    </html>
  );
}

const ThemePersistenceWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <ThemeProvider>
      <ScrollPersistence />
      {children}
    </ThemeProvider>
  );
};
