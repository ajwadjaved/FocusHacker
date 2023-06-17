from django.db import models

class Entry(models.Model):
    entry = models.CharField(max_length=200)
    tag = models.CharField(max_length=50)
    description = models.TextField()
    time_taken = models.IntegerField(default=0)

    def __str__(self):
        return self.entry
