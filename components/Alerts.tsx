
import React, { useState } from 'react';
import { 
  Filter, 
  Search, 
  ChevronDown, 
  X,
  PlayCircle,
  MessageSquare,
  CheckCircle,
  AlertOctagon,
  Clock,
  MapPin,
  Share2,
  Download,
  AlertTriangle,
  FileText,
  MoreHorizontal
} from 'lucide-react';
import { Alert as AlertType, Severity, Status } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

const alertsData: AlertType[] = [
  { id: 'ALT-1023', type: 'PPE', severity: 'High', zone: 'Zone A - Welding', camera: 'Cam 04', timestamp: '10:42 AM', status: 'New', description: 'No helmet detected on worker.', thumbnail: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?q=80&w=2070' },
  { id: 'ALT-1022', type: 'Proximity', severity: 'Medium', zone: 'Zone B', camera: 'Cam 02', timestamp: '10:15 AM', status: 'Acknowledged', description: 'Person too close to forklift.', thumbnail: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070' },
  { id: 'ALT-1021', type: 'Fall', severity: 'High', zone: 'Zone C', camera: 'Cam 07', timestamp: '09:30 AM', status: 'Resolved', description: 'Person detected falling.', thumbnail: 'https://images.unsplash.com/photo-1590105577767-e21a46b53002?q=80&w=2070' },
  { id: 'ALT-1020', type: 'Intrusion', severity: 'Low', zone: 'Zone A', camera: 'Cam 04', timestamp: '08:12 AM', status: 'Dismissed', description: 'Unauthorized entry in restricted zone.', thumbnail: 'https://images.unsplash.com/photo-1516937622598-f73fe5209aee?q=80&w=2070' },
];

const StatusPill = ({ status }: { status: Status }) => {
  const styles: Record<string, string> = {
    New: 'bg-blue-900/30 text-blue-400 border-blue-800',
    Acknowledged: 'bg-vs-orange/10 text-vs-orange border-vs-orange/30',
    Resolved: 'bg-emerald-900/30 text-emerald-400 border-emerald-800',
    Dismissed: 'bg-zinc-800 text-zinc-500 border-zinc-700',
  };
  const { t } = useLanguage();
  return (
    <span className={`px-2 py-0.5 rounded border text-[10px] font-bold uppercase tracking-wider ${styles[status] || styles.New}`}>
      {t(status.toLowerCase() as any)}
    </span>
  );
};

const AlertDetails = ({ alert, onClose }: { alert: AlertType, onClose: () => void }) => {
  const { t } = useLanguage();
  
  return (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 animate-in fade-in duration-200">
    <div className="bg-[#0f0f11] rounded-lg border border-zinc-800 shadow-2xl w-full max-w-6xl h-[90vh] flex flex-col overflow-hidden">
      <div className="h-16 px-6 border-b border-zinc-800 flex justify-between items-center bg-[#0f0f11] flex-shrink-0">
        <div className="flex items-center space-x-4 rtl:space-x-reverse">
          <h2 className="text-lg font-bold text-white tracking-tight flex items-center">
            {t('alertDetails')} <span className="mx-2 text-zinc-600">/</span> <span className="font-mono text-vs-orange">{alert.id}</span>
          </h2>
          <StatusPill status={alert.status} />
        </div>
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
           {/* Fixed shadowing error by using window.alert */}
           <button className="p-2 hover:bg-zinc-800 rounded text-zinc-400 hover:text-white transition-colors" onClick={() => window.alert('Download evidence for ' + alert.id)}><Download size={18} /></button>
           <button onClick={onClose} className="p-2 hover:bg-zinc-800 rounded text-zinc-400 hover:text-white transition-colors"><X size={20} /></button>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        <div className="flex-1 flex flex-col bg-black p-6 overflow-y-auto">
             <div className="relative aspect-video bg-zinc-900 rounded-lg overflow-hidden border border-zinc-800 mb-4 group shadow-2xl">
               <img src={alert.thumbnail} alt="Evidence" className="w-full h-full object-cover opacity-90" />
               <div className="absolute top-4 start-4 bg-black/70 backdrop-blur px-3 py-1.5 rounded border border-white/10 flex items-center space-x-2 rtl:space-x-reverse">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                  <span className="text-white text-xs font-mono uppercase tracking-tighter">Event Capture • {alert.timestamp}</span>
               </div>
               
               {/* Realistic Bounding Box Simulation */}
               <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute top-1/4 left-1/3 w-32 h-48 border-2 border-vs-orange/80 shadow-[0_0_15px_rgba(255,106,0,0.5)]">
                     <div className="bg-vs-orange text-black text-[9px] font-bold px-1.5 py-0.5 absolute -top-5 left-0">Violation: {alert.type} 98.4%</div>
                  </div>
               </div>
             </div>
             <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#0f0f11] border border-zinc-800 rounded p-4 flex items-start space-x-3 rtl:space-x-reverse">
                   <div className="p-2 bg-blue-500/10 rounded border border-blue-500/20 text-blue-500"><AlertOctagon size={18} /></div>
                   <div className="flex-1">
                      <h4 className="text-[10px] font-bold text-zinc-500 uppercase mb-2">AI Analysis Engine</h4>
                      <p className="text-sm text-zinc-200">{alert.description}</p>
                   </div>
                </div>
                <div className="bg-[#0f0f11] border border-zinc-800 rounded p-4 flex items-start space-x-3 rtl:space-x-reverse">
                   <div className="p-2 bg-vs-orange/10 rounded border border-vs-orange/20 text-vs-orange"><MapPin size={18} /></div>
                   <div className="flex-1">
                      <h4 className="text-[10px] font-bold text-zinc-500 uppercase mb-2">Geolocation Data</h4>
                      <p className="text-sm text-zinc-200">{alert.zone}</p>
                   </div>
                </div>
             </div>
        </div>
        <div className="w-96 bg-[#0f0f11] border-s border-zinc-800 flex flex-col p-6 shadow-xl">
           <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-6 opacity-60">System Actions</h3>
           <div className="space-y-3">
              {/* Fixed shadowing error by using window.alert */}
              <button className="w-full py-3 bg-vs-orange hover:bg-vs-lightOrange text-black font-bold rounded text-xs uppercase tracking-widest transition-all shadow-glow flex items-center justify-center space-x-2 rtl:space-x-reverse" onClick={() => { window.alert('Acknowledged!'); onClose(); }}>
                 <CheckCircle size={16} />
                 <span>Acknowledge Alert</span>
              </button>
              {/* Fixed shadowing error by using window.alert */}
              <button className="w-full py-3 bg-zinc-800 hover:bg-zinc-700 text-white font-bold rounded text-xs uppercase tracking-widest transition-all border border-zinc-700 flex items-center justify-center space-x-2 rtl:space-x-reverse" onClick={() => window.alert('Incident report template opened')}>
                 <FileText size={16} />
                 <span>Escalate to Incident</span>
              </button>
           </div>
           
           <div className="mt-8 border-t border-zinc-800 pt-6">
              <h4 className="text-[10px] font-bold text-zinc-600 uppercase mb-4 tracking-widest">Metadata</h4>
              <div className="space-y-2 text-[11px] font-mono text-zinc-500">
                 <div className="flex justify-between"><span>Frame ID:</span><span className="text-zinc-300">FR-98213-X</span></div>
                 <div className="flex justify-between"><span>Camera:</span><span className="text-zinc-300">{alert.camera}</span></div>
                 <div className="flex justify-between"><span>Resolution:</span><span className="text-zinc-300">1920x1080</span></div>
              </div>
           </div>
        </div>
      </div>
    </div>
  </div>
  );
};

const Alerts = () => {
  const [selectedAlert, setSelectedAlert] = useState<AlertType | null>(null);
  const { t } = useLanguage();

  return (
    <div className="p-6 space-y-6 h-full overflow-y-auto">
      {selectedAlert && <AlertDetails alert={selectedAlert} onClose={() => setSelectedAlert(null)} />}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <div>
           <h2 className="text-2xl font-bold text-white">{t('alerts')}</h2>
           <p className="text-sm text-zinc-500">History of AI-detected safety violations.</p>
        </div>
        <div className="flex space-x-3 rtl:space-x-reverse">
           <div className="relative group">
             <Search className="absolute start-3 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-vs-orange transition-colors" size={16} />
             <input type="text" placeholder={t('searchPlaceholder')} className="px-9 py-2 bg-[#0f0f11] border border-zinc-800 rounded text-sm text-white focus:outline-none focus:border-vs-orange transition-colors w-64 shadow-sm placeholder-zinc-600" />
           </div>
           <button className="flex items-center space-x-2 rtl:space-x-reverse px-4 py-2 bg-[#0f0f11] border border-zinc-800 rounded text-zinc-300 hover:bg-zinc-800 shadow-sm text-sm font-medium transition-colors"><Filter size={16} /><span>{t('filter')}</span></button>
        </div>
      </div>
      <div className="bg-[#0f0f11] border border-zinc-800 rounded-lg overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-start text-sm text-zinc-400">
            <thead className="bg-zinc-900/50 text-zinc-500 uppercase text-[10px] font-bold tracking-wider border-b border-zinc-800">
              <tr>
                <th className="px-6 py-4 text-start">{t('id')}</th>
                <th className="px-6 py-4 text-start">{t('alertType')}</th>
                <th className="px-6 py-4 text-start">{t('severity')}</th>
                <th className="px-6 py-4 text-start">{t('location')}</th>
                <th className="px-6 py-4 text-start">{t('status')}</th>
                <th className="px-6 py-4 text-end"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/50">
              {alertsData.map((alert) => (
                <tr key={alert.id} onClick={() => setSelectedAlert(alert)} className="hover:bg-zinc-900/40 transition-colors cursor-pointer group">
                  <td className="px-6 py-4 font-mono font-medium text-white group-hover:text-vs-orange transition-colors">{alert.id}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3 rtl:space-x-reverse">
                       <div className="w-12 h-12 rounded bg-black overflow-hidden border border-zinc-800">
                          <img src={alert.thumbnail} className="w-full h-full object-cover opacity-80" />
                       </div>
                       <span className="font-semibold text-zinc-200">{alert.type}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                     <span className={`font-bold text-[10px] uppercase px-2 py-0.5 rounded border ${alert.severity === 'High' ? 'text-red-500 bg-red-500/10 border-red-500/20' : 'text-vs-orange bg-vs-orange/10 border-vs-orange/20'}`}>
                        {t(alert.severity.toLowerCase() as any)}
                     </span>
                  </td>
                  <td className="px-6 py-4 text-zinc-300">{alert.zone}</td>
                  <td className="px-6 py-4"><StatusPill status={alert.status} /></td>
                  {/* Fixed shadowing error by using window.alert and correctly imported MoreHorizontal */}
                  <td className="px-6 py-4 text-end"><button className="p-2 hover:bg-zinc-800 rounded text-zinc-500 hover:text-white transition-colors" onClick={(e) => { e.stopPropagation(); window.alert('Quick action menu'); }}><MoreHorizontal size={16} /></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Alerts;
