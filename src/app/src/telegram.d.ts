interface Window {
    Telegram: {
        WebApp: {
            ready: () => void;
            initDataUnsafe: {
                user?: {
                    id: number;
                    first_name: string;
                    photo_url: string;
                };
            };
        };
    };
}
