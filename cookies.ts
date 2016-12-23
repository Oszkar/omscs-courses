module App {
    export class Cookies {
        private static _expirationDays: number = 365;

        /**
         * Reads the cookie and parses the completed course IDs from it.
         * @function
         */
        public static parseCompletedCookies(): number[] {
            var completed = Cookies.get("completed").split(',');
            var list: number[] = [];
            if (completed && completed != [] && completed != ['']) {
                completed.forEach(function (item) {
                    var num = parseInt(item);
                    if (!isNaN(num)) list.push(num);
                });
            }
            return list;
        }

        /**
         * Saves the passed completed course list IDs into the cookie (and erases the old value)
         * @function
         */
        public static updateCompletedCookies(list: number[]) {
            Cookies.delete("completed");
            if(list && list != []) Cookies.set("completed", list.toString());
        }

        /**
         * Returns the value of the requested cookie
         * @function
         * @param {string} name the name of the cookie you are looking for
         */
        private static get(name: string) {
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
        private static delete(name) {
            Cookies.set(name, "");
        }

        /**
         * Sets the value of the requested cookie
         * @function
         * @param {string} name the name of the cookie you are setting
         * @param {string} value the value of the cookie
         */
        private static set(name: string, value: string) {
            let d: Date = new Date();
            d.setTime(d.getTime() + Cookies._expirationDays * 24 * 60 * 60 * 1000);
            let expires: string = "expires=" + d.toUTCString();
            document.cookie = name + "=" + value + "; " + expires;
        }    
    }
}