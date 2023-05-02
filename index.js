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
        // for getting limited documents we use .limti(Number). It will give only given Number of documents
        return res.json({ success: true, data: sortedStudents });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ success: false, error: error.message });
    }
});
// filter 
app.get("/api/filter", async (req, res) => {
    try {
        const sortedStudents = await STUDENT_MODEL.find({
            gender: "M"
        },
            {
                name: 1,
                branch: 1,
                college: 1,
                passoutYear: 1,
                hobby: 1
            }
        );
        return res.json({ success: true, data: sortedStudents });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ success: false, error: error.message });
    }
});
// pagention 
app.get("/api/pagenation", async (req, res) => {
    try {
        const sortedStudents = await STUDENT_MODEL.find().skip((pageno - 1) * 5).limit(5);
        return res.json({ success: true, data: sortedStudents });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ success: false, error: error.message });
    }
});
//find by id also 
// find by params 
app.get("/api/params/:id", async (req, res) => {
    try {
        const sortedStudents = await STUDENT_MODEL.findById(req.params.id);
        return res.json({ success: true, data: sortedStudents });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ success: false, error: error.message });
    }
});
//update
app.get("/api/update", async (req, res) => {
    try {
        const sortedStudents = await STUDENT_MODEL.findByIdAndUpdate(req.params.id);
        return res.json({ success: true, data: sortedStudents });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ success: false, error: error.message });
    }
});
app.get("/api/findone/:id", async (req, res) => {
    try {
        const branch = req.body.branch;
        const college = req.body.college;

        const filterdStudents = await STUDENT_MODEL.findOne({ branch: branch, college: college },
            {
                name: 1,
                branch: 1,
                college: 1,
                passoutYear: 1,
                hobby: 1
            }
        );
        return res.json({ success: true, data: filterdStudents });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ success: false, error: error.message });
    }
});
//update
app.put("/update/:id", async (req, res) => {
    try {
        const data = await STUDENT_MODEL.findByIdAndUpdate(req.params.id, {});
        return res.json({ success: true, data: data });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ success: false, error: error.message });
    }
})

app.put("/api/update/:id", async (req, res) => {
    try {
        const data = await STUDENT_MODEL.findByIdAndUpdate(req.params.id,
            {
                email: "srijal0920@gmail.com",
                college: "IIT"
            })
        return res.json({ success: true, data: data });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ success: false, error: error.message });
    }
});

//delete
app.delete("/api/delete/:id", async (req, res) => {
    try {
        const deletedata = await STUDENT_MODEL.findByIdAndDelete(req.params.id,)
        return res.json({ success: true });
    } catch (error) {
        return res.status(400).json({ success: false, error: error.message });
    }
})

connectDatabase();
app.listen(8000, () => {
    console.log("Server is running at port 8000");
});
