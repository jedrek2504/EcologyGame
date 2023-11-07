var express = require('express');
const fs = require('fs');
const path = require('path')
const formidable = require('formidable');

var router = express.Router();

/*router.post('/upload', (req, res, next) => {
    const form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files){
      if(files.filetoupload){
        let oldPath = files.filetoupload[0].filepath;

        let newPath = `${process.env.USRFILES_LOCATION}/${files.filetoupload[0].originalFilename}`;
        let rawData = fs.readFileSync(oldPath)
      
        fs.writeFile(newPath, rawData, function(err){
            if(err) {
              console.log(err);
              return res.send("Upload with an error")
            }
            else {
              return res.send("Successfully uploaded");
            }
            
        });
      }
      else {
        return res.send("No file / empty file attached")
      }
  });
});

router.get('/download', (req, res) => {
  if(req.query.f){
    //let filepath = `./usrFiles/${req.query.f}`;
    let filepath = `${process.env.USRFILES_LOCATION}/${req.query.f}`;
    if(fs.existsSync(filepath)){
      res.download(filepath);
    }
    else {
      return res.send("No such file.");
    }
  }
});*/

module.exports = {
	router: router
};
