from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware  # Import CORS middleware
from pydantic import BaseModel
from appwrite.client import Client
from appwrite.services.databases import Databases
from appwrite.exception import AppwriteException

app = FastAPI()

# Add CORS middleware to allow all origins
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all headers
)

# Initialize Appwrite Client
client = Client()
client.set_endpoint("https://cloud.appwrite.io/v1")  # Change if self-hosted
client.set_project("6782434a002cdaea3420")  # Replace with your Appwrite Project ID
client.set_key("standard_e1bdbb8ea4706227b4ede38e4b2c83787245d1ed3435d6d52381bd204adab0c2254d296a4f72eb2f48d66f8766b404381ee0c10509f1820be848ae56346a565f2be445e7fd5a51a221abaf8eb8d354d708383d24a1c78338a217378f36dc4ab74fa1866685032945b47cc05b30823b379124521ef1c8b9484c5d6ad08ec3bc82")  # Replace with your Appwrite API Key

# Initialize Appwrite Database Service
databases = Databases(client)

# Your Database ID
DATABASE_ID = "679d0900000e5a7748e2"

# Request Schema
class CollectionRequest(BaseModel):
    collection_id: str  # Unique ID for the collection
    name: str  # Name of the collection

@app.post("/create-collection/")
async def create_collection(request: CollectionRequest):
    """
    Creates a new collection in the database with attributes for storing file URLs.
    """
    try:
        # Corrected permissions format
        collection = databases.create_collection(
            database_id=DATABASE_ID,
            collection_id=request.collection_id,
            name=request.name,
        )

        # Add attributes (URL fields)
        databases.create_string_attribute(DATABASE_ID, request.collection_id, "file_url", 255, False)
        databases.create_string_attribute(DATABASE_ID, request.collection_id, "thumbnail_url", 255, False)
        databases.create_string_attribute(DATABASE_ID, request.collection_id, "description", 500, False)

        return {"message": "✅ Collection created successfully", "collection": collection}
    
    except AppwriteException as e:
        pass

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)