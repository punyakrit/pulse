"use client";
import NoWebiste from "@/components/dashboard/globals/NoWebiste";
import { RootState } from "@/lib/store/store";
import React from "react";
import { useSelector } from "react-redux";
import { Loader2 } from "lucide-react";

function page() {
  const { websites, loading } = useSelector((state: RootState) => state.website);
  const { selectedProject } = useSelector((state: RootState) => state.project);
  
  if (loading) {
    return (
      <div className="flex items-center justify-center h-[100vh]">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Loading websites...</p>
        </div>
      </div>
    );
  }
  
  // Filter websites based on selected project
  const projectWebsites = selectedProject 
    ? websites.filter(website => website.projectId === selectedProject.id)
    : [];
  
  if (!selectedProject) {
    return (
      <div className="flex items-center justify-center h-[100vh]">
        <div className="flex flex-col items-center gap-4">
          <p className="text-muted-foreground">Please select a project to view websites</p>
        </div>
      </div>
    );
  }
  
  if (projectWebsites.length === 0) {
    return <NoWebiste />;
  }
  
  return (
    <div className="container mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Websites</h1>
        <p className="text-muted-foreground">
          Monitoring {projectWebsites.length} website{projectWebsites.length !== 1 ? 's' : ''} in {selectedProject.name}
        </p>
      </div>
      
      <div className="grid gap-4">
        {projectWebsites.map((website) => (
          <div key={website.id} className="p-4 border rounded-lg">
            <h2 className="text-lg font-semibold">{website.url}</h2>
            <p className="text-sm text-muted-foreground">
              Added on {new Date(website.createdAt).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default page;
