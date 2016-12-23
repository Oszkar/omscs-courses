module App {
    export class Cookies {
        private static _expirationDays: number = 180;

        /**
         * Returns the value of the requested cookie
         * @function
         * @param {string} name the name of the cookie you are looking for
         */
        public static get(name: string) {
            let ca: Array<string> = document.cookie.split(/;\s/);
            let cookieName = name + "=";
            let c: string;
            for (let i: number = 0; i < ca.length; i += 1) {
                c = ca[i].replace(/^\s\+/g, "");
                if (c.indexOf(cookieName) == 0) {
                    return c.substring(cookieName.length, c.length);
                }
            }
            return "";
        }

        /**
         * Deletes the requested cookie
         * @function
         * @param {string} name the name of the cookie to delete
         */
        public static delete(name) {
            Cookies.set(name, "");
        }

        /**
         * Sets the value of the requested cookie
         * @function
         * @param {string} name the name of the cookie you are setting
         * @param {string} value the value of the cookie
         */
        public static set(name: string, value: string) {
            let d: Date = new Date();
            d.setTime(d.getTime() + Cookies._expirationDays * 24 * 60 * 60 * 1000);
            let expires: string = "expires=" + d.toUTCString();
            document.cookie = name + "=" + value + "; " + expires;
        }
    }
}