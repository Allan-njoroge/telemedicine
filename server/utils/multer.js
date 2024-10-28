import multer from 'multer';

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function(req, file, cb) {
        const uniqueFileName = `${Date.now()}_${file.originalname}`;
        cb(null, file.uniqueFileName)
    }
})
const upload = multer({ storage: storage })
export default upload;