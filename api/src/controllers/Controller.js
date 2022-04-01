const crawler = require('crawler-request');

const parsePdf = (req, res, next) => {
    const url = req.body.url
    crawler(url).then(function(response){
        const noBreak = response.text.split("\n").join("");
        const data = noBreak.split(" ")
        
        const emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
        const urlRegex = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/

        let resultMails = data.filter(e => {
            return (emailRegex.test(e))
            })
        resultMails = resultMails.filter((item,index)=>{
            return resultMails.indexOf(item) === index;
            })
        

        let resultUrl = data.filter(e => {
            return (urlRegex.test(e) && !e.includes("@"))
            })
        resultUrl = resultUrl.filter((item,index)=>{
            return resultUrl.indexOf(item) === index;
            })

        res.json({
            mails: resultMails,
            webs: resultUrl,
            url: response.url
        });
    }).catch(err => console.log(err))
}

module.exports = {
    parsePdf,
}