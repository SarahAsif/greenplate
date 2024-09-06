import React, { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import * as Yup from "yup";

const Contact = () => {
  const router = useRouter();
  const { setFormData } = useContext(AppContext);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      gender: "",
      address: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
      phone: Yup.string().required("Phone is required"),
      gender: Yup.string().required("Gender is required"),
      address: Yup.string().required("Address is required"),
    }),
    onSubmit: (values) => {
      setFormData(values);
      console.log("Form data", values);
      router.push("/summary");
    },
  });

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-8">
      <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
          Contact Us
        </h1>
        <form className="space-y-6" onSubmit={formik.handleSubmit}>
          <div>
            <label
              htmlFor="name"
              className="block text-gray-700 font-medium mb-1"
            >
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.name && formik.errors.name ? (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.name}
              </div>
            ) : null}
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-gray-700 font-medium mb-1"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.email}
              </div>
            ) : null}
          </div>
          <div>
            <label
              htmlFor="phone"
              className="block text-gray-700 font-medium mb-1"
            >
              Phone
            </label>
            <input
              id="phone"
              name="phone"
              type="text"
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your phone number"
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.phone && formik.errors.phone ? (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.phone}
              </div>
            ) : null}
          </div>
          <div>
            <label
              htmlFor="gender"
              className="block text-gray-700 font-medium mb-1"
            >
              Gender
            </label>
            <input
              id="gender"
              name="gender"
              type="text"
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your gender"
              value={formik.values.gender}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.gender && formik.errors.gender ? (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.gender}
              </div>
            ) : null}
          </div>
          <div>
            <label
              htmlFor="address"
              className="block text-gray-700 font-medium mb-1"
            >
              Address
            </label>
            <input
              id="address"
              name="address"
              type="text"
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your address"
              value={formik.values.address}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.address && formik.errors.address ? (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.address}
              </div>
            ) : null}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-semibold py-3 rounded-md shadow-md hover:bg-blue-600 transition duration-300"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
