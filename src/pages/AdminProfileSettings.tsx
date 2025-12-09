import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Building2,
  Palette,
  Globe,
  Mail,
  Phone,
  MapPin,
  Upload,
  Save,
  Settings,
  CreditCard,
  Shield,
  Users,
  Bell,
  Key,
  FileText,
  Languages,
  Lock,
  Eye,
  EyeOff,
  Link as LinkIcon,
  Code,
  Chrome,
  Image as ImageIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const AdminProfileSettings: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  // White Labelling States
  const [platformName, setPlatformName] = useState("EduInstitute");
  const [platformLogo, setPlatformLogo] = useState("");
  const [primaryColor, setPrimaryColor] = useState("#6366f1");
  const [secondaryColor, setSecondaryColor] = useState("#8b5cf6");
  const [customDomain, setCustomDomain] = useState("");
  const [footerText, setFooterText] = useState("© 2024 All Rights Reserved");
  const [customCSS, setCustomCSS] = useState("");

  // Organization Details
  const [orgName, setOrgName] = useState("EduInstitute Learning");
  const [orgEmail, setOrgEmail] = useState("admin@eduinstitute.com");
  const [orgPhone, setOrgPhone] = useState("+91 98765 43210");
  const [orgAddress, setOrgAddress] = useState("123 Education Street, Mumbai, Maharashtra 400001");
  const [orgWebsite, setOrgWebsite] = useState("www.eduinstitute.com");
  const [orgDescription, setOrgDescription] = useState("Leading online learning platform");

  // Admin Profile
  const [adminName, setAdminName] = useState("Admin User");
  const [adminEmail, setAdminEmail] = useState("admin@example.com");
  const [adminPhone, setAdminPhone] = useState("+91 12345 67890");
  const [adminAvatar, setAdminAvatar] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Platform Settings
  const [enableRegistration, setEnableRegistration] = useState(true);
  const [requireEmailVerification, setRequireEmailVerification] = useState(true);
  const [enableSocialLogin, setEnableSocialLogin] = useState(false);
  const [enableMultiLanguage, setEnableMultiLanguage] = useState(true);
  const [defaultLanguage, setDefaultLanguage] = useState("en");
  const [enableNotifications, setEnableNotifications] = useState(true);
  const [enablePayments, setEnablePayments] = useState(true);
  const [currency, setCurrency] = useState("INR");
  const [timezone, setTimezone] = useState("Asia/Kolkata");

  // API & Integration Settings
  const [apiKey] = useState("sk_live_xxxxxxxxxxxxxxxx");
  const [webhookUrl, setWebhookUrl] = useState("");
  const [showApiKey, setShowApiKey] = useState(false);

  // SEO Settings
  const [metaTitle, setMetaTitle] = useState("EduInstitute - Leading Online Learning Platform");
  const [metaDescription, setMetaDescription] = useState("Transform your learning experience with our comprehensive courses");
  const [metaKeywords, setMetaKeywords] = useState("online learning, courses, education");
  const [ogImage] = useState("");

  const handleSave = (section: string) => {
    toast({
      title: "Settings Saved",
      description: `${section} settings have been updated successfully.`,
    });
  };

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPlatformLogo(reader.result as string);
        toast({ title: "Logo uploaded successfully" });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAvatarUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAdminAvatar(reader.result as string);
        toast({ title: "Avatar uploaded successfully" });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
        <div className="flex h-16 items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/app/dashboard")}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-xl font-bold">Admin Profile Settings</h1>
              <p className="text-sm text-muted-foreground">Manage your platform configuration</p>
            </div>
          </div>
          <Badge variant="secondary" className="text-xs">
            <Shield className="h-3 w-3 mr-1" />
            Super Admin
          </Badge>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto p-6 max-w-7xl">
        <Tabs defaultValue="white-label" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-6 h-auto gap-2">
            <TabsTrigger value="white-label" className="flex items-center gap-2">
              <Palette className="h-4 w-4" />
              White Label
            </TabsTrigger>
            <TabsTrigger value="organization" className="flex items-center gap-2">
              <Building2 className="h-4 w-4" />
              Organization
            </TabsTrigger>
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="platform" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Platform
            </TabsTrigger>
            <TabsTrigger value="api" className="flex items-center gap-2">
              <Code className="h-4 w-4" />
              API & Security
            </TabsTrigger>
            <TabsTrigger value="seo" className="flex items-center gap-2">
              <Globe className="h-4 w-4" />
              SEO
            </TabsTrigger>
          </TabsList>

          {/* White Label Settings */}
          <TabsContent value="white-label" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="h-5 w-5" />
                  Brand Identity
                </CardTitle>
                <CardDescription>
                  Customize your platform's appearance and branding
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="platform-name">Platform Name</Label>
                    <Input
                      id="platform-name"
                      value={platformName}
                      onChange={(e) => setPlatformName(e.target.value)}
                      placeholder="Your Platform Name"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="custom-domain">Custom Domain</Label>
                    <Input
                      id="custom-domain"
                      value={customDomain}
                      onChange={(e) => setCustomDomain(e.target.value)}
                      placeholder="app.yourdomain.com"
                    />
                  </div>
                </div>

                <Separator />

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <Label>Platform Logo</Label>
                    <div className="flex items-center gap-4">
                      <div className="h-24 w-24 rounded-lg border-2 border-dashed flex items-center justify-center bg-muted overflow-hidden">
                        {platformLogo ? (
                          <img src={platformLogo} alt="Logo" className="h-full w-full object-cover" />
                        ) : (
                          <ImageIcon className="h-8 w-8 text-muted-foreground" />
                        )}
                      </div>
                      <div>
                        <Button size="sm" variant="outline" asChild>
                          <label htmlFor="logo-upload" className="cursor-pointer">
                            <Upload className="h-4 w-4 mr-2" />
                            Upload Logo
                            <input
                              id="logo-upload"
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={handleLogoUpload}
                            />
                          </label>
                        </Button>
                        <p className="text-xs text-muted-foreground mt-2">
                          Recommended: 200x50px, PNG/SVG
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Label>Favicon</Label>
                    <div className="flex items-center gap-4">
                      <div className="h-16 w-16 rounded border-2 border-dashed flex items-center justify-center bg-muted">
                        <Chrome className="h-6 w-6 text-muted-foreground" />
                      </div>
                      <div>
                        <Button size="sm" variant="outline">
                          <Upload className="h-4 w-4 mr-2" />
                          Upload Favicon
                        </Button>
                        <p className="text-xs text-muted-foreground mt-2">
                          32x32px or 64x64px
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="primary-color">Primary Brand Color</Label>
                    <div className="flex gap-2">
                      <Input
                        id="primary-color"
                        type="color"
                        value={primaryColor}
                        onChange={(e) => setPrimaryColor(e.target.value)}
                        className="h-10 w-20"
                      />
                      <Input
                        value={primaryColor}
                        onChange={(e) => setPrimaryColor(e.target.value)}
                        placeholder="#6366f1"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="secondary-color">Secondary Brand Color</Label>
                    <div className="flex gap-2">
                      <Input
                        id="secondary-color"
                        type="color"
                        value={secondaryColor}
                        onChange={(e) => setSecondaryColor(e.target.value)}
                        className="h-10 w-20"
                      />
                      <Input
                        value={secondaryColor}
                        onChange={(e) => setSecondaryColor(e.target.value)}
                        placeholder="#8b5cf6"
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <Label htmlFor="footer-text">Footer Copyright Text</Label>
                  <Input
                    id="footer-text"
                    value={footerText}
                    onChange={(e) => setFooterText(e.target.value)}
                    placeholder="© 2024 Your Platform"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="custom-css">Custom CSS (Advanced)</Label>
                  <Textarea
                    id="custom-css"
                    value={customCSS}
                    onChange={(e) => setCustomCSS(e.target.value)}
                    placeholder="/* Your custom CSS here */"
                    rows={6}
                    className="font-mono text-sm"
                  />
                  <p className="text-xs text-muted-foreground">
                    Add custom CSS to further customize your platform's appearance
                  </p>
                </div>

                <Button onClick={() => handleSave("White Label")} className="w-full">
                  <Save className="h-4 w-4 mr-2" />
                  Save Branding Settings
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Organization Settings */}
          <TabsContent value="organization" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="h-5 w-5" />
                  Organization Information
                </CardTitle>
                <CardDescription>
                  Manage your organization's details and contact information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="org-name">Organization Name</Label>
                  <Input
                    id="org-name"
                    value={orgName}
                    onChange={(e) => setOrgName(e.target.value)}
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="org-email">Organization Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="org-email"
                        type="email"
                        value={orgEmail}
                        onChange={(e) => setOrgEmail(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="org-phone">Organization Phone</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="org-phone"
                        value={orgPhone}
                        onChange={(e) => setOrgPhone(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="org-website">Website</Label>
                  <div className="relative">
                    <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="org-website"
                      value={orgWebsite}
                      onChange={(e) => setOrgWebsite(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="org-address">Address</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Textarea
                      id="org-address"
                      value={orgAddress}
                      onChange={(e) => setOrgAddress(e.target.value)}
                      rows={3}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="org-description">Organization Description</Label>
                  <Textarea
                    id="org-description"
                    value={orgDescription}
                    onChange={(e) => setOrgDescription(e.target.value)}
                    rows={4}
                    placeholder="Brief description of your organization..."
                  />
                </div>

                <Button onClick={() => handleSave("Organization")} className="w-full">
                  <Save className="h-4 w-4 mr-2" />
                  Save Organization Details
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Admin Profile */}
          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Admin Profile
                </CardTitle>
                <CardDescription>
                  Manage your personal admin account details
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-6">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={adminAvatar || "/placeholder.svg"} />
                    <AvatarFallback className="text-2xl">
                      {adminName.split(" ").map(n => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <Button size="sm" variant="outline" asChild>
                      <label htmlFor="avatar-upload" className="cursor-pointer">
                        <Upload className="h-4 w-4 mr-2" />
                        Change Avatar
                        <input
                          id="avatar-upload"
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleAvatarUpload}
                        />
                      </label>
                    </Button>
                    <p className="text-xs text-muted-foreground mt-2">
                      JPG, PNG or GIF, max 2MB
                    </p>
                  </div>
                </div>

                <Separator />

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="admin-name">Full Name</Label>
                    <Input
                      id="admin-name"
                      value={adminName}
                      onChange={(e) => setAdminName(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="admin-phone">Phone Number</Label>
                    <Input
                      id="admin-phone"
                      value={adminPhone}
                      onChange={(e) => setAdminPhone(e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="admin-email">Email Address</Label>
                  <Input
                    id="admin-email"
                    type="email"
                    value={adminEmail}
                    onChange={(e) => setAdminEmail(e.target.value)}
                  />
                </div>

                <Separator />

                <div className="space-y-4">
                  <h4 className="font-semibold flex items-center gap-2">
                    <Lock className="h-4 w-4" />
                    Security
                  </h4>
                  
                  <div className="space-y-2">
                    <Label htmlFor="current-password">Current Password</Label>
                    <div className="relative">
                      <Input
                        id="current-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter current password"
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="new-password">New Password</Label>
                      <Input
                        id="new-password"
                        type="password"
                        placeholder="Enter new password"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Confirm Password</Label>
                      <Input
                        id="confirm-password"
                        type="password"
                        placeholder="Confirm new password"
                      />
                    </div>
                  </div>
                </div>

                <Button onClick={() => handleSave("Profile")} className="w-full">
                  <Save className="h-4 w-4 mr-2" />
                  Update Profile
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Platform Settings */}
          <TabsContent value="platform" className="space-y-6">
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="h-5 w-5" />
                    User Registration & Authentication
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="enable-registration">Enable User Registration</Label>
                      <p className="text-sm text-muted-foreground">Allow new users to sign up</p>
                    </div>
                    <Switch
                      id="enable-registration"
                      checked={enableRegistration}
                      onCheckedChange={setEnableRegistration}
                    />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="email-verification">Require Email Verification</Label>
                      <p className="text-sm text-muted-foreground">Users must verify their email</p>
                    </div>
                    <Switch
                      id="email-verification"
                      checked={requireEmailVerification}
                      onCheckedChange={setRequireEmailVerification}
                    />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="social-login">Social Login</Label>
                      <p className="text-sm text-muted-foreground">Google, Facebook, LinkedIn</p>
                    </div>
                    <Switch
                      id="social-login"
                      checked={enableSocialLogin}
                      onCheckedChange={setEnableSocialLogin}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Languages className="h-5 w-5" />
                    Localization
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="multi-language">Multi-Language Support</Label>
                      <p className="text-sm text-muted-foreground">Enable multiple languages</p>
                    </div>
                    <Switch
                      id="multi-language"
                      checked={enableMultiLanguage}
                      onCheckedChange={setEnableMultiLanguage}
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="default-language">Default Language</Label>
                      <Select value={defaultLanguage} onValueChange={setDefaultLanguage}>
                        <SelectTrigger id="default-language">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="en">English</SelectItem>
                          <SelectItem value="hi">Hindi</SelectItem>
                          <SelectItem value="es">Spanish</SelectItem>
                          <SelectItem value="fr">French</SelectItem>
                          <SelectItem value="de">German</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="timezone">Timezone</Label>
                      <Select value={timezone} onValueChange={setTimezone}>
                        <SelectTrigger id="timezone">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Asia/Kolkata">Asia/Kolkata (IST)</SelectItem>
                          <SelectItem value="America/New_York">America/New York (EST)</SelectItem>
                          <SelectItem value="Europe/London">Europe/London (GMT)</SelectItem>
                          <SelectItem value="Asia/Tokyo">Asia/Tokyo (JST)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5" />
                    Payments & Monetization
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="enable-payments">Enable Payments</Label>
                      <p className="text-sm text-muted-foreground">Accept course payments</p>
                    </div>
                    <Switch
                      id="enable-payments"
                      checked={enablePayments}
                      onCheckedChange={setEnablePayments}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="currency">Default Currency</Label>
                    <Select value={currency} onValueChange={setCurrency}>
                      <SelectTrigger id="currency">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="INR">INR (₹)</SelectItem>
                        <SelectItem value="USD">USD ($)</SelectItem>
                        <SelectItem value="EUR">EUR (€)</SelectItem>
                        <SelectItem value="GBP">GBP (£)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="h-5 w-5" />
                    Notifications
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="enable-notifications">Enable Notifications</Label>
                      <p className="text-sm text-muted-foreground">Email & in-app notifications</p>
                    </div>
                    <Switch
                      id="enable-notifications"
                      checked={enableNotifications}
                      onCheckedChange={setEnableNotifications}
                    />
                  </div>
                </CardContent>
              </Card>

              <Button onClick={() => handleSave("Platform")} className="w-full">
                <Save className="h-4 w-4 mr-2" />
                Save Platform Settings
              </Button>
            </div>
          </TabsContent>

          {/* API & Security */}
          <TabsContent value="api" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Key className="h-5 w-5" />
                  API Configuration
                </CardTitle>
                <CardDescription>
                  Manage API keys and integrations for your platform
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="api-key">API Key</Label>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Input
                        id="api-key"
                        type={showApiKey ? "text" : "password"}
                        value={apiKey}
                        readOnly
                        className="pr-10 font-mono"
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0"
                        onClick={() => setShowApiKey(!showApiKey)}
                      >
                        {showApiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                    <Button variant="outline">
                      Regenerate
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Keep your API key secure. Do not share it publicly.
                  </p>
                </div>

                <Separator />

                <div className="space-y-2">
                  <Label htmlFor="webhook-url">Webhook URL</Label>
                  <div className="relative">
                    <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="webhook-url"
                      value={webhookUrl}
                      onChange={(e) => setWebhookUrl(e.target.value)}
                      placeholder="https://yourdomain.com/webhook"
                      className="pl-10"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Receive real-time event notifications
                  </p>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h4 className="font-semibold">API Documentation</h4>
                  <div className="bg-muted/50 p-4 rounded-lg space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">REST API</span>
                      <Button variant="outline" size="sm">
                        <FileText className="h-4 w-4 mr-2" />
                        View Docs
                      </Button>
                    </div>
                  </div>
                </div>

                <Button onClick={() => handleSave("API")} className="w-full">
                  <Save className="h-4 w-4 mr-2" />
                  Save API Settings
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* SEO Settings */}
          <TabsContent value="seo" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  SEO & Meta Information
                </CardTitle>
                <CardDescription>
                  Optimize your platform for search engines
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="meta-title">Meta Title</Label>
                  <Input
                    id="meta-title"
                    value={metaTitle}
                    onChange={(e) => setMetaTitle(e.target.value)}
                    maxLength={60}
                  />
                  <p className="text-xs text-muted-foreground">
                    {metaTitle.length}/60 characters - Keep under 60 for optimal display
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="meta-description">Meta Description</Label>
                  <Textarea
                    id="meta-description"
                    value={metaDescription}
                    onChange={(e) => setMetaDescription(e.target.value)}
                    rows={3}
                    maxLength={160}
                  />
                  <p className="text-xs text-muted-foreground">
                    {metaDescription.length}/160 characters - Keep under 160 for optimal display
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="meta-keywords">Meta Keywords</Label>
                  <Input
                    id="meta-keywords"
                    value={metaKeywords}
                    onChange={(e) => setMetaKeywords(e.target.value)}
                    placeholder="keyword1, keyword2, keyword3"
                  />
                  <p className="text-xs text-muted-foreground">
                    Comma-separated keywords relevant to your platform
                  </p>
                </div>

                <Separator />

                <div className="space-y-4">
                  <Label>Open Graph Image</Label>
                  <div className="flex items-center gap-4">
                    <div className="h-32 w-48 rounded-lg border-2 border-dashed flex items-center justify-center bg-muted">
                      {ogImage ? (
                        <img src={ogImage} alt="OG" className="h-full w-full object-cover rounded-lg" />
                      ) : (
                        <ImageIcon className="h-8 w-8 text-muted-foreground" />
                      )}
                    </div>
                    <div>
                      <Button size="sm" variant="outline">
                        <Upload className="h-4 w-4 mr-2" />
                        Upload Image
                      </Button>
                      <p className="text-xs text-muted-foreground mt-2">
                        1200x630px recommended for social sharing
                      </p>
                    </div>
                  </div>
                </div>

                <Button onClick={() => handleSave("SEO")} className="w-full">
                  <Save className="h-4 w-4 mr-2" />
                  Save SEO Settings
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default AdminProfileSettings;