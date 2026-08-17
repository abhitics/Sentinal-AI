import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { statsApi } from '@/services/api';
import { cameraApi } from '@/services/api';
import { detectionApi } from '@/services/api';
import { alertApi } from '@/services/api';
import { REFRESH_INTERVAL } from '@/constants';
import type { DetectionFilters, AlertFilters } from '@/types';
import toast from 'react-hot-toast';

// ============================================================
// Dashboard Stats Hook
// ============================================================
export const useStats = () => {
  return useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: statsApi.getDashboardStats,
    refetchInterval: REFRESH_INTERVAL,
    staleTime: 10000,
  });
};

// ============================================================
// Cameras Hook
// ============================================================
export const useCameras = () => {
  return useQuery({
    queryKey: ['cameras'],
    queryFn: cameraApi.getCameras,
    refetchInterval: REFRESH_INTERVAL,
    staleTime: 15000,
  });
};

export const useCamera = (id: string) => {
  return useQuery({
    queryKey: ['camera', id],
    queryFn: () => cameraApi.getCameraById(id),
    enabled: !!id,
    refetchInterval: 10000,
  });
};

// ============================================================
// Detections Hook
// ============================================================
export const useDetections = (filters?: DetectionFilters) => {
  return useQuery({
    queryKey: ['detections', filters],
    queryFn: () => detectionApi.getDetections(filters),
    staleTime: 30000,
    placeholderData: (prev) => prev,
  });
};

// ============================================================
// Alerts Hook
// ============================================================
export const useAlerts = (filters?: AlertFilters) => {
  return useQuery({
    queryKey: ['alerts', filters],
    queryFn: () => alertApi.getAlerts(filters),
    refetchInterval: REFRESH_INTERVAL,
    staleTime: 10000,
  });
};

export const useResolveAlert = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: alertApi.resolveAlert,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['alerts'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard-stats'] });
      toast.success('Alert resolved successfully');
    },
    onError: () => toast.error('Failed to resolve alert'),
  });
};

export const useDismissAlert = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: alertApi.dismissAlert,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['alerts'] });
      toast.success('Alert dismissed');
    },
    onError: () => toast.error('Failed to dismiss alert'),
  });
};
