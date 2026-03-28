import Header from './components/Header';
import Hero from './components/Hero';
import ReservationForm from './components/ReservationForm';
import UsageGuide from './components/UsageGuide';
import ReservationLookup from './components/ReservationLookup';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen flex flex-col selection:bg-knu-green selection:text-white">
      <Header />
      
      <main className="flex-grow overflow-x-hidden">
        <Hero />
        <ReservationForm />
        <UsageGuide />
        <ContactForm />
        <ReservationLookup />
      </main>

      <Footer />
    </div>
  );
}

export default App;
