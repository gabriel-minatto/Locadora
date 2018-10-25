class Movies {

    constructor(connection) {

        this._connection = connection;
    }

    async insert(movie) {

        return await this._connection.promise().query('insert into movies SET ?', movie);
    }

    async findAll() {

        return await this._connection.promise().query('select * from movies');
    }

    async findAllJoinUsers() {

        return await this._connection.promise().query('select m.*, u.name, u.email from movies m left join users u on u.id = m.user ');
    }

    async findAllAvailable() {

        return await this._connection.promise().query('select * from movies where user is null');
    }

    async findByTitle(title) {

        return await this._connection.promise().query('select * from movies where title like ?', `%${title}%`);
    }

    async findById(id) {

        return await this._connection.promise().query('select * from movies where id = ?', id);
    }

    async rentMovie(id, user) {

        return await this._connection.promise().query('update movies set user=? where id = ?', [user, id]);
    }

    async freeMovie(id) {

        return await this._connection.promise().query('update movies set user=null where id = ?', id);
    }
}

module.exports = function () {
    return Movies;
};