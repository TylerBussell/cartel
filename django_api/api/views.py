from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import status
from api.models import *
from api.serializers import *
from rest_framework.response import Response
from rest_framework import viewsets, status

def get_candidate_instance(candidate_name):
    if candidate_name == 'Bernie':
        return Bernie()
    elif candidate_name == 'Cruz':
        return Cruz()
    elif candidate_name == 'Hillary':
        return Hillary()
    elif candidate_name == 'Trump':
        return Trump()
    elif candidate_name == 'Democrat':
        return Democrat()
    elif candidate_name == 'Republican':
        return Republican()


def get_candidate(candidate_name):
    if candidate_name == 'Bernie':
        return Bernie
    elif candidate_name == 'Cruz':
        return Cruz
    elif candidate_name == 'Hillary':
        return Hillary
    elif candidate_name == 'Trump':
        return Trump
    elif candidate_name == 'Democrat':
        return Democrat
    elif candidate_name == 'Republican':
        return Republican


def candidate_list(request, candidate_name):
    if request.method == 'GET':
        candidate = get_candidate(candidate_name).objects.all()[:50]
        serializer = CandidateSerializer(candidate, many=True)                                                                                                                                      
        return Response(serializer.data)
    elif request.method == 'POST':
        candidate = get_candidate_instance(candidate_name)
        serializer = CandidateSerializer(data=request.DATA)
        if serializer.is_valid():
            candidate.candidate = serializer.data['candidate']
            candidate.created_at = serializer.data['created_at']
            candidate.sentiment = serializer.data['sentiment']
            candidate.text = serializer.data['text']
            candidate.user = serializer.data['user']
            candidate.tid = serializer.data['tid']
            candidate.save()
            return Response(
                status=status.HTTP_201_CREATED
            )

@api_view(['GET'])
@permission_classes((AllowAny,))
def bernie_list(request):
    return candidate_list(request, 'Bernie')

@api_view(['GET'])
@permission_classes((AllowAny,))
def bernie_list(request):
    return candidate_list(request, 'Cruz')                                                                                                                                                             
            