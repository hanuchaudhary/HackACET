import { ReactNode } from "react";
import { Sidebar } from "@/components/Sidebar";
import { ThemeProvider } from "@/components/theme-provider";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="flex min-h-screen ">
          <Sidebar />
          <div className="p-3 w-full">{children}</div>
        </div>
      </body>
    </html>
  );
}
