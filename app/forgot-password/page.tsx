import Header from '@/components/header/header';
import ForgotPasswordPage from '@/components/auth/forgot-password-page';
import Footer from '@/components/footer/footer';

export default function ForgotPassword() {
  return (
    <main className="min-h-screen bg-cream-light">
      <Header />
      <ForgotPasswordPage />
      <Footer />
    </main>
  );
}