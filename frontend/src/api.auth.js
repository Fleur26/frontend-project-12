import { instance } from "./api.config.js";

export default const AuthService {

    login (email, password) {
        return instance.post("/api/login", {email, password})
    }
    
    refreshToken() {
        return instance.get("/api/refresh");
    }
    
    logout() {
        return instance.post("/api/logout")
    }
}