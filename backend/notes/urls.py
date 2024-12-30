from django.urls import include, path
from .views import NoteView, DeleteNoteView, SingleNoteView

urlpatterns = [
    path('notes/', NoteView.as_view(), name='note-view'),
    path('notes/<int:pk>', DeleteNoteView.as_view(), name='note-delete'),
    path('notes/details/<int:pk>', SingleNoteView.as_view(), name='single-note')
]
