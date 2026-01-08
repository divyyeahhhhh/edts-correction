
import React, { useState } from 'react';
import { LandingPage } from './components/LandingPage';
import { CorrectionStatement } from './components/CorrectionStatement';
import { Footer } from './components/Footer';
import { Navbar } from './components/Navbar';

const App: React.FC = () => {
  const [hasStarted, setHasStarted] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />
      <main className="flex-grow flex flex-col items-center justify-start p-4 md:p-8">
        {!hasStarted ? (
          <div className="flex-grow flex items-center justify-center w-full">
            <LandingPage onProceed={() => setHasStarted(true)} />
          </div>
        ) : (
          <CorrectionStatement onBack={() => setHasStarted(false)} />
        )}
      </main>
      <Footer />
    </div>
  );
};

export default App;
