import SpiralScene from "@/components/thespiral/3d/SpiralScene";
import HeroSection from "@/components/thespiral/sections/HeroSection";
import InfoSection from "@/components/thespiral/sections/InfoSection";
import RulesSection from "@/components/thespiral/sections/RulesSection";
import ScheduleSection from "@/components/thespiral/sections/ScheduleSection";

export default function HomePage() {
  return (
    <div className="thespiral-root">
      <main className="app-shell">
        <SpiralScene />

        <div className="content-layer">
          <HeroSection />
          <InfoSection />
          <RulesSection />
          <ScheduleSection />
        </div>
      </main>
    </div>
  );
}