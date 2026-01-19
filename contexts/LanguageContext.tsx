
import React, { createContext, useContext, useState } from 'react';

export type Language = 'en' | 'ar';
export type Direction = 'ltr' | 'rtl';

const translations = {
  en: {
    // Nav
    overview: "Home Dashboard",
    liveFeeds: "Live Monitoring",
    alerts: "Alerts",
    incidents: "Incident History",
    ergonomics: "Ergonomics Analysis",
    reports: "Analytics",
    users: "User Management",
    cameras: "Camera Management",
    health: "System Health",
    monitoring: "Safety Monitoring",
    analytics: "Data & Reports",
    system: "System Administration",
    
    // Header
    systemActive: "Edge Server Online",
    systemOffline: "Edge Server Offline",
    systemOptimal: "System Optimal",
    searchPlaceholder: "Search records...",
    logout: "Logout",
    
    // KPIs
    mtta: "MTTA (Avg. Acknowledge)",
    mttr: "MTTR (Avg. Resolve)",
    safetyScore: "Compliance Rate",
    activeAlerts: "Active Alerts",
    lastUpdated: "Last Update",

    // Ergonomics
    ergonomicExposure: "Postural Risk Exposure",
    rulaScore: "Avg RULA Score",
    riskyDuration: "Risky Posture Duration",
    badPostures: "Bad Postures Detected",
    ergoTrends: "Ergonomic Trends",
    riskByZone: "Risk Distribution by Zone",

    // Health
    edgeNodes: "Edge Computing Nodes",
    nodeStatus: "Node Status",
    latency: "Latency",
    uptime: "Uptime",
    storage: "Storage Health",
    cpuUsage: "CPU Usage",
    
    // Dashboard & Others
    safetyOverview: "Factory Safety Status",
    realTimeMonitoring: "Real-time AI surveillance active.",
    camerasOnline: "Sensors Online",
    incidentTrends: "Safety Trends (Weekly)",
    criticalZones: "High Risk Zones",
    viewAllZones: "View Map",
    liveIncidentFeed: "Recent Activity",
    viewAllEvents: "Full History",
    highRisk: "DANGER",
    processing: "Active",
    allZones: "All Areas",
    
    // Statuses
    new: "New",
    acknowledged: "Acknowledged",
    resolved: "Resolved",
    archived: "Archived",
    active: "Active",
    logged: "Logged",
    investigation: "In Investigation",
    
    // General
    zoneA: "Production A",
    zoneB: "Warehouse B",
    zoneC: "Loading Dock",
    zoneD: "Assembly Line",
    admin: "System Admin",
    safetyengineer: "Safety Engineer",
    dataanalyst: "Data Analyst",
    reportIncident: "Report New Incident",
    exportCSV: "Export Data",
    addUser: "Add User",
    addCamera: "Add Stream",
    cameraName: "Stream Name",
    rtspUrl: "Source URL",
    location: "Zone",
    saveChanges: "Save Configuration"
  },
  ar: {
    // Nav
    overview: "الرئيسية",
    liveFeeds: "المراقبة الحية",
    alerts: "التنبيهات",
    incidents: "سجل الحوادث",
    ergonomics: "تحليل وضعيات العمل",
    reports: "التحليلات",
    users: "إدارة المستخدمين",
    cameras: "إدارة الكاميرات",
    health: "صحة النظام",
    monitoring: "مراقبة السلامة",
    analytics: "البيانات والتقارير",
    system: "إدارة النظام",
    
    // Header
    systemActive: "سيرفر الحافة متصل",
    systemOffline: "سيرفر الحافة غير متصل",
    systemOptimal: "النظام مثالي",
    searchPlaceholder: "بحث في السجلات...",
    logout: "خروج",

    // KPIs
    mtta: "متوسط زمن الاستجابة (MTTA)",
    mttr: "متوسط زمن الإغلاق (MTTR)",
    safetyScore: "نسبة الامتثال",
    activeAlerts: "تنبيهات نشطة",
    lastUpdated: "آخر تحديث",

    // Ergonomics
    ergonomicExposure: "التعرض لمخاطر الوضعيات",
    rulaScore: "متوسط مؤشر RULA",
    riskyDuration: "مدة الوضعيات الخطرة",
    badPostures: "وضعيات خاطئة مكتشفة",
    ergoTrends: "اتجاهات الهندسة البشرية",
    riskByZone: "توزيع المخاطر حسب المنطقة",

    // Health
    edgeNodes: "عقد حوسبة الحافة",
    nodeStatus: "حالة العقدة",
    latency: "زمن الاستجابة",
    uptime: "وقت التشغيل",
    storage: "صحة التخزين",
    cpuUsage: "استهلاك المعالج",
    
    // Dashboard & Others
    safetyOverview: "حالة سلامة المصنع",
    realTimeMonitoring: "المراقبة الذكية نشطة حالياً.",
    camerasOnline: "المستشعرات المتصلة",
    incidentTrends: "اتجاهات السلامة (أسبوعي)",
    criticalZones: "المناطق عالية الخطورة",
    viewAllZones: "عرض الخريطة",
    liveIncidentFeed: "النشاط الأخير",
    viewAllEvents: "السجل الكامل",
    highRisk: "خطر",
    processing: "نشط",
    allZones: "كل المناطق",
    
    // Statuses
    new: "جديد",
    acknowledged: "تم الإقرار",
    resolved: "تم الحل",
    archived: "مؤرشف",
    active: "نشط",
    logged: "مسجل",
    investigation: "قيد التحقيق",
    
    // General
    zoneA: "الإنتاج أ",
    zoneB: "المستودع ب",
    zoneC: "منصة التحميل",
    zoneD: "خط التجميع",
    admin: "مسؤول النظام",
    safetyengineer: "مهندس سلامة",
    dataanalyst: "محلل بيانات",
    reportIncident: "إبلاغ عن حادث جديد",
    exportCSV: "تصدير البيانات",
    addUser: "إضافة مستخدم",
    addCamera: "إضافة بث",
    cameraName: "اسم البث",
    rtspUrl: "رابط المصدر",
    location: "المنطقة",
    saveChanges: "حفظ الإعدادات"
  }
};

const LanguageContext = createContext<any>(null);

export const LanguageProvider = ({ children }: { children?: React.ReactNode }) => {
  const [language, setLanguage] = useState<Language>('ar');
  const dir = language === 'ar' ? 'rtl' : 'ltr';

  const t = (key: keyof typeof translations['en']) => {
    // @ts-ignore
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, dir, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
