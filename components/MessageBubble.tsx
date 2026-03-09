
'use client';
import { Sparkles, User, Send, Brain, ChevronRight, Loader2, Menu, X, ClipboardList, Plus, History, Activity } from "lucide-react";
import React,{useState,useRef,useEffect} from 'react'
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface ChatHistory{
 role: 'user' | 'assistant'; 
  content: string;
  time?: number;
}



export const MessageBubble = ({ role, content, time, isGenerating }: any) => {
    const displayContent = isGenerating ? content + ' ▍' : content;

    return (
    <div className={`flex flex-col ${role === 'user' ? 'items-end' : 'items-start'} mb-3 group animate-in slide-in-from-bottom-2 duration-300`}>
        <div className={`flex items-start gap-3 max-w-[95%] md:max-w-[75%] ${role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
            <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 border shadow-sm ${role === 'user'
                ? "bg-blue-600/20 border-blue-500/30 text-blue-400"
                : "bg-teal-500/20 border-teal-500/30 text-teal-400"
                }`}>
                {role === 'user' ? <User size={12} /> : <Activity size={12} />}
            </div>

            <div className={`leading-relaxed ${role === 'user'
                ? "py-2 px-4 bg-blue-600 text-white rounded-2xl rounded-tr-none shadow-md shadow-blue-500/10 text-base"
                : "py-1 text-slate-100 text-base"
                }`}>
                <div className={`prose prose-invert prose-base max-w-none ${role === 'user' ? '[&_p]:text-white' : '[&_p]:text-slate-200'}`}>
                    <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                            p: ({ children }) => <p className="mb-2 last:mb-0 leading-relaxed text-base">{children}</p>,
                            ul: ({ children }) => <ul className="list-disc ml-5 space-y-1.5 my-2 text-base">{children}</ul>,
                            ol: ({ children }) => <ol className="list-decimal ml-5 space-y-1.5 my-2 text-base">{children}</ol>,
                            li: ({ children }) => <li className="pl-1 text-base">{children}</li>,
                            code: (props: any) => {
                                const { children, className, node, ...rest } = props;
                                const match = /language-(\w+)/.exec(className || '');
                                return match ? (
                                    <pre className="bg-black/40 p-2.5 rounded-lg overflow-x-auto my-1.5 border border-white/5">
                                        <code className={`${className} text-xs`} {...rest}>{children}</code>
                                    </pre>
                                ) : (
                                    <code className="bg-white/10 px-1 py-0.5 rounded text-teal-300 font-mono text-xs" {...rest}>{children}</code>
                                )
                            },
                            table: ({ children }) => (
                                <div className="overflow-x-auto my-3 rounded-lg border border-white/10">
                                    <table className="w-full text-left border-collapse text-xs">{children}</table>
                                </div>
                            ),
                            th: ({ children }) => <th className="bg-white/5 p-1.5 text-[10px] font-bold border-b border-white/10 uppercase tracking-wider">{children}</th>,
                            td: ({ children }) => <td className="p-1.5 border-b border-white/5 text-slate-400">{children}</td>,
                            strong: ({ children }) => <strong className="font-bold text-white">{children}</strong>,
                        }}
                    >
                        {displayContent}
                    </ReactMarkdown>
                </div>
            </div>
        </div>
        <span className={`text-[10px] text-slate-500 mt-1 px-10 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300`}>
            {time}
        </span>
    </div>
);
};