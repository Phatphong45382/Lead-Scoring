'use client';

import { ReactNode } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

interface ChartCardProps {
  title: string;
  description?: string;
  children: ReactNode;
  actions?: ReactNode;
  className?: string;
  height?: string;
}

export function ChartCard({ title, description, children, actions, className, height = "h-[350px]" }: ChartCardProps) {
  return (
    <Card className={`bg-white shadow-enterprise-sm ${height} flex flex-col ${className ?? ""}`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 shrink-0">
        <div>
          <CardTitle className="text-sm font-semibold text-slate-900">{title}</CardTitle>
          {description && (
            <CardDescription className="text-xs text-slate-400 mt-0.5">{description}</CardDescription>
          )}
        </div>
        {actions && <div className="flex items-center gap-2">{actions}</div>}
      </CardHeader>
      <CardContent className="flex-1 pt-0 pb-3">{children}</CardContent>
    </Card>
  );
}
