import { useState } from "react";

import Header from "./components/Header";
import Hero from "./components/Hero";
import LoveStory from "./components/LoveStory";
import WeddingDetails from "./components/WeddingDetails";
import Countdown from "./components/Countdown";
import RSVP from "./components/RSVP";
import Location from "./components/Location";
import MusicPlayer from "./components/MusicPlayer";
import Footer from "./components/Footer";
import InvitationOpening from "./components/InvitationOpening";
import Admin from "./pages/Admin";

function App() {
  const [invitationOpened, setInvitationOpened] = useState(false);

  const isAdminPage = window.location.pathname === "/admin";

  if (isAdminPage) {
    return <Admin />;
  }

  return (
    <div className="bg-[#f5f2eb] text-[#171717]">

      {!invitationOpened && (
        <InvitationOpening
          onOpen={() => setInvitationOpened(true)}
        />
      )}

      <div
        className={
          invitationOpened
            ? "opacity-100"
            : "pointer-events-none h-screen overflow-hidden opacity-0"
        }
      >
        <Header />

        <main>
          <Hero />
          <LoveStory />
          <WeddingDetails />
          <Countdown />
          <RSVP />
          <Location />
        </main>

        <Footer />

        <MusicPlayer />
      </div>
    </div>
  );
}

export default App;