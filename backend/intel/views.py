import time

from rest_framework.generics import ListAPIView
from rest_framework.response import Response
from rest_framework.views import APIView

from . import mock_data
from .models import Alert, AlertRule, AuditLog, Crisis, Integration, Influencer, Mention, Report, TeamUser
from .serializers import (
    AlertRuleSerializer,
    AlertSerializer,
    AuditLogSerializer,
    CrisisSerializer,
    IntegrationSerializer,
    InfluencerSerializer,
    MentionSerializer,
    ReportSerializer,
    TeamUserSerializer,
)


class KpisView(APIView):
    def get(self, request):
        return Response(mock_data.KPIS)


class BrandHealthView(APIView):
    def get(self, request):
        return Response(mock_data.BRAND_HEALTH)


class MentionVolumeView(APIView):
    def get(self, request):
        range_key = request.query_params.get("range", "7d")
        days = mock_data.RANGE_DAYS.get(range_key, 14)
        return Response(mock_data.mention_volume(days))


class EngagementSeriesView(APIView):
    def get(self, request):
        range_key = request.query_params.get("range", "7d")
        return Response(mock_data.engagement_series(range_key))


class SentimentDistributionView(APIView):
    def get(self, request):
        return Response(mock_data.SENTIMENT_DISTRIBUTION)


class PlatformBreakdownView(APIView):
    def get(self, request):
        return Response(mock_data.PLATFORM_BREAKDOWN)


class TrendsView(APIView):
    def get(self, request):
        return Response(mock_data.TRENDS)


class LiveFeedView(APIView):
    def get(self, request):
        return Response(mock_data.LIVE_FEED)


class HashtagsView(APIView):
    def get(self, request):
        return Response(mock_data.HASHTAGS)


class SentimentBarsView(APIView):
    def get(self, request):
        return Response(mock_data.SENTIMENT_BARS)


class PlatformComparisonView(APIView):
    def get(self, request):
        return Response(mock_data.PLATFORM_COMPARISON)


class ReportTypesView(APIView):
    def get(self, request):
        return Response(mock_data.REPORT_TYPES)


class ScheduledReportsView(APIView):
    def get(self, request):
        return Response(mock_data.SCHEDULED_REPORTS)


class AssistantView(APIView):
    def post(self, request):
        prompt = request.data.get("prompt", "")
        message_id = f"a_{int(time.time() * 1000)}"
        return Response(mock_data.assistant_reply(prompt, message_id))


class PostAnalysisView(APIView):
    def post(self, request):
        url = request.data.get("url") or mock_data.SAMPLE_POST_ANALYSIS["url"]
        return Response({**mock_data.SAMPLE_POST_ANALYSIS, "url": url})


class MentionListView(ListAPIView):
    queryset = Mention.objects.all()
    serializer_class = MentionSerializer


class InfluencerListView(ListAPIView):
    queryset = Influencer.objects.all()
    serializer_class = InfluencerSerializer


class AlertListView(ListAPIView):
    queryset = Alert.objects.all()
    serializer_class = AlertSerializer


class AlertRuleListView(ListAPIView):
    queryset = AlertRule.objects.all()
    serializer_class = AlertRuleSerializer


class ReportListView(ListAPIView):
    queryset = Report.objects.all()
    serializer_class = ReportSerializer


class CrisisListView(ListAPIView):
    queryset = Crisis.objects.all()
    serializer_class = CrisisSerializer


class TeamListView(ListAPIView):
    queryset = TeamUser.objects.all()
    serializer_class = TeamUserSerializer


class IntegrationListView(ListAPIView):
    queryset = Integration.objects.all()
    serializer_class = IntegrationSerializer


class AuditLogListView(ListAPIView):
    queryset = AuditLog.objects.all()
    serializer_class = AuditLogSerializer
