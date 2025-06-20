const USER_KEY = 'user';

export type User = {
    id: number;
    username: string;
    email?: string;
};

export const getUserInfo = (): User | null => {
    const user = localStorage.getItem(USER_KEY);
    return user ? (JSON.parse(user) as User) : null;
};

export const setUserInfo = (user: User) => {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
};

export const removeUserInfo = () => {
    localStorage.removeItem(USER_KEY);
};
