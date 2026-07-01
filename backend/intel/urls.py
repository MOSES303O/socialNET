from django.urls import path

from . import views

urlpatterns = [
    path("kpis", views.KpisView.as_view()),
    path("brand-health", views.BrandHealthView.as_view()),
    path("mention-volume", views.MentionVolumeView.as_view()),
    path("engagement-series", views.EngagementSeriesView.as_view()),
    path("sentiment-distribution", views.SentimentDistributionView.as_view()),
    path("platform-breakdown", views.PlatformBreakdownView.as_view()),
    path("trends", views.TrendsView.as_view()),
    path("live-feed", views.LiveFeedView.as_view()),
    path("hashtags", views.HashtagsView.as_view()),
    path("sentiment-bars", views.SentimentBarsView.as_view()),
    path("platform-comparison", views.PlatformComparisonView.as_view()),
    path("influencers", views.InfluencerListView.as_view()),
    path("mentions", views.MentionListView.as_view()),
    path("alerts", views.AlertListView.as_view()),
    path("alert-rules", views.AlertRuleListView.as_view()),
    path("crises", views.CrisisListView.as_view()),
    path("assistant", views.AssistantView.as_view()),
    path("post-analysis", views.PostAnalysisView.as_view()),
    path("reports", views.ReportListView.as_view()),
    path("report-types", views.ReportTypesView.as_view()),
    path("scheduled-reports", views.ScheduledReportsView.as_view()),
    path("team", views.TeamListView.as_view()),
    path("integrations", views.IntegrationListView.as_view()),
    path("audit-logs", views.AuditLogListView.as_view()),
]
