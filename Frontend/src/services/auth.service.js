class AuthService {

  logout() {
    localStorage.clear();
    window.location.href="/";
    
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));;
  }
  getCurrentUsername() {
    return JSON.parse(localStorage.getItem('username'));
  }

  getUserId(){
        return localStorage.getItem("userId");       
  }

  getRole(){
    return localStorage.getItem("userRole");
  }

  getToken(){
    return localStorage.getItem("token");
  }
}

export default new AuthService();