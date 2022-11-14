module.exports = (sequelize, Sequelize) => {
    return sequelize.define('student',
        {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            email: {
                type: Sequelize.STRING,
                unique: true
            },
            suspended: {
                type: Sequelize.BOOLEAN
            }
        }, {timestamps: false, freezeTableName: true}
    );
};
