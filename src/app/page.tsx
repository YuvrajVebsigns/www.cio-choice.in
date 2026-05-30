import HeroSection from '@/components/HeroSection';
import FoundersMessage from '@/components/FoundersMessage';
import ExpertiseSection from '@/components/ExpertiseSection';
import TeamSection from '@/components/TeamSection';
import KeyClient from '@/components/KeyClient';
import ProjectsSection from '@/components/ProjectsSection';
import Brands from '@/components/Brands';
import FAQSection from '@/components/FAQSection';
import ContactSection from '@/components/ContactSection';
import BlogsSection from '@/components/BlogsSection';
import DialoguesSection from '@/components/DialoguesSection';

export default function Home() {
  return (
    <main>
      {/* <div className="max-w-[1480px] mx-auto"> */}
      <HeroSection />
      <FoundersMessage />
      <ExpertiseSection />
      <TeamSection />
      <KeyClient />
      <ProjectsSection />
      <Brands />
      <FAQSection />
      <ContactSection />
      <BlogsSection />
      <DialoguesSection />
      {/* </div> */}
    </main>
  );
}
