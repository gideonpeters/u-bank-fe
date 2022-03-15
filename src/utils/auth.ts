/* eslint-disable */
import app from "@/main";

function errorHandler(e: any) {
    let data: any = "Connection seems to be very slow";
    if (e.response && e.response.status === 400) {
        data = e.response.data;
    } else if (e.response && e.response.status === 401) {
        localStorage.removeItem("token");
        // removeAuthHeader();
        data = e.response.data.message;

        if (document.location.pathname == "/") {
            app.$router.replace({
                name: "auth.login",
            });
        }
        if (document.location.pathname == "/signup") {
            // app.$router.replace({
            //   name: "auth.login",
            // });
        } else {
            app.$router.replace({
                path: `/?next=${document.location.pathname}`,
            });
        }
        app.$store.commit("openSnackbar", data, { root: true });
    } else if (e.response && e.response.status === 403) {
        data = e.response.data;
        // console.log(e.response);
        app.$store.commit("openSnackbar", data.message, { root: true });

        // if (!data.data.profile.emailverified) {
        //     app.$store.dispatch("auth/logout", { reRoute: false });
        //     app.$router.replace({ name: "auth.verify-email" });
        // } else {
        //     app.$router.replace({
        //         name: "dashboard.index",
        //     });
        // }
    } else if (e.response && e.response.status === 404) {
        data = "Oops! an error occured ";
    } else if (e.response && e.response.status === 500) {
        data = "Oops! an error occured";
    } else {
        console.log(e.response.data);
        app.$store.commit("openSnackbar", e.response.data.message, {
            root: true,
        });

        data = Object.values(e.response.data.errors)[0];
    }
    const status = e.response ? e.response.status : 0;

    if (data?.data) {
        let msg = Object.values(data.data);

        app.$store.commit("openSnackbar", msg[0], { root: true });
    } else {
        app.$store.commit("openSnackbar", data, { root: true });
    }

    return {
        status,
        data,
    };
}

/**
 * Handles how error is displayed to the user
 * @param {Error} error object
 * @param {Boolean} throwAll
 * @param {Boolean} popToast
 */
function resolveRequestError(err: any, throwAll = true, popToast = true) {
    // app.$Progress.fail();
    const { status, data } = errorHandler(err);

    // if form validation errors are present, throw it so the caller can catch it
    if (data.data) throw data.data;

    if ([401, 403].includes(status)) {
        return status;
    }

    let text = data.message;
    if (!text) text = data;
    if (popToast) app.$store.commit("openSnackbar", text, { root: true });

    if (status === 0 && !popToast)
        app.$store.commit("openSnackbar", text, { root: true });

    if (throwAll) throw data;
}

function isUserLoggedIn() {
    try {
        const status = localStorage.getItem("homify-authToken");
        return status != null && status.length != 0;
    } catch (error) {
        return false;
    }
}

export { resolveRequestError, isUserLoggedIn };
