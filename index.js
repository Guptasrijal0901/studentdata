const express = require("express");
const { connectDatabase } = require("./Connection");
const app = express();
app.use(express.json()); // this enables json transportation
const STUDENT_MODEL = require("./Models/Student");

//Create Operation
app.post("/api/addstudent", async (req, res) => {
    try {
        console.log(req.body);
        const dbObject = {
            name: req.body.studentname,
            age: req.body.Age,
            gender: req.body.Gender,
            branch: req.body.branch,
            college: req.body.college,
            email: req.body.Email,
            password: req.body.password,
            hobby: req.body.hobby,
            passoutYear: req.body.passoutYear,
        };
        const addStudent = new STUDENT_MODEL(dbObject);
        await addStudent.save();
        return res.json({
            success: true,
            message: "Student registered succesfully",
        });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ success: false, error: error.message });
    }
});

//Read Operation
app.get("/api/getstudent", async (req, res) => {
    try {
        const studentData = await STUDENT_MODEL.find(); // this line calls data from database
        return res.json({ success: true, data: studentData }); // this line sends recived data
    } catch (error) {
        console.log(error);
        return res.status(400).json({ success: false, error: error.message });
    }
});

//sort 
app.get("/api/yearsort", async (req, res) => {
    try {
        const studentData = await STUDENT_MODEL.find().sort({ passoutYear: 1 }); // this line calls data from database
        return res.json({ success: true, data: studentData }); // this line sends recived data
    } catch (error) {
        console.log(error);
        return res.status(400).json({ success: false, error: error.message });
    }
});

app.get("/api/branchsort", async (req, res) => {
    try {
        const studentData = await STUDENT_MODEL.find().sort({ branch: -1 }); // this line calls data from database
        return res.json({ success: true, data: studentData }); // this line sends recived data
    } catch (error) {
        console.log(error);
        return res.status(400).json({ success: false, error: error.message });
    }
});

app.get("/api/sortgender", async (req, res) => {
    try {
        const studentData = await STUDENT_MODEL.find().sort({ gender: "M" }); // this line calls data from database
        return res.json({ success: true, data: studentData }); // this line sends recived data
    } catch (error) {
        console.log(error);
        return res.status(400).json({ success: false, error: error.message });
    }
});

// get limited
app.get("/api/limitedstudnents", async (req, res) => {
    try {
        const sortedStudents = await STUDENT_MODEL.find().limit(1);
        // for getting limited documents we use .limti(Number). It will give onnly given Number of documents
        return res.json({ success: true, data: sortedStudents });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ success: false, error: error.message });
    }
});
connectDatabase();
app.listen(8000, () => {
    console.log("Server is running at port 8000");
});
