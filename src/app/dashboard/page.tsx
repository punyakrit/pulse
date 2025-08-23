"use client";
import NoWebiste from "@/components/dashboard/globals/NoWebiste";
import { RootState } from "@/lib/store/store";
import React from "react";
import { useSelector } from "react-redux";
import { Loader2 } from "lucide-react";

function page() {
  const { websites, loading } = useSelector((state: RootState) => state.website);
  
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
  
  if (websites.length === 0) {
    return <NoWebiste />;
  }
  
  return (
    <div>
      {websites.map((website) => (
        <div key={website.id}>
          <h1>{website.url}</h1>
        </div>
      ))}
    </div>
  );
}

export default page;
