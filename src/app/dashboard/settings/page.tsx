"use client";
import React, { useState, useEffect } from "react";
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
import { Separator } from "@/components/ui/separator";
import { 
  Settings, 
  Bell, 
  Clock, 
  Globe, 
  Shield, 
  Save, 
  Loader2,
  CheckCircle,
  AlertCircle,
  Mail,
  MessageSquare,
  Smartphone
} from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/lib/store/store";
import { getSettingsQuery, updateSettingsQuery } from "@/lib/actions/query";
import { setSettings, setLoading, updateSettings } from "@/lib/reducers/Settings";

function SettingsPage() {
  const dispatch = useDispatch();
  const { selectedProject } = useSelector((state: RootState) => state.project);
  const { settings, loading } = useSelector((state: RootState) => state.settings);
  
  const [formData, setFormData] = useState({
    status: true,
    interval: 300,
    notifyType: "email"
  });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (selectedProject?.id) {
      fetchSettings();
    }
  }, [selectedProject]);

  useEffect(() => {
    if (settings) {
      setFormData({
        status: settings.status,
        interval: settings.interval,
        notifyType: settings.notifyType
      });
    }
  }, [settings]);

  const fetchSettings = async () => {
    try {
      dispatch(setLoading(true));
      const settingsData = await getSettingsQuery(selectedProject?.id!);
      dispatch(setSettings(settingsData));
    } catch (error) {
      console.error("Error fetching settings:", error);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      const updatedSettings = await updateSettingsQuery(
        selectedProject?.id!,
        formData.status,
        formData.interval,
        formData.notifyType
      );
      dispatch(updateSettings(updatedSettings));
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (error) {
      console.error("Error updating settings:", error);
    } finally {
      setSaving(false);
    }
  };

  const intervalOptions = [
    { value: 30, label: "30 seconds" },
    { value: 60, label: "1 minute" },
    { value: 300, label: "5 minutes" },
    { value: 600, label: "10 minutes" },
    { value: 900, label: "15 minutes" },
  ];

  const notificationTypes = [
    { value: "email", label: "Email", icon: Mail, description: "Receive alerts via email" },
    { value: "sms", label: "SMS", icon: Smartphone, description: "Get text message alerts" , disabled: true},
    { value: "slack", label: "Slack", icon: MessageSquare, description: "Send to Slack channel" , disabled: true}
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[100vh]">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Loading settings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Settings</h1>
        <p className="text-muted-foreground">
          Configure monitoring preferences and notification settings for {selectedProject?.name}
        </p>
      </div>

      <div className="grid gap-6">
        {/* Monitoring Status */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Globe className="w-5 h-5 text-primary" />
              </div>
              <div>
                <CardTitle>Monitoring Status</CardTitle>
                <CardDescription>
                  Enable or disable monitoring for this project
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
              <div>
                <Label className="text-base font-medium">Active Monitoring</Label>
                <p className="text-sm text-muted-foreground">
                  {formData.status ? "Monitoring is currently active" : "Monitoring is paused"}
                </p>
              </div>
              <Button
                variant={formData.status ? "default" : "outline"}
                onClick={() => setFormData({ ...formData, status: !formData.status })}
                className="min-w-[100px]"
              >
                {formData.status ? "Active" : "Paused"}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Check Interval */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center">
                <Clock className="w-5 h-5 text-blue-500" />
              </div>
              <div>
                <CardTitle>Check Interval</CardTitle>
                <CardDescription>
                  How often should we check your websites for downtime
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {intervalOptions.map((option) => (
                  <div
                    key={option.value}
                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                      formData.interval === option.value
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                    }`}
                    onClick={() => setFormData({ ...formData, interval: option.value })}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{option.label}</span>
                      {formData.interval === option.value && (
                        <CheckCircle className="w-5 h-5 text-primary" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-sm text-muted-foreground">
                More frequent checks provide faster detection but may increase costs
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center">
                <Bell className="w-5 h-5 text-green-500" />
              </div>
              <div>
                <CardTitle>Notification Settings</CardTitle>
                <CardDescription>
                  Choose how you want to receive downtime alerts
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {notificationTypes.map((type) => (
                  <div
                    key={type.value}
                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                      formData.notifyType === type.value
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                    } ${type.disabled ? "opacity-50 cursor-not-allowed" : ""}`}
                    onClick={() => type.disabled ? null : setFormData({ ...formData, notifyType: type.value })}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <type.icon className="w-5 h-5 text-primary" />
                      <span className="font-medium">{type.label}</span>
                      {formData.notifyType === type.value && !type.disabled && (
                        <CheckCircle className="w-5 h-5 text-primary ml-auto" />
                      )}
                    </div>
                    <p className={`text-sm text-muted-foreground ${type.disabled ? "opacity-50" : ""}`}>{type.description}</p>
                    {type.disabled && (
                      <p className="text-sm text-muted-foreground">Coming soon</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Save Button */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {saved && (
                  <div className="flex items-center gap-2 text-green-600">
                    <CheckCircle className="w-5 h-5" />
                    <span className="text-sm font-medium">Settings saved successfully!</span>
                  </div>
                )}
              </div>
              <Button
                onClick={handleSave}
                disabled={saving}
                className="min-w-[120px]"
              >
                {saving ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Save Settings
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default SettingsPage;