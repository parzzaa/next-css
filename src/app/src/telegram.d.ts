interface Window {
    Telegram: {
        WebApp: {
            ready: () => void;
            initDataUnsafe: {
                user?: TelegramUser;
            };
        };
    };
}

interface TelegramUser {
    id: number;
    first_name: string;
    photo_url: string;
}
