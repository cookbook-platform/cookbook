class BaseService {
    constructor(repo) {
      this.repo = repo;
    }
  
    async getAll() {
      try {
        return await this.repo.getAll();
      } catch (errors) {
        console.error("Error in getAll:", errors);
        throw new Error("Something went wrong while fetching all documents.");
      }
    }
  
    async getById(id) {
      try {
        let document = await this.repo.getById(id);
        if (!document) {
          let error = new Error("Document not found");
          error.statusCode = 404;
          throw error;
        } else {
          return document;
        }
      } catch (errors) {
        console.error("Error in getById:", errors);
        throw new Error("Something went wrong while fetching document by ID.");
      }
    }
  
    async add(data) {
      try {
        return await this.repo.add(data);
      } catch (errors) {
        console.error("Error in add:", errors);
        throw new Error("Something went wrong while adding document.");
      }
    }
  
    async update(id, data) {
      try {
        let updatedDocument = await this.repo.update(id, data);
        if (!updatedDocument) {
          let error = new Error("Document not found");
          error.statusCode = 404;
          throw error;
        } else {
          return updatedDocument;
        }
      } catch (errors) {
        console.error("Error in update:", errors);
        throw new Error("Something went wrong while updating document.");
      }
    }
  
    async delete(id) {
      try {
        let deletedDocument = await this.repo.delete(id);
        if (!deletedDocument) {
          let error = new Error("Document not found");
          error.statusCode = 404;
          throw error;
        } else {
          return deletedDocument;
        }
      } catch (errors) {
        console.error("Error in delete:", errors);
        throw new Error("Something went wrong while deleting document.");
      }
    }
}

export default BaseService;
