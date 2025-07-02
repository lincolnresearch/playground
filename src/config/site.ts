export type SiteConfig = typeof siteConfig;

export const siteConfig = {
    name: "Nano Portfolio Dashboard",
    description: "Members only all night club",
    userMainNavItems: [
        {
            label: "Lounge",
            href: "/",
        },
        {
            label: "Account",
            href: "/",
        },
        {
            label: "Logout",
            href: "/",
        }
    ],
    userLoungeNavItems: [
        {
            label: "Home",
            href: "/",
        },
        {
            label: "Voyeur zone",
            href: "/",
        },
        {
            label: "Floor show performance",
            href: "/",
        },
        {
            label: "Private Sessions (VIP Only)",
            href: "/",
        }
    ],
    navItems: [
        {
            label: "Home",
            href: "/",
        },
        {
            label: "Membership",
            href: "/pricing",
        },
        {
            label: "About",
            href: "/about",
        },
    ],
    navMenuItems: [
        {
            label: "Profile",
            href: "/profile",
        },
        {
            label: "Dashboard",
            href: "/dashboard",
        },
        {
            label: "Projects",
            href: "/projects",
        },
        {
            label: "Team",
            href: "/team",
        },
        {
            label: "Calendar",
            href: "/calendar",
        },
        {
            label: "Settings",
            href: "/settings",
        },
        {
            label: "Help & Feedback",
            href: "/help-feedback",
        },
        {
            label: "Logout",
            href: "/logout",
        },
    ],
    links: {
        github: "https://github.com/frontio-ai/heroui",
        twitter: "https://twitter.com/hero_ui",
        docs: "https://heroui.com",
        discord: "https://discord.gg/9b6yyZKmH4",
        sponsor: "https://patreon.com/jrgarciadev",
    },
};
