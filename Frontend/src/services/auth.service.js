//Utviklet av: Gruppe 2
import Axios from 'axios';
class AuthService {

  logout() {
    Axios.post("http://localhost:3001/api/tidsbankSlutt", 
    {
        idbruker : this.getUserId()         
    })
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

  getPswstatus(){
    return localStorage.getItem("pswStatus");
  }

  removePswstatus() {
    localStorage.removeItem('pswStatus');
  }
}

export default new AuthService();