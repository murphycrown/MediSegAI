"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Sparkles, User, Send, Brain, ChevronRight, Loader2, Menu, X, ClipboardList, Plus, History, Activity } from "lucide-react";
import  ParticleBackground  from "@/components/ParticleBackground";
import { MessageBubble } from "@/components/MessageBubble";
import Overview from "@/components/main/Overview";
import StatCard from "@/components/StatCard";
import AIasistant from "@/components/main/AIasistant";
// --- Particle Animation Component (Reused from landing page for consistency) ---
// const ParticleBackground = () => {
//     const canvasRef = useRef<HTMLCanvasElement>(null);

//     useEffect(() => {
//         const canvas = canvasRef.current;
//         if (!canvas) return;
//         const ctx = canvas.getContext("2d");
//         if (!ctx) return;

//         let particles: Particle[] = [];
//         let animationFrameId: number;
//         let mouse = { x: -100, y: -100, radius: 150 };

//         class Particle {
//             x: number;
//             y: number;
//             size: number;
//             baseX: number;
//             baseY: number;
//             density: number;
//             color: string;

//             constructor(x: number, y: number) {
//                 this.x = x;
//                 this.y = y;
//                 this.size = Math.random() * 2 + 1;
//                 this.baseX = this.x;
//                 this.baseY = this.y;
//                 this.density = (Math.random() * 30) + 1;
//                 const colors = ['#2dd4bf', '#3b82f6', '#ffffff'];
//                 this.color = colors[Math.floor(Math.random() * colors.length)];
//             }

//             draw() {
//                 if (!ctx) return;
//                 ctx.fillStyle = this.color;
//                 ctx.beginPath();
//                 ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
//                 ctx.closePath();
//                 ctx.fill();
//             }

//             update() {
//                 let dx = mouse.x - this.x;
//                 let dy = mouse.y - this.y;
//                 let distance = Math.sqrt(dx * dx + dy * dy);
//                 let forceDirectionX = dx / distance;
//                 let forceDirectionY = dy / distance;
//                 let maxDistance = mouse.radius;
//                 let force = (maxDistance - distance) / maxDistance;
//                 let directionX = forceDirectionX * force * this.density;
//                 let directionY = forceDirectionY * force * this.density;

//                 if (distance < mouse.radius) {
//                     this.x -= directionX;
//                     this.y -= directionY;
//                 } else {
//                     if (this.x !== this.baseX) {
//                         let dxBase = this.x - this.baseX;
//                         this.x -= dxBase / 10;
//                     }
//                     if (this.y !== this.baseY) {
//                         let dyBase = this.y - this.baseY;
//                         this.y -= dyBase / 10;
//                     }
//                 }
//             }
//         }

//         const init = () => {
//             particles = [];
//             const particleCount = (window.innerWidth * window.innerHeight) / 10000;
//             for (let i = 0; i < particleCount; i++) {
//                 let x = Math.random() * canvas.width;
//                 let y = Math.random() * canvas.height;
//                 particles.push(new Particle(x, y));
//             }
//         };

//         const animate = () => {
//             ctx.clearRect(0, 0, canvas.width, canvas.height);
//             for (let i = 0; i < particles.length; i++) {
//                 particles[i].update();
//                 particles[i].draw();
//             }

//             for (let a = 0; a < particles.length; a++) {
//                 for (let b = a; b < particles.length; b++) {
//                     let dx = particles[a].x - particles[b].x;
//                     let dy = particles[a].y - particles[b].y;
//                     let distance = Math.sqrt(dx * dx + dy * dy);

//                     if (distance < 100) {
//                         ctx.strokeStyle = `rgba(59, 130, 246, ${1 - (distance / 100) * 0.3})`;
//                         ctx.lineWidth = 0.5;
//                         ctx.beginPath();
//                         ctx.moveTo(particles[a].x, particles[a].y);
//                         ctx.lineTo(particles[b].x, particles[b].y);
//                         ctx.stroke();
//                     }
//                 }
//             }

//             animationFrameId = requestAnimationFrame(animate);
//         };

//         const handleResize = () => {
//             canvas.width = window.innerWidth;
//             canvas.height = window.innerHeight;
//             init();
//         };

//         window.addEventListener("resize", handleResize);
//         window.addEventListener("mousemove", (e) => {
//             mouse.x = e.x;
//             mouse.y = e.y;
//         });

//         handleResize();
//         animate();

//         return () => {
//             window.removeEventListener("resize", handleResize);
//             cancelAnimationFrame(animationFrameId);
//         };
//     }, []);

//     return (
//         <canvas
//             ref={canvasRef}
//             className="absolute inset-0 pointer-events-none z-0 opacity-30"
//         />
//     );
// };

// --- Dashboard Components ---

const SidebarItem = ({ icon, label, id, active, onClick }: any) => (
    <button
        onClick={() => onClick(id)}
        className={`w-full flex items-center gap-4 px-4 py-3 rounded-2xl transition-all duration-300 ${active
            ? "bg-blue-600/20 text-blue-400 border border-blue-500/20"
            : "text-slate-400 hover:bg-white/5 hover:text-slate-200"
            }`}
    >
        <div className={`${active ? "text-blue-400" : "text-slate-500"}`}>{icon}</div>
        <span className="font-medium">{label}</span>
    </button>
);



//     <div className={`flex flex-col ${role === 'user' ? 'items-end' : 'items-start'} mb-3 group animate-in slide-in-from-bottom-2 duration-300`}>
//         <div className={`flex items-start gap-3 max-w-[95%] md:max-w-[75%] ${role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
//             <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 border shadow-sm ${role === 'user'
//                 ? "bg-blue-600/20 border-blue-500/30 text-blue-400"
//                 : "bg-teal-500/20 border-teal-500/30 text-teal-400"
//                 }`}>
//                 {role === 'user' ? <User size={12} /> : <Activity size={12} />}
//             </div>

//             <div className={`leading-relaxed ${role === 'user'
//                 ? "py-2 px-4 bg-blue-600 text-white rounded-2xl rounded-tr-none shadow-md shadow-blue-500/10 text-base"
//                 : "py-1 text-slate-100 text-base"
//                 }`}>
//                 <div className={`prose prose-invert prose-base max-w-none ${role === 'user' ? '[&_p]:text-white' : '[&_p]:text-slate-200'}`}>
//                     <ReactMarkdown
//                         remarkPlugins={[remarkGfm]}
//                         components={{
//                             p: ({ children }) => <p className="mb-2 last:mb-0 leading-relaxed text-base">{children}</p>,
//                             ul: ({ children }) => <ul className="list-disc ml-5 space-y-1.5 my-2 text-base">{children}</ul>,
//                             ol: ({ children }) => <ol className="list-decimal ml-5 space-y-1.5 my-2 text-base">{children}</ol>,
//                             li: ({ children }) => <li className="pl-1 text-base">{children}</li>,
//                             code: (props: any) => {
//                                 const { children, className, node, ...rest } = props;
//                                 const match = /language-(\w+)/.exec(className || '');
//                                 return match ? (
//                                     <pre className="bg-black/40 p-2.5 rounded-lg overflow-x-auto my-1.5 border border-white/5">
//                                         <code className={`${className} text-xs`} {...rest}>{children}</code>
//                                     </pre>
//                                 ) : (
//                                     <code className="bg-white/10 px-1 py-0.5 rounded text-teal-300 font-mono text-xs" {...rest}>{children}</code>
//                                 )
//                             },
//                             table: ({ children }) => (
//                                 <div className="overflow-x-auto my-3 rounded-lg border border-white/10">
//                                     <table className="w-full text-left border-collapse text-xs">{children}</table>
//                                 </div>
//                             ),
//                             th: ({ children }) => <th className="bg-white/5 p-1.5 text-[10px] font-bold border-b border-white/10 uppercase tracking-wider">{children}</th>,
//                             td: ({ children }) => <td className="p-1.5 border-b border-white/5 text-slate-400">{children}</td>,
//                             strong: ({ children }) => <strong className="font-bold text-white">{children}</strong>,
//                         }}
//                     >
//                         {content}
//                     </ReactMarkdown>
//                 </div>
//             </div>
//         </div>
//         <span className={`text-[10px] text-slate-500 mt-1 px-10 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300`}>
//             {time}
//         </span>
//     </div>
// );

// --- Main Page Component ---

export default function MainPage() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [activeTab, setActiveTab] = useState("overview");
    const [medicalRecords, setMedicalRecords] = useState<any[]>([]);
    const [isSubmittingRecord, setIsSubmittingRecord] = useState(false);
    const [recordForm, setRecordForm] = useState({
        type: "Blood Pressure",
        systolic: "",
        diastolic: "",
        heartRate: "",
        sleepEfficiency: "",
        spo2: "",
        dailyActivity: "",
        analysis: ""
    });
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
  

    const [latestVitals, setLatestVitals] = useState<any>(null);
    const router = useRouter();


  

   
    useEffect(() => {
        fetch("/api/me")
            .then(res => {
                if (!res.ok) throw new Error("Not logged in");
                return res.json();
            })
            .then(data => { setName(data.user.name); setEmail(data.user.email) })
            .catch(() => router.push("/login"));
    }, [router]);
   



    const fetchRecords = async () => {
        try {
            const res = await fetch("/api/medical-records");
            if (res.ok) {
                const data = await res.json();
                setMedicalRecords(data.records || []);
            }
        } catch (error) {
            console.error("Failed to fetch records:", error);
        }
    };

    useEffect(() => {
        if (activeTab === "overview") {
            const fetchLatest = async () => {
                try {
                    const res = await fetch("/api/medical-records");
                    if (res.ok) {
                        const data = await res.json();
                        if (data.records && data.records.length > 0) {
                            setLatestVitals(data.records[0]);
                        } else {
                            setLatestVitals(null);
                        }
                    } else {
                        setLatestVitals(null);
                    }
                } catch (error) {
                    console.error("Failed to fetch latest record:", error);
                    setLatestVitals(null);
                }
            };
            fetchLatest();
        }
        if (activeTab === "records") {
            fetchRecords();
        }
    }, [activeTab]);

    const handleRecordSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmittingRecord(true);
        try {
            const res = await fetch("/api/medical-records", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(recordForm),
            });

            if (res.ok) {
                setRecordForm({
                    type: "Blood Pressure",
                    systolic: "",
                    diastolic: "",
                    heartRate: "",
                    sleepEfficiency: "",
                    spo2: "",
                    dailyActivity: "",
                    analysis: ""
                });
                fetchRecords();
            } else {
                alert("Failed to save record");
            }
        } catch (error) {
            console.error("Record submit error:", error);
            alert("Error saving record");
        } finally {
            setIsSubmittingRecord(false);
        }
    };


    const Signout = () => {
        fetch("/api/logout", { method: "POST" })
            .then(() => router.push("/"))
            .catch(() => alert("Failed to sign out"));
    };
    return (
        <main className="min-h-screen bg-[#050B14] text-slate-200 flex overflow-hidden relative">
            <ParticleBackground />

            {/* Mobile Toggle Button */}
            <button
                onClick={() => setIsSidebarOpen(true)}
                className="lg:hidden fixed top-6 left-6 z-30 p-3 bg-white/5 border border-white/10 rounded-2xl text-slate-300 backdrop-blur-md hover:bg-white/10 transition-colors"
            >
                <Menu size={20} />
            </button>

            {/* Backdrop */}
            {isSidebarOpen && (
                <div
                    className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity animate-in fade-in duration-300"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Navigation Sidebar */}
            <aside className={`w-72 border-r border-white/10 backdrop-blur-2xl bg-black/20 flex flex-col p-6 z-50 fixed lg:relative inset-y-0 left-0 transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                {/* Mobile Close Button */}
                <button
                    onClick={() => setIsSidebarOpen(false)}
                    className="lg:hidden absolute top-6 right-6 p-2 text-slate-400 hover:text-white transition-colors"
                >
                    <X size={20} />
                </button>
                <div className="flex items-center gap-3 mb-12">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-teal-400 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
                        <Activity size={20} className="text-white" />
                    </div>
                    <h1 className="text-xl font-bold tracking-tight text-white">MediSeg <span className="text-teal-400">AI</span></h1>
                </div>

                <nav className="flex-1 space-y-2">
                    <SidebarItem
                        id="overview"
                        label="Overview"
                        active={activeTab === "overview"}
                        onClick={setActiveTab}
                        icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>}
                    />
                    <SidebarItem
                        id="chat"
                        label="AI Assistant"
                        active={activeTab === "chat"}
                        onClick={setActiveTab}
                        icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>}
                    />
                    <SidebarItem
                        id="records"
                        label="Medical Records"
                        active={activeTab === "records"}
                        onClick={setActiveTab}
                        icon={<ClipboardList size={20} />}
                    />
                    <SidebarItem
                        id="profile"
                        label="User Profile"
                        active={activeTab === "profile"}
                        onClick={setActiveTab}
                        icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>}
                    />
                </nav>

                <div className="pt-6 border-t border-white/5 space-y-4">
                    <div className="flex items-center gap-3 px-2">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-teal-400 border border-white/20 p-0.5">
                            <div className="w-full h-full rounded-full bg-[#050B14] flex items-center justify-center text-xs font-bold text-white">AC</div>
                        </div>
                        <div className="overflow-hidden">
                            <p className="text-sm font-semibold truncate text-white">{name}</p>
                            <p className="text-[10px] text-slate-500 truncate">{email}</p>
                        </div>
                    </div>
                    <button onClick={Signout} className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-white/10 text-slate-400 hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/20 transition-all text-sm font-medium">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" /></svg>
                        Sign Out
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <section className="flex-1 overflow-y-auto p-6 md:p-10 pt-20 lg:pt-10 z-10 relative">
                <div className="max-w-6xl mx-auto">

                    {activeTab === "overview" && (
                      <Overview latestVitals={latestVitals}/>
                    )}

                    {activeTab === "chat" && (
                <AIasistant  />
                    )}

                    {activeTab === "records" && (
                        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                            <header>
                                <h2 className="text-3xl font-bold text-white tracking-tight">Medical Records</h2>
                                <p className="text-slate-400 mt-1">Manage and track your clinical data history.</p>
                            </header>

                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                {/* New Record Form */}
                                <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-6 h-fit">
                                    <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                                        <Plus size={20} className="text-blue-400" />
                                        Log New Vitals
                                    </h3>
                                    <form onSubmit={handleRecordSubmit} className="space-y-4">
                                        <div>
                                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">Record Type</label>
                                            <select
                                                className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-white outline-none focus:border-blue-500/50 transition-all text-sm appearance-none"
                                                value={recordForm.type}
                                                onChange={e => setRecordForm({ ...recordForm, type: e.target.value })}
                                            >
                                                <option className="bg-[#050B14]">Blood Pressure</option>
                                                <option className="bg-[#050B14]">Heart Rate Scan</option>
                                                <option className="bg-[#050B14]">Lab Results Analysis</option>
                                                <option className="bg-[#050B14]1">General Vitals</option>
                                            </select>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">Systolic</label>
                                                <input
                                                    type="number"
                                                    placeholder="120"
                                                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-white outline-none focus:border-blue-500/50 transition-all text-sm"
                                                    value={recordForm.systolic}
                                                    onChange={e => setRecordForm({ ...recordForm, systolic: e.target.value })}
                                                />
                                            </div>
                                            <div>
                                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">Diastolic</label>
                                                <input
                                                    type="number"
                                                    placeholder="80"
                                                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-white outline-none focus:border-blue-500/50 transition-all text-sm"
                                                    value={recordForm.diastolic}
                                                    onChange={e => setRecordForm({ ...recordForm, diastolic: e.target.value })}
                                                />
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">Heart Rate (bpm)</label>
                                                <input
                                                    type="number"
                                                    placeholder="72"
                                                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-white outline-none focus:border-blue-500/50 transition-all text-sm"
                                                    value={recordForm.heartRate}
                                                    onChange={e => setRecordForm({ ...recordForm, heartRate: e.target.value })}
                                                />
                                            </div>
                                            <div>
                                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">SPO2 (%)</label>
                                                <input
                                                    type="number"
                                                    placeholder="98"
                                                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-white outline-none focus:border-blue-500/50 transition-all text-sm"
                                                    value={recordForm.spo2}
                                                    onChange={e => setRecordForm({ ...recordForm, spo2: e.target.value })}
                                                />
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">Sleep Eff. (%)</label>
                                                <input
                                                    type="number"
                                                    placeholder="94"
                                                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-white outline-none focus:border-blue-500/50 transition-all text-sm"
                                                    value={recordForm.sleepEfficiency}
                                                    onChange={e => setRecordForm({ ...recordForm, sleepEfficiency: e.target.value })}
                                                />
                                            </div>
                                            <div>
                                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">Daily Act. (steps)</label>
                                                <input
                                                    type="number"
                                                    placeholder="8432"
                                                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-white outline-none focus:border-blue-500/50 transition-all text-sm"
                                                    value={recordForm.dailyActivity}
                                                    onChange={e => setRecordForm({ ...recordForm, dailyActivity: e.target.value })}
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">Clinical Analysis</label>
                                            <textarea
                                                rows={3}
                                                placeholder="Enter any additional notes or AI diagnostic results..."
                                                className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-white outline-none focus:border-blue-500/50 transition-all text-sm resize-none"
                                                value={recordForm.analysis}
                                                onChange={e => setRecordForm({ ...recordForm, analysis: e.target.value })}
                                            />
                                        </div>
                                        <button
                                            disabled={isSubmittingRecord}
                                            className="w-full py-5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white rounded-2xl font-bold shadow-lg shadow-blue-500/20 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-base"
                                        >
                                            {isSubmittingRecord ? <Loader2 size={18} className="animate-spin" /> : <Plus size={18} />}
                                            Save Medical Record
                                        </button>
                                    </form>
                                </div>

                                {/* Records History */}
                                <div className="lg:col-span-2 space-y-4">
                                    <div className="flex items-center justify-between mb-2">
                                        <h3 className="text-xl font-bold text-white flex items-center gap-2">
                                            <History size={20} className="text-teal-400" />
                                            Clinical History
                                        </h3>
                                        <span className="text-xs text-slate-500 font-medium bg-white/5 px-3 py-1 rounded-full border border-white/10">
                                            {medicalRecords.length} Records Found
                                        </span>
                                    </div>

                                    <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                                        {medicalRecords.length === 0 ? (
                                            <div className="p-12 text-center backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl">
                                                <div className="w-16 h-16 bg-blue-500/10 text-blue-400 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                                    <ClipboardList size={32} />
                                                </div>
                                                <h4 className="text-white font-bold mb-1">No Records Yet</h4>
                                                <p className="text-slate-500 text-sm max-w-xs mx-auto">Your medical history is clear. Start by logging your current vitals using the clinical form.</p>
                                            </div>
                                        ) : (
                                            medicalRecords.map((rec, i) => (
                                                <div key={rec._id || i} className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-5 hover:border-white/20 transition-all group relative overflow-hidden">
                                                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 blur-2xl rounded-full" />
                                                    <div className="flex justify-between items-start relative z-10">
                                                        <div>
                                                            <div className="flex items-center gap-2 mb-1">
                                                                <span className="text-xs font-bold text-blue-400 uppercase tracking-widest">{rec.type}</span>
                                                                <span className="w-1 h-1 bg-slate-700 rounded-full" />
                                                                <span className="text-[10px] text-slate-500">{new Date(rec.createdAt).toLocaleString()}</span>
                                                            </div>
                                                            <div className="flex flex-wrap gap-x-6 gap-y-4 mt-4">
                                                                {rec.systolic && (
                                                                    <div>
                                                                        <p className="text-[10px] text-slate-500 uppercase font-black mb-1">BP (Sys/Dia)</p>
                                                                        <p className="text-xl font-bold text-white">{rec.systolic}<span className="text-slate-500 text-sm mx-1">/</span>{rec.diastolic}</p>
                                                                    </div>
                                                                )}
                                                                {rec.heartRate && (
                                                                    <div>
                                                                        <p className="text-[10px] text-slate-500 uppercase font-black mb-1">Heart Rate</p>
                                                                        <p className="text-xl font-bold text-white">{rec.heartRate}<span className="text-slate-500 text-sm ml-1">bpm</span></p>
                                                                    </div>
                                                                )}
                                                                {rec.spo2 && (
                                                                    <div>
                                                                        <p className="text-[10px] text-slate-500 uppercase font-black mb-1">SPO2</p>
                                                                        <p className="text-xl font-bold text-white">{rec.spo2}<span className="text-slate-500 text-sm ml-1">%</span></p>
                                                                    </div>
                                                                )}
                                                                {rec.sleepEfficiency && (
                                                                    <div>
                                                                        <p className="text-[10px] text-slate-500 uppercase font-black mb-1">Sleep Eff.</p>
                                                                        <p className="text-xl font-bold text-white">{rec.sleepEfficiency}<span className="text-slate-500 text-sm ml-1">%</span></p>
                                                                    </div>
                                                                )}
                                                                {rec.dailyActivity && (
                                                                    <div>
                                                                        <p className="text-[10px] text-slate-500 uppercase font-black mb-1">Daily Activity</p>
                                                                        <p className="text-xl font-bold text-white">{rec.dailyActivity}<span className="text-slate-500 text-sm ml-1">steps</span></p>
                                                                    </div>
                                                                )}
                                                            </div>
                                                            {rec.analysis && (
                                                                <div className="mt-4 p-3 rounded-xl bg-white/[0.03] border border-white/5">
                                                                    <p className="text-xs text-slate-400 italic leading-relaxed">
                                                                        <span className="text-blue-400 font-bold not-italic mr-1">Analysis:</span>
                                                                        {rec.analysis}
                                                                    </p>
                                                                </div>
                                                            )}
                                                        </div>
                                                        <div className="p-2 rounded-xl bg-teal-500/10 text-teal-400 opacity-0 group-hover:opacity-100 transition-opacity">
                                                            <ChevronRight size={18} />
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === "profile" && (
                        <div className="max-w-2xl mx-auto animate-in fade-in slide-in-from-right-4 duration-500">
                            <div className="text-center mb-10">
                                <div className="relative inline-block">
                                    <div className="w-32 h-32 rounded-3xl bg-gradient-to-br from-blue-600 to-teal-400 p-1 mb-6">
                                        <div className="w-full h-full rounded-[20px] bg-[#050B14] flex items-center justify-center text-4xl font-bold text-white">AC</div>
                                    </div>
                                    <button className="absolute bottom-4 right-[-10px] p-3 bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl text-blue-400 hover:text-white hover:bg-blue-600 transition-all shadow-xl">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>
                                    </button>
                                </div>
                                <h2 className="text-3xl font-bold text-white tracking-tight">{name}</h2>
                                <p className="text-teal-400 font-medium mt-1">Senior AI Clinician & Researcher</p>
                            </div>

                            <div className="space-y-6">
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="p-6 rounded-3xl bg-white/5 border border-white/10 space-y-1">
                                        <p className="text-xs text-slate-500 uppercase font-black">Professional Email</p>
                                        <p className="text-white font-medium">{email}</p>
                                    </div>
                                    <div className="p-6 rounded-3xl bg-white/5 border border-white/10 space-y-1">
                                        <p className="text-xs text-slate-500 uppercase font-black">Medical ID</p>
                                        <p className="text-white font-medium">MC-84920-AI</p>
                                    </div>
                                </div>

                                <div className="p-8 rounded-3xl bg-white/5 border border-white/10">
                                    <h3 className="text-lg font-bold text-white mb-6">Clinical Specializations</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {["Advanced Cardiology", "AI Diagnostics", "Predictive Hematology", "Neural Imaging", "Genomic Sequencing"].map((s) => (
                                            <span key={s} className="px-4 py-2 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium">
                                                {s}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="p-8 rounded-3xl bg-white/5 border border-white/10">
                                    <h3 className="text-lg font-bold text-white mb-6">System Preferences</h3>
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center py-2 border-b border-white/5">
                                            <span className="text-slate-300">Biometric Login</span>
                                            <div className="w-12 h-6 bg-blue-600 rounded-full flex items-center px-1">
                                                <div className="w-4 h-4 bg-white rounded-full ml-auto" />
                                            </div>
                                        </div>
                                        <div className="flex justify-between items-center py-2 border-b border-white/5">
                                            <span className="text-slate-300">AI Autopilot Analysis</span>
                                            <div className="w-12 h-6 bg-slate-800 rounded-full flex items-center px-1">
                                                <div className="w-4 h-4 bg-white/20 rounded-full" />
                                            </div>
                                        </div>
                                        <div className="flex justify-between items-center py-2">
                                            <span className="text-slate-300">HIPAA Data Masking</span>
                                            <div className="w-12 h-6 bg-blue-600 rounded-full flex items-center px-1">
                                                <div className="w-4 h-4 bg-white rounded-full ml-auto" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                </div>
            </section>

            {/* Background Glows */}
            <div className="fixed top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none z-0" />
            <div className="fixed bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-teal-500/5 rounded-full blur-[120px] pointer-events-none z-0" />
        </main>
    );
}