"use client";

import { useQuery } from "@tanstack/react-query";
import * as api from "@/lib/api";
import { useUI } from "@/lib/store";

export const useKpis = () => useQuery({ queryKey: ["kpis"], queryFn: api.getKpis });
export const useBrandHealth = () => useQuery({ queryKey: ["health"], queryFn: api.getBrandHealth });
export function useMentionVolume() {
  const range = useUI((s) => s.range);
  return useQuery({ queryKey: ["volume", range], queryFn: () => api.getMentionVolume(range) });
}
export const useSentiment = () => useQuery({ queryKey: ["sentiment"], queryFn: api.getSentimentDistribution });
export const usePlatformBreakdown = () => useQuery({ queryKey: ["platforms"], queryFn: api.getPlatformBreakdown });
export const useTrends = () => useQuery({ queryKey: ["trends"], queryFn: api.getTrends });
export const useLiveFeed = () => useQuery({ queryKey: ["livefeed"], queryFn: api.getLiveFeed });
export const useHashtags = () => useQuery({ queryKey: ["hashtags"], queryFn: api.getHashtags });
export const useSentimentBars = () => useQuery({ queryKey: ["sentbars"], queryFn: api.getSentimentBars });
export const usePlatformComparison = () => useQuery({ queryKey: ["platcomp"], queryFn: api.getPlatformComparison });
export const useInfluencers = () => useQuery({ queryKey: ["influencers"], queryFn: api.getInfluencers });
export function useEngagementSeries() {
  const range = useUI((s) => s.range);
  return useQuery({ queryKey: ["engagement", range], queryFn: () => api.getEngagementSeries(range) });
}
export const useMentions = () => useQuery({ queryKey: ["mentions"], queryFn: api.getMentions });
export const useAlerts = () => useQuery({ queryKey: ["alerts"], queryFn: api.getAlerts });
export const useAlertRules = () => useQuery({ queryKey: ["alertrules"], queryFn: api.getAlertRules });
export const useCrises = () => useQuery({ queryKey: ["crises"], queryFn: api.getCrises });
export const useReports = () => useQuery({ queryKey: ["reports"], queryFn: api.getReports });
export const useReportTypes = () => useQuery({ queryKey: ["reporttypes"], queryFn: api.getReportTypes });
export const useScheduledReports = () => useQuery({ queryKey: ["scheduled"], queryFn: api.getScheduledReports });
export const useTeam = () => useQuery({ queryKey: ["team"], queryFn: api.getTeam });
export const useIntegrations = () => useQuery({ queryKey: ["integrations"], queryFn: api.getIntegrations });
export const useAuditLogs = () => useQuery({ queryKey: ["audit"], queryFn: api.getAuditLogs });
