import express from 'express';
const router = express.Router();


router.get(`/.well-known/pki-validation/4EC1FA98AAE7A49E6254FEA3927F396D.txt`, function(req,res,next) {
    res.sendFile(`/ecopers/4EC1FA98AAE7A49E6254FEA3927F396D.txt`);
  });
  
export default router;