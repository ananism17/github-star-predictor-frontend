import 'bootstrap/dist/css/bootstrap.min.css';
import "./globals.css";


export const metadata = {
  title: "Github Star Predictor",
  description: "An app to predict the star count of github repositories",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
