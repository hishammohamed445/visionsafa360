
import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  FileText, 
  AlertTriangle, 
  Clock, 
  CheckCircle,
  ArrowRight,
  Download,
  Calendar,
  X,
  CheckCircle2
} from 'lucide-react';
import { Incident, Severity } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

const mockIncidents: Incident[] = [
  { id: 'INC-2023-001', zone: 'Zone B - Forklift', classification: 'Near Miss', severity: 'High', rootCause: 'Driver blind spot', correctiveAction: 'Install mirror', createdAt: '2023-10-25' },
  { id: 'INC-2023-002', zone: 'Zone A - Welding', classification: 'Minor Injury', severity: 'Medium', rootCause: 'Sparks', correctiveAction: 'Review PPE', createdAt: '2023-10-26' },
  { id: 'INC-2023-003', zone: 'Zone C - Loading', classification: 'Property Damage', severity: 'Low', rootCause: 'Equipment failure', correctiveAction: 'Maintenance', createdAt: '2023-10-27' },
  { id: 'INC-2023-004', zone: 'Zone A - Welding', classification: 'Near Miss', severity: 'High', rootCause: 'Procedural Error', correctiveAction: 'Training', createdAt: '2023-10-28' },
];

const SeverityBadge = ({ severity }: { severity: Severity }) => {
  const styles = {
    High: 'bg-red-500/10 text-red-500 border-red-500/20',
    Medium: 'bg-vs-orange/10 text-vs-orange border-vs-orange/20',
    Low: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
  };
  const { t } = useLanguage();
  return (
    <span className={`px-2 py-0.5 rounded border text-[10px] uppercase font-bold tracking-wider ${styles[severity]}`}>
      {t(severity.toLowerCase() as any)}
    </span>
  );
};

const StatCard = ({ label, value, icon: Icon, colorClass }: { label: string, value: string, icon: any, colorClass: string }) => (
    <div className="bg-[#0f0f11] p-4 rounded-lg border border-zinc-800 flex items-center space-x-4 rtl:space-x-reverse">
        <div className={`p-2 rounded bg-zinc-900 border border-zinc-800 ${colorClass}`}>
            <Icon size={20} />
        </div>
        <div>
            <p className="text-zinc-500 text-xs font-medium uppercase tracking-wider">{label}</p>
            <p className="text-xl font-bold text-white">{value}</p>
        </div>
    </div>
);

const Incidents = () => {
  const { t, dir } = useLanguage();
  const [showAddModal, setShowAddModal] = useState(false);

  const handleExport = () => {
    alert("Preparing Incident Log CSV export...");
  };

  return (
    <div className="p-6 space-y-6 h-full overflow-y-auto bg-[#050505]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">{t('incidents')}</h2>
          <p className="text-zinc-500 text-sm">Review and manage reported workplace incidents.</p>
        </div>
        <div className="flex space-x-3 rtl:space-x-reverse">
           <button onClick={handleExport} className="flex items-center space-x-2 rtl:space-x-reverse px-4 py-2 bg-zinc-900 border border-zinc-800 text-zinc-300 rounded hover:bg-zinc-800 text-sm font-medium transition-colors">
              <Download size={16} />
              <span>{t('exportCSV')}</span>
           </button>
           <button onClick={() => setShowAddModal(true)} className="flex items-center space-x-2 rtl:space-x-reverse px-4 py-2 bg-vs-orange text-black rounded hover:bg-vs-lightOrange text-sm font-bold shadow-glow transition-colors">
              <Plus size={16} />
              <span>{t('reportIncident')}</span>
           </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard label="Active Cases" value="3" icon={AlertTriangle} colorClass="text-red-500" />
        <StatCard label="Avg. Resolution" value="4.2d" icon={Clock} colorClass="text-vs-orange" />
        <StatCard label="Reports this Mo." value="12" icon={FileText} colorClass="text-blue-500" />
        <StatCard label="Resolved" value="9" icon={CheckCircle} colorClass="text-emerald-500" />
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col lg:flex-row gap-4 bg-[#0f0f11] p-4 rounded-lg border border-zinc-800 items-center">
         <div className="relative flex-1 w-full lg:w-auto">
           <Search className="absolute start-3 top-1/2 -translate-y-1/2 text-zinc-600" size={16} />
           <input 
            type="text" 
            placeholder={t('searchPlaceholder')}
            className="w-full px-9 py-2 bg-[#050505] border border-zinc-800 rounded text-sm text-white focus:outline-none focus:border-vs-orange/50 transition-colors placeholder-zinc-600"
          />
         </div>
         <div className="flex gap-2 w-full lg:w-auto overflow-x-auto pb-2 lg:pb-0">
            <select className="bg-[#050505] border border-zinc-800 text-zinc-400 text-sm rounded px-3 py-2 focus:outline-none">
               <option>{t('allZones')}</option>
            </select>
            <button className="flex items-center px-3 py-2 bg-[#050505] border border-zinc-800 rounded text-zinc-400 hover:text-white transition-colors">
               <Calendar size={16} />
            </button>
         </div>
      </div>

      {/* Incidents Table */}
      <div className="bg-[#0f0f11] border border-zinc-800 rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-start text-sm text-zinc-400">
            <thead className="bg-zinc-900/50 text-zinc-500 uppercase text-[10px] font-bold tracking-wider border-b border-zinc-800">
              <tr>
                <th className="px-6 py-4 text-start">{t('id')}</th>
                <th className="px-6 py-4 text-start">Date</th>
                <th className="px-6 py-4 text-start">Zone</th>
                <th className="px-6 py-4 text-start">Severity</th>
                <th className="px-6 py-4 text-start">Category</th>
                <th className="px-6 py-4 text-end"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/50">
              {mockIncidents.map((incident) => (
                <tr key={incident.id} className="hover:bg-zinc-900/40 transition-colors group cursor-pointer">
                  <td className="px-6 py-4">
                    <span className="font-mono font-medium text-white group-hover:text-vs-orange transition-colors">{incident.id}</span>
                  </td>
                  <td className="px-6 py-4 font-mono text-xs">{incident.createdAt}</td>
                  <td className="px-6 py-4 text-zinc-300">{incident.zone}</td>
                  <td className="px-6 py-4"><SeverityBadge severity={incident.severity} /></td>
                  <td className="px-6 py-4">
                     <span className="bg-zinc-800 px-2 py-1 rounded text-xs text-zinc-300 border border-zinc-700">{incident.classification}</span>
                  </td>
                  <td className="px-6 py-4 text-end">
                    <button className="text-zinc-500 hover:text-white transition-colors p-1 hover:bg-zinc-800 rounded">
                        <ArrowRight className="rtl:rotate-180" size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Incident Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-[#0f0f11] border border-zinc-800 rounded-2xl w-full max-w-xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-zinc-800 flex justify-between items-center bg-zinc-900/20">
              <h3 className="text-lg font-bold text-white uppercase tracking-wider">{t('reportIncident')}</h3>
              <button onClick={() => setShowAddModal(false)} className="text-zinc-500 hover:text-white transition-colors">
                <X size={24} />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-zinc-500 uppercase">Category</label>
                  <select className="w-full bg-black border border-zinc-800 rounded-lg p-3 text-white focus:border-vs-orange outline-none">
                    <option>Near Miss</option>
                    <option>Minor Injury</option>
                    <option>Critical Failure</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-zinc-500 uppercase">Severity</label>
                  <select className="w-full bg-black border border-zinc-800 rounded-lg p-3 text-white focus:border-vs-orange outline-none">
                    <option>High</option>
                    <option>Medium</option>
                    <option>Low</option>
                  </select>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-500 uppercase">Description</label>
                <textarea rows={3} className="w-full bg-black border border-zinc-800 rounded-lg p-3 text-white focus:border-vs-orange outline-none resize-none" placeholder="Describe what happened..."></textarea>
              </div>
            </div>
            <div className="p-6 bg-zinc-900/30 flex justify-end space-x-3 rtl:space-x-reverse">
              <button onClick={() => setShowAddModal(false)} className="px-4 py-2 text-zinc-500 hover:text-white font-medium uppercase text-xs tracking-widest">Cancel</button>
              <button onClick={() => { setShowAddModal(false); alert('Incident recorded successfully!'); }} className="px-6 py-2 bg-vs-orange text-black font-bold rounded-lg shadow-glow hover:bg-vs-lightOrange transition-colors flex items-center space-x-2 rtl:space-x-reverse uppercase text-xs tracking-widest">
                <CheckCircle2 size={16} />
                <span>Submit Report</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Incidents;
