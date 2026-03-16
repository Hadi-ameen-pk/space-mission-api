from django.db import models

class Mission(models.Model):
    name = models.CharField(max_length=100)
    agency = models.CharField(max_length=100)
    launch_date = models.DateField()
    status = models.CharField(max_length=50)
    description = models.TextField()
    crew = models.TextField(help_text="Comma separated crew names")

    def __str__(self):
        return self.name