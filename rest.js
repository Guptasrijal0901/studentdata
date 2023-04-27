// Get students in sorted order
app.get("/api/lateststudnents", async (req, res) => {
    try {
        const sortedStudents = await STUDENT_MODEL.find().sort({ passoutYear: 1 });
        // We write .sort() to sort documents and inside .sort(Object mentioning key field)   // -1 means descedning order and 1 is ascending
        return res.json({ success: true, data: sortedStudents });
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
// get latest 2 studnets
app.get("/api/latesttwo", async (req, res) => {
    try {
        const sortedStudents = await STUDENT_MODEL.find()
            .sort({ age: -1 })
            .limit(2);
        // always sort comes first then limit
        return res.json({ success: true, data: sortedStudents });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ success: false, error: error.message });
    }
});