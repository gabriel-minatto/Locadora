module.exports = function(error, req, res, next) {

    const tryParseJson = (str) => {

        try {

            return JSON.parse(str);
        } catch (e) {

            return str;
        }
    };

    console.log(error.message);

    res.status(error.status || 500)
       .json({ "error" : tryParseJson(error.message) });
};