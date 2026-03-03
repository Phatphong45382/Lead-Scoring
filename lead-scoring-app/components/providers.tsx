'use client';

import { SearchProvider } from "@/lib/search-context";
import { SidebarProvider } from "@/lib/sidebar-context";
import { DashboardPublishProvider } from "@/lib/dashboard-publish-context";

export function AppProviders({ children }: { children: React.ReactNode }) {
    return (
        <SearchProvider>
            <SidebarProvider>
                <DashboardPublishProvider>
                    {children}
                </DashboardPublishProvider>
            </SidebarProvider>
        </SearchProvider>
    );
}
