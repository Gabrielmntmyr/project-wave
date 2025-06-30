import React, { useState } from "react";
import Navigation from "../components/Navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Account = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  if (!isLoggedIn) {
    return (
      <div className="w-screen min-h-screen bg-white">
        <Navigation />
        <div className="container mx-auto py-12 px-4 max-w-md">
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>
            <TabsContent value="login" className="mt-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="your@email.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" />
              </div>
              <Button className="w-full" onClick={() => setIsLoggedIn(true)}>
                Login
              </Button>
            </TabsContent>
            <TabsContent value="register" className="mt-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" placeholder="John Doe" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="reg-email">Email</Label>
                <Input
                  id="reg-email"
                  type="email"
                  placeholder="your@email.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="reg-password">Password</Label>
                <Input id="reg-password" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <Input id="confirm-password" type="password" />
              </div>
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Input type="checkbox" className="w-4 h-4" />
                  <span>I am a photographer and want to sell photos</span>
                </Label>
              </div>
              <Button className="w-full" onClick={() => setIsLoggedIn(true)}>
                Register
              </Button>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    );
  }

  return (
    <div className="w-screen min-h-screen bg-white">
      <Navigation />
      <div className="container mx-auto py-12 px-4">
        <h1 className="text-3xl font-bold mb-8">My Account</h1>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-4">John Doe</h2>
              <p className="text-gray-600 mb-1">john@example.com</p>
              <p className="text-gray-600 mb-6">Photographer</p>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => setIsLoggedIn(false)}
              >
                Logout
              </Button>
            </div>
          </div>

          <div className="md:col-span-2">
            <div className="bg-white border rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-6">Purchase History</h2>

              <div className="space-y-4">
                <div className="flex items-center justify-between border-b pb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gray-100 rounded overflow-hidden">
                      <img
                        src="https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=200&q=80"
                        alt="Purchased photo"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-medium">Morning Surf</h3>
                      <p className="text-sm text-gray-500">
                        Purchased on May 15, 2023
                      </p>
                    </div>
                  </div>
                  <div className="text-lg font-semibold">$25</div>
                </div>

                <div className="flex items-center justify-between border-b pb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gray-100 rounded overflow-hidden">
                      <img
                        src="https://images.unsplash.com/photo-1455729552865-3658a5d39692?w=200&q=80"
                        alt="Purchased photo"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-medium">Perfect Barrel</h3>
                      <p className="text-sm text-gray-500">
                        Purchased on April 3, 2023
                      </p>
                    </div>
                  </div>
                  <div className="text-lg font-semibold">$30</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
