import { instance } from "./api.config.js";

export default class AuthService {

    login (email, login, password) {
        return instance.post("/api/login", {email, login, password})
    }
    
    refreshToken() {
        return instance.get("/api/refresh");
    }
    
    logout() {
        return instance.post("/api/logout")
    }
}