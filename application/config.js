const dev = {
    app: {
        host: '127.0.0.1',
        port: 3000,
        db: 'mongodb://localhost/hospital',
        secret: "MrJohnny786"
    }
};

const prod = {
    app: {
        port: process.env.PORT,
        db: 'mongodb+srv://mrjohnny786:kalamata1a@patientsdata.c79pi.mongodb.net/PatientsData?retryWrites=true&w=majority',
        secret: "MrJohnny786"
    }
};

const config = {
    dev,
    prod
};

module.exports = config;