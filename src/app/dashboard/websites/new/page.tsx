"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { 
  Globe, 
  Plus, 
  Loader2, 
  ArrowLeft,
  ExternalLink,
  Zap,
  Shield,
  Clock
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store/store";
import { createWebsiteQueryFirst } from "@/lib/actions/query";
import { addWebsite } from "@/lib/reducers/Website";
import { useDispatch } from "react-redux";
import Link from "next/link";

function AddWebsitePage() {
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();
  const { selectedProject } = useSelector((state: RootState) => state.project);

  const handleCreateWebsite = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProject?.id) {
      alert("Please select a project first");
      return;
    }
    
    try {
      setLoading(true);
      const website = await createWebsiteQueryFirst(selectedProject.id, url);
      dispatch(addWebsite(website));
      router.push(`/dashboard`);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4 sm:p-6 max-w-2xl">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold mb-2">Add New Website</h1>
        <p className="text-muted-foreground text-sm sm:text-base">
          Monitor a new website for uptime, performance, and get instant alerts
        </p>
      </div>

      <Card className="shadow-lg">
        <CardHeader className="text-center pb-6 sm:pb-8">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
            <Globe className="w-8 h-8 sm:w-10 sm:h-10 text-primary-foreground" />
          </div>
          <CardTitle className="text-xl sm:text-2xl font-bold mb-4">
            Website Details
          </CardTitle>
          <CardDescription className="text-sm sm:text-base lg:text-lg max-w-md mx-auto leading-relaxed">
            Enter the URL of the website you want to monitor and we'll start tracking its performance immediately.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6 sm:space-y-8">
          <form onSubmit={handleCreateWebsite} className="space-y-6">
            <div className="space-y-3">
              <Label className="font-medium text-sm sm:text-base">Website URL</Label>
              <div className="relative">
                <Input
                  placeholder="https://example.com"
                  className="h-10 sm:h-12 text-base sm:text-lg pr-10"
                  type="url"
                  required={true}
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                />
                <ExternalLink className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground" />
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Enter the full URL including https://
              </p>
            </div>

            {selectedProject && (
              <div className="p-4 bg-muted rounded-lg">
                <Label className="font-medium text-sm sm:text-base">Project</Label>
                <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                  Adding to: <span className="font-medium text-foreground">{selectedProject.name}</span>
                </p>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-4">
              <div className="flex items-center gap-3 p-4 bg-muted rounded-xl">
                <Zap className="w-5 h-5 text-yellow-500" />
                <div>
                  <p className="font-medium text-sm">Performance Tracking</p>
                  <p className="text-muted-foreground text-xs">
                    Monitor load times
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-muted rounded-xl">
                <Clock className="w-5 h-5 text-blue-500" />
                <div>
                  <p className="font-medium text-sm">Real-time Monitoring</p>
                  <p className="text-muted-foreground text-xs">
                    24/7 uptime checks
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-muted rounded-xl">
                <Shield className="w-5 h-5 text-green-500" />
                <div>
                  <p className="font-medium text-sm">Smart Alerts</p>
                  <p className="text-muted-foreground text-xs">
                    Instant notifications
                  </p>
                </div>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full py-3 text-base sm:text-lg"
              disabled={loading || !selectedProject}
            >
              {loading ? (
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              ) : (
                <Plus className="w-5 h-5 mr-2" />
              )}
              Add Website
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default AddWebsitePage;
