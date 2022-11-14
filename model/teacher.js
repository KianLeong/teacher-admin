module.exports = (sequelize, Sequelize) => {
    return sequelize.define('teacher',
        {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            email: {
                type: Sequelize.STRING,
                unique: true
            }
        }, {timestamps: false, freezeTableName: true}
    );
};
