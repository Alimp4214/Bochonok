import { DataTypes, Model } from "sequelize";

export default class Notes extends Model {}

export const notesInitter = (sequelize) => {
    Notes.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            notes: {
                type: DataTypes.STRING,
                allowNull: false
            },
        },
        { sequelize, tableName: "Notes" }
    );

    return () => {};
};

