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
  FolderOpen, 
  Plus, 
  Loader2, 
  ArrowLeft,
  Globe,
  Zap,
  Shield
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/lib/store/store";
import { createProjectQuery } from "@/lib/actions/query";
import { setSelectedProject } from "@/lib/reducers/Project";
import Link from "next/link";

function NewProjectPage() {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const selectedUser = useSelector((state: RootState) => state.user.user);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const newProject = await createProjectQuery(selectedUser?.id!, name);
      dispatch(setSelectedProject(newProject));
      router.push(`/dashboard`);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4 sm:p-6 max-w-2xl">
      <div className="mt-6 sm:mt-8 mb-4">
        <h1 className="text-2xl sm:text-3xl font-bold mb-2">Create New Project</h1>
        <p className="text-muted-foreground text-sm sm:text-base">
          Set up a new monitoring project to track your websites and applications
        </p>
      </div>

      <Card className="shadow-lg">
        <CardHeader className="text-center pb-6 sm:pb-8">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
            <FolderOpen className="w-8 h-8 sm:w-10 sm:h-10 text-primary-foreground" />
          </div>
          <CardTitle className="text-xl sm:text-2xl font-bold mb-4">
            Project Details
          </CardTitle>
          <CardDescription className="text-sm sm:text-base lg:text-lg max-w-md mx-auto leading-relaxed">
            Give your project a name and start monitoring your websites with real-time alerts and analytics.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6 sm:space-y-8">
          <form onSubmit={handleCreateProject} className="space-y-6">
            <div className="space-y-3">
              <Label className="font-medium text-sm sm:text-base">Project Name</Label>
              <Input
                placeholder="e.g., My Website, E-commerce Store, API Service"
                className="h-10 sm:h-12 text-base sm:text-lg"
                required={true}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <p className="text-xs sm:text-sm text-muted-foreground">
                Choose a descriptive name that helps you identify this project
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-4">
              <div className="flex items-center gap-3 p-4 bg-muted rounded-xl">
                <Zap className="w-5 h-5 text-yellow-500" />
                <div>
                  <p className="font-medium text-sm">Real-time Monitoring</p>
                  <p className="text-muted-foreground text-xs">
                    24/7 uptime tracking
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-muted rounded-xl">
                <Globe className="w-5 h-5 text-blue-500" />
                <div>
                  <p className="font-medium text-sm">Global Coverage</p>
                  <p className="text-muted-foreground text-xs">
                    Multiple locations
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-muted rounded-xl">
                <Shield className="w-5 h-5 text-green-500" />
                <div>
                  <p className="font-medium text-sm">Instant Alerts</p>
                  <p className="text-muted-foreground text-xs">
                    Never miss downtime
                  </p>
                </div>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full py-3 text-base sm:text-lg"
              disabled={loading}
            >
              {loading ? (
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              ) : (
                <Plus className="w-5 h-5 mr-2" />
              )}
              Create Project
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default NewProjectPage;