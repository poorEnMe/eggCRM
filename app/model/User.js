module.exports = app => {
    const { STRING } = app.Sequelize;

    const User = app.model.define('TestUsers',{
        account:STRING,
        xpassword:STRING
    });

    User.auth = async function (account,xpassword) {
        return await this.findOne({
            where:{
                account,
                xpassword
            },
            attributes: ['account']
        });
    };

    return User;
};