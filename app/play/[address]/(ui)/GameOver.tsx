"use client";
import React from "react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const GameOver: React.FC = () => {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle></CardTitle>
          <CardDescription className="flex flex-col items-center justify-betweeen">
            Game Over : <p>The stake has been claimed by Winner
            <br />
            or no stake left to claim</p>
            <br />
            <a className="text-yellow-600" href="/">
              Go Back To Lobby
            </a>
          </CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
};
