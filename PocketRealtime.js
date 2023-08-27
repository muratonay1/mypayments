firebase.initializeApp({
    //firebase initialize settings
});
let PocketRealtime = (
    function () {
        /**
         * @param {Object} args
         */
        function getValue(args) {
            let fail = args.fail;
            try {
                let path = args.path;
                let done = args.done;
                if (path == "root") {
                    firebase.database().ref("Odemeler/").on("value", (snapshot) => {
                        done(snapshot.val())
                    })
                }
                else if (path.trim() != "root") {
                    firebase.database().ref("Odemeler/" + path + "/").on("value", (snapshot) => {
                        done(snapshot.val())
                    })
                }
            }
            catch (error) {
                fail(error);
            }

        }
        function setValue(args) {
            let fail = args.fail;
            try {
                let path = args.path;
                let done = args.done;
                let params = args.params;
                firebase.database().ref("Odemeler/" + path).set(params, (error) => {
                    if (error) {
                        fail(error);
                    } else {
                        done(true);
                    }
                })
            }
            catch (error) {
                throw new Error(error).stack;
            }
        }

        function deleteValue(args) {
            let fail = args.fail;
            try {
                let path = args.path;
                let done = args.done;
                firebase.database().ref("Odemeler/" + path).remove((error) => {
                    if (error) {
                        fail(error);
                    } else {
                        done(true);
                    }
                })
            }
            catch (error) {
                throw new Error(error).stack;
            }
        }

        function getFunds(args) {
            let fail = args.fail;
            try {
                let done = args.done;
                firebase.database().ref("Fonlar/").on("value", (snapshot) => {
                    done(snapshot.val())
                })
            }
            catch (error) {
                fail(error);
            }
        }

        function setFunds(args) {
            let fail = args.fail;
            try {
                let done = args.done;
                let params = args.params;
                firebase.database().ref("Fonlar/").set(params, (error) => {
                    if (error) {
                        fail(error);
                    } else {
                        done(true);
                    }
                })
            }
            catch (error) {
                throw new Error(error).stack;
            }
        }

        return {
            getValue: getValue,
            setValue: setValue,
            deleteValue: deleteValue,
            getFunds: getFunds,
            setFunds: setFunds
        }
    }
)();