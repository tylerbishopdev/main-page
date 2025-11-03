"use client"

import { Card } from "@/components/ui/card"

export function DataVisualizations() {
  return (
    <div className="w-full max-w-6xl mx-auto space-y-8">


      <div className="grid gap-6 md:grid-cols-3">
        {/* AI Risk Visualization */}
        <Card className="p-6 space-y-4 bg-card border-border">
          <div className="space-y-2">
            <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Apocolypse Probability</h2>
            <p className="text-xs text-muted-foreground">Tylers estimate of % chance AI destroys humanity as we know it within 10 years</p>
            <p className="text-[10px] text-muted-foreground/60">Updated Nov. 2, 2025</p>
          </div>

          <div className="space-y-3">
            <div className="flex items-end gap-4">
              <div className="flex-1 space-y-2">
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl text-primary font-bold tabular-nums">60</span>
                  <span className="text-2xl  text-primary">%</span>
                </div>
                <p className="text-xs font-medium text-destructive">YES</p>
              </div>
              <div className="flex-1 space-y-2">
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl text-secondary/60 font-bold tabular-nums">40</span>
                  <span className="text-2xl text-secondary/60">%</span>
                </div>
                <p className="text-xs font-medium text-muted-foreground">NO</p>
              </div>
            </div>

            <div className="h-3 bg-muted rounded-full overflow-hidden flex">
              <div className="bg-destructive" style={{ width: "60%" }} />
              <div className="bg-secondary/60" style={{ width: "40%" }} />
            </div>
          </div>
        </Card>

        {/* Private Prison Capacity */}
        <Card className="p-6 space-y-4 bg-card border-border">
          <div className="space-y-2">
            <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
              Prison Industrial Complex
            </h2>
            <p className="text-xs text-muted-foreground text-balance">
              Avg. % capacity guaranteed to private prisons by US States
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-baseline gap-2">
              <span className="text-7xl font-bold text-primary tabular-nums">97</span>
              <span className="text-3xl text-muted-foreground">%</span>
            </div>

            <div className="space-y-2">
              <div className="h-3 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-primary transition-all duration-1000 ease-out" style={{ width: "97%" }} />
              </div>
              <p className="text-xs text-muted-foreground">States contractually obligated to keep prisons full</p>
            </div>
          </div>
        </Card>

        {/* S&P 500 Returns */}
        <Card className="p-6 space-y-4 bg-card border-border">
          <div className="space-y-2">
            <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Probably Nothing</h2>
            <p className="text-xs text-muted-foreground text-balance">S&P 500 5-Year Return vs Historical Average</p>
          </div>

          <div className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-baseline justify-between">
                  <span className="text-xs font-medium text-muted-foreground">Current</span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold text-primary tabular-nums">98</span>
                    <span className="text-xl text-primary">%</span>
                  </div>
                </div>
                <div className="h-3 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary transition-all duration-1000 ease-out"
                    style={{ width: "98%" }}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-baseline justify-between">
                  <span className="text-xs font-medium text-muted-foreground">Historical Avg.</span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold text-secondary/60 tabular-nums">37</span>
                    <span className="text-xl text-secondary/60">%</span>
                  </div>
                </div>
                <div className="h-3 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-secondary/50 transition-all duration-1000 ease-out"
                    style={{ width: "37%" }}
                  />
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-border">
              <p className="text-xs text-muted-foreground text-balance">
                <span className="font-medium">2.6×</span> above historical average
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
