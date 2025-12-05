import { useState, useEffect, useCallback } from 'react';
import { 
  DashboardStats, 
  QuickAction, 
  ChecklistItem, 
  ActivityItem 
} from '@/types/api';
import * as dashboardApi from '@/services/api/dashboardApi';

export function useDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [quickActions, setQuickActions] = useState<QuickAction[]>([]);
  const [checklist, setChecklist] = useState<ChecklistItem[]>([]);
  const [activity, setActivity] = useState<ActivityItem[]>([]);
  const [tips, setTips] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch all dashboard data
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setIsLoading(true);
        const [statsRes, actionsRes, checklistRes, activityRes, tipsRes] = await Promise.all([
          dashboardApi.getStats(),
          dashboardApi.getQuickActions(),
          dashboardApi.getChecklist(),
          dashboardApi.getActivity(),
          dashboardApi.getTips(),
        ]);

        if (statsRes.success && statsRes.data) setStats(statsRes.data);
        if (actionsRes.success && actionsRes.data) setQuickActions(actionsRes.data);
        if (checklistRes.success && checklistRes.data) setChecklist(checklistRes.data);
        if (activityRes.success && activityRes.data) setActivity(activityRes.data);
        if (tipsRes.success && tipsRes.data) setTips(tipsRes.data);
      } catch (err) {
        setError('Failed to load dashboard data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const completeChecklistItem = useCallback(async (itemId: string) => {
    try {
      const response = await dashboardApi.completeChecklistItem(itemId);
      if (response.success) {
        setChecklist(prev => prev.map(item => 
          item.id === itemId ? { ...item, completed: true } : item
        ));
      }
    } catch (err) {
      console.error('Failed to complete checklist item:', err);
    }
  }, []);

  const checklistProgress = checklist.length > 0 
    ? Math.round((checklist.filter(item => item.completed).length / checklist.length) * 100)
    : 0;

  return {
    stats,
    quickActions,
    checklist,
    activity,
    tips,
    isLoading,
    error,
    completeChecklistItem,
    checklistProgress,
  };
}
