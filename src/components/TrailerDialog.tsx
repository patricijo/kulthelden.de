"use client";

import { useState, useEffect } from "react";
import { Play, Info } from "lucide-react";
import Cookies from "js-cookie";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Link from "next/link";

type TrailerDialogProps = {
  trailerKey?: string;
};

export function TrailerDialog({ trailerKey }: TrailerDialogProps) {
  const [open, setOpen] = useState(false);
  const [hasConsent, setHasConsent] = useState(false);

  useEffect(() => {
    if (open) {
      const consentCookie = Cookies.get("allow-YT");
      setHasConsent(consentCookie === "true");
    }
  }, [open]);

  if (!trailerKey) {
    return null;
  }

  const handleAccept = () => {
    Cookies.set("allow-YT", "true", { expires: 365, path: "/" });
    setHasConsent(true);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2 w-full mt-2 cursor-pointer">
          <Play className="h-4 w-4" />
          <span>Trailer Anschauen</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="p-0 overflow-hidden w-[calc(100%-6rem)] sm:max-w-5xl ">
        <DialogHeader className="hidden">
          <DialogTitle>Trailer</DialogTitle>
        </DialogHeader>
        {hasConsent ? (
          <div className="aspect-video w-full">
            <iframe
              src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1`}
              title={`Trailer`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          </div>
        ) : (
          <div className="p-6 flex flex-col items-center justify-center text-center aspect-video">
            <Info className="w-12 h-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">
              Zustimmung erforderlich
            </h3>
            <p className="text-sm text-muted-foreground mb-4 max-w-md">
              Um den YouTube-Trailer anzuzeigen, müssen Sie der
              Datenverarbeitung durch Google zustimmen. Weitere Informationen
              finden Sie in unserer{" "}
              <Link
                href="/datenschutz"
                className="underline hover:text-primary"
              >
                Datenschutzerklärung
              </Link>
              .
            </p>
            <Button onClick={handleAccept}>Zustimmen und Trailer laden</Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
