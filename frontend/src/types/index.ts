// ============================================================
// SentinelAI — Type Definitions
// ============================================================

// --- Auth ---
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'operator' | 'viewer';
  avatar?: string;
  organization: string;
  lastLogin?: string;
  createdAt: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  organization: string;
}

// --- Camera ---
export type CameraStatus = 'online' | 'offline' | 'degraded' | 'recording';
export type WeatherCondition = 'clear' | 'rain' | 'fog' | 'snow' | 'storm' | 'haze';

export interface Camera {
  id: string;
  name: string;
  location: string;
  status: CameraStatus;
  fps: number;
  resolution: string;
  weather: WeatherCondition;
  temperature: number;
  visibility: number; // in meters
  lat: number;
  lng: number;
  stream_url?: string;
  isRecording: boolean;
  lastDetection?: string;
  activeAlerts: number;
  totalDetections: number;
  uptime: number; // percentage
}

export interface BoundingBox {
  id: string;
  x: number; // percentage from left
  y: number; // percentage from top
  width: number; // percentage
  height: number; // percentage
  confidence: number;
  label: string;
  trackId: string;
}

// --- Detection ---
export type ThreatLevel = 'HIGH' | 'MEDIUM' | 'LOW' | 'NONE';

export interface Detection {
  id: string;
  cameraId: string;
  cameraName: string;
  timestamp: string;
  imageUrl: string;
  annotatedImageUrl?: string;
  humanCount: number;
  confidence: number;
  threatLevel: ThreatLevel;
  activityScore: number;
  weather: WeatherCondition;
  location: string;
  lat: number;
  lng: number;
  boundingBoxes: BoundingBox[];
  duration?: number; // seconds
}

// --- Alert ---
export type AlertPriority = 'critical' | 'high' | 'medium' | 'low';
export type AlertStatus = 'active' | 'resolved' | 'dismissed' | 'investigating';
export type AlertType = 'intrusion' | 'crowd' | 'motion' | 'perimeter' | 'loitering' | 'system';

export interface Alert {
  id: string;
  title: string;
  description: string;
  priority: AlertPriority;
  status: AlertStatus;
  type: AlertType;
  cameraId: string;
  cameraName: string;
  location: string;
  timestamp: string;
  resolvedAt?: string;
  assignedTo?: string;
  detectionId?: string;
  imageUrl?: string;
  lat: number;
  lng: number;
}

// --- Stats ---
export interface DashboardStats {
  liveHumanCount: number;
  activeCameras: number;
  totalCameras: number;
  activeAlerts: number;
  todayDetections: number;
  detectionAccuracy: number;
  averageFps: number;
  cpuUsage: number;
  gpuUsage: number;
  systemUptime: number;
  lastUpdated: string;
}

// --- Chart Data ---
export interface TimeSeriesPoint {
  time: string;
  value: number;
  label?: string;
}

export interface DetectionTrendData {
  date: string;
  detections: number;
  alerts: number;
  humans: number;
}

export interface HourlyActivityData {
  hour: string;
  count: number;
  alerts: number;
}

export interface WeeklyReportData {
  day: string;
  detections: number;
  resolved: number;
  avgConfidence: number;
}

export interface AlertDistribution {
  name: string;
  value: number;
  color: string;
}

// --- Map ---
export interface MapMarker {
  id: string;
  type: 'camera' | 'detection' | 'alert' | 'restricted';
  lat: number;
  lng: number;
  label: string;
  status?: string;
  color?: string;
}

export interface MovementPath {
  id: string;
  trackId: string;
  points: Array<[number, number]>;
  color: string;
  timestamp: string;
}

export interface RestrictedZone {
  id: string;
  name: string;
  coordinates: Array<[number, number]>;
  color: string;
  alertLevel: AlertPriority;
}

// --- Settings ---
export interface NotificationSettings {
  emailAlerts: boolean;
  pushNotifications: boolean;
  alertThreshold: AlertPriority;
  soundEnabled: boolean;
  criticalOnly: boolean;
}

export interface AISettings {
  detectionThreshold: number; // 0-100
  trackingEnabled: boolean;
  weatherCompensation: boolean;
  nightVisionMode: boolean;
  minHumanSize: number; // pixels
  maxTrackingDistance: number;
}

export interface CameraSettings {
  defaultFps: number;
  recordingQuality: 'low' | 'medium' | 'high' | 'ultra';
  autoRecord: boolean;
  retentionDays: number;
  snapshotInterval: number;
}

export interface AppSettings {
  theme: 'dark' | 'light';
  language: string;
  timezone: string;
  notifications: NotificationSettings;
  ai: AISettings;
  camera: CameraSettings;
}

// --- API ---
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface DetectionFilters {
  cameraId?: string;
  threatLevel?: ThreatLevel;
  startDate?: string;
  endDate?: string;
  minConfidence?: number;
  search?: string;
  page?: number;
  pageSize?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface AlertFilters {
  status?: AlertStatus;
  priority?: AlertPriority;
  type?: AlertType;
  startDate?: string;
  endDate?: string;
  search?: string;
}

// --- Navigation ---
export interface NavItem {
  id: string;
  label: string;
  path: string;
  icon: string;
  badge?: number;
  children?: NavItem[];
}

// --- Team ---
export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  avatar: string;
  social: {
    linkedin?: string;
    github?: string;
    twitter?: string;
  };
}

// --- Testimonial ---
export interface Testimonial {
  id: string;
  name: string;
  role: string;
  organization: string;
  content: string;
  avatar: string;
  rating: number;
}

// --- FAQ ---
export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

// --- Video Intelligence Analysis & YOLO26 Types ---
export interface Pose {
  keypoints: Array<[number, number, number]>; // [x, y, confidence]
  skeleton: Array<[number, number]>; // connections indices
}

export interface MotionData {
  velocity: number;
  direction: number;
}

export interface ZoneStatus {
  name: string;
  inside: boolean;
}

export interface ActivityOntology {
  label: 'standing' | 'walking' | 'running' | 'falling' | 'loitering' | 'unknown';
  confidence: number;
}

export interface TrackedPerson {
  track_id?: number | string;
  confidence: number;
  bbox: [number, number, number, number]; // [x1, y1, x2, y2]
  pose?: Pose | null;
  activity: ActivityOntology;
  motion: MotionData;
  zone: ZoneStatus;
  trajectory?: Array<[number, number]>;
}

export interface IntelligenceEvent {
  type: string;
  track_id: string;
  confidence: number;
  description: string;
}

export interface ImageAnalysisResponse {
  frame_id: number;
  timestamp: string;
  score: number;
  label: ThreatLevel;
  regions_detected: number;
  output_image: string;
  persons: TrackedPerson[];
  events: IntelligenceEvent[];
}

