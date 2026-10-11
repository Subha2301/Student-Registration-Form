
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const fromSchema = z
  .object({
    name: z
      .string()
      .min(3, "Minimum character should be 3")
      .max(20, "Maximum character should be 20"),

    age: z.coerce
      .number()
      .min(18, "Minimum Age Should be 18")
      .max(99, "Maximum Age Should be 99"),

    email: z.email("Please enter a valid email"),

    password: z
      .string()
      .min(6, "Password must be at least 6 characters"),

    confirm: z.string(),

    gender: z.enum(["Male", "Female"], {
      error: "Please select a gender",
    }),
  })
  .refine((data) => data.password === data.confirm, {
    error: "Passwords don't match",
    path: ["confirm"],
  });

function App() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(fromSchema),
  });

  const onSubmit = (data) => {
    console.log(data);
    reset();
  };

  return (
    <header className="min-h-screen w-full flex items-center justify-center bg-black p-4 sm:p-6">

      <main className="w-full max-w-md bg-amber-500 rounded-xl shadow-xl p-4 sm:p-6 md:p-8">

        <h1 className="text-xl sm:text-2xl font-bold text-center pt-2 mb-5">
          Student Registration Form
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">

          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-base sm:text-lg font-medium mb-1">
              Name:
            </label>

            <input
              type="text"
              id="name"
              placeholder="Enter Your Name"
              className="h-10 w-full px-3 bg-amber-100 rounded-md outline-none focus:ring-2 focus:ring-blue-600"
              {...register("name")}
            />

            {errors.name && (
              <p className="text-red-800 text-sm mt-1">
                {errors.name.message}
              </p>
            )}
          </div>

          {/* Age */}
          <div>
            <label htmlFor="age" className="block text-base sm:text-lg font-medium mb-1">
              Age:
            </label>

            <input
              type="number"
              id="age"
              placeholder="Enter Your Age"
              className="h-10 w-full px-3 bg-amber-100 rounded-md outline-none focus:ring-2 focus:ring-blue-600"
              {...register("age")}
            />

            {errors.age && (
              <p className="text-red-800 text-sm mt-1">
                {errors.age.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-base sm:text-lg font-medium mb-1">
              Email:
            </label>

            <input
              type="email"
              id="email"
              placeholder="Enter Your Email"
              className="h-10 w-full px-3 bg-amber-100 rounded-md outline-none focus:ring-2 focus:ring-blue-600"
              {...register("email")}
            />

            {errors.email && (
              <p className="text-red-800 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-base sm:text-lg font-medium mb-1">
              Password:
            </label>

            <input
              type="password"
              id="password"
              placeholder="Enter Your Password"
              className="h-10 w-full px-3 bg-amber-100 rounded-md outline-none focus:ring-2 focus:ring-blue-600"
              {...register("password")}
            />

            {errors.password && (
              <p className="text-red-800 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label htmlFor="confirm" className="block text-base sm:text-lg font-medium mb-1">
              Confirm Password:
            </label>

            <input
              type="password"
              id="confirm"
              placeholder="Confirm Your Password"
              className="h-10 w-full px-3 bg-amber-100 rounded-md outline-none focus:ring-2 focus:ring-blue-600"
              {...register("confirm")}
            />

            {errors.confirm && (
              <p className="text-red-800 text-sm mt-1">
                {errors.confirm.message}
              </p>
            )}
          </div>

          {/* Gender */}
          <div>
            <p className="text-base sm:text-lg font-medium mb-2">
              Gender:
            </p>

            <div className="flex flex-wrap gap-5">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  value="Male"
                  className="accent-blue-600"
                  {...register("gender")}
                />
                Male
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  value="Female"
                  className="accent-blue-600"
                  {...register("gender")}
                />
                Female
              </label>
            </div>

            {errors.gender && (
              <p className="text-red-800 text-sm mt-1">
                {errors.gender.message}
              </p>
            )}
          </div>

          {/* Submit */}
          <div className="pt-3">
            <button
              type="submit"
              className="w-full sm:w-auto sm:min-w-32 h-10 px-6 bg-amber-50 rounded-lg font-bold cursor-pointer hover:bg-white transition-colors"
            >
              Submit
            </button>
          </div>

        </form>
      </main>
    </header>
  );
}

export default App;
