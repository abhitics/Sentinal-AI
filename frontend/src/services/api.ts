import axios from 'axios';
import { API_BASE_URL, API_TIMEOUT, TOKEN_KEY } from '@/constants';
import type {
  ApiResponse, PaginatedResponse, Detection, Alert, Camera,
  DashboardStats, DetectionFilters, AlertFilters, LoginCredentials,
  RegisterCredentials, User, ImageAnalysisResponse,
} from '@/types';

// ============================================================
// Axios Instance
// ============================================================
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor — attach JWT token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor — handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem(TOKEN_KEY);
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// ============================================================
// Auth API
// ============================================================
export const authApi = {
  login: async (credentials: LoginCredentials) => {
    // In production: return api.post<ApiResponse<{ user: User; token: string }>>('/auth/login', credentials)
    // Mock implementation for demo
    await new Promise((r) => setTimeout(r, 1000));
    if (credentials.email && credentials.password) {
      const mockUser: User = {
        id: 'user-1',
        name: 'Admin Operator',
        email: credentials.email,
        role: 'admin',
        organization: 'SentinelAI Operations',
        lastLogin: new Date().toISOString(),
        createdAt: '2026-01-01T00:00:00Z',
      };
      const mockToken = 'mock-jwt-token-' + Date.now();
      return { data: { user: mockUser, token: mockToken }, success: true };
    }
    throw new Error('Invalid credentials');
  },

  register: async (data: RegisterCredentials) => {
    await new Promise((r) => setTimeout(r, 1200));
    const mockUser: User = {
      id: 'user-' + Date.now(),
      name: data.name,
      email: data.email,
      role: 'viewer',
      organization: data.organization,
      createdAt: new Date().toISOString(),
    };
    return { data: { user: mockUser, token: 'mock-token' }, success: true };
  },

  logout: async () => {
    await new Promise((r) => setTimeout(r, 300));
    return { success: true };
  },
};

// ============================================================
// Detection API
// ============================================================
export const detectionApi = {
  // Real endpoint: POST /detect with FormData
  detect: async (imageFile: File) => {
    const formData = new FormData();
    formData.append('image', imageFile);
    const response = await api.post('/detect', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },

  // New endpoint: POST /v1/analyze/image with metadata for video/pose analytics
  analyzeImage: async (imageFile: File, cameraId?: string, frameId?: number): Promise<ImageAnalysisResponse> => {
    const formData = new FormData();
    formData.append('image', imageFile);
    if (cameraId) formData.append('camera_id', cameraId);
    if (frameId) formData.append('frame_id', String(frameId));

    const response = await api.post<ImageAnalysisResponse>('/v1/analyze/image', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },

  getDetections: async (filters?: DetectionFilters): Promise<PaginatedResponse<Detection>> => {
    // Mock for demo — in prod: api.get('/detections', { params: filters })
    const { DUMMY_DETECTIONS } = await import('@/constants/dummyData');
    await new Promise((r) => setTimeout(r, 500));
    let data = [...DUMMY_DETECTIONS];
    if (filters?.search) {
      const q = filters.search.toLowerCase();
      data = data.filter(d =>
        d.cameraName.toLowerCase().includes(q) ||
        d.location.toLowerCase().includes(q)
      );
    }
    if (filters?.threatLevel) {
      data = data.filter(d => d.threatLevel === filters.threatLevel);
    }
    const page = filters?.page ?? 1;
    const pageSize = filters?.pageSize ?? 10;
    const start = (page - 1) * pageSize;
    return {
      data: data.slice(start, start + pageSize),
      total: data.length,
      page,
      pageSize,
      totalPages: Math.ceil(data.length / pageSize),
    };
  },

  getDetectionById: async (id: string): Promise<Detection> => {
    const { DUMMY_DETECTIONS } = await import('@/constants/dummyData');
    await new Promise((r) => setTimeout(r, 300));
    const d = DUMMY_DETECTIONS.find(d => d.id === id);
    if (!d) throw new Error('Detection not found');
    return d;
  },
};

// ============================================================
// Camera API
// ============================================================
export const cameraApi = {
  getCameras: async (): Promise<Camera[]> => {
    const { DUMMY_CAMERAS } = await import('@/constants/dummyData');
    await new Promise((r) => setTimeout(r, 400));
    return DUMMY_CAMERAS;
  },

  getCameraById: async (id: string): Promise<Camera> => {
    const { DUMMY_CAMERAS } = await import('@/constants/dummyData');
    await new Promise((r) => setTimeout(r, 300));
    const cam = DUMMY_CAMERAS.find(c => c.id === id);
    if (!cam) throw new Error('Camera not found');
    return cam;
  },
};

// ============================================================
// Alert API
// ============================================================
export const alertApi = {
  getAlerts: async (filters?: AlertFilters): Promise<Alert[]> => {
    const { DUMMY_ALERTS } = await import('@/constants/dummyData');
    await new Promise((r) => setTimeout(r, 400));
    let data = [...DUMMY_ALERTS];
    if (filters?.status) data = data.filter(a => a.status === filters.status);
    if (filters?.priority) data = data.filter(a => a.priority === filters.priority);
    return data;
  },

  resolveAlert: async (id: string): Promise<void> => {
    await new Promise((r) => setTimeout(r, 500));
    console.log('Resolved alert:', id);
  },

  dismissAlert: async (id: string): Promise<void> => {
    await new Promise((r) => setTimeout(r, 300));
    console.log('Dismissed alert:', id);
  },
};

// ============================================================
// Stats API
// ============================================================
export const statsApi = {
  getDashboardStats: async (): Promise<DashboardStats> => {
    const { DUMMY_STATS } = await import('@/constants/dummyData');
    await new Promise((r) => setTimeout(r, 600));
    // Add slight randomness to simulate real-time
    return {
      ...DUMMY_STATS,
      liveHumanCount: DUMMY_STATS.liveHumanCount + Math.floor(Math.random() * 5 - 2),
      cpuUsage: Math.min(100, DUMMY_STATS.cpuUsage + (Math.random() * 10 - 5)),
      gpuUsage: Math.min(100, DUMMY_STATS.gpuUsage + (Math.random() * 10 - 5)),
      lastUpdated: new Date().toISOString(),
    };
  },
};

export default api;
