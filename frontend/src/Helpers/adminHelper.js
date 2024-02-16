
    export const adminCookie = ()=>{
        const cookies = document.cookie;
        if (cookies.includes('jwtAdmin=')) {
            return true;
        } else {
            return false;
        }  
    }