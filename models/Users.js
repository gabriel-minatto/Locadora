class Users {

    constructor(connection) {

        this._connection = connection;
    }

    async insert(user) {
        return await this._connection.promise().query('INSERT INTO users SET ?', user);
    }

    async findAll() {
        return await this._connection.promise().query('select * from users');
    }

    async login(email, password) {

        return await this._connection.promise().query("select * from users where email = ? and password = ? limit 1", [email, password]);
    }

    async checkLoginActive(id) {

        return await this._connection.promise().query("select * from users where id = ? and is_logged_in = 1 limit 1", id);
    }

    async activateLogin(id) {

        return await this._connection.promise().query("update users set is_logged_in=1 where id = ?", id);
    }

    async deactivateLogin(id) {

        return await this._connection.promise().query("update users set is_logged_in=0 where id = ?", id);
    }

    //metodo implementado utilizando promise apenas para
    //mostrar outra forma de solucionar
    //a questao da assincronicidade do node/js
    findById(id) {
        return new Promise((resolv, reject) => {
            this._connection.query('select * from users where id = ?', id, (err, result) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolv(result);
            });
        });
    }
}

module.exports = function(){
    return Users;
};