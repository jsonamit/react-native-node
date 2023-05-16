
module.exports = (sequelize, DataTypes) => {
    const users = sequelize.define(
        'users',
        {
            user_id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            user_name: DataTypes.STRING,
            full_name: DataTypes.STRING,
            mobile_number: DataTypes.STRING,
            email: DataTypes.STRING,
            age: DataTypes.STRING,
            profile_pic: DataTypes.STRING,
            pan_number: DataTypes.STRING,
            otp: DataTypes.STRING,
            password: DataTypes.STRING,
            otp_time: DataTypes.DATE,
            last_login: DataTypes.STRING,
            created_at: DataTypes.DATE,
            created_by: DataTypes.STRING,
            status: DataTypes.ENUM(['INCOMPLETE']),
            incomplete_status: DataTypes.STRING,
            updated_at: DataTypes.DATE,
        },
        {
            tableName: 'users',
            timestamps: true,
            createdAt: "created_at", // alias createdAt as created_at
            updatedAt: "updated_at",
            underscored: true
        },
    );
    return users;
}; 