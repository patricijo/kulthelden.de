import { ChevronRight } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

import Link from "next/link";

import React from "react";
import { ModeToggle } from "./ToggleTheme";
import { kultGenres } from "@/data/kultGenres";

import { Collapsible, CollapsibleTrigger } from "./ui/collapsible";
import { CollapsibleContent } from "@radix-ui/react-collapsible";
import { Button } from "./ui/button";
import { SearchBar } from "./SearchBar";

export const Navigation = () => {
  return (
    <header className="border-b bg-white dark:bg-black">
      <div className="max-w-7xl mx-auto flex h-16 items-center gap-4 p-4">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl">
          <h2 className="text-amber-600 text-3xl font-bold italic ">
            KULT<span className="not-italic text-foreground">HELDEN</span>
          </h2>
        </Link>

        <div className="hidden lg:flex items-center ml-auto gap-4">
          <NavigationMenuComponent />
          <ModeToggle />
        </div>
        <SidebarTrigger className="lg:hidden ml-auto" />
      </div>
    </header>
  );
};

const NavigationMenuComponent = () => {
  return (
    <NavigationMenu>
      <NavigationMenuList className="gap-4">
        <SearchBar />
        <NavigationMenuItem>
          <Link href="/kultschauspieler#start">
            <Button
              className="bg-transparent shadow-none"
              variant={"secondary"}
            >
              Kult-Schaupieler
            </Button>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="bg-transparent">
            Kult-Genres
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              {kultGenres.map((genre) => {
                return (
                  <li key={"desktop" + genre.id}>
                    <Link
                      href={
                        "/kultgenre/" + genre.id + "_" + genre.url + "#start"
                      }
                      className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                    >
                      <div>
                        <div className="text-sm font-medium leading-none">
                          {genre.name}
                        </div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          {genre.description}
                        </p>
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <Link href="/kulthelden#start">
          <Button className="bg-transparent shadow-none" variant={"secondary"}>
            Über Kulthelden
          </Button>
        </Link>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export const MobileMenuComponent = () => {
  return (
    <Sidebar side="right">
      <SidebarContent>
        <SidebarGroup className="space-y-2">
          <SearchBar />

          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href={"/kultschauspieler/"}>Kultschauspieler</Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <Collapsible
            title="Kult-Genres"
            defaultOpen
            className="group/collapsible"
          >
            <CollapsibleTrigger className="w-full">
              <SidebarMenuItem>
                <SidebarMenuButton asChild className="w-full">
                  <div className="w-full">
                    Kult-Genres{" "}
                    <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
                  </div>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </CollapsibleTrigger>

            <CollapsibleContent>
              <SidebarGroupContent>
                <SidebarMenu>
                  {kultGenres.map((genre) => {
                    return (
                      <SidebarMenuItem key={"mobile" + genre.id}>
                        <SidebarMenuButton asChild className="ml-4">
                          <Link
                            href={"/kultgenre/" + genre.id + "_" + genre.url}
                          >
                            {genre.name}
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    );
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </Collapsible>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href={"/kulthelden/"}>Über KultHelden</Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};
