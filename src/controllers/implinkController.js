const ImpLinks = require("../models/ImpLinks");

//Get
exports.getLinks = async(req, res) =>{
    try{
        const data = await ImpLinks.find().sort({CreatedAt: -1});
        res.json(data);
    }catch(err) {
        res.status(500).json({error: err.message})
    }
};


exports.createImplink = async(req, res)=>{
    try {
        const { title, link} = req.body;
        if(!title) return res.status(400).json({error:"Text required"})
         
        const newImplink = await ImpLinks.create({title, link});
        res.status(201).json(newImplink)
        } catch (err) {
         res.status(500).json({error:err.message})
    }
}

exports.deleteLinks = async(req, res)=>{
    try{
        await ImpLinks.findByIdAndDelete(req.params.id);
        res.json({message:"delete Successfully"})
    } catch(err){
        res.status(500).json({error:err.message});
    }
}

exports.updatelinks = async(req,res)=>{
    try {
        const {title, link} = req.body
        if(!title) return res.status(400).json({error: "text is required"})
        
        const updated = await ImpLinks.findByIdAndUpdate(
            req.param.id,
            {title, link},
            {new:true}
        );
        res.json(updated)
    } catch (err) {
        res.status(500).json({error:err.message});
    }
}

// TOGGLE ACTIVE
exports.toggleimpLinks = async (req, res) => {
  try {
    const impLinks = await ImpLinks.findById(req.params.id);
    if (!impLinks) return res.status(404).json({ message: "Not found" });

    impLinks.isActive = !impLinks.isActive;
    await impLinks.save();

    res.json({ message: "Status updated", impLinks });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};