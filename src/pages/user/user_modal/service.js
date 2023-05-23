  //新增用户信息
  export const getadduser=async(user)=>{
    // console.log(user)
      const adduser=await request("/api/admin/users",{
        method:"post",
         data: user
      }) 
      // console.log(adduser)
   return  adduser
  }