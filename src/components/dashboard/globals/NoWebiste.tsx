"use client";
import React, { useState } from "react";
import { Button } from "../../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../ui/card";
import { Label } from "../../ui/label";
import { Input } from "../../ui/input";
import { Monitor, Plus, Globe, Zap, Shield, Loader2, ExternalLink } from "lucide-react";
import { createWebsiteQueryFirst } from "@/lib/actions/query";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/store/store";
import { addWebsite } from "@/lib/reducers/Website";

function NoWebiste() {
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState("");
  const dispatch = useDispatch();
  const { selectedProject } = useSelector((state: RootState) => state.project);

  const handleCreateWebsite = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProject?.id) {
      console.error("No project selected");
      return;
    }
    
    try {
      setLoading(true);
      const website = await createWebsiteQueryFirst(selectedProject.id, url);
      console.log("Creating website:", url);
      dispatch(addWebsite(website));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center p-4 h-[100vh]">
      <div className="w-full max-w-2xl">
        <Card className="shadow-lg">
          <CardHeader className="text-center pb-8">
            <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
              <Monitor className="w-10 h-10 text-primary-foreground" />
            </div>
            <CardTitle className="text-3xl font-bold mb-4">
              No Website Found
            </CardTitle>
            <CardDescription className="text-lg max-w-md mx-auto leading-relaxed">
              Add your first website to start monitoring its performance, uptime, and get real-time alerts when issues occur.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-8">
            <form onSubmit={handleCreateWebsite} className="space-y-6">
              <div className="space-y-3">
                <Label className="font-medium text-base">Website URL</Label>
                <div className="relative">
                  <Input
                    placeholder="https://example.com"
                    className="h-12 text-lg pr-10"
                    type="url"
                    required={true}
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                  />
                  <ExternalLink className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                </div>
                <p className="text-sm text-muted-foreground">
                  Enter the full URL including https://
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
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
                  <Globe className="w-5 h-5 text-blue-500" />
                  <div>
                    <p className="font-medium text-sm">Global Monitoring</p>
                    <p className="text-muted-foreground text-xs">
                      Worldwide coverage
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
                className="w-full py-3 text-lg bg-primary text-primary-foreground cursor-pointer"
                disabled={loading}
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
    </div>
  );
}

export default NoWebiste;