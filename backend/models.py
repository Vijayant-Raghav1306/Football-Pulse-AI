from pydantic import BaseModel
from typing import Optional
from datetime import datetime, date


class Article(BaseModel):
    id: Optional[str] = None
    title: str
    description: Optional[str] = None
    url: str
    source: Optional[str] = None
    published_at: Optional[datetime] = None


class Injury(BaseModel):
    id: Optional[str] = None
    player_name: str
    team: str
    status: str  # 'out' | 'doubtful' | 'fit'
    reason: Optional[str] = None
    return_date: Optional[date] = None


class Transfer(BaseModel):
    id: Optional[str] = None
    player_name: str
    from_team: Optional[str] = None
    to_team: Optional[str] = None
    fee: Optional[str] = None
    status: str  # 'rumour' | 'confirmed'
    published_at: Optional[datetime] = None


class Summary(BaseModel):
    id: Optional[str] = None
    content: str
    summary_type: str  # 'daily' | 'match_preview'
    generated_at: Optional[datetime] = None
