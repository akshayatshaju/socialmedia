from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager

class SocialMediaUserManager(BaseUserManager):
    def create_user(self, email, username, name, phone, password=None, profile_pic=None, **extra_fields):
        if not email:
            raise ValueError('The Email field must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, username=username, name=name, phone=phone, profile_pic=profile_pic, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, username, name, phone, password=None, profile_pic=None, **extra_fields):
        extra_fields.setdefault('is_superuser', True)
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')
        return self.create_user(email, username, name, phone, password, profile_pic, **extra_fields)

class SocialMediaUser(AbstractBaseUser):
    email = models.EmailField(verbose_name='email', max_length=255, unique=True)
    username = models.CharField(max_length=50, unique=True)
    name = models.CharField(max_length=100)
    phone = models.CharField(max_length=20)
    profile_pic = models.ImageField(upload_to='profile_pics/', null=True, blank=True)
    is_deleted = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    date_joined = models.DateTimeField(auto_now_add=True)

    objects = SocialMediaUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username', 'name', 'phone']

    def __str__(self):
        return self.email

    def has_perm(self, perm, obj=None):
        return True

    def has_module_perms(self, app_label):
        return True

    @property
    def is_staff(self):
        return self.is_superuser


    

    
   
   
    




  

