import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ScrollToTop } from './components/ScrollToTop';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';
import { LocalBusinessSchema } from './components/LocalBusinessSchema';
import { HomePage } from './pages/HomePage';
import { MembershipPage } from './pages/MembershipPage';
import { TrainersPage } from './pages/TrainersPage';
import { TrainerDetailPage } from './pages/TrainerDetailPage';
import { BoxingPage } from './pages/BoxingPage';
import { TestimonialsPage } from './pages/TestimonialsPage';
import { ContactPage } from './pages/ContactPage';

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <LocalBusinessSchema />
      <div className="min-h-screen bg-[#121214] text-[#fdfdff]">
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/membership" element={<MembershipPage />} />
          <Route path="/trainers" element={<TrainersPage />} />
          <Route path="/trainers/:slug" element={<TrainerDetailPage />} />
          <Route path="/programs/boxing" element={<BoxingPage />} />
          <Route path="/testimonials" element={<TestimonialsPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
