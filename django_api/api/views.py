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
        return Demo()
    elif candidate_name == 'Republican':
        return Rep()


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
        return Dem
    elif candidate_name == 'Republican':
        return Rep


def candidate_list(request, candidate_name):
    if request.method == 'GET':
        candidate = get_candidate(candidate_name).objects.all()[:30]
        serializer = CandidateSerializer(candidate, many=True)                                                                                                                                      
        return Response(serializer.data)

@api_view(['GET'])
@permission_classes((AllowAny,))
def bernie_list(request):
    return candidate_list(request, 'Bernie')

@api_view(['GET'])
@permission_classes((AllowAny,))
def cruz_list(request):
    return candidate_list(request, 'Cruz') 

@api_view(['GET'])
@permission_classes((AllowAny,))
def hillary_list(request):
    return candidate_list(request, 'Hillary')

@api_view(['GET'])
@permission_classes((AllowAny,))
def trump_list(request):
    return candidate_list(request, 'Trump')

@api_view(['GET'])
@permission_classes((AllowAny,))
def democrat_list(request):
    return candidate_list(request, 'Democrat')

@api_view(['GET'])
@permission_classes((AllowAny,))
def republican_list(request):
    return candidate_list(request, 'Republican')

@api_view(['GET'])
@permission_classes((AllowAny,))
def aggregate_list(request) :
    if request.method == 'GET':
        aggregate = Aggregate.objects.all()
        serializer = AggregateSerializer(aggregate, many=True)                                                                                                                                      
        return Response(serializer.data)
