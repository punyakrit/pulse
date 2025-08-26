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
  Bell,
  Plus,
  Loader2,
  ExternalLink,
  Clock,
  AlertCircle,
  CheckCircle,
  XCircle,
  Activity,
  Filter,
  Search,
  Calendar,
  Globe,
  Eye,
  EyeOff,
} from "lucide-react";
import Link from "next/link";
import { getAlertsQueryProject, getAlertsQueryWebsite } from "@/lib/actions/query";
import { setWebsiteAlerts, setLoading } from "@/lib/reducers/alerts";
import { useDispatch } from "react-redux";
import { Alert, Website } from "@prisma/client";

type AlertWithWebsite = Alert & {
  website: {
    id: string;
    url: string;
  };
};

function AlertsPage() {
  const dispatch = useDispatch();
  const { websites } = useSelector((state: RootState) => state.website);
  const { selectedProject } = useSelector((state: RootState) => state.project);
  const { alerts, loading } = useSelector((state: RootState) => state.alerts);
  const [refreshing, setRefreshing] = useState(false);
  const [filterStatus, setFilterStatus] = useState<"all" | "resolved" | "unresolved">("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [showResolved, setShowResolved] = useState(true);

  const projectWebsites = selectedProject
    ? websites.filter((website) => website.projectId === selectedProject.id)
    : [];

  useEffect(() => {
    const fetchAlerts = async () => {
      if (selectedProject?.id && websites.length > 0) {
        try {
          dispatch(setLoading(true));
          
          const projectAlerts = await getAlertsQueryProject(selectedProject.id);
          
          const alertsByWebsite: Record<string, Alert[]> = {};
          projectAlerts.forEach((alertWithWebsite) => {
            const websiteId = alertWithWebsite.website.id;
            if (!alertsByWebsite[websiteId]) {
              alertsByWebsite[websiteId] = [];
            }
            alertsByWebsite[websiteId].push(alertWithWebsite);
          });
          
          Object.entries(alertsByWebsite).forEach(([websiteId, alerts]) => {
            dispatch(setWebsiteAlerts({ websiteId, alerts }));
          });
        } catch (error) {
          console.error("Error fetching alerts:", error);
        } finally {
          dispatch(setLoading(false));
        }
      }
    };

    fetchAlerts();
  }, [selectedProject?.id, websites, dispatch]);

  const handleRefresh = async () => {
    if (selectedProject?.id) {
      setRefreshing(true);
      try {
        const projectAlerts = await getAlertsQueryProject(selectedProject.id);
        
        const alertsByWebsite: Record<string, Alert[]> = {};
        projectAlerts.forEach((alertWithWebsite) => {
          const websiteId = alertWithWebsite.website.id;
          if (!alertsByWebsite[websiteId]) {
            alertsByWebsite[websiteId] = [];
          }
          alertsByWebsite[websiteId].push(alertWithWebsite);
        });
        
        Object.entries(alertsByWebsite).forEach(([websiteId, alerts]) => {
          dispatch(setWebsiteAlerts({ websiteId, alerts }));
        });
      } catch (error) {
        console.error("Error refreshing alerts:", error);
      } finally {
        setRefreshing(false);
      }
    }
  };

  const getAllAlerts = (): AlertWithWebsite[] => {
    const allAlerts: AlertWithWebsite[] = [];
    
    projectWebsites.forEach((website) => {
      const websiteAlerts = alerts[website.id] || [];
      websiteAlerts.forEach((alert) => {
        allAlerts.push({
          ...alert,
          website: {
            id: website.id,
            url: website.url,
          },
        });
      });
    });
    
    return allAlerts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  };

  const getFilteredAlerts = () => {
    let filteredAlerts = getAllAlerts();

    if (filterStatus === "resolved") {
      filteredAlerts = filteredAlerts.filter(alert => alert.resolvedAt);
    } else if (filterStatus === "unresolved") {
      filteredAlerts = filteredAlerts.filter(alert => !alert.resolvedAt);
    }

    if (searchTerm) {
      filteredAlerts = filteredAlerts.filter(alert => 
        alert.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
        alert.website.url.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (!showResolved) {
      filteredAlerts = filteredAlerts.filter(alert => !alert.resolvedAt);
    }

    return filteredAlerts;
  };

  const getStatusVariant = (alert: AlertWithWebsite) => {
    if (alert.resolvedAt) return "secondary" as const;
    return "destructive" as const;
  };

  const getStatusIcon = (alert: AlertWithWebsite) => {
    if (alert.resolvedAt) return <CheckCircle className="w-4 h-4" />;
    return <AlertCircle className="w-4 h-4" />;
  };

  const getStatusText = (alert: AlertWithWebsite) => {
    if (alert.resolvedAt) return "Resolved";
    return "Active";
  };

  const getTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - new Date(date).getTime()) / 1000);
    
    if (diffInSeconds < 60) return `${diffInSeconds}s ago`;
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    return `${Math.floor(diffInSeconds / 86400)}d ago`;
  };

  if (!selectedProject) {
    return (
      <div className="flex items-center justify-center h-[100vh]">
        <div className="flex flex-col items-center gap-4">
          <AlertCircle className="w-8 h-8 text-muted-foreground" />
          <p className="text-muted-foreground">
            Please select a project to view alerts
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
          <p className="text-muted-foreground">Loading alerts...</p>
        </div>
      </div>
    );
  }

  const filteredAlerts = getFilteredAlerts();
  const totalAlerts = getAllAlerts().length;
  const activeAlerts = getAllAlerts().filter(alert => !alert.resolvedAt).length;
  const resolvedAlerts = totalAlerts - activeAlerts;

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Alerts</h1>
          <p className="text-muted-foreground">
            {activeAlerts} active, {resolvedAlerts} resolved alerts in {selectedProject.name}
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
        </div>
      </div>

      <div className="grid gap-6 mb-8">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Filter className="w-5 h-5 text-primary" />
                <CardTitle>Filters</CardTitle>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowResolved(!showResolved)}
              >
                {showResolved ? (
                  <>
                    <EyeOff className="w-4 h-4 mr-2" />
                    Hide Resolved
                  </>
                ) : (
                  <>
                    <Eye className="w-4 h-4 mr-2" />
                    Show Resolved
                  </>
                )}
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4 items-center">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search alerts or websites..."
                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant={filterStatus === "all" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilterStatus("all")}
                >
                  All
                </Button>
                <Button
                  variant={filterStatus === "unresolved" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilterStatus("unresolved")}
                >
                  Active
                </Button>
                <Button
                  variant={filterStatus === "resolved" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilterStatus("resolved")}
                >
                  Resolved
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {filteredAlerts.length === 0 ? (
        <Card className="text-center py-12">
          <CardContent>
            <Bell className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-semibold mb-2">No alerts found</h3>
            <p className="text-muted-foreground mb-6">
              {totalAlerts === 0 
                ? "No alerts have been generated yet for this project."
                : "No alerts match your current filters."
              }
            </p>
            {totalAlerts > 0 && (
              <Button
                variant="outline"
                onClick={() => {
                  setFilterStatus("all");
                  setSearchTerm("");
                  setShowResolved(true);
                }}
              >
                Clear Filters
              </Button>
            )}
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {filteredAlerts.map((alert) => (
            <Card key={alert.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Bell className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-lg">{alert.message}</CardTitle>
                      <CardDescription className="flex items-center gap-4 mt-2">
                        <div className="flex items-center gap-1">
                          <Globe className="w-4 h-4" />
                          <span>{alert.website.url}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>{getTimeAgo(alert.createdAt)}</span>
                        </div>
                      </CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={getStatusVariant(alert)}>
                      {getStatusIcon(alert)}
                      <span className="ml-1">{getStatusText(alert)}</span>
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              {alert.resolvedAt && (
                <CardContent>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle className="w-4 h-4" />
                    <span>Resolved on {new Date(alert.resolvedAt).toLocaleString()}</span>
                  </div>
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

export default AlertsPage;