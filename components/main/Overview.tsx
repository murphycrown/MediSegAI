'use client';
import React,{useRef,useState,useEffect} from 'react';
import StatCard from '../StatCard';
export default function Overview({latestVitals}:any){

    return(
          <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
                            <header className="flex justify-between items-end">
                                <div>
                                    <h2 className="text-3xl font-bold text-white tracking-tight">Clinical Dashboard</h2>
                                    <p className="text-slate-400 mt-1">Systems are nominal. 12 data points analyzed today.</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm text-slate-500 font-medium">{new Date().toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}</p>
                                </div>
                            </header>

                            {/* Stats Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                <StatCard
                                    title="Heart Rate"
                                    value={latestVitals?.heartRate || "No Data"}
                                    unit={latestVitals?.heartRate ? "bpm" : ""}
                                    color="rose"
                                    trend={latestVitals?.heartRate ? "+2.4%" : null}
                                    icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2" /></svg>}
                                />
                                <StatCard
                                    title="Sleep Efficiency"
                                    value={latestVitals?.sleepEfficiency || "No Data"}
                                    unit={latestVitals?.sleepEfficiency ? "%" : ""}
                                    color="blue"
                                    trend={latestVitals?.sleepEfficiency ? "+1.2%" : null}
                                    icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" /></svg>}
                                />
                                <StatCard
                                    title="Spo2 Levels"
                                    value={latestVitals?.spo2 || "No Data"}
                                    unit={latestVitals?.spo2 ? "%" : ""}
                                    color="teal"
                                    trend={latestVitals?.spo2 ? "+0.5%" : null}
                                    icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><path d="M12 16V8M8 12h8" /></svg>}
                                />
                                <StatCard
                                    title="Daily Activity"
                                    value={latestVitals?.dailyActivity ? parseInt(latestVitals.dailyActivity).toLocaleString() : "No Data"}
                                    unit={latestVitals?.dailyActivity ? "steps" : ""}
                                    color="amber"
                                    trend={latestVitals?.dailyActivity ? "-4.1%" : null}
                                    icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" /></svg>}
                                />
                            </div>

                            {/* Main Analytics Section */}
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                <div className="lg:col-span-2 backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 blur-[80px] rounded-full -mr-20 -mt-20 group-hover:bg-blue-500/20 transition-colors duration-700" />
                                    <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse" />
                                        AI Diagnostic Analysis Results
                                    </h3>

                                    <div className="space-y-6 relative z-10">
                                        {(!latestVitals ? [
                                            { area: "Systolic BP", score: 0, status: "No Data", color: "text-blue-400" },
                                            { area: "Diastolic BP", score: 0, status: "No Data", color: "text-teal-400" },
                                            { area: "Heart Rate", score: 0, status: "No Data", color: "text-amber-400" },
                                        ] : [
                                            {
                                                area: "Systolic BP",
                                                score: Math.min(100, (Number(latestVitals.systolic) / 180) * 100),
                                                status: `${latestVitals.systolic} mmHg`,
                                                color: "text-blue-400"
                                            },
                                            {
                                                area: "Diastolic BP",
                                                score: Math.min(100, (Number(latestVitals.diastolic) / 120) * 100),
                                                status: `${latestVitals.diastolic} mmHg`,
                                                color: "text-teal-400"
                                            },
                                            {
                                                area: "Heart Rate",
                                                score: Math.min(100, (Number(latestVitals.heartRate) / 150) * 100),
                                                status: `${latestVitals.heartRate} bpm`,
                                                color: "text-amber-400"
                                            },
                                        ]).map((item, i) => (
                                            <div key={i} className="group/item">
                                                <div className="flex justify-between items-center mb-2">
                                                    <span className="text-slate-300 font-medium">{item.area}</span>
                                                    <span className={`text-sm font-bold ${item.color}`}>{item.status}</span>
                                                </div>
                                                <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                                                    <div
                                                        className={`h-full bg-gradient-to-r from-blue-600 to-teal-400 transition-all duration-1000 ease-out`}
                                                        style={{ width: `${item.score}%` }}
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="mt-10 p-4 rounded-2xl bg-white/5 border border-white/10 flex items-start gap-4">
                                        <div className="p-3 rounded-xl bg-blue-500/10 text-blue-400">
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" /></svg>
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold text-white">AI Recommendation</p>
                                            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                                                {latestVitals
                                                    ? "System suggests increasing hydration levels and scheduling a supplementary HRV scan by Friday."
                                                    : "Please log your clinical vitals to receive personalized AI health recommendations."
                                                }
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8">
                                    <h3 className="text-xl font-bold text-white mb-6">Patient Pipeline</h3>
                                    <div className="space-y-4">
                                        {[
                                            { name: "John Doe", type: "Radiology", time: "09:00" },
                                            { name: "Sarah Smith", type: "Pathology", time: "11:30" },
                                            { name: "Mark Wilson", type: "General", time: "14:15" },
                                            { name: "Ellen White", type: "Genetics", time: "16:00" },
                                        ].map((p, i) => (
                                            <div key={i} className="flex items-center justify-between p-3 rounded-2xl hover:bg-white/5 transition-colors cursor-pointer group">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)] group-hover:scale-125 transition-transform" />
                                                    <div>
                                                        <p className="text-sm font-bold text-white leading-none">{p.name}</p>
                                                        <p className="text-[10px] text-slate-500 mt-1">{p.type}</p>
                                                    </div>
                                                </div>
                                                <span className="text-[10px] font-medium text-slate-600 group-hover:text-blue-400 transition-colors uppercase">{p.time}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <button className="w-full mt-6 py-3 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 text-slate-400 hover:text-white transition-all text-xs font-bold uppercase tracking-widest">
                                        View All Rounds
                                    </button>
                                </div>
                            </div>
                        </div>
    )
}