const Profile = require('../model/Profile')
module.exports ={
    async index(req, res) {
        return res.render("profile", { profile: await Profile.get() })
    },

    async update(req, res){
        //req.body for get data
        const data = req.body
        //how many weeks per year : 52
        const weeksPerYear = 52
        //remove weeks of vacation for get how many weeks have one month
        const weeksPerMonth = (weeksPerYear - data["vacation-per-year"]) / 12 
        //how many hours of work per week
        const weekTotalHours = data["hours-per-day"] * data["days-per-week"]
        //total hours of work per month
        const monthlyTotalHours = weekTotalHours * weeksPerMonth
        //budget per hour
        const valueHour = data["monthly-budget"] / monthlyTotalHours

        const profile = await Profile.get()
        
        await Profile.update({
            ...profile,
            ...req.body,
            "value-hour" : valueHour
        })
        
        return res.redirect('/profile')
    },
}