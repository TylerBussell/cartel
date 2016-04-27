from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import status
from api.models import *
from api.serializers import *
from rest_framework.response import Response
from rest_framework import viewsets, status
from operator import attrgetter

def get_candidate_instance(candidate_name):
    if candidate_name == 'bernie':
        return Bernie()
    elif candidate_name == 'cruz':
        return Cruz()
    elif candidate_name == 'hillary':
        return Hillary()
    elif candidate_name == 'trump':
        return Trump()
    elif candidate_name == 'democrat':
        return Demo()
    elif candidate_name == 'republican':
        return Rep()


def get_candidate(candidate_name):
    if candidate_name == 'bernie':
        return Bernie
    elif candidate_name == 'cruz':
        return Cruz
    elif candidate_name == 'hillary':
        return Hillary
    elif candidate_name == 'trump':
        return Trump
    elif candidate_name == 'democrat':
        return Dem
    elif candidate_name == 'republican':
        return Rep


def candidate_list(request, candidate_name):
    if request.method == 'GET':
        candidate = get_candidate(candidate_name).objects.filter(candidate=candidate_name).order_by('-created_at')[:50]

        serializer = CandidateSerializer(candidate, many=True)                                                                                                                                      
        return Response(serializer.data)

@api_view(['GET'])
@permission_classes((AllowAny,))
def bernie_list(request):
    return candidate_list(request, 'bernie')

@api_view(['GET'])
@permission_classes((AllowAny,))
def cruz_list(request):
    return candidate_list(request, 'cruz') 

@api_view(['GET'])
@permission_classes((AllowAny,))
def hillary_list(request):
    return candidate_list(request, 'hillary')

@api_view(['GET'])
@permission_classes((AllowAny,))
def trump_list(request):
    return candidate_list(request, 'trump')

@api_view(['GET'])
@permission_classes((AllowAny,))
def democrat_list(request):
    return candidate_list(request, 'democrat')

@api_view(['GET'])
@permission_classes((AllowAny,))
def republican_list(request):
    return candidate_list(request, 'republican')

def aggregate_list(request, candidate_name) :
    if request.method == 'GET':
        aggregate = None
        if candidate_name is not None:
            aggregate = Aggregate.objects.filter(candidate = candidate_name)
        else:
            aggregate = Aggregate.objects.all()
        aggregate = (agg for agg in aggregate if agg.count_neg_sentiment + agg.count_pos_sentiment > 0)
        serializer = AggregateSerializer(aggregate, many=True)                                                                                                                                      
        return Response(serializer.data)

@api_view(['GET'])
@permission_classes((AllowAny,))
def aggregate_bernie(request):
    return aggregate_list(request, 'bernie')

@api_view(['GET'])
@permission_classes((AllowAny,))
def aggregate_cruz(request):
    return aggregate_list(request, 'cruz')

@api_view(['GET'])
@permission_classes((AllowAny,))
def aggregate_hillary(request):
    return aggregate_list(request, 'hillary')

@api_view(['GET'])
@permission_classes((AllowAny,))
def aggregate_trump(request):
    return aggregate_list(request, 'trump')

@api_view(['GET'])
@permission_classes((AllowAny,))
def aggregate_democrat(request):
    return aggregate_list(request, 'democrat')

@api_view(['GET'])
@permission_classes((AllowAny,))
def aggregate_republican(request):
    return aggregate_list(request, 'republican')

@api_view(['GET'])
@permission_classes((AllowAny,))
def aggregate_all(request):
    return aggregate_list(request, None)

def words_list(request, candidate_name) :
    if request.method == 'GET':
        words = None
        if candidate_name is not None:
            words = Word.objects.filter(candidate = candidate_name)
        else:
            words = Word.objects.all()
        serializer = WordSerializer(Word.objects.all(), many=True)
        return Response(serializer.data)

@api_view(['GET'])
@permission_classes((AllowAny,))
def words_bernie(request):
    return words_list(request, 'bernie')

@api_view(['GET'])
@permission_classes((AllowAny,))
def words_cruz(request):
    return words_list(request, 'cruz')

@api_view(['GET'])
@permission_classes((AllowAny,))
def words_hillary(request):
    return words_list(request, 'hillary')

@api_view(['GET'])
@permission_classes((AllowAny,))
def words_trump(request):
    return words_list(request, 'trump')

@api_view(['GET'])
@permission_classes((AllowAny,))
def words_democrat(request):
    return words_list(request, 'democrat')

@api_view(['GET'])
@permission_classes((AllowAny,))
def words_republican(request):
    return words_list(request, 'republican')

@api_view(['GET'])
@permission_classes((AllowAny,))
def words_all(request):
    return words_list(request, None)
