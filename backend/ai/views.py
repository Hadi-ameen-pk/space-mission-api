import os
from dotenv import load_dotenv
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from openai import OpenAI

load_dotenv()

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def chatbot(request):
    question = request.data.get('question')

    if not question:
        return Response({'error': 'Question is required'}, status=400)

    try:
        api_key = os.getenv("OPENAI_API_KEY")

        if not api_key:
            return Response({'error': 'API key not found'}, status=500)

        client = OpenAI(api_key=api_key)  # ✅ moved here

        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": "You are a simple and exciting space teacher for beginners."},
                {"role": "user", "content": question}
            ]
        )

        answer = response.choices[0].message.content

    except Exception as e:
        return Response({'error': str(e)}, status=500)

    return Response({
        'question': question,
        'answer': answer
    })