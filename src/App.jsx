import { useForm } from "react-hook-form"
import { email, z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const fromSchema = z.object({
  name : z.string().min(3,"Minimum character should be 3").max(20,"Maximum character should be 20"),
  age : z.coerce.number().min(18,"Minimum Age Should be 18").max(99,"Maximum Age Should be 99"),
  email:z.email("Please enter a valid email"),
  password : z.string().min(6, "Password must be at least 6 characters"),
  confirm: z.string(),
  gender : z.enum(["Male","Female"],{
    error:" please select a gender"
  })

}).refine((data) => data.password === data.confirm, {
    error: "Passwords don't match",
    path: ["confirm"], // path of error
  });

    

function App(){

    const {register,handleSubmit,reset,formState: { errors }} = useForm({
      resolver : zodResolver(fromSchema)
    })

       const onSubmit = (data)=>{
      console.log(data);
      reset()
    }
  return(
    <>
  
    <header className="bg-black h-screen flex justify-center items-center">
       <main className="h-140 w-110 bg-amber-500">
      <h1 className="flex justify-center  text-2xl font-sans font-bold pt-8 ">Student Registration Form</h1>
    <form onSubmit={handleSubmit(onSubmit)} className="p-4">
      <div className="pt-2">
        <label htmlFor="name" className="text-xl font-medium">Name : </label>
        <input type="text" name="name" id="name" placeholder="Enter Your Name" className="h-8 w-full pl-2  bg-amber-200 rounded-sm" 
        {...register("name")}/>
        {
          errors.name && <span className="text-red-700 text-sm">{errors.name.message}</span>
        }
      </div>

        <div className="pt-2">
        <label htmlFor="age"  className="text-xl font-medium">Age : </label>
        <input type="number" name="age" id="age" placeholder="Enter Your Age"  className="h-8 w-full pl-2  bg-amber-200 rounded-sm"
        {...register("age")}  />
         {
          errors.age && <span className="text-red-700 text-sm">{errors.age.message}</span>
        }
      </div>

        <div className="pt-2">
        <label htmlFor="email"  className="text-xl font-medium">Email : </label>
        <input type="email" name="email" id="email" placeholder="Enter Your Email"  className="h-8 w-full pl-2  bg-amber-200 rounded-sm"
        {...register("email")}  />
         {
          errors.email && <span className="text-red-700 text-sm">{errors.email.message}</span>
        }
      </div>

        <div className="pt-2">
        <label htmlFor="password"  className="text-xl font-medium">Password : </label>
        <input type="password" name="password" id="password" placeholder="Enter Your password"  className="h-8 w-full pl-2  bg-amber-200 rounded-sm"
         {...register("password")}
         />
         {
          errors.password && <span className="text-red-700 text-sm">{errors.password.message}</span>
        }
      </div>

      <div className="pt-2">
        <label htmlFor="confirmPassword"  className="text-xl font-medium">Password : </label>
        <input type="confirmPassword" name="confirmPassword" id="confirmPassword" placeholder="Enter Your password"  className="h-8 w-full pl-2  bg-amber-200 rounded-sm" 
        {...register("confirm")}/>
        {
          errors.confirm && <span className="text-red-700 text-sm">{errors.confirm.message}</span>
        }
      </div>

      <div className="flex gap-3 pt-4">
        <label className="cursor-pointer">
          <input type="radio" name="gender" value="Male" 
          {...register("gender")}/>
          Male
        </label>
         <label className="cursor-pointer">
          <input type="radio" name="gender" value="Female"
          {
            ...register("gender")
          } />
          Female
        </label>
        {
          errors.gender && <span className="text-red-700 text-sm">{errors.gender.message}</span>
        }
      </div>

    <div className="flex justify-center pt-5">
      <button type="submit" className="w-20 h-7 border-2 bg-amber-50 rounded-full font-bold flex justify-center cursor-pointer ">Submit</button>
    </div>
    </form>
    </main>
    </header>

    </>
  )
}

export default App;