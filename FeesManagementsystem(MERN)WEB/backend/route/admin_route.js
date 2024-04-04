const router = require('express').Router();
const Admin = require('../model/admin');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Student = require('../model/student');

const multer = require('multer');
const XLSX = require('xlsx');

const storage = multer.memoryStorage();
const upload = multer({ storage });


//route to register a new Admin
router.post('/adminreg',async(req,res)=>{
    const{name,email,staffID} = req.body;

    try{
        //find the email in database
        const adminemail = await Admin.findOne({email});
        if(adminemail){
        return res.status(409).json({error: "Email Already Exist"})
        }
  const hashedID = await bcrypt.hash(staffID,10)

  const newAdmin = new Admin ({
name,
email,
staffID:hashedID,
  })
  await newAdmin.save();
  res.json({message: 'Admin added successfully'})
} catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error', details: err.message });
  }
  
})

//route to admin login
router.post('/adminlogin',async(req,res)=>{
try{
const {email,staffID}=req.body;
const AdminUser = await Admin.findOne({email})

if(AdminUser){
    const staffIDMatch = await bcrypt.compare(staffID,AdminUser.staffID);

    if(staffIDMatch){
        const token = jwt.sign({email: AdminUser.email},'privatekey');
        res.json({message:"Login Successfully",token})
    }else{
        res.status(401).json({message:"Invalid credentials"})
    }
}else{
    res.status(404).json({error: 'User not found'})
}
}catch(err){
    console.error(err.message);
    res.status(500).json({error:'Internal server error', details:err.message});
}
})


//get the particular user name
const validUser = (req,res,next)=>{
    var token = req.header('auth');
    req.token = token;
    next();
}
router.get('/getAdmindata',validUser,async(req,res)=>{
    try{
jwt.verify(req.token,'privatekey',async(err,data)=>{
if(err){
    res.sendStatus(403);
}else{
    const admin = await Admin.findOne({email:data.email}).select({
        name: 1,
    })
    res.json(admin);
}
})
    }catch(err){
        console.error(err.message);
        res.status(500).json({ error: 'Internal Server Error' });   
    }
})


//add the fee in all student
router.post('/addfee', async (req, res) => {
    const { department, feetype, feeamount, date } = req.body;

    try {
        const newFee = {
            feetype,
            feeamount,
            date: date || new Date(), // Use provided date or set to the current date
        };

        // Find students based on the specified department
        const students = await Student.find({ course: department });

        for (const student of students) {
            student.fees.push(newFee);
            await student.save();
        }

        res.json({ message: `Fees added successfully to ${department} students` });
    } catch (err) {
        console.error(err); // Log the error for debugging

        // Respond with a 500 status code and include the error message in the response
        res.status(500).json({ error: err.message || `Fees not added to ${department} students` });
    }
});





//get student by course
router.get('/getByCourse/:course', async (req, res) => {
    try {
      const { course } = req.params;
      const studentsByCourse = await Student.find({ course });
      res.json(studentsByCourse);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });


  //upload the excelsheet
  router.post('/api/upload', upload.single('file'), async (req, res) => {
    try {
      const buffer = req.file.buffer;
      const workbook = XLSX.read(buffer, { type: 'buffer' });
      const sheetName = workbook.SheetNames[0];
      const sheet = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
      
      // Insert records into the database
      await Student.insertMany(sheet);
      console.log("dgd");
      res.send('File uploaded successfully');
    } catch (error) {
      console.error('Error uploading file:', error);
      res.status(500).send(error.message);
    }
  });
  

 

module.exports = router;

