from django.db import models

class Note(models.Model):
    id = models.BigAutoField(primary_key=True)
    text = models.CharField(max_length=225)
    
    def __str__(self):
        return f'id: {self.id}, text: {self.text}'
