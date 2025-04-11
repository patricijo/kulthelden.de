import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";

import Link from "next/link";

import React from "react";
import { ModeToggle } from "./ToggleTheme";
import { Button } from "./ui/button";
import { Bookmark, Film, Home, Menu, User } from "lucide-react";
import { kultGenres } from "@/data/kultGenres";

export const Navigation = () => {
  return (
    <header className="border-b">
      <div className="container mx-auto flex h-16 items-center gap-4">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl">
          <h2 className="text-gray-900 dark:text-white text-3xl font-bold italic">
            KULT<span className="not-italic">HELDEN</span>
          </h2>
        </Link>

        <div className="hidden md:flex items-center ml-auto gap-4">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link href="/kultschauspieler" passHref legacyBehavior>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Kult-Schaupieler
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Kult-Genres</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-4 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    {kultGenres.map((genre) => {
                      return (
                        <li key={genre.id}>
                          <Link
                            passHref
                            legacyBehavior
                            href={"/kultgenre/" + genre.id + "_" + genre.url}
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <NavigationMenuLink>
                              <div className="text-sm font-medium leading-none">
                                {genre.name}
                              </div>
                              <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                {genre.description}
                              </p>
                            </NavigationMenuLink>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/docs" passHref legacyBehavior>
                  <NavigationMenuLink>Über Kulthelden</NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          <ModeToggle />
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <div className="mb-6 mt-4">{/* <SearchBar /> */}</div>
            <nav className="grid gap-6 py-6">
              <Link
                href="/"
                className="flex items-center gap-2 text-lg font-medium"
              >
                <Home className="h-5 w-5" />
                Kult-Schauspieler
              </Link>
              <Link
                href="#"
                className="flex items-center gap-2 text-lg font-medium"
              >
                <Film className="h-5 w-5" />
                Kult-Genres
              </Link>
              <Link
                href="#"
                className="flex items-center gap-2 text-lg font-medium"
              >
                <User className="h-5 w-5" />
                Artikel
              </Link>
              <Link
                href="#"
                className="flex items-center gap-2 text-lg font-medium"
              >
                <Bookmark className="h-5 w-5" />
                Über Kulthelden
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};
