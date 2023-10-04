import { Client, ID, Storage } from "appwrite";

const client = new Client();

client.setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_URL).setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID);

export const storage = new Storage(client);

export class AppwriteStorage {
    async uploadFile(file) {
        try {
            const response = await storage.createFile(
                process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID,
                ID.unique(),
                file
            );
            console.log("File uploaded successfully", response);
            return response;

        } catch (error) {
            console.log("Error in uploading file", error);
            throw new Error(error);
        }
    }

    async listFiles() {
        try {
            const response = await storage.listFiles(process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID);
            return response;
        } catch (error) {
            console.log("Error in retrieving videos", error);
            throw new Error(error);
        }
    }
    async getFileView(fileId) {
        try {
            const response = await storage.getFileView(process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID, fileId);
            console.log("File viewed successfully", response);
            return response;
            
        } catch (error) {
            console.log("Error in get file view", error);
            throw new Error(error);
        }
    }

    async getFilePreview(fileId) {
        try {
            const response = await storage.getFilePreview(process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID, fileId);
            console.log("File previwed successfully", response);
            return response;
            
        } catch (error) {
            console.log("Error in get file preview", error);
            throw new Error(error);
        }
    }
    
    async deleteFile(fileId) {
        try {
            const response = await storage.deleteFile(process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID, fileId);
            console.log("File deleted successfully", response);
            return response;
            
        } catch (error) {
            console.log("Error in file deletion", error);
            throw new Error(error);
        }
    }
}

const appwriteStorage = new AppwriteStorage();

export default appwriteStorage;