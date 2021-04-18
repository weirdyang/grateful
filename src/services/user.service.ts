const USER_KEY = 'user_info'

// https://stackoverflow.com/questions/10730362/get-cookie-by-name
export const setUser = (user: Record<string, any>) => {
    window.localStorage.setItem(USER_KEY, JSON.stringify(user));
}
export const getUser = () => {
    const user = window.localStorage.getItem(USER_KEY);
    console.log(user, "cookie");
    if (user) {
        return JSON.parse(user);
    }
    return null;
};

export const deleteUser = () => {
    window.localStorage.removeItem(USER_KEY);
}


export default { getUser, setUser, deleteUser };