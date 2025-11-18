from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from config import settings

app = FastAPI()

# Configure CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# MongoDB client instance
mongodb_client: AsyncIOMotorClient | None = None


@app.get("/healthz")
async def health_check():
    """
    Health check endpoint that verifies backend and database connectivity.
    
    Returns:
        JSON response with status and database connection state
    """
    try:
        # Create MongoDB client if not exists
        global mongodb_client
        if mongodb_client is None:
            mongodb_client = AsyncIOMotorClient(settings.mongodb_uri)
        
        # Ping the database to verify connection
        await mongodb_client.admin.command('ping')
        
        return {
            "status": "ok",
            "database": "connected"
        }
    except Exception as e:
        raise HTTPException(
            status_code=503,
            detail={
                "status": "error",
                "database": "disconnected",
                "error": str(e)
            }
        )


@app.on_event("shutdown")
async def shutdown_db_client():
    """Close MongoDB connection on application shutdown."""
    global mongodb_client
    if mongodb_client is not None:
        mongodb_client.close()