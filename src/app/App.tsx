import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ScrollToTop } from './components/ScrollToTop';
import { RouteAnalytics } from './components/RouteAnalytics';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';
import { LocalBusinessSchema } from './components/LocalBusinessSchema';
import { HomePage } from './pages/HomePage';
import { MembershipPage } from './pages/MembershipPage';
import { TrainersPage } from './pages/TrainersPage';
import { TrainerDetailPage } from './pages/TrainerDetailPage';
import { TestimonialsPage } from './pages/TestimonialsPage';
import { ContactPage } from './pages/ContactPage';
import { ConsultationPage } from './pages/ConsultationPage';
import { PowerliftingBlogPage } from './pages/PowerliftingBlogPage';
import { BodybuildingBlogPage } from './pages/BodybuildingBlogPage';
import { WeightLossBlogPage } from './pages/WeightLossBlogPage';
import { ResourcesPage } from './pages/ResourcesPage';

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <RouteAnalytics />
      <LocalBusinessSchema />
      <div className="min-h-screen bg-[#121214] text-[#fdfdff]">
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/membership" element={<MembershipPage />} />
          <Route path="/trainers" element={<TrainersPage />} />
          <Route path="/trainers/:slug" element={<TrainerDetailPage />} />
          <Route path="/testimonials" element={<TestimonialsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/consultation" element={<ConsultationPage />} />
          <Route path="/resources" element={<ResourcesPage />} />
          <Route path="/blog/powerlifting.html" element={<PowerliftingBlogPage />} />
          <Route path="/blog/bodybuilding.html" element={<BodybuildingBlogPage />} />
          <Route path="/blog/weight-loss.html" element={<WeightLossBlogPage />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
