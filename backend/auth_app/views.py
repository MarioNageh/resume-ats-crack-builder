import logging
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status

from .models import User
from .serializers import CustomTokenObtainPairSerializer, RegisterSerializer

logger = logging.getLogger(__name__)

class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

    def post(self, request, *args, **kwargs):
        logger.info(f"Login Attempt: {request.data}")
        logger.info(f"Login Headers: {request.headers}")

        try:
            response = super().post(request, *args, **kwargs)
            logger.info(f"Login Successful for user: {request.data.get('email', 'Unknown')}")
            return response
        except Exception as e:
            logger.error(f"Login Error: {str(e)}")
            return Response({
                'error': 'Login failed',
                'details': str(e)
            }, status=status.HTTP_400_BAD_REQUEST)

class CustomTokenRefreshView(TokenRefreshView):
    def post(self, request, *args, **kwargs):
        logger.info(f"Refresh Token Request: {request.data}")
        logger.info(f"Refresh Token Headers: {request.headers}")

        try:
            response = super().post(request, *args, **kwargs)
            logger.info("Token Refresh Successful")

            return response
        except Exception as e:
            logger.error(f"Token Refresh Error: {str(e)}")
            return Response({
                'error': 'Token refresh failed',
                'details': str(e)
            }, status=status.HTTP_400_BAD_REQUEST)

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer

    def create(self, request, *args, **kwargs):
        # Log registration attempt
        logger.info(f"Registration Attempt: {request.data}")

        try:
            serializer = self.get_serializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            user = serializer.save()
            logger.info(f"User Registered Successfully: {user.email}")

            return Response(
                serializer.data,
                status=status.HTTP_201_CREATED
            )
        except Exception as e:
            logger.error(f"Registration Error: {str(e)}")
            return Response({
                'error': 'Registration failed',
                'details': str(e)
            }, status=status.HTTP_400_BAD_REQUEST)
