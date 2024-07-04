const pdfService = require('../services/pdfService');

const downloadSchedulePDFController = async (req, res) => {
    try {
        const role = req.user.role;
        const userId = req.user.userId;
        const filePath = await pdfService.generateSchedulePDF(userId, role);

        res.download(filePath, `${userId}_schedule.pdf`, err => {
            if (err) {
                res.status(500).json({ message: 'Error generating PDF' });
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { downloadSchedulePDFController };