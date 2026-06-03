from fastapi import APIRouter
from pydantic import BaseModel
from services.chat_service import answer_question

router = APIRouter(prefix="/api/chat", tags=["AI Chat"])


class ChatRequest(BaseModel):
    question: str


@router.post("/")
async def chat(request: ChatRequest):
    """
    Ask a question about football news.
    AI answers using only real articles from our database.
    """
    if not request.question.strip():
        return {"answer": "Please ask a question.", "sources": []}

    return await answer_question(request.question)
