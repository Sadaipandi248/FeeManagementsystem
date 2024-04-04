const router = require('express').Router();
const Student = require('../model/student');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const PDFDocument = require('pdfkit');
const fs = require('fs');
const os = require('os');
const path = require('path');
// Route to register a new student
// router.post('/reg', async (req, res) => {
//   try {
//     const { name, email, regnum, course } = req.body;

//     // Check if the email already exists in the Student collection
//     const studentEmailExists = await Student.findOne({ email });

//     if (studentEmailExists) {
//       // Respond with a 409 Conflict status code
//       return res.status(409).json({ error: 'Email already exists' });
//     }

//     //const hashedRegnum = await bcrypt.hash(regnum, 10);

//     const newStudent = new Student({
//       name,
//       email,
//       regnum: hashedRegnum,
//       course,
//     });

//     await newStudent.save();
//     res.json({ message: 'Student added successfully' });
//   } catch (error) {
//     console.error(error.message);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// // Route to login the student
// router.post('/login', async (req, res) => {
//   try {
//     const { email, regnum } = req.body;

//     // Find the student by email
//     const studentUser = await Student.findOne({ email });

//     if (studentUser) {
//       // Compare hashed registration number
//       const regnumMatch = await bcrypt.compare(regnum, studentUser.regnum);

//       if (regnumMatch) {
//         // Passwords match, login successful
//         // Generate JWT token
//         const token = jwt.sign({ email: studentUser.email }, 'privatekey');
//         res.header('auth', token).json({ message: 'Login successful', token });
//       } else {
//         // Passwords don't match, login failed
//         res.status(401).json({ error: 'Invalid credentials' });
//       }
//     } else {
//       // No user found with the provided email
//       res.status(404).json({ error: 'User not found' });
//     }
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });


// Route to register a new student
router.post('/reg', async (req, res) => {
  try {
    const { name, email, regnum, course, password } = req.body;

    // Check if the email already exists in the Student collection
    const studentEmailExists = await Student.findOne({ email });

    if (studentEmailExists) {
      // Respond with a 409 Conflict status code
      return res.status(409).json({ error: 'Email already exists' });
    }

    const newStudent = new Student({
      name,
      email,
      regnum,
      course,
      password, // Save password directly
    });

    await newStudent.save();
    res.json({ message: 'Student added successfully' });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route to login the student
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the student by email
    const studentUser = await Student.findOne({ email });

    if (studentUser) {
      // Compare passwords
      if (studentUser.password === password) {
        // Passwords match, login successful
        // Generate JWT token
        const token = jwt.sign({ email: studentUser.email }, 'privatekey');
        res.header('auth', token).json({ message: 'Login successful', token });
      } else {
        // Passwords don't match, login failed
        res.status(401).json({ error: 'Invalid credentials' });
      }
    } else {
      // No user found with the provided email
      res.status(404).json({ error: 'User not found' });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// Route to get all students
router.get('/get', async (req, res) => {
  try {
    const students = await Student.find({});
    res.json(students);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// Particular user data
const validUser = (req, res, next) => {
  var token = req.header('auth');
  req.token = token;
  next();
};

router.get('/getAlldata', validUser, async (req, res) => {
  try {
    jwt.verify(req.token, 'privatekey', async (err, data) => {
      if (err) {
        res.sendStatus(403);
      } else {
        const user = await Student.findOne({ email: data.email })

        res.json(user);
      }
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



    //pay the fee the particular student
    const paymentuser = (req, res, next) => {
      var token = req.header('auth');
      req.token = token;
      next();
    };

    router.get('/getalldatapay', paymentuser, async (req, res) => {
      try {
        jwt.verify(req.token, 'privatekey', async (err, data) => {
          if (err) {
            res.sendStatus(403);
          } else {
            const user = await Student.findOne({ email: data.email })

            res.json(user);
          }
        });
      } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    });


 // Route to handle the payment2
const validUserPayment = (req, res, next) => {
  const token = req.header('auth');
  req.token = token;
  next();
};
// Function to generate payment receipt PDF
const generatePaymentReceipt = (student, feeType, paymentAmount) => {
  const doc = new PDFDocument();
  const fileName = `${student.name}_PaymentReceipt.pdf`;
  const pdfPath = path.join(os.homedir(), 'Downloads', fileName);

  doc.pipe(fs.createWriteStream(pdfPath));

  // Add student information and payment details to the PDF
  doc.font('Helvetica-Bold').fontSize(16).text('Student Payment Receipt', { align: 'center' });
  doc.font('Helvetica').fontSize(12).text(`Name: ${student.name}`);
  doc.text(`Course: ${student.course}`);
  doc.text(`Email: ${student.email}`);
  doc.text('-----------------------------------------');
  doc.text(`Fee Type: ${feeType.feetype}`);
  doc.text(`Total Fee Amount: ${feeType.feeamount + paymentAmount}`);
  doc.text(`Paying Amount: ${paymentAmount}`);
  doc.text(`Balance Fee Amount: ${feeType.feeamount}`);
  doc.end();

  console.log(`PDF generated: ${fileName}`);
  return fileName; // Return only the file name
};

// Route to handle the payment
router.post('/payment', async (req, res) => {
  try {
    const { email, amount, feetypes } = req.body;
    console.log('Received payment request:', { email, feetypes, amount });

    // Find the student by email
    const user = await Student.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Find the fee type
    const feeType = user.fees.find(fee => fee.feetype === feetypes);
    console.log('Found fee type:', feeType);

    if (!feeType) {
      return res.status(404).json({ message: 'Fee type not found' });
    }

    const paymentAmount = parseFloat(amount);

    // Check if the payment amount exceeds the fee amount
    if (feeType.feeamount < paymentAmount) {
      return res.status(400).json({ message: 'Insufficient funds' });
    }

    // Deduct the payment amount from the fee amount
    feeType.feeamount -= paymentAmount;

    // If fee amount is zero or negative, remove the fee type from the fees array
    if (feeType.feeamount <= 0) {
      user.fees = user.fees.filter(fee => fee.feetype !== feetypes);
      await user.save();
    } else {
      await user.save();
    }

    // Generate PDF with payment details
    const pdfFileName = generatePaymentReceipt(user, feeType, paymentAmount);

    // Set content-disposition attachment in response headers
    res.setHeader('Content-disposition', `attachment; filename=${pdfFileName}`);
    res.setHeader('Content-type', 'application/pdf');
    // Send the PDF file as response
    res.sendFile(pdfFileName, { root: path.join(os.homedir(), 'Downloads') });

    console.log('Payment successful');
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


module.exports = router;

