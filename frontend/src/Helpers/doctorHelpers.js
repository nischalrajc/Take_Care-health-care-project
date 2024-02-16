export const doctorCookie = ()=>{
    const cookies = document.cookie;
    if (cookies.includes('jwtdoctor=')) {
        return true;
    } else {
        return false;
    }  
}
