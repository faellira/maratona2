const Job = require('../model/Job')
const jobUtils = require('../Utils/jobUtils')
const Profile = require('../model/Profile');

module.exports = {
    async save(req, res) {

        await Job.create({
            name: req.body.name,
            "daily-hours": req.body["daily-hours"],
            "total-hours": req.body["total-hours"],
            created_at: Date.now(),

        })
        // req.body = { name: 'abc', 'daily-hours': '5', 'total-hours': '30' }
        return res.redirect('/')
    },
    
    create(req, res) {
        return res.render("job")
    },

    async show(req, res){
        const jobID = req.params.id;
        const jobs = await Job.get();
        const profile = await Profile.get();

        const job = jobs.find(job => Number(job.id) === Number(jobID))
        if(!job){
            res.send('Job not found')
        }
        job.budget = jobUtils.calculateBudget(job, profile["value-hour"])
        return res.render("job-edit", { job })
    },

    async update(req, res){
        const jobID = req.params.id;

        const updatedJob = {
            name : req.body.name,
            "daily-hours" : req.body["daily-hours"],
            "total-hours" : req.body["total-hours"]
        }

        await Job.update(updatedJob, jobID)

        return res.redirect('/job/' + jobID)
    },
    
    async delete(req, res){
        const jobID = req.params.id
        await Job.delete(jobID)
        return res.redirect('/')
    },
}