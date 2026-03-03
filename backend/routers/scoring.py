from fastapi import APIRouter, UploadFile, File
from ..schemas.common import APIResponse

router = APIRouter()

@router.post("/upload", response_model=APIResponse[dict])
async def upload_leads_file(file: UploadFile = File(...)):
    """Upload a CSV/Excel file of leads to be scored."""
    # TODO: Implement upload to Dataiku folder
    return APIResponse(success=True, data={
        "file_name": file.filename,
        "upload_id": "pending",
        "rows_detected": 0,
    })

@router.post("/run/{scenario_id}", response_model=APIResponse[dict])
async def run_scoring(scenario_id: str):
    """Trigger the Dataiku scoring scenario."""
    # TODO: Implement Dataiku scenario trigger
    return APIResponse(success=True, data={
        "scenario_id": scenario_id,
        "run_id": "pending",
        "status": "RUNNING",
    })

@router.get("/jobs/{scenario_id}/{run_id}", response_model=APIResponse[dict])
async def get_job_status(scenario_id: str, run_id: str):
    """Poll the status of a scoring job."""
    # TODO: Implement Dataiku job status polling
    return APIResponse(success=True, data={
        "scenario_id": scenario_id,
        "run_id": run_id,
        "status": "DONE",
    })

@router.get("/results/latest", response_model=APIResponse[dict])
async def get_latest_results():
    """Get the latest scoring results."""
    # TODO: Implement with Dataiku scored dataset
    return APIResponse(success=True, data={
        "items": [],
        "scored_at": None,
    })
