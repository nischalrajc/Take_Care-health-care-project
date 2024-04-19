import axios from 'axios';

export const userCookie = async () => {
    const cookies = document.cookie;

    if (cookies.includes('jwtuser=')) {

        const response = await axios.get('https://takecareofficial.online/decodeToken', { withCredentials: true })
        
        if (response.status === 200) {
            return true;
        }

        return false;
    } else {
        return false
    }
}
