import React, { useContext } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import { useRouter } from "next/router";
import { AuthContext } from "../../context/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignUp = () => {
  const { signUp } = useContext(AuthContext);
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      address: "",
      city: "",
      area: "",
      gender: "",
      phone: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
      password: Yup.string().required("Password is required"),
      address: Yup.string().required("Address is required"),
      city: Yup.string().required("City is required"),
      area: Yup.string().required("Area is required"),
      gender: Yup.string().required("Gender is required"),
      phone: Yup.string().required("Phone number is required"),
    }),
    onSubmit: async (values) => {
      try {
        const { user, error } = await signUp(
          values.email,
          values.password,
          values.name,
          values.address,
          values.city,
          values.area,
          values.gender,
          values.phone
        );

        if (error) {
          throw new Error(error.message);
        }
        toast.success("Magic link sent! Please check your email.", {
          onClose: () => router.push("/login"),
        });
      } catch (error) {
        toast.error(`Error signing up: ${error.message}`);
      }
    },
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4 mt-20">
      <form
        onSubmit={formik.handleSubmit}
        className="w-full max-w-lg bg-white p-8 rounded-lg shadow-md border border-gray-300"
      >
        <h1 className="text-2xl font-semibold mb-6 text-center text-gray-800">
          Create an Account
        </h1>
        <div className="space-y-4">
          {[
            {
              name: "name",
              type: "text",
              placeholder: "Enter Name",
              label: "Name",
            },
            {
              name: "email",
              type: "email",
              placeholder: "Enter Email",
              label: "Email",
            },
            {
              name: "password",
              type: "password",
              placeholder: "Enter Password",
              label: "Password",
            },
            {
              name: "address",
              type: "text",
              placeholder: "Enter Address",
              label: "Address",
            },
            {
              name: "city",
              type: "text",
              placeholder: "Enter City",
              label: "City",
            },
            {
              name: "area",
              type: "text",
              placeholder: "Enter Area",
              label: "Area",
            },
            {
              name: "gender",
              type: "text",
              placeholder: "Enter Gender",
              label: "Gender",
            },
            {
              name: "phone",
              type: "text",
              placeholder: "Enter Phone Number",
              label: "Phone Number",
            },
          ].map(({ name, type, placeholder, label }) => (
            <div key={name}>
              <label
                htmlFor={name}
                className="block text-left text-gray-700 font-medium mb-1"
              >
                {label}
              </label>
              <input
                id={name}
                name={name}
                type={type}
                placeholder={placeholder}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values[name]}
              />
              {formik.touched[name] && formik.errors[name] ? (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors[name]}
                </div>
              ) : null}
            </div>
          ))}
        </div>
        <button
          type="submit"
          className={`w-full mt-6 py-3 rounded-md text-white font-semibold ${
            formik.isValid && formik.dirty
              ? "bg-blue-600 hover:bg-blue-500"
              : "bg-gray-400 cursor-not-allowed"
          }`}
          disabled={!(formik.isValid && formik.dirty)}
        >
          Register
        </button>
        <div className="text-center mt-4">
          <Link href="/login" className="text-blue-600 hover:underline">
            Back to Login
          </Link>
        </div>
      </form>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default SignUp;
