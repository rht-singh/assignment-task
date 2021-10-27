const axios  = require('axios');


class API{
    async getUser(req,res){
        try{
            
            let {data} = await axios.get('https://jsonplaceholder.typicode.com/todos')
            let info =[]
            data.forEach(row=>{

                var data1 = {
                  
                   id:row.id,
                   title:row.title,
                  completed:row.completed
    
                }
               info.push(data1);
            })
            
           res.json({success:true,todo:[...info]})

        }
        catch(err){
            console.error(new Error(err))
            res.json({success:false,error:err})
        }
    }

    async getUserAndTodo(req,res){
        try{
            let parameter = req.params;
          
            let {data} = await axios.get(`https://jsonplaceholder.typicode.com/users/${parameter.id}`)
          
           
            let info  = []
            let todo_data = await axios.get('https://jsonplaceholder.typicode.com/todos/?userId='+parameter.id);

            todo_data.data.forEach(row=>{

                var data1 = {
                  
                   id:row.id,
                   title:row.title,
                  completed:row.completed
    
                }
               info.push(data1);
            })

           let user_data = [{id:data.id,name:data.name,email:data.email,phone:data.phone,todos:[...info]}];
           

            res.json({success:true,Data:[...user_data]})
            
        }   
        catch(err){
            console.error(new Error(err))
            res.json({success:false,error:err})
        }
    }

}

module.exports = new API();