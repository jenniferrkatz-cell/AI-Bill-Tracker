from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """Application settings using Pydantic Settings."""
    
    # Environment Configuration
    app_env: str = "development"
    port: int = 8000
    
    # MongoDB Atlas Connection
    mongodb_uri: str
    
    # JWT Configuration
    jwt_secret: str
    jwt_expires_in: int = 604800  # 7 days in seconds
    
    # CORS Configuration
    cors_origins: str = "http://localhost:5173,http://localhost:3000"
    
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=False
    )
    
    @property
    def cors_origins_list(self) -> list[str]:
        """Convert comma-separated CORS origins to list."""
        return [origin.strip() for origin in self.cors_origins.split(",")]


# Global settings instance
settings = Settings()