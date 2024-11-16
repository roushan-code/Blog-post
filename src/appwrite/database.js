import config from "../conf/config";

import { Client, ID, Databases, Storage, Query } from 'appwrite';

export class Service {
    client = new Client();
    databases;
    bucket;

    constructor() {
        this.client
        .setEndpoint(config.appwirteUrl)
        .setProject(config.appwirteProjctId);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createDocument({title, slug, content, featuredImage, status, userId}) {
        try{
            console.log("FeatureId",featuredImage);
            console.log("userId",userId);
            return await this.databases.createDocument(
                config.appwirteDatabaseId, // databaseId
                config.appwirteCollectionId, // collectionId
                slug, // documentId
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                }, // data
            );
        }catch(error){
            console.error("Create Post error",error);
            throw error;
        }
    }

    async updateDocument(slug, {title,  content, featuredImage, status}) {
        try{
            return await this.databases.updateDocument(
                config.appwirteDatabaseId, // databaseId
                config.appwirteCollectionId, // collectionId
                slug, // documentId
                {
                    title,
                    content,
                    featuredImage,
                    status
                }, // data
            );
        }catch(error){
            console.error("appwrite update service", error);
            throw error;
        }
    }
    async deleteDocument(slug) {
        try{
            console.log("Slug is ", slug);
             await this.databases.deleteDocument(
                config.appwirteDatabaseId, // databaseId
                config.appwirteCollectionId, // collectionId
                slug, // documentId
            );
            return true;
        }catch(error){
            console.error("appwrite delete service", error);
            throw error;
        }
    }

    async getDocument(slug) {
        try{
            return await this.databases.getDocument(
                config.appwirteDatabaseId, // databaseId  
                config.appwirteCollectionId, // collectionId
                slug, // documentId
            );
        }catch(error){
            console.error("appwrite get service", error);
            throw error;
            return false;
        }
    }

    // async getPosts(queries=[Query.equal('status', 'active')], limit=10, offset=0, search='') {
    async getPosts(queries=[Query.equal('status', 'active')]) {
        try{
            return await this.databases.listDocuments(
                config.appwirteDatabaseId, // databaseId
                config.appwirteCollectionId, // collectionId
                queries, // filters
                // limit, // limit
                // offset, // offset
                // search // search
            );
        }catch(error){
            console.error("appwrite get service", error);
            throw error;
            return false;
        }
    }

    async uploadFile(file) {
        try{
            return await this.bucket.createFile(
                config.appwirteBucketId,
                ID.unique(),
                file,
            )
        }catch(error){
            console.error("appwrite upload service", error);
            throw error;
        }
    }

    async deleteFile(fileId) {
        try{
            console.log("delete file", fileId);
            return await this.bucket.deleteFile(
                config.appwirteBucketId,
                fileId
            )
            return true;
        }catch(error){
            console.error("appwrite file delete service", error);
            throw error;
        }
    }

     getFilePreview(fileId) {
        try{
            return  this.bucket.getFilePreview(
                config.appwirteBucketId,
                fileId
            )
        }catch(error){
            console.error("appwrite file preview service", error);
            throw error;
        }
    }
}

const service = new Service();
export default service;