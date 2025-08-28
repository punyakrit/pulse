'use client'
import { getUptimeLogsQuery } from '@/lib/actions/query'
import { RootState } from '@/lib/store/store'
import { useDispatch, useSelector } from 'react-redux'
import React, { useEffect, useState, useMemo } from 'react'
import { setWebsiteUptimeLogs, setUptimeLogs } from '@/lib/reducers/analytics'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, BarChart, Bar, ComposedChart, PieChart, Pie, Cell } from 'recharts'
import { TrendingUp, TrendingDown, Activity, Clock, Globe, AlertTriangle } from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'

type TimePeriod = '1d' | '7d' | '30d'

function page() {
  const { selectedProject } = useSelector((state: RootState) => state.project);
  const { websites } = useSelector((state: RootState) => state.website);
  const dispatch = useDispatch();
  const { uptimeLogs } = useSelector((state: RootState) => state.analytics);
  const [selectedPeriod, setSelectedPeriod] = useState<TimePeriod>('1d');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchUptimeLogs = async () => {
      if (selectedProject && websites.length > 0) {
        setIsLoading(true);
        dispatch(setUptimeLogs({}));
        try {
          for (const website of websites) {
            const days = selectedPeriod === '1d' ? 1 : selectedPeriod === '7d' ? 7 : 30;
            const logs = await getUptimeLogsQuery(website.id, days)
            dispatch(setWebsiteUptimeLogs({ websiteId: website.id, logs }))
          }
        } finally {
          setIsLoading(false);
        }
      }
    }
    fetchUptimeLogs()
  }, [selectedProject, websites, selectedPeriod, dispatch])

  const projectWebsites = useMemo(() => {
    if (!selectedProject) return [];
    return websites.filter(website => website.projectId === selectedProject.id);
  }, [websites, selectedProject]);

  const calculateTotalUptime = (logs: any[]) => {
    if (!logs || logs.length === 0) return 0;
    
    const totalUptime = logs.reduce((sum, log) => sum + log.uptime, 0);
    const totalDowntime = logs.reduce((sum, log) => sum + log.downtime, 0);
    const total = totalUptime + totalDowntime;
    
    return total > 0 ? Number(((totalUptime / total) * 100).toFixed(2)) : 0;
  }

  const calculateAverageResponseTime = (logs: any[]) => {
    if (!logs || logs.length === 0) return 0;
    
    const totalResponseTime = logs.reduce((sum, log) => sum + log.avgResponseTime, 0);
    return Number((totalResponseTime / logs.length).toFixed(1));
  }

  const getChartData = (logs: any[]) => {
    if (!logs || logs.length === 0) return [];
    
    return logs.map(log => ({
      time: new Date(log.date).toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: false 
      }),
      uptime: Number(log.uptime.toFixed(2)),
      downtime: Number(log.downtime.toFixed(2)),
      responseTime: Number(log.avgResponseTime.toFixed(1)),
      date: new Date(log.date)
    })).sort((a, b) => a.date.getTime() - b.date.getTime());
  }

  const getUptimeDistribution = (logs: any[]) => {
    if (!logs || logs.length === 0) return [];
    
    const totalUptime = logs.reduce((sum, log) => sum + log.uptime, 0);
    const totalDowntime = logs.reduce((sum, log) => sum + log.downtime, 0);
    const total = totalUptime + totalDowntime;
    
    if (total === 0) return [];
    
    const uptimePercentage = total > 0 ? Number(((totalUptime / total) * 100).toFixed(2)) : 0;
    const downtimePercentage = total > 0 ? Number(((totalDowntime / total) * 100).toFixed(2)) : 0;
    
    return [
      { name: 'Uptime', value: uptimePercentage, color: '#10b981', total: total },
      { name: 'Downtime', value: downtimePercentage, color: '#ef4444', total: total }
    ].filter(item => item.value > 0);
  }

  const getStatusColor = (uptime: number) => {
    if (uptime >= 99.9) return 'bg-green-500';
    if (uptime >= 99) return 'bg-yellow-500';
    if (uptime >= 95) return 'bg-orange-500';
    return 'bg-red-500';
  }

  const getStatusText = (uptime: number) => {
    if (uptime >= 99.9) return 'Excellent';
    if (uptime >= 99) return 'Good';
    if (uptime >= 95) return 'Fair';
    return 'Poor';
  }

  const projectSummary = useMemo(() => {
    if (projectWebsites.length === 0) return null;

    let totalUptimeSum = 0;
    let totalResponseTimeSum = 0;
    let totalChecksSum = 0;
    let totalFailuresSum = 0;
    let websiteCount = 0;

    projectWebsites.forEach(website => {
      const logs = uptimeLogs[website.id] || [];
      if (logs.length > 0) {
        totalUptimeSum += calculateTotalUptime(logs);
        totalResponseTimeSum += calculateAverageResponseTime(logs);
        totalChecksSum += logs.reduce((sum, log) => sum + log.checks, 0);
        totalFailuresSum += logs.reduce((sum, log) => sum + log.failures, 0);
        websiteCount++;
      }
    });

    return {
      avgUptime: websiteCount > 0 ? Number((totalUptimeSum / websiteCount).toFixed(2)) : 0,
      avgResponseTime: websiteCount > 0 ? Number((totalResponseTimeSum / websiteCount).toFixed(1)) : 0,
      totalChecks: totalChecksSum,
      totalFailures: totalFailuresSum,
      websiteCount
    };
  }, [projectWebsites, uptimeLogs]);

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    if (selectedPeriod === '1d') {
      return date.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: false 
      });
    } else if (selectedPeriod === '7d') {
      return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric',
        hour: '2-digit',
        hour12: false
      });
    } else {
      return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric'
      });
    }
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border border-border rounded-lg p-3 shadow-lg">
          <p className="text-sm font-medium text-muted-foreground mb-2">{`Time: ${label}`}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {`${entry.name}: ${entry.value}${entry.unit || ''}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const CustomPieTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0];
      
      return (
        <div className="bg-background border border-border rounded-lg p-3 shadow-lg">
          <p className="text-sm font-medium" style={{ color: data.color }}>
            {`${data.name}: ${data.value}%`}
          </p>
        </div>
      );
    }
    return null;
  };

  if (isLoading) {
    return (
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <Skeleton className="h-8 w-32" />
          <div className="flex space-x-2">
            <Skeleton className="h-8 w-16" />
            <Skeleton className="h-8 w-16" />
            <Skeleton className="h-8 w-16" />
          </div>
        </div>
        
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-48" />
            <Skeleton className="h-4 w-64" />
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="flex items-center space-x-2">
                  <Skeleton className="h-4 w-4" />
                  <div>
                    <Skeleton className="h-4 w-24 mb-2" />
                    <Skeleton className="h-8 w-16" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-48" />
            <Skeleton className="h-4 w-64" />
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[...Array(4)].map((_, i) => (
                <Card key={i}>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2">
                      <Skeleton className="h-4 w-4" />
                      <div>
                        <Skeleton className="h-4 w-20 mb-2" />
                        <Skeleton className="h-8 w-16" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Analytics</h1>
        <div className="flex space-x-2">
          <Button
            variant={selectedPeriod === '1d' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedPeriod('1d')}
          >
            1 Day
          </Button>
          <Button
            variant={selectedPeriod === '7d' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedPeriod('7d')}
          >
            7 Days
          </Button>
          <Button
            variant={selectedPeriod === '30d' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedPeriod('30d')}
          >
            30 Days
          </Button>
        </div>
      </div>

      {projectSummary && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Globe className="h-5 w-5" />
              <span>Project Summary</span>
            </CardTitle>
            <CardDescription>
              Overall statistics for {projectSummary.websiteCount} website{projectSummary.websiteCount !== 1 ? 's' : ''}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-4 w-4 text-green-500" />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Average Uptime</p>
                  <p className="text-2xl font-bold">{projectSummary.avgUptime}%</p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Activity className="h-4 w-4 text-blue-500" />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Avg Response Time</p>
                  <p className="text-2xl font-bold">{projectSummary.avgResponseTime}ms</p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-purple-500" />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Checks</p>
                  <p className="text-2xl font-bold">{projectSummary.totalChecks.toLocaleString()}</p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <AlertTriangle className="h-4 w-4 text-red-500" />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Failures</p>
                  <p className="text-2xl font-bold">{projectSummary.totalFailures.toLocaleString()}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {projectWebsites.length === 0 ? (
        <Card>
          <CardContent className="flex items-center justify-center h-32">
            <p className="text-muted-foreground">No websites found in this project. Add a website to see analytics.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {projectWebsites.map((website) => {
            const logs = uptimeLogs[website.id] || [];
            const totalUptime = calculateTotalUptime(logs);
            const avgResponseTime = calculateAverageResponseTime(logs);
            const chartData = getChartData(logs);
            const uptimeDistribution = getUptimeDistribution(logs);
            const totalChecks = logs.reduce((sum, log) => sum + log.checks, 0);
            const totalFailures = logs.reduce((sum, log) => sum + log.failures, 0);

            return (
              <Card key={website.id} className="w-full">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl">{new URL(website.url).hostname}</CardTitle>
                      <CardDescription>{website.url}</CardDescription>
                    </div>
                    <Badge variant="outline" className={getStatusColor(totalUptime)}>
                      {getStatusText(totalUptime)}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-2">
                          <TrendingUp className="h-4 w-4 text-green-500" />
                          <div>
                            <p className="text-sm font-medium text-muted-foreground">Total Uptime</p>
                            <p className="text-2xl font-bold">{totalUptime}%</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-2">
                          <Activity className="h-4 w-4 text-blue-500" />
                          <div>
                            <p className="text-sm font-medium text-muted-foreground">Avg Response</p>
                            <p className="text-2xl font-bold">{avgResponseTime}ms</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-2">
                          <Clock className="h-4 w-4 text-purple-500" />
                          <div>
                            <p className="text-sm font-medium text-muted-foreground">Total Checks</p>
                            <p className="text-2xl font-bold">{totalChecks.toLocaleString()}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-2">
                          <TrendingDown className="h-4 w-4 text-red-500" />
                          <div>
                            <p className="text-sm font-medium text-muted-foreground">Failures</p>
                            <p className="text-2xl font-bold">{totalFailures.toLocaleString()}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {chartData.length > 0 && (
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Performance Analytics</h3>
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <Card className="lg:col-span-2">
                          <CardHeader>
                            <CardTitle className="text-sm">Response Time Trend</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <ResponsiveContainer width="100%" height={300}>
                              <ComposedChart data={chartData} margin={{ top: 10, right: 10, left: 10, bottom: 10 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                                <XAxis 
                                  dataKey="time" 
                                  tick={{ fontSize: 11, fill: '#9ca3af' }}
                                  axisLine={{ stroke: '#374151' }}
                                  tickLine={{ stroke: '#374151' }}
                                  interval="preserveStartEnd"
                                />
                                <YAxis 
                                  tick={{ fontSize: 11, fill: '#9ca3af' }}
                                  axisLine={{ stroke: '#374151' }}
                                  tickLine={{ stroke: '#374151' }}
                                />
                                <Tooltip content={<CustomTooltip />} />
                                <Area 
                                  type="monotone" 
                                  dataKey="responseTime" 
                                  stroke="#3b82f6" 
                                  strokeWidth={2}
                                  fill="#3b82f6" 
                                  fillOpacity={0.1}
                                />
                                {/* <Line 
                                  type="monotone" 
                                  dataKey="responseTime" 
                                  stroke="#3b82f6" 
                                  strokeWidth={2}
                                  dot={{ fill: '#3b82f6', strokeWidth: 2, r: 3 }}
                                /> */}
                              </ComposedChart>
                            </ResponsiveContainer>
                          </CardContent>
                        </Card>

                        <Card>
                          <CardHeader>
                            <CardTitle className="text-sm">Uptime Distribution</CardTitle>
                          </CardHeader>
                          <CardContent>
                            {uptimeDistribution.length > 0 ? (
                              <>
                                <ResponsiveContainer width="100%" height={300}>
                                  <PieChart>
                                    <Pie
                                      data={uptimeDistribution}
                                      cx="50%"
                                      cy="50%"
                                      innerRadius={40}
                                      outerRadius={80}
                                      paddingAngle={5}
                                      dataKey="value"
                                    >
                                      {uptimeDistribution.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                      ))}
                                    </Pie>
                                    <Tooltip content={<CustomPieTooltip />} />
                                  </PieChart>
                                </ResponsiveContainer>
                                <div className="flex justify-center space-x-4 mt-4">
                                  {uptimeDistribution.map((entry) => (
                                    <div key={entry.name} className="flex items-center space-x-2">
                                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }}></div>
                                      <span className="text-sm text-muted-foreground">{entry.name}: {entry.value}%</span>
                                    </div>
                                  ))}
                                </div>
                              </>
                            ) : (
                              <div className="flex items-center justify-center h-64">
                                <p className="text-muted-foreground">No data available</p>
                              </div>
                            )}
                          </CardContent>
                        </Card>

                        <Card className="lg:col-span-3">
                          <CardHeader>
                            <CardTitle className="text-sm">Uptime Performance</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <ResponsiveContainer width="100%" height={200}>
                              <BarChart data={chartData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }} barGap={0} barCategoryGap="10%">
                                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                                <XAxis 
                                  dataKey="time" 
                                  tick={{ fontSize: 10, fill: '#9ca3af' }}
                                  axisLine={{ stroke: '#374151' }}
                                  tickLine={{ stroke: '#374151' }}
                                  interval="preserveStartEnd"
                                />
                                <YAxis 
                                  domain={[0, 100]}
                                  tick={{ fontSize: 10, fill: '#9ca3af' }}
                                  axisLine={{ stroke: '#374151' }}
                                  tickLine={{ stroke: '#374151' }}
                                />
                                <Tooltip content={<CustomTooltip />} />
                                
                                <Bar dataKey="uptime" fill="#10b981" radius={[4, 4, 0, 0]} barSize={40} />
                                <Bar dataKey="downtime" fill="#ef4444" radius={[4, 4, 0, 0]} barSize={40} />
                              </BarChart>
                            </ResponsiveContainer>
                            <div className="flex justify-center space-x-4 mt-4">
                              <div className="flex items-center space-x-2">
                                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                <span className="text-sm text-muted-foreground">Uptime</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                                <span className="text-sm text-muted-foreground">Downtime</span>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  )
}

export default page