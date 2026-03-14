"use client"

import { useState } from "react"
import type { ReactNode } from "react"

import { Card } from "@/components/ui/card"

import Image from "next/image"
import Link from "next/link"

import { Bar, BarChart, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import ArtGallery from "@/components/art-gallery"

// Data for DVD sales vs autism diagnosis correlation
const correlationData = [
    { year: "2000", dvdSales: 70, autismRate: 15 },
    { year: "2005", dvdSales: 65, autismRate: 22 },
    { year: "2010", dvdSales: 45, autismRate: 35 },
    { year: "2015", dvdSales: 30, autismRate: 48 },
    { year: "2020", dvdSales: 21, autismRate: 58 },
    { year: "2025", dvdSales: 15, autismRate: 68 },
]

// Currency in circulation (trillions)
const currencyData = [
    { year: "1920", amount: 0.1 },
    { year: "1940", amount: 0.3 },
    { year: "1960", amount: 0.8 },
    { year: "1971", amount: 1.2 },
    { year: "1982", amount: 2.5 },
    { year: "2000", amount: 6.5 },
    { year: "2008", amount: 8.5 },
    { year: "2020", amount: 18.5 },
    { year: "2024", amount: 22.0 },
]

// AI startup investment data (in billions)
const aiInvestmentData = [
    { company: "OpenAI", invested: 14.0 },
    { company: "Anthropic", invested: 4.2 },
    { company: "Databricks", invested: 4.0 },
    { company: "Shield AI", invested: 1.1 },
    { company: "Figure", invested: 0.9 },
    { company: "Mistral", invested: 0.5 },
]

type DashboardTabKey = "maybeTrue" | "notArt" | "notOriginals"

interface DashboardProps {
    maybeTrue?: ReactNode
    notArt?: ReactNode
    notOriginals?: ReactNode
}

const SIDEBAR_ITEMS: Array<{ id: DashboardTabKey; label: string; description: string }> = [
    { id: "maybeTrue", label: "Kinda-Facts©", description: "Default overview" },
    { id: "notArt", label: "Mostly Arts", description: "not for sale, but maybe for sale" },
    { id: "notOriginals", label: "Cult Resources", description: "learn how to think like a genius" },
]

export default function Dashboard({ maybeTrue, notArt, notOriginals }: DashboardProps) {
    const [activeTab, setActiveTab] = useState<DashboardTabKey>("maybeTrue")

    const tabContent: Record<DashboardTabKey, ReactNode> = {
        maybeTrue: maybeTrue ?? <DefaultMaybeTrue />,
        notArt: notArt ?? <ArtGallery />,
        notOriginals: notOriginals ?? <PlaceholderPane label="Not Originals" />,
    }

    const activeSidebarItem = SIDEBAR_ITEMS.find((item) => item.id === activeTab) ?? SIDEBAR_ITEMS[0]
    const activeContent = tabContent[activeSidebarItem.id]

    return (
        <div className="bg-linear-to-r from-background via-accent/5 to-backgrond flex h-minscreen min-h-screen w-full flex-col">
            <header className="z-10 mx-auto w-full pb-2 pt-4 font-mono lg:pt-2">
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

            <div className="mx-auto flex w-full flex-1 flex-col md:flex-row md:pt-0 border-t border-accent/10">
                <aside className="border-accent/10 bg-background/80 px-6 py-6 backdrop-blur md:min-h-[720px] md:w-64 md:border-r">
                    <div className="mb-8 space-y-1">
                        <span className="text-[11px] tracking-loosefont-ndot uppercase text-accent">status: brilliant</span>
                        <h2 className="text-2xl font-ndot text-primary">Not Dashboard</h2>
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

                                    </div>

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
        <div className="flex min-h-[500px] items-center justify-center">
            <Card className="max-w-md space-y-1 p-8 text-center bg-primary/20">
                <span className="text-3xl font-ndot uppercase  text-primary">Give me a sec</span>

                <p className=" text-foreground/50">
                    Check back soon. I am probably busy with something else that&apos;s awesome else you should check out until then.
                </p>
            </Card>
        </div>
    )
}

function DefaultMaybeTrue() {
    return (
        <>
            <div className="grid gap-3 md:grid-cols-3">
                <Card className="p-6">
                    <div className="space-y-4">
                        <div>
                            <h2 className="font-ndot text-lg uppercase tracking-wider text-secondary">Will AI Kill Us All?</h2>
                            <p className="mt-2 text-xs leading-relaxed">Tyler&apos;s 10 year probability of AI destroying us all</p>
                        </div>
                        <div className="mt-14 flex items-end justify-between pb-2">
                            <div>
                                <div className="font-ndot text-6xl text-primary">80%</div>
                                <div className="mt-1 font-ndot text-xs uppercase text-primary">YES</div>
                            </div>
                            <div className="text-right">
                                <div className="font-ndot text-6xl text-accent">20%</div>
                                <div className="mt-1 font-ndot text-xs uppercase text-accent">NO</div>
                            </div>
                        </div>
                        <div className="h-10 overflow-hidden bg-accent">
                            <div className="h-full w-[80%] bg-primary" />
                        </div>
                    </div>
                    <p className="py-1 text-xs font-neuve italic text-muted-foreground">Updated Mar. 9, 2026</p>
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
                            <h2 className="font-ndot text-lg uppercase tracking-wider text-secondary">Currency in Circulation</h2>
                            <p className="mt-2 text-xs leading-relaxed">U.S. currency in circulation (trillions). Source: Federal Reserve</p>
                        </div>
                        <div className="h-[140px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={currencyData}>
                                    <XAxis dataKey="year" tick={{ fontSize: 9 }} />
                                    <YAxis tick={{ fontSize: 9 }} />
                                    <Line type="monotone" dataKey="amount" stroke="#fe4543" strokeWidth={2} dot={false} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="space-y-1 pt-2">
                            <div className="flex items-center justify-between text-xs">
                                <span>1971: Nixon ends gold standard</span>
                                <span className="font-ndot text-primary">$1.2T</span>
                            </div>
                            <div className="flex items-center justify-between text-xs">
                                <span>2020: COVID go brrr</span>
                                <span className="font-ndot text-primary">$22T</span>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>

            <div className="grid gap-3 md:grid-cols-2">
                <Card className="p-6">
                    <div className="space-y-4">
                        <div>
                            <h2 className="font-ndot text-xl uppercase tracking-wider text-secondary">DVD Sales Drop Causing Autism</h2>
                            <p className="mt-2 pb-2 text-xs leading-relaxed">Exposed: the undeniable correlation between declining DVD sales and rising autism diagnoses.</p>
                        </div>
                        <div className="h-[140px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={correlationData}>
                                    <XAxis dataKey="year" />
                                    <YAxis />
                                    <Line type="monotone" dataKey="autismRate" stroke="#F1A8A8" strokeWidth={2} />
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
                                <span>Autism Diagnoses per 10k</span>
                            </div>
                        </div>
                    </div>
                </Card>

                <Card className="p-6">
                    <div className="space-y-4">
                        <div>
                            <h2 className="font-ndot text-xl uppercase tracking-wider text-secondary">Instead of Fixing Healthcare</h2>
                            <p className="mt-2 pb-2 text-xs leading-relaxed">
                                Capital invested in top AI startups (billions USD). Source: CB Insights
                            </p>
                        </div>
                        <div className="space-y-2">
                            {aiInvestmentData.map((item) => (
                                <div key={item.company} className="space-y-1">
                                    <div className="flex items-center justify-between text-xs">
                                        <span className="font-ndot uppercase">{item.company}</span>
                                        <span className="font-ndot text-primary">${item.invested}B</span>
                                    </div>
                                    <div className="h-3 overflow-hidden bg-muted">
                                        <div
                                            className="h-full bg-primary/80"
                                            style={{ width: `${(item.invested / 14) * 100}%` }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="border-t pt-2">
                            <p className="text-xs font-neuve italic text-muted-foreground">Total: $24.7B invested in making robots instead</p>
                        </div>
                    </div>
                </Card>
            </div>
        </>
    )
}
