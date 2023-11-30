export default async (models, connection) => {
    const keySetter = [];
    models.forEach((plotter) => keySetter.push(plotter(connection)));
    keySetter.forEach((exec) => exec && exec(connection));
    await connection.sync({ alter: true });
};
