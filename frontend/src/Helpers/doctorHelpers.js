
import axios from 'axios';

export const doctorCookie = async () => {
    const cookies = document.cookie;

    if (cookies.includes('jwtdoctor=')) {

        const response = await axios.get('https://takecareofficial.online/doctor/decodeToken', { withCredentials: true })
        
        if (response.status === 200) {
            return true;
        }

        return false;
    } else {
        return false
    }
}
