import React, { useState } from 'react';
import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { Mission } from '../components/Mission';
import { Pillars } from '../components/Pillars';
import { FounderSection } from '../components/FounderSection';
import { ProductsOverview } from '../components/ProductsOverview';
import { InnerverseSection } from '../components/InnerverseSection';
import { AIAajiSection } from '../components/AIAajiSection';
import { WhyEpicforce } from '../components/WhyEpicforce';
import { PartnershipCTA } from '../components/PartnershipCTA';
import { Roadmap } from '../components/Roadmap';
import { ContactForm } from '../components/ContactForm';
import { Footer } from '../components/Footer';
import { ContactReason } from '../types';

export const HomePage: React.FC = () => {
  const [selectedReason, setSelectedReason] = useState<ContactReason>('General Inquiry');

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectPartnerAction = (reason: ContactReason) => {
    setSelectedReason(reason);
    scrollTo('contact');
  };

  return (
    <div className="relative min-h-screen bg-[#060814] text-white">
      {/* 01. Sticky Header Navigation */}
      <Navbar onOpenPartner={() => handleSelectPartnerAction('Investment / Partnership')} />

      {/* 02. Cinematic Hero with Interactive Idea Nexus */}
      <Hero
        onExploreWork={() => scrollTo('products')}
        onInvestPartner={() => handleSelectPartnerAction('Investment / Partnership')}
      />

      {/* 03. Editorial Mission Statement */}
      <Mission />

      {/* 04. Four Key Pillars */}
      <Pillars />

      {/* 05. The People Behind EpicForce (Leadership) */}
      <FounderSection />

      {/* 06. Products Ecosystem Overview */}
      <ProductsOverview
        onScrollToInnerverse={() => scrollTo('innerverse')}
        onScrollToAIAaji={() => scrollTo('ai-aaji')}
      />

      {/* 07. Flagship Product Showcase: Innerverse */}
      <InnerverseSection />

      {/* 08. Intelligence System Showcase: AI Aaji */}
      <AIAajiSection onJoinWaitlist={() => handleSelectPartnerAction('Technology')} />

      {/* 09. Strategic Foundations: Why EpicForce? */}
      <WhyEpicforce />

      {/* 10. Alignment & Capital: Build With Us */}
      <PartnershipCTA onSelectAction={handleSelectPartnerAction} />

      {/* 11. Strategic Timeline: The Road Ahead */}
      <Roadmap />

      {/* 12. Direct Verified Transmission: Contact Form */}
      <ContactForm initialReason={selectedReason} />

      {/* 13. Comprehensive Dark Footer */}
      <Footer />
    </div>
  );
};
