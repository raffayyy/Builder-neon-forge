import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Shield,
  Key,
  User,
  Users,
  Lock,
  Unlock,
  Eye,
  EyeOff,
  Smartphone,
  Mail,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  Globe,
  Settings,
  Download,
  Trash2,
  Plus,
  Edit,
  MoreVertical,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";

interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "editor" | "viewer";
  status: "active" | "inactive" | "suspended";
  lastLogin: Date;
  createdAt: Date;
  permissions: string[];
  twoFactorEnabled: boolean;
}

interface LoginAttempt {
  id: string;
  email: string;
  success: boolean;
  timestamp: Date;
  ipAddress: string;
  userAgent: string;
  location?: string;
}

interface SecurityAlert {
  id: string;
  type: "suspicious_login" | "password_change" | "permission_change" | "data_export";
  severity: "low" | "medium" | "high" | "critical";
  message: string;
  timestamp: Date;
  resolved: boolean;
  userId?: string;
}

const SecuritySettings = () => {
  const [users, setUsers] = useState<User[]>([
    {
      id: "1",
      name: "John Doe",
      email: "john@example.com",
      role: "admin",
      status: "active",
      lastLogin: new Date(Date.now() - 3600000),
      createdAt: new Date(Date.now() - 86400000 * 30),
      permissions: ["read", "write", "delete", "admin"],
      twoFactorEnabled: true,
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane@example.com",
      role: "editor",
      status: "active",
      lastLogin: new Date(Date.now() - 7200000),
      createdAt: new Date(Date.now() - 86400000 * 15),
      permissions: ["read", "write"],
      twoFactorEnabled: false,
    },
    {
      id: "3",
      name: "Bob Wilson",
      email: "bob@example.com",
      role: "viewer",
      status: "inactive",
      lastLogin: new Date(Date.now() - 86400000 * 7),
      createdAt: new Date(Date.now() - 86400000 * 60),
      permissions: ["read"],
      twoFactorEnabled: false,
    },
  ]);

  const [loginAttempts, setLoginAttempts] = useState<LoginAttempt[]>([
    {
      id: "1",
      email: "john@example.com",
      success: true,
      timestamp: new Date(Date.now() - 3600000),
      ipAddress: "192.168.1.100",
      userAgent: "Mozilla/5.0...",
      location: "New York, US",
    },
    {
      id: "2",
      email: "unknown@hacker.com",
      success: false,
      timestamp: new Date(Date.now() - 7200000),
      ipAddress: "203.0.113.0",
      userAgent: "curl/7.68.0",
      location: "Unknown",
    },
    {
      id: "3",
      email: "jane@example.com",
      success: true,
      timestamp: new Date(Date.now() - 10800000),
      ipAddress: "192.168.1.101",
      userAgent: "Mozilla/5.0...",
      location: "San Francisco, US",
    },
  ]);

  const [securityAlerts, setSecurityAlerts] = useState<SecurityAlert[]>([
    {
      id: "1",
      type: "suspicious_login",
      severity: "high",
      message: "Multiple failed login attempts from unknown IP",
      timestamp: new Date(Date.now() - 7200000),
      resolved: false,
    },
    {
      id: "2",
      type: "password_change",
      severity: "medium",
      message: "Admin password changed",
      timestamp: new Date(Date.now() - 86400000),
      resolved: true,
      userId: "1",
    },
  ]);

  const [securitySettings, setSecuritySettings] = useState({
    passwordPolicy: {
      minLength: 8,
      requireUppercase: true,
      requireLowercase: true,
      requireNumbers: true,
      requireSymbols: true,
      expireAfterDays: 90,
    },
    loginSecurity: {
      maxFailedAttempts: 5,
      lockoutDuration: 30, // minutes
      requireTwoFactor: false,
      allowedIpRanges: [],
    },
    sessionSecurity: {
      timeoutMinutes: 120,
      requireReauthForSensitive: true,
      logoutAllOnPasswordChange: true,
    },
    auditLog: {
      enabled: true,
      retentionDays: 365,
      logDataExports: true,
      logPermissionChanges: true,
    },
  });

  const [showAddUser, setShowAddUser] = useState(false);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    role: "viewer" as const,
    password: "",
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-600";
      case "inactive":
        return "bg-yellow-600";
      case "suspended":
        return "bg-red-600";
      default:
        return "bg-gray-600";
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "bg-red-600";
      case "high":
        return "bg-orange-600";
      case "medium":
        return "bg-yellow-600";
      case "low":
        return "bg-blue-600";
      default:
        return "bg-gray-600";
    }
  };

  const getRolePermissions = (role: string) => {
    switch (role) {
      case "admin":
        return ["read", "write", "delete", "admin", "user_management"];
      case "editor":
        return ["read", "write"];
      case "viewer":
        return ["read"];
      default:
        return [];
    }
  };

  const calculatePasswordStrength = (password: string) => {
    let score = 0;
    if (password.length >= 8) score += 20;
    if (password.length >= 12) score += 10;
    if (/[a-z]/.test(password)) score += 20;
    if (/[A-Z]/.test(password)) score += 20;
    if (/[0-9]/.test(password)) score += 15;
    if (/[^A-Za-z0-9]/.test(password)) score += 15;
    return Math.min(score, 100);
  };

  const addUser = () => {
    if (!newUser.name || !newUser.email || !newUser.password) return;

    const user: User = {
      id: Date.now().toString(),
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      status: "active",
      lastLogin: new Date(),
      createdAt: new Date(),
      permissions: getRolePermissions(newUser.role),
      twoFactorEnabled: false,
    };

    setUsers(prev => [...prev, user]);
    setNewUser({ name: "", email: "", role: "viewer", password: "" });
    setShowAddUser(false);
  };

  const toggleUserStatus = (userId: string) => {
    setUsers(prev => 
      prev.map(user => 
        user.id === userId 
          ? { ...user, status: user.status === "active" ? "suspended" : "active" }
          : user
      )
    );
  };

  const resolveAlert = (alertId: string) => {
    setSecurityAlerts(prev => 
      prev.map(alert => 
        alert.id === alertId ? { ...alert, resolved: true } : alert
      )
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 space-y-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Security Settings</h2>
          <p className="text-gray-400">Manage access control and security policies</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export Audit Log
          </Button>
        </div>
      </div>

      <Tabs defaultValue="users" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5 lg:w-auto lg:grid-cols-none lg:flex">
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="access">Access Logs</TabsTrigger>
          <TabsTrigger value="alerts">Security Alerts</TabsTrigger>
          <TabsTrigger value="policies">Policies</TabsTrigger>
          <TabsTrigger value="2fa">Two-Factor Auth</TabsTrigger>
        </TabsList>

        {/* Users Management */}
        <TabsContent value="users" className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">User Management</h3>
            <Button 
              onClick={() => setShowAddUser(true)}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add User
            </Button>
          </div>

          <div className="grid gap-4">
            {users.map((user) => (
              <Card key={user.id}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center">
                        <User className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="font-medium">{user.name}</div>
                        <div className="text-sm text-gray-400">{user.email}</div>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge variant="outline">{user.role}</Badge>
                          <Badge className={getStatusColor(user.status)}>
                            {user.status}
                          </Badge>
                          {user.twoFactorEnabled && (
                            <Badge variant="outline" className="bg-green-900 text-green-300">
                              <Shield className="h-3 w-3 mr-1" />
                              2FA
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="text-right text-sm">
                        <div className="text-gray-400">Last login</div>
                        <div>{user.lastLogin.toLocaleDateString()}</div>
                      </div>
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => toggleUserStatus(user.id)}
                        className={
                          user.status === "active" 
                            ? "text-red-400 hover:text-red-300" 
                            : "text-green-400 hover:text-green-300"
                        }
                      >
                        {user.status === "active" ? (
                          <Lock className="h-4 w-4" />
                        ) : (
                          <Unlock className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>

                  {/* Permissions */}
                  <div className="mt-4 pt-4 border-t border-gray-800">
                    <div className="text-sm text-gray-400 mb-2">Permissions</div>
                    <div className="flex flex-wrap gap-2">
                      {user.permissions.map((permission, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {permission}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Add User Modal */}
          {showAddUser && (
            <Card className="border-blue-600">
              <CardHeader>
                <CardTitle>Add New User</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Name</label>
                    <Input
                      value={newUser.name}
                      onChange={(e) => setNewUser(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Full name"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email</label>
                    <Input
                      type="email"
                      value={newUser.email}
                      onChange={(e) => setNewUser(prev => ({ ...prev, email: e.target.value }))}
                      placeholder="email@example.com"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Role</label>
                  <select
                    value={newUser.role}
                    onChange={(e) => setNewUser(prev => ({ ...prev, role: e.target.value as any }))}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2"
                  >
                    <option value="viewer">Viewer</option>
                    <option value="editor">Editor</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Password</label>
                  <Input
                    type="password"
                    value={newUser.password}
                    onChange={(e) => setNewUser(prev => ({ ...prev, password: e.target.value }))}
                    placeholder="Temporary password"
                  />
                  {newUser.password && (
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span>Password strength</span>
                        <span>{calculatePasswordStrength(newUser.password)}%</span>
                      </div>
                      <Progress value={calculatePasswordStrength(newUser.password)} className="h-1" />
                    </div>
                  )}
                </div>
                <div className="flex space-x-2">
                  <Button onClick={addUser} className="bg-blue-600 hover:bg-blue-700">
                    Add User
                  </Button>
                  <Button variant="outline" onClick={() => setShowAddUser(false)}>
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Access Logs */}
        <TabsContent value="access" className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Access Logs</h3>
            <div className="flex space-x-2">
              <select className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm">
                <option>All attempts</option>
                <option>Successful only</option>
                <option>Failed only</option>
              </select>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            {loginAttempts.map((attempt) => (
              <Card key={attempt.id}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className={`w-3 h-3 rounded-full ${
                        attempt.success ? "bg-green-500" : "bg-red-500"
                      }`}></div>
                      <div>
                        <div className="font-medium">{attempt.email}</div>
                        <div className="text-sm text-gray-400">
                          {attempt.ipAddress} • {attempt.location}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm">{attempt.timestamp.toLocaleString()}</div>
                      <Badge className={attempt.success ? "bg-green-600" : "bg-red-600"}>
                        {attempt.success ? "Success" : "Failed"}
                      </Badge>
                    </div>
                  </div>
                  <div className="mt-2 text-xs text-gray-500 truncate">
                    {attempt.userAgent}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Security Alerts */}
        <TabsContent value="alerts" className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Security Alerts</h3>
            <Button variant="outline" size="sm">
              <CheckCircle className="h-4 w-4 mr-2" />
              Mark All Resolved
            </Button>
          </div>

          <div className="space-y-4">
            {securityAlerts.map((alert) => (
              <Card key={alert.id} className={`border-l-4 ${
                alert.resolved ? "border-green-600" : 
                alert.severity === "critical" ? "border-red-600" :
                alert.severity === "high" ? "border-orange-600" :
                "border-yellow-600"
              }`}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <AlertTriangle className={`h-5 w-5 ${
                        alert.severity === "critical" ? "text-red-500" :
                        alert.severity === "high" ? "text-orange-500" :
                        "text-yellow-500"
                      }`} />
                      <div>
                        <div className="font-medium">{alert.message}</div>
                        <div className="text-sm text-gray-400">
                          {alert.timestamp.toLocaleString()}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className={getSeverityColor(alert.severity)}>
                        {alert.severity}
                      </Badge>
                      {!alert.resolved && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => resolveAlert(alert.id)}
                        >
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Resolve
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Security Policies */}
        <TabsContent value="policies" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Password Policy */}
            <Card>
              <CardHeader>
                <CardTitle>Password Policy</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Minimum length</label>
                  <Input 
                    type="number" 
                    value={securitySettings.passwordPolicy.minLength}
                    className="w-full"
                  />
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Require uppercase letters</span>
                    <Switch checked={securitySettings.passwordPolicy.requireUppercase} />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Require lowercase letters</span>
                    <Switch checked={securitySettings.passwordPolicy.requireLowercase} />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Require numbers</span>
                    <Switch checked={securitySettings.passwordPolicy.requireNumbers} />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Require symbols</span>
                    <Switch checked={securitySettings.passwordPolicy.requireSymbols} />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Password expiry (days)</label>
                  <Input 
                    type="number" 
                    value={securitySettings.passwordPolicy.expireAfterDays}
                    className="w-full"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Login Security */}
            <Card>
              <CardHeader>
                <CardTitle>Login Security</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Max failed attempts</label>
                  <Input 
                    type="number" 
                    value={securitySettings.loginSecurity.maxFailedAttempts}
                    className="w-full"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Lockout duration (minutes)</label>
                  <Input 
                    type="number" 
                    value={securitySettings.loginSecurity.lockoutDuration}
                    className="w-full"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Require 2FA for all users</span>
                  <Switch checked={securitySettings.loginSecurity.requireTwoFactor} />
                </div>
              </CardContent>
            </Card>

            {/* Session Security */}
            <Card>
              <CardHeader>
                <CardTitle>Session Security</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Session timeout (minutes)</label>
                  <Input 
                    type="number" 
                    value={securitySettings.sessionSecurity.timeoutMinutes}
                    className="w-full"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Require re-auth for sensitive actions</span>
                  <Switch checked={securitySettings.sessionSecurity.requireReauthForSensitive} />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Logout all sessions on password change</span>
                  <Switch checked={securitySettings.sessionSecurity.logoutAllOnPasswordChange} />
                </div>
              </CardContent>
            </Card>

            {/* Audit Log */}
            <Card>
              <CardHeader>
                <CardTitle>Audit Log</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Enable audit logging</span>
                  <Switch checked={securitySettings.auditLog.enabled} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Log retention (days)</label>
                  <Input 
                    type="number" 
                    value={securitySettings.auditLog.retentionDays}
                    className="w-full"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Log data exports</span>
                  <Switch checked={securitySettings.auditLog.logDataExports} />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Log permission changes</span>
                  <Switch checked={securitySettings.auditLog.logPermissionChanges} />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex space-x-2">
            <Button className="bg-blue-600 hover:bg-blue-700">
              Save Security Policies
            </Button>
            <Button variant="outline">
              Reset to Defaults
            </Button>
          </div>
        </TabsContent>

        {/* Two-Factor Authentication */}
        <TabsContent value="2fa" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Two-Factor Authentication Setup</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between p-4 bg-green-900/20 border border-green-800 rounded-lg">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <div>
                    <div className="font-medium">2FA is enabled for your account</div>
                    <div className="text-sm text-gray-400">
                      Using authenticator app (Google Authenticator, Authy, etc.)
                    </div>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  <Settings className="h-4 w-4 mr-2" />
                  Manage
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium">Backup Codes</h4>
                  <p className="text-sm text-gray-400">
                    Use these codes if you lose access to your authenticator app
                  </p>
                  <div className="space-y-2">
                    {["A1B2-C3D4", "E5F6-G7H8", "I9J0-K1L2", "M3N4-O5P6"].map((code, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-gray-800 rounded font-mono text-sm">
                        <span>{code}</span>
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" className="w-full">
                    <Download className="h-4 w-4 mr-2" />
                    Download Backup Codes
                  </Button>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">2FA Settings</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Require 2FA for all users</span>
                      <Switch />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Allow SMS backup</span>
                      <Switch />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Remember device for 30 days</span>
                      <Switch defaultChecked />
                    </div>
                  </div>
                  <Button variant="outline" className="w-full text-red-400 hover:text-red-300">
                    <XCircle className="h-4 w-4 mr-2" />
                    Disable 2FA
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* User 2FA Status */}
          <Card>
            <CardHeader>
              <CardTitle>User 2FA Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {users.map((user) => (
                  <div key={user.id} className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center">
                        <User className="h-4 w-4" />
                      </div>
                      <div>
                        <div className="font-medium">{user.name}</div>
                        <div className="text-sm text-gray-400">{user.email}</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {user.twoFactorEnabled ? (
                        <Badge className="bg-green-600">
                          <Shield className="h-3 w-3 mr-1" />
                          Enabled
                        </Badge>
                      ) : (
                        <Badge className="bg-red-600">
                          <AlertTriangle className="h-3 w-3 mr-1" />
                          Disabled
                        </Badge>
                      )}
                      <Button variant="outline" size="sm">
                        {user.twoFactorEnabled ? "Reset" : "Enable"}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
};

export default SecuritySettings;
