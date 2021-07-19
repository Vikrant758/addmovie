const router = require('express').Router();
const multer = require('multer');
const { v4: uuid4 } = require('uuid');
const File = require('../model/file');

let storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => {
        const uniqueName = `${Date.now()} - ${Math.round(Math.random() * 1E9)}${path.extname(file.originalname)}`;
        cb(null, uniqueName);
    }
})

let upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 * 100 },
}).single('myfile');


router.post('/', (req, res) => {
    //Store file
    upload(req, res, async (err) => {
        //Validate Request
        if (!req.file) {
            return res.json({ error: "There is a problem" });
        }

        if (err) {
            return res.status(500).send({ error: err.message });
        }

        //Store into database
        const file = new File({
            filename: req.file.filename,
            uuid: uuid4(),
            path: req.file.path,
            size: req.file.size
        });

        const responce = await file.save();
        return res.json({ file: `${process.env.APP_BASE_URL}/files/${responce.uuid}}` });

    });
});

module.exports = router;
