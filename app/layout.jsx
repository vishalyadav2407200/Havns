import "@styles/globals.css";
import Navbar from "@components/Nav";
import { Inter } from "next/font/google";
import { SearchProvider } from "@context/searchContext";
import Provider from "@context/Provider";
import { LocationProvider } from "@context/locateContext";

const inter = Inter({ subsets: ["latin"] });
export const metadata = {
  title: "HavnS - Book Now",
  description: "Marriage Halls just like Heavans",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SearchProvider>
          <LocationProvider>
            <Provider>
              <main>
                <Navbar />
                {children}
              </main>
            </Provider>
          </LocationProvider>
        </SearchProvider>
      </body>
    </html>
  );
}
