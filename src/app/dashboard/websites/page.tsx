"use client";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store/store";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Globe,
  Plus,
  Loader2,
  ExternalLink,
  Clock,
  AlertCircle,
  CheckCircle,
  XCircle,
  Activity,
  Settings,
  Trash2,
} from "lucide-react";
import Link from "next/link";
import { deleteWebsiteQuery, getChecksQueryLatest, getWebsitesQuery } from "@/lib/actions/query";
import { setWebsites, setLoading, removeWebsite as removeWebsiteFromList } from "@/lib/reducers/Website";
import { useDispatch } from "react-redux";
import { Website, Check } from "@prisma/client";
import { setWebsiteChecks } from "@/lib/reducers/Check";

function WebsitesPage() {
  const dispatch = useDispatch();
  const { websites, loading } = useSelector(
    (state: RootState) => state.website
  );
  const { selectedProject } = useSelector((state: RootState) => state.project);
  const { checks } = useSelector((state: RootState) => state.check);
  const [refreshing, setRefreshing] = useState(false);

  const projectWebsites = selectedProject
    ? websites.filter((website) => website.projectId === selectedProject.id)
    : [];

  useEffect(() => {
    const fetchWebsites = async () => {
      if (selectedProject?.id) {
        try {
          dispatch(setLoading(true));
          const projectWebsites = await getWebsitesQuery(selectedProject.id);
          dispatch(setWebsites(projectWebsites));

          for (const website of projectWebsites) {
            const websiteChecks = await getChecksQueryLatest(website.id);
            dispatch(
              setWebsiteChecks({ websiteId: website.id, checks: websiteChecks })
            );
          }
        } catch (error) {
          console.error("Error fetching websites:", error);
          dispatch(setWebsites([]));
        } finally {
          dispatch(setLoading(false));
        }
      }
    };

    fetchWebsites();
  }, [selectedProject?.id, dispatch]);

  const handleRefresh = async () => {
    if (selectedProject?.id) {
      setRefreshing(true);
      try {
        const projectWebsites = await getWebsitesQuery(selectedProject.id);
        dispatch(setWebsites(projectWebsites));

        for (const website of projectWebsites) {
          const websiteChecks = await getChecksQueryLatest(website.id);
          dispatch(
            setWebsiteChecks({ websiteId: website.id, checks: websiteChecks })
          );
        }
      } catch (error) {
        console.error("Error refreshing websites:", error);
      } finally {
        setRefreshing(false);
      }
    }
  };

  const getStatusVariant = (website: Website) => {
    const websiteChecks = checks[website.id] || [];
    const latestCheck = websiteChecks[0];

    if (!latestCheck) return "secondary" as const;
    return latestCheck.status ? ("default" as const) : ("destructive" as const);
  };

  const getStatusIcon = (website: Website) => {
    const websiteChecks = checks[website.id] || [];
    const latestCheck = websiteChecks[0];

    if (!latestCheck) return <Clock className="w-4 h-4" />;
    return latestCheck.status ? (
      <CheckCircle className="w-4 h-4" />
    ) : (
      <XCircle className="w-4 h-4" />
    );
  };

  const getStatusText = (website: Website) => {
    const websiteChecks = checks[website.id] || [];
    const latestCheck = websiteChecks[0];

    if (!latestCheck) return "No checks yet";
    return latestCheck.status ? "Online" : "Offline";
  };

  const handleRemoveWebsite = async (websiteId: string) => {
    try {
      dispatch(removeWebsiteFromList({ websiteId }));
      await deleteWebsiteQuery(websiteId);
    } catch (error) {
      console.error("Error deleting website:", error);
    }
  };

  if (!selectedProject) {
    return (
      <div className="flex items-center justify-center h-[100vh]">
        <div className="flex flex-col items-center gap-4">
          <AlertCircle className="w-8 h-8 text-muted-foreground" />
          <p className="text-muted-foreground">
            Please select a project to view websites
          </p>
        </div>
      </div>
    );
  }

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

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Websites</h1>
          <p className="text-muted-foreground">
            Monitoring {projectWebsites.length} website
            {projectWebsites.length !== 1 ? "s" : ""} in {selectedProject.name}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            disabled={refreshing}
          >
            {refreshing ? (
              <Loader2 className="w-4 h-4 animate-spin mr-2" />
            ) : (
              <Activity className="w-4 h-4 mr-2" />
            )}
            Refresh
          </Button>
          <Link href="/dashboard/websites/new">
            <Button size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Add Website
            </Button>
          </Link>
        </div>
      </div>

      {projectWebsites.length === 0 ? (
        <Card className="text-center py-12">
          <CardContent>
            <Globe className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-semibold mb-2">No websites yet</h3>
            <p className="text-muted-foreground mb-6">
              Start monitoring your first website by adding it to this project.
            </p>
            <Link href="/dashboard/websites/new">
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add Your First Website
              </Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6">
          {projectWebsites.map((website) => (
            <Card
              key={website.id}
              className="hover:shadow-md transition-shadow"
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Globe className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{website.url}</CardTitle>
                      <CardDescription>
                        Added on{" "}
                        {new Date(website.createdAt).toLocaleDateString()}
                      </CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={getStatusVariant(website)}>
                      {getStatusIcon(website)}
                      <span className="ml-1">{getStatusText(website)}</span>
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <span>
                      Last checked:{" "}
                      {(() => {
                        const websiteChecks = checks[website.id] || [];
                        const latestCheck = websiteChecks[0];
                        if (!latestCheck) return "Never";
                        return new Date(latestCheck.checkedAt).toLocaleString();
                      })()}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Activity className="w-4 h-4" />
                    <span>
                      Response time:{" "}
                      {(() => {
                        const websiteChecks = checks[website.id] || [];
                        const latestCheck = websiteChecks[0];
                        if (!latestCheck?.responseTime) return "N/A";
                        return `${latestCheck.responseTime}ms`;
                      })()}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle className="w-4 h-4" />
                    <span>
                      Status code:{" "}
                      {(() => {
                        const websiteChecks = checks[website.id] || [];
                        const latestCheck = websiteChecks[0];
                        if (!latestCheck?.statusCode) return "N/A";
                        return latestCheck.statusCode;
                      })()}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Link href={`${website.url}`} target="_blank">
                    <Button variant="outline" size="sm">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Visit
                    </Button>
                  </Link>
                  <Link href={`/dashboard/settings`}>
                    <Button variant="outline" size="sm">
                      <Settings className="w-4 h-4 mr-2" />
                      Settings
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-destructive hover:text-destructive"
                    onClick={() => handleRemoveWebsite(website.id)}
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Remove
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

export default WebsitesPage;
