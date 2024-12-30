from rest_framework.views import APIView
from .models import Note
from .serializers import NoteSerializer
from rest_framework.response import Response
from rest_framework import status

class NoteView(APIView):
    def get(self, request):
        notes = Note.objects.all()
        serializer = NoteSerializer(notes, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = NoteSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class SingleNoteView(APIView):
    def get(self, request, pk):
        try:
            note = Note.objects.get(pk=pk)
            serializer = NoteSerializer(note)
            return Response(serializer.data)
        except Note.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

class DeleteNoteView(APIView):
    def delete(self, request, pk):
        try:
            note = Note.objects.get(pk=pk)
            note.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Note.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
