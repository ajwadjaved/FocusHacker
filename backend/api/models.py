from django.db import models

class Entry(models.Model):
    entry = models.CharField(max_length=200)
    tag = models.CharField(max_length=50)
    description = models.TextField(default="No Description")
    time_taken = models.CharField(max_length=50) #convert to date-time for analysis later

    def __str__(self):
        return self.entry
