"use client";
import NoWebiste from "@/components/dashboard/globals/NoWebiste";
import { RootState } from "@/lib/store/store";
import React, { useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { 
  Loader2, 
  Globe, 
  Activity, 
  Clock, 
  TrendingUp, 
  AlertTriangle,
  CheckCircle,
  XCircle,
  ExternalLink,
  Plus,
  BarChart3,
  Zap,
  Shield
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getUptimeLogsQuery, getChecksQueryLatest, getAlertsQueryProject } from "@/lib/actions/query";
import { setWebsiteUptimeLogs, setUptimeLogs } from "@/lib/reducers/analytics";
import { setWebsiteChecks } from "@/lib/reducers/Check";
import { setWebsiteAlerts } from "@/lib/reducers/alerts";

function page() {
  const dispatch = useDispatch();
  const { websites, loading } = useSelector((state: RootState) => state.website);
  const { selectedProject } = useSelector((state: RootState) => state.project);
  const { uptimeLogs } = useSelector((state: RootState) => state.analytics);
  const { checks } = useSelector((state: RootState) => state.check);
  const { alerts } = useSelector((state: RootState) => state.alerts);
  
  const projectWebsites = useMemo(() => {
    return selectedProject 
      ? websites.filter(website => website.projectId === selectedProject.id)
      : [];
  }, [selectedProject, websites]);

  useEffect(() => {
    const fetchData = async () => {
      if (selectedProject?.id && projectWebsites.length > 0) {
        try {
          dispatch(setUptimeLogs({}));
          
          for (const website of projectWebsites) {
            const [uptimeLogs, websiteChecks] = await Promise.all([
              getUptimeLogsQuery(website.id, 1),
              getChecksQueryLatest(website.id)
            ]);
            
            dispatch(setWebsiteUptimeLogs({ websiteId: website.id, logs: uptimeLogs }));
            dispatch(setWebsiteChecks({ websiteId: website.id, checks: websiteChecks }));
          }

          const projectAlerts = await getAlertsQueryProject(selectedProject.id);
          
          const alertsByWebsite: Record<string, any[]> = {};
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
          console.error("Error fetching dashboard data:", error);
        }
      }
    };

    fetchData();
  }, [selectedProject?.id, projectWebsites, dispatch]);

  const calculateTotalUptime = (logs: any[]) => {
    if (!logs || logs.length === 0) return 0;
    
    const totalUptime = logs.reduce((sum, log) => sum + log.uptime, 0);
    const totalDowntime = logs.reduce((sum, log) => sum + log.downtime, 0);
    const total = totalUptime + totalDowntime;
    
    return total > 0 ? Number(((totalUptime / total) * 100).toFixed(2)) : 0;
  };

  const calculateAverageResponseTime = (logs: any[]) => {
    if (!logs || logs.length === 0) return 0;
    
    const totalResponseTime = logs.reduce((sum, log) => sum + log.avgResponseTime, 0);
    return Number((totalResponseTime / logs.length).toFixed(1));
  };

  const dashboardStats = useMemo(() => {
    if (projectWebsites.length === 0) {
      return {
        totalWebsites: 0,
        avgUptime: 0,
        avgResponseTime: 0,
        totalAlerts: 0,
        onlineWebsites: 0
      };
    }

    let totalUptimeSum = 0;
    let totalResponseTimeSum = 0;
    let websiteCountWithData = 0;
    let onlineWebsites = 0;
    let totalAlerts = 0;

    projectWebsites.forEach(website => {
      const logs = uptimeLogs[website.id] || [];
      const websiteChecks = checks[website.id] || [];
      const websiteAlerts = alerts[website.id] || [];

      if (logs.length > 0) {
        totalUptimeSum += calculateTotalUptime(logs);
        totalResponseTimeSum += calculateAverageResponseTime(logs);
        websiteCountWithData++;
      }

      const latestCheck = websiteChecks[0];
      if (latestCheck && latestCheck.status) {
        onlineWebsites++;
      }

      const unresolvedAlerts = websiteAlerts.filter(alert => !alert.resolvedAt);
      totalAlerts += unresolvedAlerts.length;
      
      console.log(`Website ${website.url}: ${websiteAlerts.length} total alerts, ${unresolvedAlerts.length} unresolved`);
    });

    const onlinePercentage = projectWebsites.length > 0 ? (onlineWebsites / projectWebsites.length) * 100 : 0;

    console.log(`Dashboard stats - Total alerts: ${totalAlerts}, Alerts state:`, alerts);

    return {
      totalWebsites: projectWebsites.length,
      avgUptime: websiteCountWithData > 0 ? Number((totalUptimeSum / websiteCountWithData).toFixed(2)) : onlinePercentage,
      avgResponseTime: websiteCountWithData > 0 ? Number((totalResponseTimeSum / websiteCountWithData).toFixed(1)) : 0,
      totalAlerts,
      onlineWebsites
    };
  }, [projectWebsites, uptimeLogs, checks, alerts]);

  const getStatusColor = (website: any) => {
    const websiteChecks = checks[website.id] || [];
    const latestCheck = websiteChecks[0];
    
    if (!latestCheck) return "bg-gray-500";
    return latestCheck.status ? "bg-green-500" : "bg-red-500";
  };

  const getStatusText = (website: any) => {
    const websiteChecks = checks[website.id] || [];
    const latestCheck = websiteChecks[0];
    
    if (!latestCheck) return "No checks yet";
    return latestCheck.status ? "Online" : "Offline";
  };

  const getStatusIcon = (website: any) => {
    const websiteChecks = checks[website.id] || [];
    const latestCheck = websiteChecks[0];
    
    if (!latestCheck) return <Clock className="w-4 h-4" />;
    return latestCheck.status ? <CheckCircle className="w-4 h-4" /> : <XCircle className="w-4 h-4" />;
  };
  
  if (loading) {
    return (
      <div className="flex items-center justify-center h-[100vh]">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    );
  }
  
  if (!selectedProject) {
    return (
      <div className="flex items-center justify-center h-[100vh]">
        <div className="flex flex-col items-center gap-4">
          <div className="p-4 bg-muted rounded-full">
            <Globe className="w-8 h-8 text-muted-foreground" />
          </div>
          <p className="text-muted-foreground">Please select a project to view dashboard</p>
        </div>
      </div>
    );
  }
  
  if (projectWebsites.length === 0) {
    return <NoWebiste />;
  }

  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Monitoring {dashboardStats.totalWebsites} website{dashboardStats.totalWebsites !== 1 ? 's' : ''} in {selectedProject.name}
          </p>
        </div>
        <Link href="/dashboard/websites/new">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add Website
          </Button>
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Websites</CardTitle>
            <Globe className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardStats.totalWebsites}</div>
            <p className="text-xs text-muted-foreground">
              Active monitoring
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Online</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardStats.onlineWebsites}</div>
            <p className="text-xs text-muted-foreground">
              {dashboardStats.avgUptime.toFixed(0)}% uptime
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Response</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardStats.avgResponseTime}ms</div>
            <p className="text-xs text-muted-foreground">
              Last 24 hours
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Alerts</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardStats.totalAlerts}</div>
            <p className="text-xs text-muted-foreground">
              {dashboardStats.totalAlerts === 0 ? 'No issues detected' : 'Active alerts'}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5" />
              Recent Activity
            </CardTitle>
            <CardDescription>
              Latest monitoring events and status updates
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {projectWebsites.slice(0, 3).map((website, index) => (
              <div key={website.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${getStatusColor(website)}`}></div>
                  <div>
                    <p className="font-medium text-sm">{website.url}</p>
                    <p className="text-xs text-muted-foreground">
                      Last checked 2 minutes ago
                    </p>
                  </div>
                </div>
                <Badge variant="secondary" className="text-xs">
                  {getStatusText(website)}
                </Badge>
              </div>
            ))}
            <div className="text-center pt-2">
              <Link href="/dashboard/websites">
                <Button variant="ghost" size="sm">
                  View all websites
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Performance Overview
            </CardTitle>
            <CardDescription>
              Response times and uptime statistics
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Average Response Time</span>
                <span className="text-sm text-muted-foreground">{dashboardStats.avgResponseTime}ms</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className="bg-primary h-2 rounded-full" 
                  style={{ width: `${Math.min((dashboardStats.avgResponseTime / 1000) * 100, 100)}%` }}
                ></div>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Uptime</span>
                <span className="text-sm text-muted-foreground">{dashboardStats.avgUptime.toFixed(1)}%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className="bg-green-500 h-2 rounded-full" 
                  style={{ width: `${dashboardStats.avgUptime}%` }}
                ></div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Online Websites</span>
                <span className="text-sm text-muted-foreground">{dashboardStats.onlineWebsites}/{dashboardStats.totalWebsites}</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className="bg-green-500 h-2 rounded-full" 
                  style={{ width: `${dashboardStats.totalWebsites > 0 ? (dashboardStats.onlineWebsites / dashboardStats.totalWebsites) * 100 : 0}%` }}
                ></div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="w-5 h-5" />
            Monitored Websites
          </CardTitle>
          <CardDescription>
            All websites currently being monitored in this project
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {projectWebsites.map((website) => (
              <div key={website.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Globe className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{website.url}</h3>
                    <p className="text-sm text-muted-foreground">
                      Added on {new Date(website.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant="secondary" className="flex items-center gap-1">
                    {getStatusIcon(website)}
                    {getStatusText(website)}
                  </Badge>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href={`/dashboard/websites/${website.id}`}>
                      <ExternalLink className="w-4 h-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default page;
