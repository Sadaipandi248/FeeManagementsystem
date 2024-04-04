const router = require('express').Router();
const Feesdetails = require('../model/fee_details');

router.post('/addfeedetail', async (req, res) => {
  try {
    const { course,feetype, feeamount } = req.body;

    // Check if the feetype already exists in the FeeDetails collection
    const feeTypeExists = await Feesdetails.findOne({course, feetype });

    if (feeTypeExists) {
      // Respond with a 409 Conflict status code
      return res.status(409).json({ error: 'Fee type already exists' });
    }

    // Create a new FeeDetails document
    const newFeeDetails = new Feesdetails({
        course,
      feetype,
      feeamount,
    });

    await newFeeDetails.save();
    res.json({ message: 'Fee details added successfully' });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/feelist/:course', async (req, res) => {
    try {
        const { course } = req.params;
        const studentfeelist = await Feesdetails.find({ course });
        res.json(studentfeelist);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
