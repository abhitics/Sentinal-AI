// ============================================================
// SentinelAI — Constants & Configuration
// ============================================================

export const APP_NAME = 'SentinelAI';
export const APP_TAGLINE = 'Seeing Beyond Visibility, Detecting Beyond Boundaries.';
export const APP_VERSION = '2.0.0';

// --- API Configuration ---
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
export const AI_API_URL = import.meta.env.VITE_AI_URL || 'http://localhost:5001';
export const API_TIMEOUT = 30000;

// --- Auth ---
export const TOKEN_KEY = 'sentinel_token';
export const USER_KEY = 'sentinel_user';
export const REFRESH_INTERVAL = 30000; // 30s for real-time updates

// --- Routes ---
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  DASHBOARD: '/dashboard',
  LIVE_CAMERA: '/live-camera',
  DETECTION_HISTORY: '/detections',
  ANALYTICS: '/analytics',
  MAP: '/map',
  ALERTS: '/alerts',
  SETTINGS: '/settings',
  NOT_FOUND: '*',
} as const;

// --- Navigation Items ---
export const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', path: '/dashboard', icon: 'LayoutDashboard' },
  { id: 'live-camera', label: 'Live Camera', path: '/live-camera', icon: 'Camera' },
  { id: 'detections', label: 'Detection History', path: '/detections', icon: 'History' },
  { id: 'analytics', label: 'Analytics', path: '/analytics', icon: 'BarChart3' },
  { id: 'map', label: 'Interactive Map', path: '/map', icon: 'Map' },
  { id: 'alerts', label: 'Alert Center', path: '/alerts', icon: 'Bell' },
  { id: 'settings', label: 'Settings', path: '/settings', icon: 'Settings' },
] as const;

// --- Colors ---
export const COLORS = {
  primary: '#2563EB',
  secondary: '#06B6D4',
  success: '#10B981',
  warning: '#F59E0B',
  danger: '#EF4444',
  background: '#020617',
  card: '#0F172A',
  text: '#F8FAFC',
  muted: '#94A3B8',
  border: '#1E293B',
} as const;

// --- Chart Colors ---
export const CHART_COLORS = {
  primary: '#2563EB',
  secondary: '#06B6D4',
  success: '#10B981',
  warning: '#F59E0B',
  danger: '#EF4444',
  purple: '#8B5CF6',
  orange: '#F97316',
  pink: '#EC4899',
} as const;

// --- Threat Level Config ---
export const THREAT_LEVEL_CONFIG = {
  HIGH: { color: '#EF4444', bg: 'rgba(239, 68, 68, 0.15)', border: 'rgba(239, 68, 68, 0.3)', label: 'HIGH' },
  MEDIUM: { color: '#F59E0B', bg: 'rgba(245, 158, 11, 0.15)', border: 'rgba(245, 158, 11, 0.3)', label: 'MEDIUM' },
  LOW: { color: '#10B981', bg: 'rgba(16, 185, 129, 0.15)', border: 'rgba(16, 185, 129, 0.3)', label: 'LOW' },
  NONE: { color: '#64748B', bg: 'rgba(100, 116, 139, 0.15)', border: 'rgba(100, 116, 139, 0.3)', label: 'NONE' },
} as const;

// --- Alert Priority Config ---
export const ALERT_PRIORITY_CONFIG = {
  critical: { color: '#EF4444', bg: 'rgba(239, 68, 68, 0.15)', label: 'Critical', glow: '0 0 20px rgba(239,68,68,0.4)' },
  high: { color: '#F97316', bg: 'rgba(249, 115, 22, 0.15)', label: 'High', glow: '0 0 20px rgba(249,115,22,0.4)' },
  medium: { color: '#F59E0B', bg: 'rgba(245, 158, 11, 0.15)', label: 'Medium', glow: '0 0 20px rgba(245,158,11,0.4)' },
  low: { color: '#06B6D4', bg: 'rgba(6, 182, 212, 0.15)', label: 'Low', glow: '0 0 20px rgba(6,182,212,0.4)' },
} as const;

// --- Weather Condition Config ---
export const WEATHER_CONFIG = {
  clear: { label: 'Clear', icon: '☀️', color: '#F59E0B' },
  rain: { label: 'Rain', icon: '🌧️', color: '#06B6D4' },
  fog: { label: 'Fog', icon: '🌫️', color: '#94A3B8' },
  snow: { label: 'Snow', icon: '❄️', color: '#E0F2FE' },
  storm: { label: 'Storm', icon: '⛈️', color: '#8B5CF6' },
  haze: { label: 'Haze', icon: '🌁', color: '#78716C' },
} as const;

// --- Camera Status Config ---
export const CAMERA_STATUS_CONFIG = {
  online: { color: '#10B981', label: 'Online', dot: 'bg-success-500' },
  offline: { color: '#EF4444', label: 'Offline', dot: 'bg-danger-500' },
  degraded: { color: '#F59E0B', label: 'Degraded', dot: 'bg-warning-500' },
  recording: { color: '#2563EB', label: 'Recording', dot: 'bg-primary-500' },
} as const;

// --- Technologies Displayed on Landing ---
export const TECHNOLOGIES = [
  { name: 'YOLOv11', category: 'AI Model', icon: '🧠' },
  { name: 'PyTorch', category: 'Deep Learning', icon: '🔥' },
  { name: 'OpenCV', category: 'Computer Vision', icon: '👁️' },
  { name: 'Flask', category: 'AI API', icon: '🐍' },
  { name: 'Node.js', category: 'API Gateway', icon: '🟢' },
  { name: 'React', category: 'Frontend', icon: '⚛️' },
  { name: 'TypeScript', category: 'Type Safety', icon: '📘' },
  { name: 'Tailwind CSS', category: 'Styling', icon: '🎨' },
  { name: 'Framer Motion', category: 'Animations', icon: '✨' },
  { name: 'Leaflet.js', category: 'Mapping', icon: '🗺️' },
  { name: 'Recharts', category: 'Analytics', icon: '📊' },
  { name: 'Vite', category: 'Build Tool', icon: '⚡' },
] as const;

// --- Features on Landing Page ---
export const FEATURES = [
  {
    icon: 'Brain',
    title: 'AI-Powered Detection',
    description: 'YOLOv11 deep learning model detects humans with 94.7% accuracy even in adverse weather — fog, rain, snow, and darkness.',
    color: '#2563EB',
  },
  {
    icon: 'Activity',
    title: 'Real-Time Tracking',
    description: 'Multi-person tracking with unique IDs and movement trajectory analysis across multiple camera zones.',
    color: '#06B6D4',
  },
  {
    icon: 'CloudLightning',
    title: 'All-Weather Capability',
    description: 'Advanced weather compensation algorithms maintain detection quality in fog, rain, snow, and low-light environments.',
    color: '#10B981',
  },
  {
    icon: 'Shield',
    title: 'Smart Alert System',
    description: 'Context-aware alerts with priority scoring. Reduce false positives by 78% with our intelligent filtering engine.',
    color: '#F59E0B',
  },
  {
    icon: 'Map',
    title: 'GPS-Tagged Detections',
    description: 'Every detection is geo-tagged and visualized on interactive maps with movement paths and restricted zone monitoring.',
    color: '#8B5CF6',
  },
  {
    icon: 'BarChart3',
    title: 'Deep Analytics',
    description: 'Comprehensive dashboards with trend analysis, heat maps, activity timelines, and exportable reports.',
    color: '#EC4899',
  },
] as const;

// --- FAQ Items ---
export const FAQ_ITEMS = [
  {
    id: 'faq-1',
    question: 'What AI model powers SentinelAI?',
    answer: 'SentinelAI uses YOLOv11 (You Only Look Once v11), the latest generation of real-time object detection models by Ultralytics, fine-tuned specifically for human detection in adverse weather conditions using PyTorch.',
  },
  {
    id: 'faq-2',
    question: 'How does SentinelAI perform in poor weather?',
    answer: 'Our AI pipeline includes preprocessing layers for weather compensation — contrast enhancement, defogging algorithms, and adaptive threshold detection. We maintain 85%+ detection accuracy in fog, rain, snow, and low-light conditions.',
  },
  {
    id: 'faq-3',
    question: 'How many cameras can the platform support?',
    answer: 'The architecture is horizontally scalable. A single node handles 8–16 concurrent camera streams at 30fps. Multi-node deployments can support hundreds of cameras with our distributed processing pipeline.',
  },
  {
    id: 'faq-4',
    question: 'Is the platform suitable for government/enterprise use?',
    answer: 'Yes. SentinelAI is built with enterprise-grade security — JWT authentication, role-based access control, audit logs, and encrypted data storage. It meets SOC 2 compliance standards.',
  },
  {
    id: 'faq-5',
    question: 'Can I integrate it with existing camera infrastructure?',
    answer: 'Yes. SentinelAI supports RTSP, HTTP/MJPEG, and WebRTC camera streams. It integrates with IP cameras, NVR systems, and standard CCTV setups via our camera configuration panel.',
  },
  {
    id: 'faq-6',
    question: 'What is the Activity Likelihood Score?',
    answer: 'The Activity Likelihood Score (0–100%) is computed based on the number of detected humans, their movement speed, zone clustering, and historical baseline data for that camera location. Scores above 70% trigger HIGH alerts.',
  },
] as const;

// --- Statistics for Landing ---
export const LANDING_STATS = [
  { value: '94.7%', label: 'Detection Accuracy', suffix: '' },
  { value: '200', label: 'Camera Feeds Supported', suffix: '+' },
  { value: '50', label: 'Detections Per Second', suffix: 'ms' },
  { value: '78%', label: 'False Positive Reduction', suffix: '' },
] as const;
