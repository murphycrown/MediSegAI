


 const StatCard= ({ title, value, unit, icon, color, trend }: any)=> (

    <div className="backdrop-blur-xl bg-white/5 border border-white/10 p-5 rounded-3xl group hover:border-white/20 transition-all duration-500">
        <div className="flex justify-between items-start mb-4">
            <div className={`p-3 rounded-2xl bg-${color}-500/10 text-${color}-400 group-hover:scale-110 transition-transform`}>
                {icon}
            </div>
            {trend && (
                <span className={`text-[10px] px-2 py-1 rounded-full ${trend.startsWith('+') ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
                    {trend}
                </span>
            )}
        </div>
        <div className="space-y-1">
            <p className="text-slate-400 text-xs font-medium uppercase tracking-wider">{title}</p>
            <div className="flex items-baseline gap-1">
                <h3 className="text-2xl font-bold text-white tracking-tight">{value}</h3>
                <span className="text-slate-500 text-sm">{unit}</span>
            </div>
        </div>
    </div>
);
export default StatCard;