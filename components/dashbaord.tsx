"use client"

import { useState } from "react"
import type { ReactNode } from "react"

import { Card } from "@/components/ui/card"

import Image from "next/image"
import Link from "next/link"

import { Bar, BarChart, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

// Data for DVD sales vs violent crime correlation
const correlationData = [
    { year: "2000", dvdSales: 70, violentCrime: 45 },
    { year: "2005", dvdSales: 65, violentCrime: 48 },
    { year: "2010", dvdSales: 45, violentCrime: 52 },
    { year: "2015", dvdSales: 30, violentCrime: 58 },
    { year: "2020", dvdSales: 21, violentCrime: 61 },
    { year: "2025", dvdSales: 15, violentCrime: 63 },
]

const openAIData = [
    { label: "Billion$ Made", value: 1 },
    { label: "Billion$ Lost", value: 7 },
]

type DashboardTabKey = "maybeTrue" | "notArt" | "notOriginals"

interface DashboardProps {
    maybeTrue?: ReactNode
    notArt?: ReactNode
    notOriginals?: ReactNode
}

const SIDEBAR_ITEMS: Array<{ id: DashboardTabKey; label: string; description: string }> = [
    { id: "maybeTrue", label: "Maybe True", description: "Default overview" },
    { id: "notArt", label: "Not Art", description: "Curated counter-examples" },
    { id: "notOriginals", label: "Not Originals", description: "Derivative works & riffs" },
]

export default function Dashboard({ maybeTrue, notArt, notOriginals }: DashboardProps) {
    const [activeTab, setActiveTab] = useState<DashboardTabKey>("maybeTrue")

    const tabContent: Record<DashboardTabKey, ReactNode> = {
        maybeTrue: maybeTrue ?? <DefaultMaybeTrue />,
        notArt: notArt ?? <PlaceholderPane label="Not Art" />,
        notOriginals: notOriginals ?? <PlaceholderPane label="Not Originals" />,
    }

    const activeSidebarItem = SIDEBAR_ITEMS.find((item) => item.id === activeTab) ?? SIDEBAR_ITEMS[0]
    const activeContent = tabContent[activeSidebarItem.id]

    return (
        <div className="bg-linear-to-r from-background via-accent/5 to-backgrond flex h-minscreen min-h-screen w-full flex-col">
            <header className="z-10 mx-auto w-full pt-4 font-mono lg:pt-2">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
                    <div className="flex items-center gap-4">
                        <Link href="/" className="text-lg">
                            <Image src="/logos2.png" alt="NotTyler" width={105} height={105} />
                        </Link>
                        <span className="hidden text-xs uppercase tracking-[0.35em] text-muted-foreground md:inline-block">
                            Signals Dashboard
                        </span>
                    </div>
                    <Link href="/" className="text-sm uppercase tracking-wide text-muted-foreground transition hover:text-secondary">
                        Go Back
                    </Link>
                </div>
            </header>

            <div className="mx-auto flex w-full flex-1 flex-col md:flex-row md:pt-6">
                <aside className="border-border/40 bg-background/80 px-6 py-6 backdrop-blur md:min-h-[720px] md:w-64 md:border-r">
                    <div className="mb-8 space-y-1">
                        <span className="text-[11px] font-ndot uppercase tracking-[0.35em] text-muted-foreground">Views</span>
                        <h2 className="text-2xl font-ndot text-secondary">Dashboard</h2>
                    </div>
                    <nav className="space-y-2">
                        {SIDEBAR_ITEMS.map((item) => {
                            const isActive = item.id === activeTab
                            return (
                                <button
                                    key={item.id}
                                    type="button"
                                    onClick={() => setActiveTab(item.id)}
                                    className={[
                                        "w-full rounded-md border px-4 py-3 text-left transition",
                                        isActive
                                            ? "border-primary bg-primary text-background"
                                            : "border-transparent bg-primary/5 text-muted-foreground hover:border-primary/40 hover:bg-primary/10 hover:text-primary",
                                    ].join(" ")}
                                >
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-ndot uppercase tracking-wide">{item.label}</span>
                                        <span className="text-[10px] font-neuve uppercase tracking-[0.25em]">
                                            {isActive ? "Active" : "Switch"}
                                        </span>
                                    </div>
                                    <p className="mt-1 text-xs text-muted-foreground/80">{item.description}</p>
                                </button>
                            )
                        })}
                    </nav>
                </aside>
                <main className="flex-1 overflow-y-auto px-6 pb-16 pt-8 md:px-10">
                    <div className="mx-auto max-w-7xl space-y-6">
                        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-border/40 pb-6">
                            <div className="space-y-1">
                                <span className="text-[11px] font-ndot uppercase tracking-[0.35em] text-muted-foreground">
                                    Current View
                                </span>
                                <h1 className="text-3xl font-ndot text-secondary">{activeSidebarItem.label}</h1>
                            </div>
                            <span className="text-xs font-neuve uppercase tracking-[0.25em] text-muted-foreground">
                                {activeSidebarItem.description}
                            </span>
                        </div>
                        {activeContent}
                    </div>
                </main>
            </div>
        </div>
    )
}

function PlaceholderPane({ label }: { label: string }) {
    return (
        <div className="flex min-h-[420px] items-center justify-center">
            <Card className="max-w-md space-y-3 p-8 text-center">
                <span className="text-xs font-ndot uppercase tracking-[0.35em] text-muted-foreground">Awaiting Content</span>
                <h3 className="text-xl font-ndot text-secondary">{label}</h3>
                <p className="text-sm text-muted-foreground">
                    Pass a React component to the Dashboard props to populate the{" "}
                    <span className="font-semibold">{label}</span> view.
                </p>
            </Card>
        </div>
    )
}

function DefaultMaybeTrue() {
    return (
        <>
            <div className="grid gap-6 md:grid-cols-3">
                <Card className="p-6">
                    <div className="space-y-4">
                        <div>
                            <h2 className="font-ndot text-lg uppercase tracking-wider text-secondary">Will AI Kill Us All?</h2>
                            <p className="mt-2 text-xs leading-relaxed">Tyler&apos;s 10 year probability of AI destroying us all</p>
                        </div>
                        <div className="mt-14 flex items-end justify-between pb-2">
                            <div>
                                <div className="font-ndot text-6xl text-primary">60%</div>
                                <div className="mt-1 font-ndot text-xs uppercase text-primary">YES</div>
                            </div>
                            <div className="text-right">
                                <div className="font-ndot text-6xl text-accent">40%</div>
                                <div className="mt-1 font-ndot text-xs uppercase text-accent">NO</div>
                            </div>
                        </div>
                        <div className="h-10 overflow-hidden bg-accent">
                            <div className="h-full w-[60%] bg-primary" />
                        </div>
                    </div>
                    <p className="py-1 text-xs font-neuve italic text-muted-foreground">Updated Nov. 2, 2025</p>
                </Card>

                <Card className="p-6">
                    <div className="space-y-6">
                        <div>
                            <h2 className="font-ndot text-lg uppercase tracking-wider text-secondary">PRISON INDUSTRIAL COMPLEX</h2>
                            <p className="mt-2 pb-8 text-xs leading-relaxed">Capacity guaranteed to private prisons: Avg. US State</p>
                        </div>
                        <div className="h-5 overflow-hidden bg-accent">
                            <div className="h-full w-[97%] bg-primary/70" />
                        </div>
                        <div className="font-ndot text-8xl text-primary">
                            97<span className="align-top p-2 text-4xl text-accent">%</span>
                        </div>
                    </div>
                </Card>

                <Card className="p-6">
                    <div className="space-y-4">
                        <div>
                            <h2 className="font-ndot text-lg uppercase tracking-wider text-secondary">Everyone Is Rich Now</h2>
                            <p className="mt-2 pb-8 text-xs leading-relaxed">Just not rich enough to buy a home, healthcare, or pay off loans.</p>
                        </div>
                        <div className="space-y-3">
                            <h2 className="font-neuve w-2/3 rounded-r-full bg-secondary px-4 text-sm tracking-wider text-background">
                                S&amp;P 500 5-Year Return
                            </h2>
                            <div className="flex items-center justify-between">
                                <span className="text-xs">Current</span>
                                <span className="font-ndot text-4xl font-bold text-primary">98%</span>
                            </div>
                            <div className="h-3 overflow-hidden bg-muted">
                                <div className="h-full w-[98%] bg-primary" />
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-xs">Historical Avg.</span>
                                <span className="font-ndot text-4xl font-bold text-accent">37%</span>
                            </div>
                            <div className="h-3 overflow-hidden bg-muted">
                                <div className="h-full w-[37%] bg-accent" />
                            </div>
                        </div>
                        <div className="border-t pt-3">
                            <p className="text-xs">2.6× above historical average</p>
                        </div>
                    </div>
                </Card>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <Card className="p-6">
                    <div className="space-y-4">
                        <div>
                            <h2 className="font-ndot text-xl uppercase tracking-wider text-secondary">DVD Sales Cause Violent Crime</h2>
                            <p className="mt-2 pb-2 text-xs leading-relaxed">The impact of declining DVD sales on violent crime</p>
                        </div>
                        <div className="h-[140px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={correlationData}>
                                    <XAxis dataKey="year" />
                                    <YAxis />
                                    <Line type="monotone" dataKey="violentCrime" stroke="#F1A8A8" strokeWidth={2} />
                                    <Line type="monotone" dataKey="dvdSales" stroke="#fe4543" strokeWidth={2} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="flex justify-between text-xs">
                            <div className="flex items-center gap-2">
                                <div className="h-2 w-2 bg-primary" />
                                <span>DVD Sales % of Media Purchases</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="h-2 w-2 bg-accent" />
                                <span>Violent Crime % of Crime Committed</span>
                            </div>
                        </div>
                    </div>
                </Card>

                <Card className="p-6">
                    <div className="space-y-4">
                        <div>
                            <h2 className="font-ndot text-xl uppercase tracking-wider text-secondary">Intelligent Business</h2>
                            <p className="mt-2 pb-2 text-xs leading-relaxed">
                                How OpenAI is helping to subsidize workforce reduction with massive profit losses
                            </p>
                        </div>
                        <div className="space-y-4">
                            <div className="h-[180px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={openAIData}>
                                        <XAxis dataKey="label" fill="#6E3E3E" />
                                        <Bar dataKey="value" fill="#FF3A3AB4" />
                                        <YAxis domain={[0, 8]} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </>
    )
}
