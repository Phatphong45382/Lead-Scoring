from fastapi import APIRouter
from ..schemas.common import APIResponse

router = APIRouter()

@router.get("/summary", response_model=APIResponse[dict])
async def get_dashboard_summary():
    """Get lead scoring dashboard summary KPIs."""
    # TODO: Implement with Dataiku dataset
    return APIResponse(success=True, data={
        "total_leads": 0,
        "scored_leads": 0,
        "hot_leads": 0,
        "conversion_rate": 0.0,
    })

@router.get("/filters", response_model=APIResponse[dict])
async def get_dashboard_filters():
    """Get available filter options for the dashboard."""
    # TODO: Implement with Dataiku dataset
    return APIResponse(success=True, data={
        "segments": [],
        "sources": [],
        "date_range": {"min": None, "max": None},
    })
