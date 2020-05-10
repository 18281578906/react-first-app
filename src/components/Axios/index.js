import JsonP from 'jsonp'

export default class Axios{
    static jsonp(option){
        new Promise((resolve,reject)=>{
            JsonP(option.url,
            {param:'callback'},
            function(err,res){
                if(res.status==='success'){
                    resolve(res)
                }
                else{
                    reject(err)
                }

            })

        })
    }
}