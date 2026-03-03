import logging
from typing import Optional

logger = logging.getLogger(__name__)

class DataikuService:
    """Singleton Dataiku API client for Lead Scoring project."""

    _instance: Optional["DataikuService"] = None
    _client = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
        return cls._instance

    def get_client(self):
        """Get or initialize the Dataiku API client."""
        if self._client is None:
            try:
                import dataikuapi
                from backend.config import settings
                self._client = dataikuapi.DSSClient(settings.DATAIKU_HOST, settings.API_KEY)
                logger.info("Dataiku client initialized successfully")
            except Exception as e:
                logger.error(f"Failed to initialize Dataiku client: {e}")
                raise
        return self._client

    def get_dataset_rows(self, project_key: str, dataset_name: str) -> list:
        """Fetch all rows from a Dataiku dataset."""
        client = self.get_client()
        project = client.get_project(project_key)
        dataset = project.get_dataset(dataset_name)
        rows = list(dataset.iter_rows())
        logger.info(f"Fetched {len(rows)} rows from {project_key}/{dataset_name}")
        return rows

dataiku_service = DataikuService()
