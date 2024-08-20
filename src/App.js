import { useState } from "react";
import Settings from "./components/settings/Settings";
import Timer from "./components/timer/Timer";


function App() {
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  return (
    <div className="container h-screen pt-4">
        {
            !isSettingsOpen && <Timer goToSettings={() => setIsSettingsOpen(true)}/>
        }
        {
            isSettingsOpen && <Settings  goBack={() => setIsSettingsOpen(false)}/>
        }
    </div>
  );
}

export default App;
