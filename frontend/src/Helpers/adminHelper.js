
import axios from 'axios';

export const adminCookie = async () => {
    const cookies = document.cookie;

    if (cookies.includes('jwtAdmin=')) {

        const response = await axios.get('http://localhost:5000/admin/decodeToken', { withCredentials: true })
        
        if (response.status === 200) {
            return true;
        }

        return false;
    } else {
        return false
    }
}