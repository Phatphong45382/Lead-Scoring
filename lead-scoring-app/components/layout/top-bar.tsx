'use client';

import { Search, Settings, Moon, Bell, ChevronDown, User, LogOut } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface TopBarProps {
    title?: string;
    description?: string;
    action?: React.ReactNode;
}

export function TopBar({ title, description, action }: TopBarProps) {
    return (
        <header className="bg-white border-b border-slate-200">
            <div className="px-6 flex items-center justify-between gap-6 h-16">
                {/* ── Left: Title & Description (stacked) ── */}
                {title ? (
                    <div className="shrink-0">
                        <h2 className="text-lg font-bold text-slate-900 leading-tight tracking-tight">{title}</h2>
                        {description && (
                            <p className="text-[13px] text-slate-400 mt-0.5 leading-snug">{description}</p>
                        )}
                    </div>
                ) : (
                    <div className="shrink-0" />
                )}

                {/* ── Right: Search + Icons + User ── */}
                <div className="flex items-center gap-2">
                    {/* Search Bar */}
                    <div className="relative hidden lg:flex items-center">
                        <Search className="absolute left-3 w-4 h-4 text-slate-400 pointer-events-none" />
                        <Input
                            placeholder="Search..."
                            className="pl-9 pr-4 w-[200px] h-9 rounded-lg bg-slate-50 border-slate-200 text-sm placeholder:text-slate-400 focus-visible:ring-[#3DB9EB]/30 focus-visible:border-[#3DB9EB]"
                        />
                    </div>

                    {/* Icon Buttons */}
                    <div className="hidden md:flex items-center gap-0.5 ml-1">
                        <button
                            className="p-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
                            title="Settings"
                        >
                            <Settings className="w-[18px] h-[18px]" />
                        </button>
                        <button
                            className="p-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
                            title="Dark Mode"
                        >
                            <Moon className="w-[18px] h-[18px]" />
                        </button>
                        <button
                            className="relative p-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
                            title="Notifications"
                        >
                            <Bell className="w-[18px] h-[18px]" />
                            {/* Notification dot */}
                            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white" />
                        </button>
                    </div>

                    {/* Optional action slot */}
                    {action && (
                        <div className="hidden md:flex items-center ml-1">
                            {action}
                        </div>
                    )}

                    {/* Divider */}
                    <div className="hidden md:block w-px h-8 bg-slate-200 mx-1" />

                    {/* User Avatar + Dropdown */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <button className="flex items-center gap-2.5 rounded-lg px-2 py-1.5 hover:bg-slate-50 transition-colors outline-none">
                                <Avatar size="default">
                                    <AvatarImage src="" alt="Admin User" />
                                    <AvatarFallback className="bg-[#3DB9EB] text-white text-xs font-bold">
                                        AU
                                    </AvatarFallback>
                                </Avatar>
                                <div className="hidden md:flex flex-col items-start">
                                    <span className="text-sm font-semibold text-slate-700 leading-tight">Admin User</span>
                                </div>
                                <ChevronDown className="hidden md:block w-4 h-4 text-slate-400" />
                            </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48">
                            <DropdownMenuItem className="gap-2 cursor-pointer">
                                <User className="w-4 h-4" />
                                Profile
                            </DropdownMenuItem>
                            <DropdownMenuItem className="gap-2 cursor-pointer">
                                <Settings className="w-4 h-4" />
                                Settings
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="gap-2 cursor-pointer text-red-600 focus:text-red-600">
                                <LogOut className="w-4 h-4" />
                                Log Out
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </header>
    );
}
