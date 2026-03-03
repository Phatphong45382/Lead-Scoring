from fastapi import APIRouter, Query
from typing import Optional, List
from ..schemas.common import APIResponse

router = APIRouter()

@router.get("/list", response_model=APIResponse[dict])
async def get_leads(
    segment: Optional[str] = Query(None),
    source: Optional[str] = Query(None),
    score_min: Optional[float] = Query(None),
    score_max: Optional[float] = Query(None),
    page: int = Query(1, ge=1),
    page_size: int = Query(50, ge=1, le=200),
):
    """Get list of leads with scores and filters."""
    # TODO: Implement with Dataiku dataset
    return APIResponse(success=True, data={
        "items": [],
        "total": 0,
        "page": page,
        "page_size": page_size,
    })

@router.get("/filters", response_model=APIResponse[dict])
async def get_leads_filters():
    """Get filter options for leads list."""
    return APIResponse(success=True, data={
        "segments": [],
        "sources": [],
        "score_buckets": ["Hot (80-100)", "Warm (60-79)", "Cold (0-59)"],
    })
