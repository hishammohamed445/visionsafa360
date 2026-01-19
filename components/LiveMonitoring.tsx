
import React, { useState } from 'react';
import { 
  Grid, 
  Maximize2, 
  VolumeX, 
  AlertOctagon,
  ArrowLeft,
  Layers,
  Target
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const CameraFeedCard = ({ 
  name, 
  zone, 
  src, 
  onClick 
}: { 
  name: string, 
  zone: string, 
  src: string, 
  onClick: () => void 
}) => {
  return (
    <div 
      onClick={onClick}
      className="relative bg-black rounded-lg overflow-hidden border border-zinc-800 hover:border-vs-orange transition-all cursor-pointer group shadow-lg"
    >
      <img src={src} alt={name} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
      
      <div className="absolute inset-0 p-3 flex flex-col justify-between">
        <div className="flex justify-between items-start">
           <div className="flex items-center space-x-2 rtl:space-x-reverse bg-black/60 backdrop-blur-sm px-2 py-1 rounded border border-white/10">
              <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]"></div>
              <span className="text-white font-mono text-[10px] font-bold tracking-tight">{name}</span>
           </div>
           <div className="bg-red-500/20 backdrop-blur-md border border-red-500/50 text-red-500 px-1.5 py-0.5 rounded text-[9px] font-bold uppercase opacity-0 group-hover:opacity-100 transition-opacity">
              AI Active
           </div>
        </div>
        <div className="bg-black/40 backdrop-blur-sm px-2 py-0.5 rounded border border-white/5 w-fit">
           <p className="text-zinc-400 text-[9px] font-mono">{zone}</p>
        </div>
      </div>
    </div>
  );
};

const DetailView = ({ camera, onClose }: { camera: any, onClose: () => void }) => {
  const [activeTab, setActiveTab] = useState<'Events' | 'Settings'>('Events');
  const { t } = useLanguage();

  return (
    <div className="flex h-full animate-in fade-in zoom-in-95 duration-200">
       <div className="flex-1 flex flex-col bg-black border-e border-zinc-800 relative">
          <div className="h-12 border-b border-zinc-800 bg-[#09090b] flex justify-between items-center px-4">
             <button onClick={onClose} className="flex items-center text-zinc-400 hover:text-white text-[10px] font-bold uppercase tracking-widest transition-colors">
                <ArrowLeft size={16} className="me-2 rtl:rotate-180" /> Back to Grid
             </button>
             <div className="flex items-center space-x-4 rtl:space-x-reverse">
                <span className="text-xs text-red-500 font-mono font-bold flex items-center">
                  <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse me-2"></span>
                  LIVE
                </span>
                <div className="h-4 w-px bg-zinc-700"></div>
                <span className="text-[10px] text-zinc-500 font-mono uppercase">1080p • 30fps</span>
             </div>
          </div>

          <div className="flex-1 relative bg-[#050505] flex items-center justify-center overflow-hidden">
             <img src={camera.src} className="w-full h-full object-contain opacity-90" />
             <div className="absolute inset-0 pointer-events-none border border-vs-orange/20"></div>
             <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/80 backdrop-blur border border-zinc-700 rounded-full px-6 py-2 flex items-center space-x-6 rtl:space-x-reverse">
                <button className="text-white hover:text-vs-orange transition-colors" onClick={() => window.alert('Volume toggled')}><VolumeX size={18} /></button>
                <div className="w-48 h-1 bg-zinc-700 rounded-full overflow-hidden">
                   <div className="h-full bg-red-500 w-1/3 animate-pulse"></div>
                </div>
                <button className="text-white hover:text-vs-orange transition-colors" onClick={() => window.alert('Fullscreen toggled')}><Maximize2 size={18} /></button>
             </div>
          </div>
       </div>

       <div className="w-80 bg-[#0f0f11] flex flex-col border-s border-zinc-800 shadow-2xl">
          <div className="p-5 border-b border-zinc-800">
             <h2 className="text-sm font-bold text-white mb-1 uppercase tracking-wider">{camera.name}</h2>
             <p className="text-[10px] text-zinc-500 font-mono">{camera.zone} • {camera.id}</p>
          </div>
          <div className="flex border-b border-zinc-800">
             <button onClick={() => setActiveTab('Events')} className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-widest border-b-2 transition-colors ${activeTab === 'Events' ? 'border-vs-orange text-white' : 'border-transparent text-zinc-500 hover:text-zinc-300'}`}>
               Timeline
             </button>
             <button onClick={() => setActiveTab('Settings')} className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-widest border-b-2 transition-colors ${activeTab === 'Settings' ? 'border-vs-orange text-white' : 'border-transparent text-zinc-500 hover:text-zinc-300'}`}>
               Config
             </button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
             {activeTab === 'Events' ? (
                <div className="space-y-3">
                   {[1, 2, 3].map((i) => (
                      <div key={i} className="bg-zinc-900/40 p-3 rounded border border-zinc-800 hover:border-zinc-700 cursor-pointer" onClick={() => window.alert('Viewing event snippet')}>
                         <div className="flex justify-between items-start mb-2">
                            <span className="text-[9px] font-bold text-red-500 uppercase">Detection</span>
                            <span className="text-[9px] text-zinc-600 font-mono">10:4{i} AM</span>
                         </div>
                         <p className="text-xs text-zinc-300 font-medium">PPE Violation Detected</p>
                      </div>
                   ))}
                </div>
             ) : (
                <div className="space-y-6">
                   <button className="w-full py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-[10px] font-bold uppercase rounded transition-colors flex items-center justify-center" onClick={() => window.alert('ROI Editor active')}>
                      <Target size={14} className="me-2" /> ROI Editor
                   </button>
                </div>
             )}
          </div>
       </div>
    </div>
  );
};

const LiveMonitoring = () => {
  const [layout, setLayout] = useState<number>(4);
  const [selectedCamera, setSelectedCamera] = useState<any | null>(null);
  const { t } = useLanguage();

  const cameras = [
    { id: 'C01', name: 'Assembly Line A', zone: 'Zone A', src: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070' },
    { id: 'C02', name: 'Logistics Dock', zone: 'Zone B', src: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070' },
    { id: 'C03', name: 'Chemical Processing', zone: 'Zone C', src: 'https://images.unsplash.com/photo-1503694978374-8a2fa686963a?q=80&w=2070' },
    { id: 'C04', name: 'Packaging Station', zone: 'Zone D', src: 'https://images.unsplash.com/photo-1565034946487-0d7150a275ce?q=80&w=2070' },
    { id: 'C05', name: 'Welding Bay 02', zone: 'Zone A', src: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?q=80&w=2070' },
    { id: 'C06', name: 'Main Gate Exit', zone: 'Zone E', src: 'https://images.unsplash.com/photo-1516937622598-f73fe5209aee?q=80&w=2070' },
  ];

  if (selectedCamera) {
    return <DetailView camera={selectedCamera} onClose={() => setSelectedCamera(null)} />;
  }

  return (
    <div className="flex h-full bg-[#050505] overflow-hidden">
      <div className="flex-1 flex flex-col p-4 overflow-hidden">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-xl font-bold text-white uppercase tracking-wider">{t('liveFeeds')}</h2>
            <p className="text-[10px] text-zinc-500 font-mono">Control Center • {cameras.length} Active Feeds</p>
          </div>
          <div className="flex items-center space-x-2 rtl:space-x-reverse bg-[#0f0f11] p-1 rounded-lg border border-zinc-800">
            <button onClick={() => setLayout(4)} className={`p-2 rounded ${layout === 4 ? 'bg-zinc-800 text-white shadow-sm' : 'text-zinc-500 hover:text-zinc-300'}`}><Grid size={18} /></button>
            <button onClick={() => setLayout(9)} className={`p-2 rounded ${layout === 9 ? 'bg-zinc-800 text-white shadow-sm' : 'text-zinc-500 hover:text-zinc-300'}`}><Layers size={18} /></button>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto custom-scrollbar pe-2">
           <div className={`grid gap-4 ${layout === 4 ? 'grid-cols-2' : 'grid-cols-3'}`}>
              {cameras.map((cam) => (
                 <div key={cam.id} className={`${layout === 4 ? 'aspect-video' : 'aspect-square'}`}>
                    <CameraFeedCard {...cam} onClick={() => setSelectedCamera(cam)} />
                 </div>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
};

export default LiveMonitoring;
