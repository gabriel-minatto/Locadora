module.exports = function() {

    return function(msg, status) {

        if(Array.isArray(msg)) {

            msg = msg.reduce((ant, pos, key) => {

                if(ant[pos.param]) {

                    if(!Array.isArray(ant[pos.param].msg))
                        ant[pos.param].msg = [].concat(ant[pos.param].msg);

                    ant[pos.param].msg.push(pos.msg);
                    return ant;
                }

                ant[pos.param] = { msg: pos.msg, param: pos.param };
                return ant;

            }, {});

            msg = JSON.stringify(msg);
        }

        const exception = new Error(msg);
        if (!status) {
            status = 500;
        }
        exception.status = status;

        return exception;
    }
};