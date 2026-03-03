import os

class Settings:
    # App Settings
    API_V1_STR: str = "/api/v1"
    PROJECT_NAME: str = "Lead Scoring App API"

    # Dataiku Settings
    DATAIKU_HOST: str = os.getenv("DATAIKU_HOST", "http://sscinas.myqnapcloud.com:11001")
    API_KEY: str = os.getenv("API_KEY", "")
    PROJECT_KEY: str = os.getenv("PROJECT_KEY", "LEAD_SCORING")

    # Dataset Settings
    DATASET_LEADS: str = os.getenv("DATASET_LEADS", "lead_data")
    DATASET_SCORED: str = os.getenv("DATASET_SCORED", "lead_scored")

    # Resources
    FOLDER_ID: str = os.getenv("FOLDER_ID", "")
    RESULTS_FOLDER_ID: str = os.getenv("RESULTS_FOLDER_ID", "")
    SCENARIO_ID: str = os.getenv("SCENARIO_ID", "LEAD_SCORE")

settings = Settings()
