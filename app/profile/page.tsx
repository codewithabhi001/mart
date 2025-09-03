import Header from '@/components/header/header';
import ProfilePage from '@/components/profile/profile-page';
import Footer from '@/components/footer/footer';

export default function Profile() {
  return (
    <main className="min-h-screen bg-cream-light">
      <Header />
      <ProfilePage />
      <Footer />
    </main>
  );
}