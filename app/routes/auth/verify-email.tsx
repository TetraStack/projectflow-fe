import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useVerifyEmailMutation } from "@/hooks/use-auth";
import {
  ArrowLeft,
  CheckCircle,
  ChevronLeft,
  Loader2,
  XCircle,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router";

const VerifyEmail = () => {
  const [searchParamas] = useSearchParams();

  const {
    mutate: verify,
    isPending: isVerifying,
    isSuccess: verifiedSuccessfully,
  } = useVerifyEmailMutation();

  useEffect(() => {
    const token = searchParamas.get("token");

    if (!token) {
    } else {
      verify({ token });
    }
  }, [searchParamas]);
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-background">
      <Card className="max-w-md w-full">
        <CardContent>
          <div className="flex flex-col items-center justify-center py-6">
            {isVerifying ? (
              <>
                <Loader2 className="size-15 text-primary animate-spin" />
                <h3 className="text-lg font-semibold">Verifying email</h3>
                <p className="text-sm text-gray-500">
                  Please wait while we verify your email.
                </p>
              </>
            ) : verifiedSuccessfully ? (
              <>
                <CheckCircle className="size-10 text-green-500" />
                <h3 className="text-lg font-semibold">Email Verified</h3>
                <p className="text-sm text-gray-500 mb-6">
                  Your email has been verified successfully
                </p>
                <Link to={"/sign-in"} className="flex text-sm items-center">
                  <Button className="text-background cursor-pointer">
                    Back to Sing in
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <XCircle className="size-10 text-red-500" />
                <h3 className="text-lg font-semibold">
                  Email Verification failed
                </h3>
                <p className="text-sm text-gray-500 text-center ">
                  Your email verification failed.Please try again.
                </p>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VerifyEmail;
