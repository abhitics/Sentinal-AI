// ============================================================
// SentinelAI — Comprehensive Dummy Data
// ============================================================
import type {
  Camera, Detection, Alert, DashboardStats,
  DetectionTrendData, HourlyActivityData, WeeklyReportData,
  AlertDistribution, MapMarker, MovementPath, RestrictedZone,
  TeamMember, Testimonial,
} from '@/types';

// --- Cameras ---
export const DUMMY_CAMERAS: Camera[] = [
  {
    id: 'cam-001', name: 'Gate Alpha', location: 'North Perimeter',
    status: 'online', fps: 30, resolution: '4K (3840×2160)',
    weather: 'clear', temperature: 24, visibility: 5000,
    lat: 28.6139, lng: 77.2090, isRecording: true,
    lastDetection: '2 min ago', activeAlerts: 2, totalDetections: 1847, uptime: 99.2,
  },
  {
    id: 'cam-002', name: 'Zone Bravo', location: 'East Wing',
    status: 'recording', fps: 25, resolution: '1080p',
    weather: 'fog', temperature: 18, visibility: 300,
    lat: 28.6200, lng: 77.2150, isRecording: true,
    lastDetection: '30 sec ago', activeAlerts: 1, totalDetections: 923, uptime: 97.8,
  },
  {
    id: 'cam-003', name: 'Corridor C4', location: 'South Block',
    status: 'online', fps: 30, resolution: '1080p',
    weather: 'rain', temperature: 15, visibility: 800,
    lat: 28.6080, lng: 77.2100, isRecording: false,
    lastDetection: '5 min ago', activeAlerts: 0, totalDetections: 654, uptime: 98.5,
  },
  {
    id: 'cam-004', name: 'Roof Delta', location: 'Rooftop Level',
    status: 'degraded', fps: 12, resolution: '720p',
    weather: 'storm', temperature: 12, visibility: 150,
    lat: 28.6160, lng: 77.2050, isRecording: false,
    lastDetection: '15 min ago', activeAlerts: 3, totalDetections: 421, uptime: 82.3,
  },
  {
    id: 'cam-005', name: 'Parking Echo', location: 'Basement P1',
    status: 'online', fps: 30, resolution: '4K (3840×2160)',
    weather: 'clear', temperature: 22, visibility: 10000,
    lat: 28.6120, lng: 77.2130, isRecording: true,
    lastDetection: '1 min ago', activeAlerts: 0, totalDetections: 2103, uptime: 99.9,
  },
  {
    id: 'cam-006', name: 'Entrance Foxtrot', location: 'Main Lobby',
    status: 'offline', fps: 0, resolution: '1080p',
    weather: 'clear', temperature: 25, visibility: 10000,
    lat: 28.6145, lng: 77.2070, isRecording: false,
    lastDetection: '2 hrs ago', activeAlerts: 0, totalDetections: 789, uptime: 65.1,
  },
];

// --- Detections ---
export const DUMMY_DETECTIONS: Detection[] = [
  {
    id: 'det-001', cameraId: 'cam-001', cameraName: 'Gate Alpha',
    timestamp: '2026-07-28T23:30:00Z', imageUrl: '/placeholder-detection.jpg',
    humanCount: 3, confidence: 94.2, threatLevel: 'HIGH', activityScore: 82,
    weather: 'clear', location: 'North Perimeter', lat: 28.6139, lng: 77.2090,
    boundingBoxes: [
      { id: 'bb-1', x: 15, y: 20, width: 12, height: 35, confidence: 96, label: 'Person', trackId: 'T-001' },
      { id: 'bb-2', x: 45, y: 25, width: 10, height: 32, confidence: 91, label: 'Person', trackId: 'T-002' },
      { id: 'bb-3', x: 70, y: 30, width: 11, height: 33, confidence: 94, label: 'Person', trackId: 'T-003' },
    ],
  },
  {
    id: 'det-002', cameraId: 'cam-002', cameraName: 'Zone Bravo',
    timestamp: '2026-07-28T23:28:00Z', imageUrl: '/placeholder-detection.jpg',
    humanCount: 1, confidence: 87.5, threatLevel: 'MEDIUM', activityScore: 54,
    weather: 'fog', location: 'East Wing', lat: 28.6200, lng: 77.2150,
    boundingBoxes: [
      { id: 'bb-4', x: 50, y: 15, width: 14, height: 40, confidence: 87, label: 'Person', trackId: 'T-004' },
    ],
  },
  {
    id: 'det-003', cameraId: 'cam-005', cameraName: 'Parking Echo',
    timestamp: '2026-07-28T23:25:00Z', imageUrl: '/placeholder-detection.jpg',
    humanCount: 5, confidence: 96.1, threatLevel: 'HIGH', activityScore: 91,
    weather: 'clear', location: 'Basement P1', lat: 28.6120, lng: 77.2130,
    boundingBoxes: [],
  },
  {
    id: 'det-004', cameraId: 'cam-003', cameraName: 'Corridor C4',
    timestamp: '2026-07-28T23:20:00Z', imageUrl: '/placeholder-detection.jpg',
    humanCount: 2, confidence: 89.3, threatLevel: 'MEDIUM', activityScore: 67,
    weather: 'rain', location: 'South Block', lat: 28.6080, lng: 77.2100,
    boundingBoxes: [],
  },
  {
    id: 'det-005', cameraId: 'cam-001', cameraName: 'Gate Alpha',
    timestamp: '2026-07-28T23:15:00Z', imageUrl: '/placeholder-detection.jpg',
    humanCount: 0, confidence: 0, threatLevel: 'NONE', activityScore: 5,
    weather: 'clear', location: 'North Perimeter', lat: 28.6139, lng: 77.2090,
    boundingBoxes: [],
  },
  {
    id: 'det-006', cameraId: 'cam-004', cameraName: 'Roof Delta',
    timestamp: '2026-07-28T23:10:00Z', imageUrl: '/placeholder-detection.jpg',
    humanCount: 1, confidence: 72.1, threatLevel: 'LOW', activityScore: 38,
    weather: 'storm', location: 'Rooftop Level', lat: 28.6160, lng: 77.2050,
    boundingBoxes: [],
  },
  {
    id: 'det-007', cameraId: 'cam-002', cameraName: 'Zone Bravo',
    timestamp: '2026-07-28T23:05:00Z', imageUrl: '/placeholder-detection.jpg',
    humanCount: 4, confidence: 91.8, threatLevel: 'HIGH', activityScore: 88,
    weather: 'fog', location: 'East Wing', lat: 28.6200, lng: 77.2150,
    boundingBoxes: [],
  },
  {
    id: 'det-008', cameraId: 'cam-005', cameraName: 'Parking Echo',
    timestamp: '2026-07-28T23:00:00Z', imageUrl: '/placeholder-detection.jpg',
    humanCount: 2, confidence: 88.4, threatLevel: 'MEDIUM', activityScore: 60,
    weather: 'clear', location: 'Basement P1', lat: 28.6120, lng: 77.2130,
    boundingBoxes: [],
  },
];

// --- Alerts ---
export const DUMMY_ALERTS: Alert[] = [
  {
    id: 'alert-001', title: 'Unauthorized Perimeter Breach',
    description: 'Multiple individuals detected attempting to bypass security checkpoint at Gate Alpha. Activity score exceeds critical threshold.',
    priority: 'critical', status: 'active', type: 'intrusion',
    cameraId: 'cam-001', cameraName: 'Gate Alpha', location: 'North Perimeter',
    timestamp: '2026-07-28T23:30:00Z', lat: 28.6139, lng: 77.2090,
    imageUrl: '/placeholder-detection.jpg',
  },
  {
    id: 'alert-002', title: 'Abnormal Crowd Density',
    description: 'High crowd density detected in Parking Echo. 5 individuals clustered in restricted zone.',
    priority: 'high', status: 'active', type: 'crowd',
    cameraId: 'cam-005', cameraName: 'Parking Echo', location: 'Basement P1',
    timestamp: '2026-07-28T23:25:00Z', lat: 28.6120, lng: 77.2130,
  },
  {
    id: 'alert-003', title: 'Camera Degraded — Storm',
    description: 'Roof Delta camera performance degraded due to storm conditions. FPS dropped to 12. Recommended action: weather shield activation.',
    priority: 'medium', status: 'investigating', type: 'system',
    cameraId: 'cam-004', cameraName: 'Roof Delta', location: 'Rooftop Level',
    timestamp: '2026-07-28T23:10:00Z', lat: 28.6160, lng: 77.2050,
  },
  {
    id: 'alert-004', title: 'Prolonged Loitering Detected',
    description: 'Individual detected loitering in Zone Bravo for over 12 minutes. Repeated presence pattern flagged.',
    priority: 'medium', status: 'active', type: 'loitering',
    cameraId: 'cam-002', cameraName: 'Zone Bravo', location: 'East Wing',
    timestamp: '2026-07-28T23:28:00Z', lat: 28.6200, lng: 77.2150,
  },
  {
    id: 'alert-005', title: 'Camera Offline',
    description: 'Entrance Foxtrot camera has gone offline unexpectedly. Last heartbeat received 2 hours ago.',
    priority: 'high', status: 'active', type: 'system',
    cameraId: 'cam-006', cameraName: 'Entrance Foxtrot', location: 'Main Lobby',
    timestamp: '2026-07-28T21:30:00Z', lat: 28.6145, lng: 77.2070,
  },
  {
    id: 'alert-006', title: 'Perimeter Motion Alert',
    description: 'Nighttime motion detected near restricted zone boundary. AI confidence: 94.2%.',
    priority: 'critical', status: 'resolved', type: 'perimeter',
    cameraId: 'cam-001', cameraName: 'Gate Alpha', location: 'North Perimeter',
    timestamp: '2026-07-28T22:15:00Z', resolvedAt: '2026-07-28T22:35:00Z',
    lat: 28.6139, lng: 77.2090,
  },
  {
    id: 'alert-007', title: 'Low Visibility Warning',
    description: 'Fog has reduced visibility to 300m in Zone Bravo. Detection sensitivity auto-adjusted.',
    priority: 'low', status: 'dismissed', type: 'system',
    cameraId: 'cam-002', cameraName: 'Zone Bravo', location: 'East Wing',
    timestamp: '2026-07-28T22:00:00Z', lat: 28.6200, lng: 77.2150,
  },
  {
    id: 'alert-008', title: 'Rapid Movement Pattern',
    description: 'Unusual rapid movement pattern detected in Corridor C4. Possible emergency situation.',
    priority: 'high', status: 'resolved', type: 'motion',
    cameraId: 'cam-003', cameraName: 'Corridor C4', location: 'South Block',
    timestamp: '2026-07-28T21:45:00Z', resolvedAt: '2026-07-28T22:00:00Z',
    lat: 28.6080, lng: 77.2100,
  },
];

// --- Dashboard Stats ---
export const DUMMY_STATS: DashboardStats = {
  liveHumanCount: 12,
  activeCameras: 5,
  totalCameras: 6,
  activeAlerts: 4,
  todayDetections: 247,
  detectionAccuracy: 94.7,
  averageFps: 28.4,
  cpuUsage: 67.3,
  gpuUsage: 81.5,
  systemUptime: 99.2,
  lastUpdated: new Date().toISOString(),
};

// --- Detection Trend (last 7 days) ---
export const DETECTION_TREND_DATA: DetectionTrendData[] = [
  { date: 'Jul 22', detections: 145, alerts: 8, humans: 312 },
  { date: 'Jul 23', detections: 189, alerts: 12, humans: 445 },
  { date: 'Jul 24', detections: 167, alerts: 9, humans: 389 },
  { date: 'Jul 25', detections: 210, alerts: 15, humans: 512 },
  { date: 'Jul 26', detections: 198, alerts: 11, humans: 478 },
  { date: 'Jul 27', detections: 234, alerts: 18, humans: 567 },
  { date: 'Jul 28', detections: 247, alerts: 14, humans: 589 },
];

// --- Hourly Activity (today) ---
export const HOURLY_ACTIVITY_DATA: HourlyActivityData[] = [
  { hour: '00:00', count: 12, alerts: 1 },
  { hour: '02:00', count: 8, alerts: 0 },
  { hour: '04:00', count: 5, alerts: 0 },
  { hour: '06:00', count: 18, alerts: 2 },
  { hour: '08:00', count: 67, alerts: 4 },
  { hour: '10:00', count: 89, alerts: 5 },
  { hour: '12:00', count: 102, alerts: 7 },
  { hour: '14:00', count: 95, alerts: 6 },
  { hour: '16:00', count: 114, alerts: 8 },
  { hour: '18:00', count: 88, alerts: 5 },
  { hour: '20:00', count: 54, alerts: 3 },
  { hour: '22:00', count: 34, alerts: 4 },
];

// --- Weekly Report ---
export const WEEKLY_REPORT_DATA: WeeklyReportData[] = [
  { day: 'Mon', detections: 145, resolved: 140, avgConfidence: 91.2 },
  { day: 'Tue', detections: 189, resolved: 182, avgConfidence: 93.5 },
  { day: 'Wed', detections: 167, resolved: 160, avgConfidence: 90.8 },
  { day: 'Thu', detections: 210, resolved: 198, avgConfidence: 94.1 },
  { day: 'Fri', detections: 198, resolved: 191, avgConfidence: 92.7 },
  { day: 'Sat', detections: 134, resolved: 129, avgConfidence: 89.4 },
  { day: 'Sun', detections: 247, resolved: 235, avgConfidence: 94.7 },
];

// --- Alert Distribution ---
export const ALERT_DISTRIBUTION: AlertDistribution[] = [
  { name: 'Intrusion', value: 35, color: '#EF4444' },
  { name: 'Crowd', value: 22, color: '#F97316' },
  { name: 'Motion', value: 18, color: '#F59E0B' },
  { name: 'Perimeter', value: 15, color: '#8B5CF6' },
  { name: 'System', value: 10, color: '#06B6D4' },
];

// --- Map Markers ---
export const MAP_MARKERS: MapMarker[] = [
  { id: 'cam-001', type: 'camera', lat: 28.6139, lng: 77.2090, label: 'Gate Alpha', status: 'online' },
  { id: 'cam-002', type: 'camera', lat: 28.6200, lng: 77.2150, label: 'Zone Bravo', status: 'recording' },
  { id: 'cam-003', type: 'camera', lat: 28.6080, lng: 77.2100, label: 'Corridor C4', status: 'online' },
  { id: 'cam-004', type: 'camera', lat: 28.6160, lng: 77.2050, label: 'Roof Delta', status: 'degraded' },
  { id: 'cam-005', type: 'camera', lat: 28.6120, lng: 77.2130, label: 'Parking Echo', status: 'online' },
  { id: 'cam-006', type: 'camera', lat: 28.6145, lng: 77.2070, label: 'Entrance Foxtrot', status: 'offline' },
  { id: 'det-a1', type: 'detection', lat: 28.6139, lng: 77.2090, label: 'HIGH Threat — 3 Persons', color: '#EF4444' },
  { id: 'det-a2', type: 'detection', lat: 28.6120, lng: 77.2130, label: 'HIGH Threat — 5 Persons', color: '#EF4444' },
  { id: 'alert-001', type: 'alert', lat: 28.6139, lng: 77.2090, label: 'Perimeter Breach', color: '#EF4444' },
];

// --- Movement Paths ---
export const MOVEMENT_PATHS: MovementPath[] = [
  {
    id: 'path-001', trackId: 'T-001',
    points: [[28.6135, 77.2085], [28.6138, 77.2088], [28.6141, 77.2092], [28.6145, 77.2095]],
    color: '#EF4444', timestamp: '2026-07-28T23:25:00Z',
  },
  {
    id: 'path-002', trackId: 'T-002',
    points: [[28.6198, 77.2148], [28.6200, 77.2150], [28.6203, 77.2153]],
    color: '#F59E0B', timestamp: '2026-07-28T23:28:00Z',
  },
];

// --- Restricted Zones ---
export const RESTRICTED_ZONES: RestrictedZone[] = [
  {
    id: 'zone-001', name: 'Server Room Perimeter',
    coordinates: [[28.6150, 77.2060], [28.6155, 77.2075], [28.6145, 77.2080], [28.6140, 77.2065]],
    color: '#EF4444', alertLevel: 'critical',
  },
  {
    id: 'zone-002', name: 'Restricted Storage',
    coordinates: [[28.6185, 77.2140], [28.6195, 77.2155], [28.6185, 77.2165], [28.6175, 77.2150]],
    color: '#F59E0B', alertLevel: 'high',
  },
];

// --- Team Members ---
export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'team-1', name: 'Abhishek Kumar', role: 'Lead AI Engineer',
    bio: 'Computer vision specialist with expertise in real-time object detection and YOLO model optimization.',
    avatar: 'AK',
    social: { github: '#', linkedin: '#' },
  },
  {
    id: 'team-2', name: 'Priya Sharma', role: 'Frontend Architect',
    bio: 'React & TypeScript engineer passionate about enterprise UI/UX and real-time data visualization.',
    avatar: 'PS',
    social: { github: '#', linkedin: '#' },
  },
  {
    id: 'team-3', name: 'Rahul Singh', role: 'Backend Engineer',
    bio: 'Node.js and Python microservices developer with focus on high-throughput API design.',
    avatar: 'RS',
    social: { github: '#', linkedin: '#' },
  },
  {
    id: 'team-4', name: 'Anika Verma', role: 'ML Research Lead',
    bio: 'Deep learning researcher specializing in weather-robust computer vision and adversarial training.',
    avatar: 'AV',
    social: { github: '#', linkedin: '#' },
  },
];

// --- Testimonials ---
export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1', name: 'Col. Rajesh Mehta', role: 'Security Director',
    organization: 'National Infrastructure', rating: 5,
    content: 'SentinelAI deployed at our perimeter has reduced security incidents by 67%. The fog and rain detection capability is unlike anything we\'ve seen in the market.',
    avatar: 'RM',
  },
  {
    id: 'test-2', name: 'Sarah Chen', role: 'CTO',
    organization: 'MetroSafe Systems', rating: 5,
    content: 'The real-time tracking accuracy even in adverse weather is extraordinary. Integration was seamless with our existing camera infrastructure.',
    avatar: 'SC',
  },
  {
    id: 'test-3', name: 'Dmitri Volkov', role: 'Head of Operations',
    organization: 'Arctic Base Station', rating: 5,
    content: 'We operate in extreme snow and blizzard conditions. SentinelAI maintains 85% detection accuracy where every other system fails completely.',
    avatar: 'DV',
  },
];

// --- Analytics Heatmap Data ---
export const HEATMAP_DATA = Array.from({ length: 7 }, (_, dayIdx) =>
  Array.from({ length: 24 }, (_, hourIdx) => ({
    day: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][dayIdx],
    hour: hourIdx,
    value: Math.floor(Math.random() * 100),
  }))
).flat();
