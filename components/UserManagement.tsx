
import React, { useState } from 'react';
import { Plus, MoreVertical, Shield, User as UserIcon, X, CheckCircle2 } from 'lucide-react';
import { User } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

const mockUsers: User[] = [
  { id: '1', name: 'Alex Morgan', email: 'alex.m@visionsafe.co', role: 'Admin', status: 'Active' },
  { id: '2', name: 'Sarah Chen', email: 'sarah.c@visionsafe.co', role: 'Safety Engineer', status: 'Active' },
  { id: '3', name: 'Mike Ross', email: 'mike.r@visionsafe.co', role: 'Data Analyst', status: 'Inactive' },
];

const UserManagement = () => {
  const { t } = useLanguage();
  const [showAddModal, setShowAddModal] = useState(false);

  return (
    <div className="p-6 space-y-6 h-full overflow-y-auto">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white">{t('users')}</h2>
          <p className="text-sm text-zinc-500">Manage system access roles and account status.</p>
        </div>
        <button onClick={() => setShowAddModal(true)} className="flex items-center space-x-2 rtl:space-x-reverse px-4 py-2 bg-vs-orange text-black rounded hover:bg-vs-lightOrange text-sm font-bold shadow-glow transition-colors">
            <Plus size={18} />
            <span>{t('addUser')}</span>
        </button>
      </div>

      <div className="bg-[#0f0f11] border border-zinc-800 rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-start text-sm text-zinc-400">
          <thead className="bg-zinc-900/50 text-zinc-500 uppercase text-xs font-semibold border-b border-zinc-800">
            <tr>
              <th className="px-6 py-4 text-start">User</th>
              <th className="px-6 py-4 text-start">Role</th>
              <th className="px-6 py-4 text-start">Status</th>
              <th className="px-6 py-4 text-start">Last Active</th>
              <th className="px-6 py-4 text-end">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800/50">
            {mockUsers.map((user) => (
              <tr key={user.id} className="hover:bg-zinc-900/30 transition-colors group">
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-3 rtl:space-x-reverse">
                    <div className="w-10 h-10 bg-zinc-800 rounded-full flex items-center justify-center text-zinc-500 group-hover:bg-vs-orange/20 group-hover:text-vs-orange transition-colors">
                       <UserIcon size={20} />
                    </div>
                    <div>
                      <p className="font-semibold text-white">{user.name}</p>
                      <p className="text-xs text-zinc-500">{user.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center text-zinc-300 font-medium">
                    <Shield size={14} className="me-2 text-vs-orange" />
                    {t(user.role.toLowerCase().replace(/ /g, '') as any)}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    user.status === 'Active' ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' : 'bg-zinc-800 text-zinc-500 border border-zinc-700'
                  }`}>
                    {t(user.status.toLowerCase() as any)}
                  </span>
                </td>
                <td className="px-6 py-4 text-zinc-500 font-mono text-xs">
                  2 hours ago
                </td>
                <td className="px-6 py-4 text-end">
                  <button onClick={() => alert('User editing coming soon...')} className="text-zinc-500 hover:text-white p-2 rounded-full hover:bg-zinc-800 transition-colors">
                    <MoreVertical size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-[#0f0f11] border border-zinc-800 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-zinc-800 flex justify-between items-center bg-zinc-900/20">
              <h3 className="text-lg font-bold text-white uppercase tracking-wider">{t('addUser')}</h3>
              <button onClick={() => setShowAddModal(false)} className="text-zinc-500 hover:text-white transition-colors">
                <X size={24} />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-500 uppercase">Full Name</label>
                <input type="text" className="w-full bg-black border border-zinc-800 rounded-lg p-3 text-white focus:border-vs-orange outline-none" placeholder="John Doe" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-500 uppercase">Email Address</label>
                <input type="email" className="w-full bg-black border border-zinc-800 rounded-lg p-3 text-white focus:border-vs-orange outline-none" placeholder="john@visionsafe.co" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-500 uppercase">System Role</label>
                <select className="w-full bg-black border border-zinc-800 rounded-lg p-3 text-white focus:border-vs-orange outline-none">
                  <option>Safety Engineer</option>
                  <option>Data Analyst</option>
                  <option>Admin</option>
                </select>
              </div>
            </div>
            <div className="p-6 bg-zinc-900/30 flex justify-end space-x-3 rtl:space-x-reverse">
              <button onClick={() => setShowAddModal(false)} className="px-4 py-2 text-zinc-500 hover:text-white font-medium uppercase text-xs tracking-widest">Cancel</button>
              <button onClick={() => { setShowAddModal(false); alert('Invitation sent to user!'); }} className="px-6 py-2 bg-vs-orange text-black font-bold rounded-lg shadow-glow hover:bg-vs-lightOrange transition-colors flex items-center space-x-2 rtl:space-x-reverse uppercase text-xs tracking-widest">
                <CheckCircle2 size={16} />
                <span>Send Invite</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
