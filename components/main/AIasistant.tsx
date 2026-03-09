'use client';
import { Content } from "@google/genai";
import { MessageBubble } from "../MessageBubble";
import { Sparkles, User, Send, Brain, ChevronRight, Loader2, Menu, X, ClipboardList, Plus, History, Activity } from "lucide-react";
import React,{useState,useEffect,useRef} from "react"

export default function AIasistant(){
    const chatEndRef = useRef<HTMLDivElement>(null);
      const [message, setMessage] = useState("");
    const [chatHistory, setChatHistory] = useState<{role: string, content: string, time?: string, isGenerating?: boolean}[]>([
        { role: 'assistant', content: 'Hi, I am your MediSeg AI assistant. How can I help you today?', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), isGenerating: false }
    ]);
    const [isLoading, setIsLoading] = useState(false);



  const scrollToBottom = () => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };



 useEffect(() => {
        scrollToBottom();
    }, [chatHistory, isLoading]);

    const handleTagClick = async (tagLabel: string) => {
        if (tagLabel === "Analyze Lab Results") {
            setIsLoading(true);
            try {
                // Fetch latest records
                const res = await fetch("/api/medical-records");
                const data = await res.json();
                const records = data.records || [];

                let prompt = "Please analyze my clinical lab results. ";
                if (records.length > 0) {
                    prompt += "\n\nHere is my recent clinical history:\n";
                    records.forEach((rec: any, i: number) => {
                        prompt += `\nRecord ${i + 1} (${new Date(rec.createdAt).toLocaleDateString()}):`;
                        prompt += `\n- Type: ${rec.type}`;
                        if (rec.dailyActivity) prompt += `\n- Daily Activity: ${rec.dailyActivity} %`;
                        if (rec.sleepEfficiency) prompt += `\n- Sleep Efficiency: ${rec.sleepEfficiency} %`;
                        if (rec.spo2) prompt += `\n- SpO2: ${rec.spo2} %`;
                        if (rec.systolic) prompt += `\n- BP: ${rec.systolic}/${rec.diastolic} mmHg`;
                        if (rec.heartRate) prompt += `\n- HR: ${rec.heartRate} bpm`;
                        if (rec.analysis) prompt += `\n- Prior Analysis: ${rec.analysis}`;
                    });
                    prompt += "\n\nPlease provide a comprehensive assessment based on these data points.";
                } else {
                    prompt += "\n(No clinical history found in my records. Please provide general guidance on what lab values usually mean.)";
                }

                const userMessage = {
                    role: 'user',
                    content: prompt,
                    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                };
                setChatHistory(prev => [...prev, userMessage]);

                const response = await fetch("/api/chat", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ message: prompt }),
                });

                if (!response.body) throw new Error("API call failed");

          //  const aiText = await response.json();
           const reader = response.body.getReader();
                const decoder = new TextDecoder();
           let accumulatedContent = "";

                 setIsLoading(false);
const assistantPlaceholder = { 
      role: 'assistant', 
      content: "", 
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isGenerating: true
    };
    setChatHistory(prev => [...prev,assistantPlaceholder]);



                while (true) {
      const { value, done } = await reader.read();
      if (done) {
        setChatHistory(prev => {
            const newHistory = [...prev];
            const lastIndex = newHistory.length - 1;
            newHistory[lastIndex] = { 
              ...newHistory[lastIndex], 
              isGenerating: false 
            };
            return newHistory;
        });
        break;
      }
      
      const chunk = decoder.decode(value, { stream: true });
      accumulatedContent += chunk;

    setChatHistory(prev => {
        const newHistory = [...prev];
        const lastIndex = newHistory.length - 1;
        newHistory[lastIndex] = { 
          ...newHistory[lastIndex], 
          content: accumulatedContent 
        };
        return newHistory;
      });
                }

            } catch (error) {
                console.error("Tag action error:", error);
            } finally {
                setIsLoading(false);
            }
        } else {
            setMessage(tagLabel);
        }
    };




 const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!message.trim() || isLoading) return;

        const userMessage = {
            role: 'user',
            content: message,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        setChatHistory(prev => [...prev, userMessage]);
        const currentMessage = message;
        setMessage("");
        setIsLoading(true);

        try {
            const response = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: currentMessage }),
            });

            if (!response.body) throw new Error("API call failed");

          //  const aiText = await response.json();
           const reader = response.body.getReader();
                const decoder = new TextDecoder();
           let accumulatedContent = "";

                 setIsLoading(false);
const assistantPlaceholder = { 
      role: 'assistant', 
      content: "", 
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isGenerating: true
    };
    setChatHistory(prev => [...prev,assistantPlaceholder]);



                while (true) {
      const { value, done } = await reader.read();
      if (done) {
        setChatHistory(prev => {
            const newHistory = [...prev];
            const lastIndex = newHistory.length - 1;
            newHistory[lastIndex] = { 
              ...newHistory[lastIndex], 
              isGenerating: false 
            };
            return newHistory;
        });
        break;
      }
      
      const chunk = decoder.decode(value, { stream: true });
      accumulatedContent += chunk;

    setChatHistory(prev => {
        const newHistory = [...prev];
        const lastIndex = newHistory.length - 1;
        newHistory[lastIndex] = { 
          ...newHistory[lastIndex], 
          content: accumulatedContent 
        };
        return newHistory;
      });
    
    
    }
          
      
      
      
      
        } catch (error) {
            console.error("Chat error:", error);
            setChatHistory(prev => [...prev, {
                role: 'assistant',
                content: "Sorry, I'm having trouble connecting to the medical clinical system right now. Please try again later.",
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            }]);
        } finally {
            setIsLoading(false);
        }
    };
    return(



                <div className="h-[calc(100vh-140px)] flex flex-col animate-in fade-in zoom-in-[0.98] duration-700">
                            <div className="mb-8 flex justify-between items-end">
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <div className="w-2 h-2 rounded-full bg-teal-400 shadow-[0_0_8px_rgba(45,212,191,0.5)] animate-pulse" />
                                        <span className="text-[10px] font-bold text-teal-400 uppercase tracking-widest">System Active</span>
                                    </div>
                                    <h2 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
                                        AI Clinical Assistant
                                        <div className="px-2 py-0.5 rounded text-[10px] bg-blue-600/20 text-blue-400 border border-blue-500/20 uppercase tracking-tighter">v3.5-flash</div>
                                    </h2>
                                    <p className="text-slate-400 mt-1">Real-time medical reasoning and database retrieval.</p>
                                </div>
                            </div>

                            <div className="flex-1 overflow-y-auto mb-6 pr-4 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                                <div className="space-y-2">
                                    {chatHistory.map((chat, i) => (
                                        <MessageBubble key={i} {...chat} />
                                    ))}
                                    {isLoading && (
                                        <div className="flex items-start gap-3 mb-6 animate-pulse">
                                            <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 border bg-teal-500/20 border-teal-500/30 text-teal-400">
                                                <Activity size={14} className="animate-pulse" />
                                            </div>
                                            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 text-slate-400 rounded-tl-none backdrop-blur-md flex items-center gap-2">
                                                <Loader2 size={16} className="animate-spin" />
                                                <span className="text-xs font-medium italic">MediSeg AI is analyzing...</span>
                                            </div>
                                        </div>
                                    )}
                                    <div ref={chatEndRef} />
                                </div>
                            </div>

                            <div className="relative">
                                <form onSubmit={handleSendMessage} className="relative z-10">
                                    <div className="backdrop-blur-xl bg-white/[0.03] border border-white/10 p-1 rounded-[32px] focus-within:border-blue-500/50 focus-within:bg-white/[0.05] transition-all shadow-2xl group/input">
                                        <div className="flex items-center gap-2">
                                            <div className="pl-3 text-slate-500">
                                                <Sparkles size={16} />
                                            </div>
                                            <input
                                                type="text"
                                                value={message}
                                                onChange={(e) => setMessage(e.target.value)}
                                                disabled={isLoading}
                                                placeholder="Ask anything..."
                                                className="flex-1 bg-transparent border-none outline-none py-2.5 text-base text-white placeholder:text-slate-600 disabled:opacity-50"
                                            />
                                            <button
                                                type="submit"
                                                disabled={isLoading || !message.trim()}
                                                className="mr-0.5 p-2.5 bg-gradient-to-br from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 disabled:from-slate-800 disabled:to-slate-900 text-white rounded-full transition-all shadow-lg hover:shadow-blue-500/20 active:scale-95 disabled:cursor-not-allowed group-hover/input:scale-105"
                                            >
                                                <Send size={16} fill="currentColor" />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap justify-center gap-2 mt-4">
                                        {[
                                            { label: "Patient Summary", icon: <User size={10} /> },
                                            { label: "Analyze Lab Results", icon: <Brain size={10} /> },
                                            { label: "Search Literature", icon: <Sparkles size={10} /> }
                                        ].map((tag) => (
                                            <button
                                                key={tag.label}
                                                onClick={() => handleTagClick(tag.label)}
                                                disabled={isLoading}
                                                type="button"
                                                className="text-[12px] uppercase tracking-wider font-bold text-slate-500 hover:text-blue-400 border border-white/5 hover:border-blue-500/20 px-4 py-2 rounded-2xl transition-all bg-white/[0.02] hover:bg-white/[0.05] flex items-center gap-2"
                                            >
                                                {tag.icon}
                                                {tag.label}
                                            </button>
                                        ))}
                                    </div>
                                </form>
                                <div className="absolute -inset-4 bg-blue-500/5 blur-3xl rounded-full pointer-events-none -z-10" />
                            </div>
                        </div>
    )
}