import Header from './components/Header';
import Hero from './components/Hero';
import AvailabilityStatus from './components/AvailabilityStatus';
import ZoneInfo from './components/ZoneInfo';
import ReservationForm from './components/ReservationForm';
import UsageGuide from './components/UsageGuide';
import ReservationLookup from './components/ReservationLookup';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen flex flex-col selection:bg-knu-green selection:text-white">
      <Header />
      
      <main className="flex-grow overflow-x-hidden">
        <Hero />
        <AvailabilityStatus />
        <ZoneInfo />
        <ReservationForm />
        <UsageGuide />
        <ReservationLookup />
      </main>

      <Footer />
    </div>
  );
}

export default App;
