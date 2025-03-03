import BaseController from "./BaseController.js";
import UserService from "../services/userService.js";

class UserController extends BaseController {
    constructor() {
        super(UserService); 
    }

    // ניתן להוסיף כאן פונקציות נוספות אם נדרש
}

export default new UserController();
