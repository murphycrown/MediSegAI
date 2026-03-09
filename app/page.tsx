"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Brain, ChevronRight, Sparkles, Activity, Shield, Users, Mail, Globe, ArrowRight, Menu, X, Clock, AlertTriangle, Wind } from "lucide-react";
import MovingParticleBackground from "@/components/MovingParticleBackground";
// function ParticleBackground() {
//     const canvasRef = useRef<HTMLCanvasElement>(null);

//     useEffect(() => {
//         const canvas = canvasRef.current;
//         if (!canvas) return;
//         const ctx = canvas.getContext("2d");
//         if (!ctx) return;

//         let particles: any[] = [];
//         let animationFrameId: number;

//         class Particle {
//             x: number;
//             y: number;
//             size: number;
//             speedX: number;
//             speedY: number;
//             color: string;

//             constructor() {
//                 this.x = Math.random() * (canvas?.width || 0);
//                 this.y = Math.random() * (canvas?.height || 0);
//                 this.size = Math.random() * 2 + 0.5;
//                 this.speedX = Math.random() * 0.5 - 0.25;
//                 this.speedY = Math.random() * 0.5 - 0.25;
//                 const colors = ['#3b82f6', '#2dd4bf', '#1e293b'];
//                 this.color = colors[Math.floor(Math.random() * colors.length)];
//             }

//             update() {
//                 this.x += this.speedX;
//                 this.y += this.speedY;

//                 if (canvas && this.x > canvas.width) this.x = 0;
//                 if (canvas && this.x < 0) this.x = canvas.width;
//                 if (canvas && this.y > canvas.height) this.y = 0;
//                 if (canvas && this.y < 0) this.y = canvas.height;
//             }

//             draw() {
//                 if (!ctx) return;
//                 ctx.fillStyle = this.color;
//                 ctx.beginPath();
//                 ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
//                 ctx.fill();
//             }
//         }

//         const init = () => {
//             particles = [];
//             const count = (window.innerWidth * window.innerHeight) / 15000;
//             for (let i = 0; i < count; i++) {
//                 particles.push(new Particle());
//             }
//         };

//         const animate = () => {
//             ctx.clearRect(0, 0, canvas.width, canvas.height);
//             particles.forEach(p => {
//                 p.update();
//                 p.draw();
//             });
//             animationFrameId = requestAnimationFrame(animate);
//         };

//         const handleResize = () => {
//             canvas.width = window.innerWidth;
//             canvas.height = window.innerHeight;
//             init();
//         };

//         window.addEventListener('resize', handleResize);
//         handleResize();
//         animate();

//         return () => {
//             window.removeEventListener('resize', handleResize);
//             cancelAnimationFrame(animationFrameId);
//         };
//     }, []);

//     return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0 opacity-40" />;
// };

export default function LandingPage() {
    const router = useRouter();
    const [scrolled, setScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const sections = [
        { id: "home", label: "Home" },
        { id: "about", label: "About Us" },
        { id: "pricing", label: "Pricing" },
        { id: "contact", label: "Contact" }
    ];

    return (
        <div className="min-h-screen bg-[#050B14] text-slate-200 selection:bg-blue-500/30 font-sans">
            <MovingParticleBackground />

            {/* Navigation */}
            <header
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "bg-[#050B14]/80 backdrop-blur-xl border-b border-white/5 py-4" : "bg-transparent py-6"
                    }`}
            >
                <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
                    <div className="flex items-center gap-2 group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-teal-400 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform">
                            <Activity size={22} className="text-white" />
                        </div>
                        <span className="text-xl font-bold tracking-tight text-white uppercase">MediSeg <span className="text-teal-400">AI</span></span>
                    </div>

                    <nav className="hidden md:flex items-center gap-8">
                        {sections.map(s => (
                            <a key={s.id} href={`#${s.id}`} className="text-base font-medium text-slate-400 hover:text-white transition-colors">{s.label}</a>
                        ))}
                        <button
                            onClick={() => router.push("/login")}
                            className="px-6 py-3.5 bg-white text-black rounded-full text-base font-bold hover:bg-slate-200 transition-all active:scale-95 shadow-xl shadow-white/10"
                        >
                            Investor Portal
                        </button>
                    </nav>

                    <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="absolute top-full left-0 right-0 bg-[#050B14] border-b border-white/10 p-6 flex flex-col gap-4 md:hidden animate-in slide-in-from-top duration-300">
                        {sections.map(s => (
                            <a key={s.id} href={`#${s.id}`} onClick={() => setIsMenuOpen(false)} className="text-lg font-medium text-slate-400 hover:text-white">{s.label}</a>
                        ))}
                        <button onClick={() => router.push("/login")} className="w-full py-3 bg-white text-black rounded-xl font-bold">Investor Portal</button>
                    </div>
                )}
            </header>

            <main className="relative z-10">
                {/* Hero Section */}
                <section id="home" className="min-h-screen flex items-center pt-20">
                    <div className="max-w-7xl mx-auto px-6 w-full">
                        <div className="max-w-3xl">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-widest mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                                <Sparkles size={14} />
                                Next Generation Healthcare
                            </div>
                            <h1 className="text-6xl md:text-8xl font-bold text-white tracking-tight leading-[1.1] mb-8 animate-in fade-in slide-in-from-bottom-6 duration-1000">
                                Intelligence that <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-300">Heals.</span>
                            </h1>
                            <p className="text-xl text-slate-400 leading-relaxed mb-10 max-w-2xl animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
                                MediSeg AI is redefining clinical diagnostic infrastructure. We provide institutional-grade medical reasoning and predictive analysis to healthcare systems globally.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-300">
                                <button onClick={() => router.push("/login")} className="px-10 py-5 bg-blue-600 hover:bg-blue-500 text-white rounded-full font-bold transition-all flex items-center justify-center gap-2 group shadow-lg shadow-blue-600/20 text-lg">
                                    Get Started
                                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                </button>
                                <a href="#about" className="px-10 py-5 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-full font-bold transition-all flex items-center justify-center text-lg">
                                    Learn More
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1/2 h-[80%] hidden lg:block opacity-50 blur-[100px] pointer-events-none">
                        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/20 rounded-full animate-pulse" />
                        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-teal-500/20 rounded-full animate-pulse delay-700" />
                    </div>
                </section>

                {/* About Us Section */}
                <section id="about" className="py-32 relative border-t border-white/5 bg-white/[0.01]">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                            <div>
                                <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 tracking-tight">Pioneering the Future of <span className="text-blue-400">Precision Medicine</span>.</h2>
                                <p className="text-slate-400 text-lg leading-relaxed mb-8">
                                    Founded with a mission to eliminate diagnostic errors, MediSeg AI combines advanced neural networks with rigorous clinical expertise. Our systems analyze millions of data points in milliseconds to assist clinicians in providing the highest standard of care.
                                </p>
                                <div className="space-y-6">
                                    {[
                                        { icon: <Activity size={20} />, title: "Clinical Reasoning", desc: "Advanced AI models trained on verified medical data." },
                                        { icon: <Shield size={20} />, title: "Enterprise Security", desc: "HIPAA and GDPR compliant data processing." },
                                        { icon: <Users size={20} />, title: "Collaborative Care", desc: "Integrated tools for medical professional teams." }
                                    ].map((item, i) => (
                                        <div key={i} className="flex gap-4 group">
                                            <div className="shrink-0 w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-all">
                                                {item.icon}
                                            </div>
                                            <div>
                                                <h4 className="text-white font-bold mb-1">{item.title}</h4>
                                                <p className="text-sm text-slate-500">{item.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="relative">
                                <div className="aspect-square rounded-[40px] bg-gradient-to-tr from-blue-600/20 to-teal-400/20 border border-white/10 backdrop-blur-3xl p-1 relative overflow-hidden">
                                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-30 grayscale" />
                                    <div className="relative z-10 w-full h-full flex items-center justify-center">
                                        <div className="p-8 backdrop-blur-xl bg-black/40 border border-white/10 rounded-3xl shadow-2xl">
                                            <div className="flex items-center gap-4 mb-4">
                                                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                                                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Real-time Diagnostics</span>
                                            </div>
                                            <div className="space-y-4">
                                                <div className="w-64 h-2 bg-white/10 rounded-full overflow-hidden">
                                                    <div className="w-3/4 h-full bg-blue-500" />
                                                </div>
                                                <div className="w-48 h-2 bg-white/10 rounded-full overflow-hidden">
                                                    <div className="w-1/2 h-full bg-teal-400" />
                                                </div>
                                                <div className="w-56 h-2 bg-white/10 rounded-full overflow-hidden">
                                                    <div className="w-5/6 h-full bg-blue-600" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-blue-600 blur-[80px] rounded-full opacity-30 pointer-events-none" />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Diagnostic Bottleneck Section */}
                <section id="bottleneck" className="py-32 relative">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="text-center mb-20 max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-700">
                            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 tracking-tight">The Diagnostic Bottleneck</h2>
                            <p className="text-slate-400 text-lg leading-relaxed">
                                Manual segmentation is slow, prone to error, and unsustainable for modern radiology workflows.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[
                                {
                                    icon: <Clock size={24} />,
                                    title: "40 Mins Manual Work",
                                    desc: "Radiologists spend valuable time manually tracing tumor boundaries slice-by-slice, reducing throughput."
                                },
                                {
                                    icon: <Activity size={24} />,
                                    title: "Diagnostic Delays",
                                    desc: "Complex cases create backlogs. Patient anxiety increases as reports take days to finalize."
                                },
                                {
                                    icon: <AlertTriangle size={24} />,
                                    title: "Human Variability",
                                    desc: "Fatigue leads to inconsistent measurements across follow-ups, affecting treatment decisions."
                                }
                            ].map((item, i) => (
                                <div key={i} className="p-10 rounded-[40px] bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] hover:border-white/10 transition-all duration-500 group animate-in fade-in slide-in-from-bottom-10 duration-700" style={{ animationDelay: `${i * 100}ms` }}>
                                    <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-blue-500 mb-8 group-hover:scale-110 transition-transform">
                                        {item.icon}
                                    </div>
                                    <h3 className="text-2xl font-bold text-white mb-4 tracking-tight">{item.title}</h3>
                                    <p className="text-slate-500 leading-relaxed text-sm">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Clinical Validation Section */}
                <section id="validation" className="py-32 relative bg-white/[0.01]">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="mb-20 animate-in fade-in slide-in-from-left-8 duration-700">
                            <span className="text-xs font-black text-blue-500 uppercase tracking-[0.3em] mb-4 block">Clinical Validation</span>
                            <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">Proven in Critical Cases</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[
                                {
                                    icon: <Brain size={24} />,
                                    title: "Glioblastoma Multiforme",
                                    tag: "97% Dice Score",
                                    desc: "Automated segmentation reduced planning time from 45 mins to 3 mins.",
                                    color: "blue"
                                },
                                {
                                    icon: <Wind size={24} />,
                                    title: "Non-Small Cell Lung Cancer",
                                    tag: "2mm Precision",
                                    desc: "AI successfully mapped tumor proximity to the pulmonary artery, alerting surgeons to a critical safety margin.",
                                    color: "teal"
                                },
                                {
                                    icon: <Activity size={24} />,
                                    title: "Metastatic Brain Lesions",
                                    tag: "15% Tumor Reduction",
                                    desc: "Volumetric tracking over 6 months clearly quantified treatment response automatically.",
                                    color: "blue"
                                }
                            ].map((item, i) => (
                                <div key={i} className="p-10 rounded-[40px] backdrop-blur-3xl bg-white/[0.02] border border-white/5 hover:border-white/20 transition-all duration-500 group relative overflow-hidden animate-in fade-in slide-in-from-bottom-10 duration-700" style={{ animationDelay: `${(i + 3) * 100}ms` }}>
                                    <div className="absolute top-6 right-6 text-slate-700 group-hover:text-blue-500 transition-colors">
                                        <ArrowRight size={20} className="-rotate-45" />
                                    </div>
                                    <div className={`w-14 h-14 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-8 group-hover:scale-110 transition-transform`}>
                                        {item.icon}
                                    </div>
                                    <h3 className="text-2xl font-bold text-white mb-4 tracking-tight">{item.title}</h3>
                                    <div className="inline-flex items-center px-4 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black uppercase tracking-widest mb-6">
                                        {item.tag}
                                    </div>
                                    <p className="text-slate-500 leading-relaxed text-sm">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Pricing Section */}
                <section id="pricing" className="py-32 relative bg-[#050B14]">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="text-center mb-20">
                            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">Transparent Pricing</h2>
                            <p className="text-slate-400 text-lg">Choose a plan that scales with your patient volume.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                            {/* Standard */}
                            <div className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-white/20 transition-all h-full flex flex-col">
                                <h3 className="text-2xl font-bold text-white mb-2">Standard</h3>
                                <p className="text-sm text-slate-400 mb-6">Essential AI tools for small clinics.</p>
                                <div className="mb-8">
                                    <span className="text-4xl font-bold text-white">$500</span>
                                    <span className="text-slate-500">/mo</span>
                                </div>
                                <div className="space-y-4 mb-8 flex-1">
                                    {["Up to 50 Scans/mo", "Basic Segmentation", "Email Support", "Standard Export"].map((feature, i) => (
                                        <div key={i} className="flex items-center gap-3">
                                            <div className="w-5 h-5 flex items-center justify-center text-blue-500">
                                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4"><polyline points="20 6 9 17 4 12" /></svg>
                                            </div>
                                            <span className="text-slate-300 text-sm">{feature}</span>
                                        </div>
                                    ))}
                                </div>
                                <button className="w-full py-4 bg-white/5 hover:bg-white/10 text-white rounded-xl font-bold transition-all text-base">
                                    Contact Sales
                                </button>
                            </div>

                            {/* Professional */}
                            <div className="p-8 rounded-3xl bg-[#0B1221] border border-blue-500/30 relative transform md:-translate-y-4 shadow-2xl shadow-blue-900/20 h-full flex flex-col">
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-blue-600 rounded-full text-xs font-bold text-white uppercase tracking-wider">
                                    Most Popular
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-2">Professional</h3>
                                <p className="text-sm text-slate-400 mb-6">High-volume processing for hospitals.</p>
                                <div className="mb-8">
                                    <span className="text-5xl font-bold text-white">$1,500</span>
                                    <span className="text-slate-500">/mo</span>
                                </div>
                                <div className="space-y-4 mb-8 flex-1">
                                    {["Up to 500 Scans/mo", "Advanced Volumetrics", "Priority Support", "PACS Integration", "Multi-user Access"].map((feature, i) => (
                                        <div key={i} className="flex items-center gap-3">
                                            <div className="w-5 h-5 flex items-center justify-center text-blue-500">
                                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4"><polyline points="20 6 9 17 4 12" /></svg>
                                            </div>
                                            <span className="text-white text-sm">{feature}</span>
                                        </div>
                                    ))}
                                </div>
                                <button className="w-full py-5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold transition-all shadow-lg shadow-blue-600/25 text-base">
                                    Get Started
                                </button>
                            </div>

                            {/* Enterprise */}
                            <div className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-white/20 transition-all h-full flex flex-col">
                                <h3 className="text-2xl font-bold text-white mb-2">Enterprise</h3>
                                <p className="text-sm text-slate-400 mb-6">Unlimited scale for health networks.</p>
                                <div className="mb-8">
                                    <span className="text-4xl font-bold text-white">Custom</span>
                                </div>
                                <div className="space-y-4 mb-8 flex-1">
                                    {["Unlimited Scans", "Custom AI Models", "API Access", "On-premise Deployment", "Dedicated Success Manager"].map((feature, i) => (
                                        <div key={i} className="flex items-center gap-3">
                                            <div className="w-5 h-5 flex items-center justify-center text-blue-500">
                                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4"><polyline points="20 6 9 17 4 12" /></svg>
                                            </div>
                                            <span className="text-slate-300 text-sm">{feature}</span>
                                        </div>
                                    ))}
                                </div>
                                <button className="w-full py-4 bg-white/5 hover:bg-white/10 text-white rounded-xl font-bold transition-all text-base">
                                    Contact Sales
                                </button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Our Vision Section */}
                <section id="vision" className="py-32 relative bg-white/[0.01]">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                            <div className="space-y-12">
                                <div>
                                    <span className="text-sm font-black text-blue-500 uppercase tracking-[0.3em] mb-4 block">Our Vision</span>
                                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 tracking-tight leading-[1.1]">
                                        Democratizing Precision Diagnostics
                                    </h2>
                                    <p className="text-slate-400 text-lg leading-relaxed max-w-xl">
                                        We believe that every patient deserves the most accurate diagnosis possible, regardless of where they are treated. By augmenting radiologists with AI, we bridge the gap between scan capability and human capacity.
                                    </p>
                                </div>

                                <div className="space-y-8">
                                    {[
                                        { icon: <Globe size={20} />, text: "Deployed in 15+ Countries", color: "text-blue-400" },
                                        { icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" /></svg>, text: "Improving Patient Outcomes", color: "text-rose-400" },
                                        { icon: <Activity size={20} />, text: "Powered by Advanced Deep Learning", color: "text-amber-400" }
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-center gap-6 group">
                                            <div className={`w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center ${item.color} group-hover:scale-110 transition-transform duration-300`}>
                                                {item.icon}
                                            </div>
                                            <span className="text-lg font-semibold text-slate-200">{item.text}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="relative">
                                <div className="absolute inset-0 bg-blue-600/20 blur-[100px] rounded-full animate-pulse" />
                                <div className="relative backdrop-blur-2xl bg-white/[0.03] border border-white/10 p-12 rounded-[40px] shadow-2xl space-y-8">
                                    <h3 className="text-3xl font-bold text-white tracking-tight">Join Our Mission</h3>
                                    <p className="text-slate-400 leading-relaxed text-lg">
                                        We are a team of radiologists, data scientists, and engineers building the future of medical imaging.
                                    </p>
                                    <a href="#" className="flex items-center gap-2 text-blue-400 font-bold hover:text-blue-300 transition-colors group">
                                        See Open Positions
                                        <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Contact Section */}
                <section id="contact" className="py-32 relative overflow-hidden">
                    <div className="max-w-7xl mx-auto px-6 text-center">
                        <h2 className="text-4xl md:text-6xl font-bold text-white mb-12 tracking-tighter">Ready to partner with the <span className="italic">Frontier.</span></h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
                            {[
                                { icon: <Mail />, label: "Investor Relations", value: "medicalhealthcare2026@gmail.com" },
                                { icon: <Globe />, label: "Global Presence", value: "Azerbaijan • Baku • Ganja" },
                                { icon: <Users />, label: "Enterprise Support", value: "medicalhealthcare2026@gmail.com" }
                            ].map((c, i) => (
                                <div key={i} className="p-8 rounded-[32px] bg-white/5 border border-white/10 hover:border-blue-500/30 hover:bg-white/[0.07] hover:shadow-[0_0_30px_rgba(59,130,246,0.1)] transition-all duration-500 flex flex-col items-center group">
                                    <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400 mb-6 group-hover:scale-110 transition-transform">
                                        {c.icon}
                                    </div>
                                    <p className="text-sm text-slate-500 font-bold uppercase tracking-widest mb-2">{c.label}</p>
                                    <p className="text-lg md:text-xl text-white font-medium break-all md:break-normal">{c.value}</p>
                                </div>
                            ))}
                        </div>
                        <div className="p-12 rounded-[40px] bg-gradient-to-br from-blue-600 to-teal-500 relative overflow-hidden group">
                            <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity" />
                            <h3 className="text-3xl font-bold text-white mb-6 relative z-10">Limited Access Investor Portal</h3>
                            <p className="text-blue-50 mb-10 max-w-xl mx-auto relative z-10 opacity-90 text-lg">
                                Access our performance data, clinical validation studies, and upcoming Series B roadmap. Credentials required.
                            </p>
                            <button onClick={() => router.push("/login")} className="px-12 py-5 bg-white text-blue-600 rounded-full font-bold text-xl hover:shadow-2xl transition-all active:scale-95 relative z-10">
                                Access Dashboard
                            </button>
                        </div>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="py-20 border-t border-white/5">
                <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="flex items-center gap-2">
                        <Activity size={24} className="text-blue-500" />
                        <span className="text-lg font-bold text-white uppercase tracking-tighter">MediSeg AI <span className="text-slate-500 font-normal">Corp.</span></span>
                    </div>
                    <div className="flex gap-10 text-sm font-medium text-slate-500">
                        <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                        <a href="#" className="hover:text-white transition-colors">Ethics & AI</a>
                    </div>
                    <p className="text-sm text-slate-600">© 2026 MediSeg AI Clinical Research. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}
