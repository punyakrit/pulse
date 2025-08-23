"use client";
import NoWebiste from "@/components/dashboard/globals/NoWebiste";
import { RootState } from "@/lib/store/store";
import React from "react";
import { useSelector } from "react-redux";

function page() {
  const websites = useSelector((state: RootState) => state.website.websites);
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
