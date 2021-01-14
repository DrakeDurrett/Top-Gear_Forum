module.exports = {
    getCars: async (req, res) => {
        const db = req.app.get('db');
        const cars = await db.get_cars();
        res.status(200).send(cars);
    }
}