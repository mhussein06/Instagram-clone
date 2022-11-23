import {MemoizedTimeline} from "../components/timeline";
import {MemoizedSidebar} from "../components/sidebar/index";
import { MemoizedHeader } from "../components/header";
import { useEffect, useState } from "react";

export const Dashboard = () => {
  const [imageSrc, setImageSrc] = useState('');
  useEffect(() => {
    document.title = "Instagram";
  })
  return (
    <div className="bg-gray-background">
        <div>
        <MemoizedHeader imageSrc={imageSrc} setImageSrc={setImageSrc}/>
          <div className="grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-lg">
            <MemoizedTimeline />
            <MemoizedSidebar />
          </div>
        </div> 
    </div>
  );
};

export default Dashboard;
