module.exports = (req, res) => {
    return res.status(404).send(`<h2>${req.url}? 404!</h2>`);
}