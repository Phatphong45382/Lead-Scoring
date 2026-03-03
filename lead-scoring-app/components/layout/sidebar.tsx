"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    Users,
    PlusCircle,
    Settings,
    Menu,
    Home,
    Target,
    ArrowRightLeft,
    Crown,
    Gem,
    Activity,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useSidebar } from "@/lib/sidebar-context";

const navigation = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Lead Conversion', href: '/lead-conversion', icon: ArrowRightLeft },
    { name: 'Customer Value', href: '/customer-value', icon: Crown },
    { name: 'Lead Value', href: '/lead-value', icon: Gem },
    { name: 'Score New Leads', href: '/new-scoring', icon: PlusCircle },
    { name: 'Model Performance', href: '/model-performance', icon: Activity },
    { name: 'Settings', href: '/settings', icon: Settings },
];

export function Sidebar() {
    const pathname = usePathname();
    const { isCollapsed, setIsCollapsed } = useSidebar();

    return (
        <>
            {/* Desktop Sidebar — SSCI Blue sidebar */}
            <aside
                className={cn(
                    "hidden md:flex md:flex-col md:fixed md:left-0 md:top-0 md:h-screen border-r transition-[width] duration-300 z-40",
                    isCollapsed ? "md:w-20" : "md:w-64"
                )}
                style={{ background: "#1B7FB5", borderColor: "rgba(255,255,255,0.12)" }}
            >
                {/* Header / Logo */}
                <div className={cn(
                    "h-16 flex items-center transition-all",
                    isCollapsed ? "justify-center px-0" : "px-6"
                )}
                    style={{ borderBottom: "1px solid rgba(255,255,255,0.12)" }}
                >
                    <div className="flex items-center gap-3 w-full">
                        <button
                            suppressHydrationWarning
                            onClick={() => setIsCollapsed(!isCollapsed)}
                            className={cn(
                                "p-2 rounded-lg text-white/60 hover:bg-white/10 hover:text-white transition-colors",
                                isCollapsed && "mx-auto"
                            )}
                        >
                            <Menu className="w-5 h-5" />
                        </button>

                        <div className={cn(
                            "flex items-center gap-3 overflow-hidden transition-all duration-300 opacity-100",
                            isCollapsed ? "w-0 opacity-0 hidden" : "w-auto"
                        )}>
                            <div className="w-8 h-8 min-w-[32px] rounded-lg flex items-center justify-center shadow-lg"
                                style={{ background: "#FFC223", boxShadow: "0 4px 12px rgba(255,194,35,0.3)" }}>
                                <Target className="w-4 h-4 text-white" />
                            </div>
                            <div className="whitespace-nowrap">
                                <h1 className="text-base font-bold text-white font-display tracking-tight">SSCI</h1>
                                <p className="text-xs text-white/50 font-medium">Lead Scoring</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Navigation */}
                <nav className={cn(
                    "flex-1 py-6 space-y-1 transition-all",
                    isCollapsed ? "px-2" : "px-4"
                )}>
                    {navigation.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={cn(
                                    "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors duration-200 group",
                                    isCollapsed && "justify-center px-2"
                                )}
                                style={isActive
                                    ? { background: "rgba(255,255,255,0.15)", color: "#FFC223", border: "1px solid rgba(255,194,35,0.25)" }
                                    : { color: "rgba(255,255,255,0.6)", border: "1px solid transparent" }
                                }
                                title={isCollapsed ? item.name : undefined}
                                onMouseEnter={(e) => {
                                    if (!isActive) {
                                        e.currentTarget.style.background = "rgba(255,255,255,0.08)";
                                        e.currentTarget.style.color = "rgba(255,255,255,0.9)";
                                    }
                                }}
                                onMouseLeave={(e) => {
                                    if (!isActive) {
                                        e.currentTarget.style.background = "transparent";
                                        e.currentTarget.style.color = "rgba(255,255,255,0.6)";
                                    }
                                }}
                            >
                                <item.icon className="w-5 h-5 transition-colors min-w-[20px]" />
                                <span className={cn(
                                    "transition-all duration-200 whitespace-nowrap overflow-hidden",
                                    isCollapsed ? "w-0 opacity-0 hidden" : "w-auto opacity-100"
                                )}>
                                    {item.name}
                                </span>
                            </Link>
                        );
                    })}
                </nav>

                {/* Footer */}
                <div className="p-4" style={{ borderTop: "1px solid rgba(255,255,255,0.12)" }}>
                    <div className={cn(
                        "flex items-center gap-3 rounded-lg hover:bg-white/10 transition-colors cursor-pointer",
                        isCollapsed ? "justify-center p-0" : "px-3 py-2"
                    )}>
                        <div className="w-8 h-8 min-w-[32px] bg-white/10 rounded-full flex items-center justify-center border border-white/15">
                            <Users className="w-4 h-4 text-white/60" />
                        </div>
                        <div className={cn(
                            "flex-1 min-w-0 transition-all duration-300 overflow-hidden",
                            isCollapsed ? "w-0 opacity-0 hidden" : "w-auto opacity-100"
                        )}>
                            <p className="text-sm font-medium text-white truncate">Admin User</p>
                            <p className="text-xs text-white/40 truncate">admin@ssci.com</p>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Mobile Sidebar */}
            <Sheet>
                <SheetTrigger asChild>
                    <button
                        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-lg shadow-md text-white"
                        style={{ background: "#1B7FB5", border: "1px solid rgba(255,255,255,0.15)" }}
                        suppressHydrationWarning
                    >
                        <Menu className="w-5 h-5" />
                    </button>
                </SheetTrigger>
                <SheetContent side="left" className="w-64 p-0" style={{ background: "#1B7FB5", borderColor: "rgba(255,255,255,0.12)" }}>
                    {/* Logo */}
                    <div className="h-16 flex items-center px-6" style={{ borderBottom: "1px solid rgba(255,255,255,0.12)" }}>
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 min-w-[32px] rounded-lg flex items-center justify-center shadow-lg"
                                style={{ background: "#FFC223" }}>
                                <Target className="w-4 h-4 text-white" />
                            </div>
                            <div>
                                <h1 className="text-base font-bold text-white">SSCI</h1>
                                <p className="text-xs text-white/50">Lead Scoring</p>
                            </div>
                        </div>
                    </div>

                    {/* Navigation */}
                    <nav className="px-4 py-6 space-y-1">
                        {navigation.map((item) => {
                            const isActive = pathname === item.href;
                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group"
                                    style={isActive
                                        ? { background: "rgba(255,255,255,0.15)", color: "#FFC223", border: "1px solid rgba(255,194,35,0.25)" }
                                        : { color: "rgba(255,255,255,0.6)", border: "1px solid transparent" }
                                    }
                                >
                                    <item.icon className="w-5 h-5 transition-colors" />
                                    <span>{item.name}</span>
                                </Link>
                            );
                        })}
                    </nav>
                </SheetContent>
            </Sheet>
        </>
    );
}
