import "@/app/globals.css";
import Header from "@/components/dashboardHeader";
import { SessionProviderHook } from "@/hooks/sessionProvider";

export const metadata = {
  title: "Pastichitos",
  description: "Pastichitos food",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <SessionProviderHook>
          <Header />
          {children}
        </SessionProviderHook>
      </body>
    </html>
  );
}
