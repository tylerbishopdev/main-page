"use client"

import { Card } from "@/components/ui/card"

import Link from "next/link";
import Image from "next/image";

import { Line, LineChart, XAxis, YAxis, ResponsiveContainer, Bar, BarChart } from "recharts"

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

export default function Dashboard() {
    return (
        <div className="bg-linear-to-r from-background via-accent/5 to-backgrond w-full h-minscreen mx-auto flex flex-col" >
            <header className="w-full pt-4 lg:pt-2  font-mono z-10 mx-auto">
                <div className="flex justify-center items-center max-w-7xl mx-auto">
                    <Link href="/" className="text-lg">
                        <Image src="/logos2.png" alt="NotTyler" width={105} height={105} />
                    </Link>
                    <Link href="/" className="text-lg px-10 hover:text-secondary">Go Back</Link>
                </div>
            </header>

            <div className="min-h-screen p-8">
                <div className="mx-auto max-w-7xl space-y-6">


                    {/* First Row - Original Three Cards */}
                    <div className="grid gap-6 md:grid-cols-3">
                        {/* Apocalypse Probability */}
                        <Card className="p-6">
                            <div className="space-y-4">
                                <div>
                                    <h2 className="text-lg text-secondary  font-ndot uppercase tracking-wider">Will AI Kill Us All?</h2>
                                    <p className="mt-2 text-xs leading-relaxed">
                                        Tyler&apos;s 10 year probability of AI destroying us all
                                    </p>

                                </div>

                                <div className="flex items-end justify-between pb-2 mt-14">
                                    <div>
                                        <div className="text-6xl  font-ndot text-primary">60%</div>
                                        <div className="mt-1 text-xs uppercase font-ndot  text-primary">YES</div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-6xl  font-ndot text-accent">40%</div>
                                        <div className="mt-1 text-xs uppercase font-ndot text-accent">NO</div>
                                    </div>
                                </div>

                                <div className="h-10 overflow-hidden bg-accent">
                                    <div className="h-full w-[60%] bg-primary" />
                                </div>
                            </div>
                            <p className="mb-1 text-xs font-neuve text-muted-foreground py-1 italic">Updated Nov. 2, 2025</p>
                        </Card>

                        {/* Prison Industrial Complex */}
                        <Card className="p-6">
                            <div className="space-y-6">
                                <div>
                                    <h2 className="text-lg text-secondary  font-ndot uppercase tracking-wider">PRISON INDUSTRIAL COMPLEX</h2>
                                    <p className="mt-2 text-xs leading-relaxed pb-8">
                                        Capacity guaranteed to private prisons: Avg. US State
                                    </p>
                                </div>
                                <div className="h-5 overflow-hidden bg-accent">
                                    <div className="h-full w-[97%] bg-primary/70" />
                                </div>
                                <div className="text-8xl font-ndot text-primary">97<span className="text-4xl p-2 text-accent align-top">%</span></div>




                            </div>
                        </Card>

                        {/* Probably Nothing */}
                        <Card className="p-6">
                            <div className="space-y-4">
                                <div>
                                    <h2 className="text-lg text-secondary  font-ndot uppercase tracking-wider">Everyone Is Rich Now</h2>
                                    <p className="mt-2 text-xs leading-relaxed pb-8">Just not rich enough to buy a home, healthcare, or pay off loans.</p>
                                </div>

                                <div className="space-y-3">
                                    <h2 className=" font-neuve text-sm text-background tracking-wider bg-secondary rounded-r-full w-2/3 full px-4">S&P 500 5-Year Return</h2>
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs">Current</span>
                                        <span className="text-4xl font-ndot text-primary font-bold">98%</span>
                                    </div>
                                    <div className="h-3 overflow-hidden bg-muted">
                                        <div className="h-full w-[98%] bg-primary" />
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <span className="text-xs">Historical Avg.</span>
                                        <span className="text-4xl font-ndot text-accent font-bold">37%</span>
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

                    {/* Second Row - New Data Cards */}
                    <div className="grid gap-6 md:grid-cols-2">
                        {/* DVD Sales vs Violent Crime */}
                        <Card className="p-6">
                            <div className="space-y-4">
                                <div>
                                    <h2 className="text-xl font-ndot text-secondary uppercase tracking-wider">DVD Sales Cause Violent Crime</h2>
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
                        {/* OpenAI Losses */}
                        <Card className="p-6">
                            <div className="space-y-4">
                                <div>
                                    <h2 className="text-xl font-ndot text-secondary uppercase tracking-wider">Intelligent Business</h2>
                                    <p className="mt-2 pb-2 text-xs leading-relaxed">How OpenAI is helping to subsidize workfore reduction with massive profit losses</p>
                                </div>

                                <div className="h-[180px] space-y-4">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart data={openAIData}>
                                            <XAxis dataKey="label" fill="#6E3E3E" />
                                            <Bar dataKey="value" fill="#FF3A3AB4" />
                                            <YAxis domain={[0, 8]} />

                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                        </Card>
                    </div>

                </div>
            </div >
        </div >
    )
}
