from django.db import models

# Create your models here.

class Mission(models.Model):
    name = models.CharField(max_length=200)
    agency = models.CharField(max_length=100)
    launch_date = models.DateField()
    status = models.CharField(max_length=50)
    description = models.TextField(blank=True)

    def __str__(self):
        return self.name