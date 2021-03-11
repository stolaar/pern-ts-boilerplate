import AuthService from "../../services/auth/AuthService";
import AuthController from "./AuthController";
import ValidationService from "../../services/validation/ValidationService";
import {emailService} from "../../services/email/EmailService";
import {db} from "../../db/db";

const validationService = new ValidationService()
const authService = new AuthService(validationService, emailService, db.users)

const authController = new AuthController(authService)

export default authController
