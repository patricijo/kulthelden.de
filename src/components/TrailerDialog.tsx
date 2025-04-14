"use client";

import { useState } from "react";
import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type TrailerDialogProps = {
  trailerKey?: string;
};

export function TrailerDialog({ trailerKey }: TrailerDialogProps) {
  const [open, setOpen] = useState(false);

  if (!trailerKey) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2 w-full mt-2">
          <Play className="h-4 w-4" />
          <span>Watch Trailer</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="p-0 overflow-hidden w-[calc(100%-6rem)] sm:max-w-5xl ">
        <DialogHeader className="hidden">
          <DialogTitle>Trailer</DialogTitle>
        </DialogHeader>
        <div className="aspect-video w-full">
          <iframe
            src={`https://www.youtube.com/embed/${trailerKey}`}
            title={`Trailer`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
