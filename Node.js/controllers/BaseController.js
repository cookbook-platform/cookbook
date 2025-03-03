import autoBind from "auto-bind";

class BaseController {
    constructor(service){
        this.service = service;
        autoBind(this);
    }

    async getAll(req, res, next) {
        try {
            const filters = req.query; 
            const response = await this.service.getAll(filters);
            return res.status(200).json(response);
        } catch (e) {
            next(e);
        }
    }

    async getById(req, res, next) {
        const { id } = req.params;
        try {
            const response = await this.service.getById(id);
            if (!response) {
                return res.status(404).json({ message: "Document not found" });
            }
            return res.status(200).json(response);
        } catch (e) {
            next(e);
        }
    }

    async add(req, res, next) {
        try {
            const response = await this.service.add(req.body);
            return res.status(201).json(response); // סטטוס 201 לאחר יצירה
        } catch (e) {
            next(e);
        }
    }

    async update(req, res, next) {
        const { id } = req.params;
        try {
            const response = await this.service.update(id, req.body);
            if (!response) {
                return res.status(404).json({ message: "Document not found" });
            }
            return res.status(204).json(); // סטטוס 204 לאחר עדכון מוצלח
        } catch (e) {
            next(e);
        }
    }

    async delete(req, res, next) {
        const { id } = req.params;
        try {
            const response = await this.service.delete(id);
            if (!response) {
                return res.status(404).json({ message: "Document not found" });
            }
            return res.status(204).json(); // סטטוס 204 לאחר מחיקה מוצלחת
        } catch (e) {
            next(e);
        }
    }
}

export default BaseController;
