import { ReactNode } from "react";
import { Sidebar } from "@/components/Sidebar";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="flex min-h-screen">
          <Sidebar />
          <div className="p-3">{children}</div>
        </div>
      </body>
    </html>
  );
}
