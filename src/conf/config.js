const config = {
    appwirteUrl: String(import.meta.env.VITE_REACT_APP_APPWRITE_URL),
    appwirteProjctId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appwirteDatabaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appwirteCollectionId: String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
    appwirteBucketId: String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
    tinyMCEApiKey: String(import.meta.env.VITE_TINY_MCE_API_KEY),
}

export default config