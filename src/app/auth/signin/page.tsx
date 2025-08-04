"use client";

import { getSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function SignInPage() {
  const router = useRouter();

  useEffect(() => {
    getSession().then((session) => {
      if (session) {
        router.push("/");
      }
    });
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-gray-900">
            NutriTrack Pro
          </CardTitle>
          <CardDescription className="text-lg text-gray-600">
            Your comprehensive meal planning and health tracking platform
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center p-6">
            <p className="text-gray-600 mb-4">
              Authentication is currently disabled for development.
            </p>
            <p className="text-sm text-gray-500">
              To enable authentication, configure your preferred auth provider in the auth configuration.
            </p>
          </div>
          <Button
            onClick={() => router.push("/")}
            className="w-full h-12 text-lg font-semibold"
            size="lg"
          >
            Continue to Dashboard
          </Button>
          <p className="text-sm text-gray-500 text-center">
            Development mode - no authentication required
          </p>
        </CardContent>
      </Card>
    </div>
  );
} 