import { MainLayout } from '@/components/layout';
import {
  HeroSection,
  FeaturesSection,
  SubjectQuickAccess,
  ExamCountdown,
  Testimonials,
  FAQSection,
  CTASection,
} from '@/components/home';
import ScrollToTop from '@/components/shared/ScrollToTop';
import AnnouncementBanner from '@/components/shared/AnnouncementBanner';

export default function HomePage() {
  return (
    <>
      {/* Announcement Banner */}
      <AnnouncementBanner
        id="hs-exam-2025"
        message="🎉 HS 2025 Exam Preparation শুরু হয়ে গেছে!"
        type="promo"
        link={{
          text: 'এখনই শুরু করো',
          href: '/subjects',
        }}
      />

      <MainLayout>
        {/* Hero Section */}
        <HeroSection />

        {/* Features Section */}
        <FeaturesSection />

        {/* Subject Quick Access */}
        <SubjectQuickAccess />

        {/* Exam Countdown */}
        <ExamCountdown />

        {/* Testimonials */}
        <Testimonials />

        {/* FAQ Section */}
        <FAQSection />

        {/* CTA Section */}
        <CTASection />

        {/* Scroll to Top Button */}
        <ScrollToTop />
      </MainLayout>
    </>
  );
}
