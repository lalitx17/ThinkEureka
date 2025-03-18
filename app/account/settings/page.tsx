import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function SettingsPage() {
  return (
    <div className="container py-8">
      <div className="mb-6">
        <Link
          href="/account"
          className="mb-4 inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground"
        >
          <ChevronLeft className="mr-1 h-4 w-4" />
          Back to Account
        </Link>
        <h1 className="text-2xl font-bold">Settings</h1>
      </div>

      <Tabs defaultValue="account" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3 lg:w-auto">
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
        </TabsList>

        <TabsContent value="account" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>
                Update your account profile information and email address.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="first-name">First Name</Label>
                  <Input id="first-name" defaultValue="John" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last-name">Last Name</Label>
                  <Input id="last-name" defaultValue="Doe" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  defaultValue="john.doe@example.com"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <textarea
                  id="bio"
                  className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="Tell us about yourself"
                  defaultValue="I'm passionate about learning abstract concepts and sharing knowledge."
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Password</CardTitle>
              <CardDescription>
                Update your password to keep your account secure.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current-password">Current Password</Label>
                <Input id="current-password" type="password" />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="new-password">New Password</Label>
                  <Input id="new-password" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm Password</Label>
                  <Input id="confirm-password" type="password" />
                </div>
              </div>

              <Button>Update Password</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Delete Account</CardTitle>
              <CardDescription>
                Permanently delete your account and all of your content.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-sm text-muted-foreground">
                Once you delete your account, there is no going back. This
                action cannot be undone.
              </p>
              <Button variant="destructive">Delete Account</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>
                Choose what notifications you receive and how you receive them.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-sm font-medium">Email Notifications</h3>

                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor="new-content" className="flex-1">
                    New content in your areas of interest
                    <p className="text-sm font-normal text-muted-foreground">
                      Get notified when new animations are added in categories
                      you follow.
                    </p>
                  </Label>
                  <Switch id="new-content" defaultChecked />
                </div>

                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor="comments" className="flex-1">
                    Comments on your activity
                    <p className="text-sm font-normal text-muted-foreground">
                      Get notified when someone replies to your comments.
                    </p>
                  </Label>
                  <Switch id="comments" defaultChecked />
                </div>

                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor="likes" className="flex-1">
                    Likes on your comments
                    <p className="text-sm font-normal text-muted-foreground">
                      Get notified when someone likes your comments.
                    </p>
                  </Label>
                  <Switch id="likes" />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-sm font-medium">Push Notifications</h3>

                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor="push-all" className="flex-1">
                    Enable push notifications
                    <p className="text-sm font-normal text-muted-foreground">
                      Receive push notifications on your device.
                    </p>
                  </Label>
                  <Switch id="push-all" defaultChecked />
                </div>

                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor="push-recommendations" className="flex-1">
                    Recommended content
                    <p className="text-sm font-normal text-muted-foreground">
                      Get notified about content we think you'll like.
                    </p>
                  </Label>
                  <Switch id="push-recommendations" />
                </div>
              </div>

              <div>
                <h3 className="mb-4 text-sm font-medium">
                  Notification Frequency
                </h3>
                <RadioGroup defaultValue="daily">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="realtime" id="realtime" />
                    <Label htmlFor="realtime">Real-time</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="daily" id="daily" />
                    <Label htmlFor="daily">Daily digest</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="weekly" id="weekly" />
                    <Label htmlFor="weekly">Weekly digest</Label>
                  </div>
                </RadioGroup>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appearance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Appearance</CardTitle>
              <CardDescription>
                Customize how ThinkEureka looks on your device.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="theme">Theme</Label>
                <Select defaultValue="system">
                  <SelectTrigger id="theme">
                    <SelectValue placeholder="Select theme" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  Select the theme for the dashboard.
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="font-size">Font Size</Label>
                <Select defaultValue="medium">
                  <SelectTrigger id="font-size">
                    <SelectValue placeholder="Select font size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="small">Small</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="large">Large</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  Select the font size for the dashboard.
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="animations">Enable animations</Label>
                  <Switch id="animations" defaultChecked />
                </div>
                <p className="text-xs text-muted-foreground">
                  Enable or disable animations throughout the interface.
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="autoplay">Autoplay videos</Label>
                  <Switch id="autoplay" />
                </div>
                <p className="text-xs text-muted-foreground">
                  Automatically play videos when viewing animation details.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
