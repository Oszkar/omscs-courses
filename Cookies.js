var App;
(function (App) {
    var Cookies = (function () {
        function Cookies() {
        }
        /**
         * Reads the cookie and parses the completed course IDs from it.
         * @function
         */
        Cookies.parseCompletedCookies = function () {
            var completed = Cookies.get("completed").split(',');
            var list = [];
            if (completed && completed != [] && completed != ['']) {
                completed.forEach(function (item) {
                    var num = parseInt(item);
                    if (!isNaN(num))
                        list.push(num);
                });
            }
            return list;
        };
        /**
         * Saves the passed completed course list IDs into the cookie (and erases the old value)
         * @function
         */
        Cookies.updateCompletedCookies = function (list) {
            Cookies.delete("completed");
            if (list && list != [])
                Cookies.set("completed", list.toString());
        };
        /**
         * Returns the value of the requested cookie
         * @function
         * @param {string} name the name of the cookie you are looking for
         */
        Cookies.get = function (name) {
            var ca = document.cookie.split(/;\s/);
            var cookieName = name + "=";
            var c;
            for (var i = 0; i < ca.length; i += 1) {
                c = ca[i].replace(/^\s\+/g, "");
                if (c.indexOf(cookieName) == 0) {
                    return c.substring(cookieName.length, c.length);
                }
            }
            return "";
        };
        /**
         * Deletes the requested cookie
         * @function
         * @param {string} name the name of the cookie to delete
         */
        Cookies.delete = function (name) {
            Cookies.set(name, "");
        };
        /**
         * Sets the value of the requested cookie
         * @function
         * @param {string} name the name of the cookie you are setting
         * @param {string} value the value of the cookie
         */
        Cookies.set = function (name, value) {
            var d = new Date();
            d.setTime(d.getTime() + Cookies._expirationDays * 24 * 60 * 60 * 1000);
            var expires = "expires=" + d.toUTCString();
            document.cookie = name + "=" + value + "; " + expires;
        };
        Cookies._expirationDays = 365;
        return Cookies;
    })();
    App.Cookies = Cookies;
})(App || (App = {}));
//# sourceMappingURL=cookies.js.map