'use client'
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store/store";
import { Clock } from "lucide-react";

function MonitoringBanner() {
  const { selectedProject } = useSelector((state: RootState) => state.project);
  const { websites } = useSelector((state: RootState) => state.website);
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    if (selectedProject && websites.length > 0) {
      const projectWebsites = websites.filter(website => website.projectId === selectedProject.id);
      
      if (projectWebsites.length > 0) {
        const thirtyMinutesAgo = new Date(Date.now() - 30 * 60 * 1000);
        const hasNewWebsites = projectWebsites.some(website => {
          const createdAt = new Date(website.createdAt);
          return createdAt > thirtyMinutesAgo;
        });
        
        setShowBanner(hasNewWebsites);
      }
    }
  }, [selectedProject, websites]);

  if (!showBanner) return null;

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 sm:p-4 mx-4 sm:mx-6 mt-4 sm:mt-6 mb-3 sm:mb-4">
      <div className="flex items-start space-x-2 sm:space-x-3">
        <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600 mt-0.5 flex-shrink-0" />
        <div className="min-w-0 flex-1">
          <h3 className="text-xs sm:text-sm font-medium text-blue-800">Data Collection Notice</h3>
          <p className="text-xs sm:text-sm text-blue-700 mt-1">Analytics data will begin appearing after 30 minutes of monitoring. New websites may take some time to show comprehensive data.</p>
        </div>
      </div>
    </div>
  );
}

export default MonitoringBanner;
