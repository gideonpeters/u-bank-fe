export const LOGIN = {
    PATH: "/",
    NAME: "auth.login",
    META: {
        layout: "public",
    },
};

export const VERIFY_EMAIL = {
    PATH: "/verify-email",
    NAME: "auth.verify-email",
    META: {
        layout: "public",
    },
};

export const SIGNUP = {
    PATH: "/signup",
    NAME: "auth.signup",
    META: {
        layout: "public",
    },
};

export const FORGOT_PASSWORD = {
    PATH: "/forgot-password",
    NAME: "auth.forgot-password",
    META: {
        layout: "public",
    },
};

export const RESET_PASSWORD = {
    PATH: "/reset-password",
    NAME: "auth.reset-password",
    META: {
        layout: "public",
        title: "Reset Password",
    },
};

export const CHANGE_PASSWORD = {
    PATH: "/change-password",
    NAME: "auth.change-password",
    META: {
        layout: "public",
        title: "Change Password",
    },
};

export const DASHBOARD = {
    PATH: "/dashboard",
    NAME: "main.dashboard",
    META: {
        layout: "private",
        title: "Dashboard",
    },
};

export const WALLET = {
    PATH: "/wallet",
    NAME: "main.wallet",
    META: {
        layout: "private",
        title: "My Wallet",
    },
};

export const PROJECTS = {
    PATH: "/projects",
    NAME: "main.projects",
    META: {
        layout: "private",
        title: "Projects",
    },
};

export const PROJECT_DETAILS = {
    PATH: "/projects/:projectId",
    NAME: "main.projects.details",
    META: {
        layout: "private",
        title: "Project Details",
    },
};

export const SUBSCRIPTION_DETAILS = {
    PATH: "/subscriptions/:subscriptionId",
    NAME: "main.subscriptions.details",
    META: {
        layout: "private",
        title: "Subscription Details",
    },
};

export const OFFER_DETAILS = {
    PATH: "/offers/:offerId",
    NAME: "main.offers.details",
    META: {
        layout: "private",
        title: "Offer Details",
    },
};

export const PROFILE = {
    PATH: "/profile",
    NAME: "main.profile",
    META: {
        layout: "private",
        title: "Profile",
    },
};

export const PORTFOLIO = {
    PATH: "/portfolio",
    NAME: "main.portfolio",
    META: {
        layout: "private",
        title: "Portfolio",
    },
};

export const SETTINGS = {
    PATH: "/settings",
    NAME: "main.settings",
    META: {
        layout: "private",
        title: "Settings",
    },
};
