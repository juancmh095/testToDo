const listCtrl = {};
const ActivityModel = require('../models/activity');


listCtrl.addActivity = async (req, res) => {
    try {
        var data = req.body;
        var newActivity = new ActivityModel(data);

        await newActivity.save();

        res.status(200).json({error:false, msg:'Actividad agregada correctamente'});        
    } catch (error) {
        console.log(error)
        res.status(400).json({error:true, msg:'Error al procesar la solicitud', errorType:error});      
        
    }    
}

listCtrl.getActivity = async (req, res) => {
    try {
        let filters = req.query.filters?req.query.filters:'{}';
        filters = JSON.parse(filters);
        
        var data = await ActivityModel.find(filters);
        
        res.status(200).json({error:false, data: data});       
    } catch (error) {
        res.status(400).json({error:true, data:data, msg:'Error al procesar la solicitud', errorType:error});      
        
    }
}

listCtrl.updateActivity = async (req, res) => {
    try {
        var data = req.body;
        
        await ActivityModel.findByIdAndUpdate(data._id,{$set:data});        
        
        res.status(200).json({error:false, msg:'Actividad actualizada correctamente'});        
    } catch (error) {
        res.status(400).json({error:true, msg:'Error al procesar la solicitud', errorType:error});     
        
    }
}

listCtrl.deleteActivity = async (req, res) => {
    try {
        var data = req.params.id;
        
        await ActivityModel.findByIdAndRemove(data);       
        
        res.status(200).json({error:false, msg:'Actividad actualizada correctamente'});        
    } catch (error) {
        res.status(400).json({error:true, msg:'Error al procesar la solicitud', errorType:error});     
        
    }
}

module.exports = listCtrl;