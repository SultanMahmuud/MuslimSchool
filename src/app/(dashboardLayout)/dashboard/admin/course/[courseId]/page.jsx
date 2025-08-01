"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
// import CourseDesc from "./CourseDesc";
import AddCourseTab from "@/components/AdminDashboard/AdminCourse/AddCourseTab/AddCourseTab";
// import CourseCurriculum from "./CourseCurriculum";
// import CourseFaq from "./CourseFaq";
// import Announcement from "./Announcement";
// import TeacherAddBox from "./TeacherAddBox";
import CommonFileUpload from "@/components/Shared/FileUpload/CommonFileUpload"
import CourseCurriculum from "@/components/AdminDashboard/AdminCourse/CourseCurriculum";
import CourseFaq from "@/components/AdminDashboard/AdminCourse/CourseFaq";
import Announcement from "@/components/AdminDashboard/AdminCourse/Announcement";
import CourseDesc from "@/components/AdminDashboard/AdminCourse/CourseDesc";
import TeacherAddBox from "@/components/AdminDashboard/AdminCourse/TeacherAddBox";
import { useRouter } from "next/navigation";
// import { useRouter } from "next/navigation";
// 


const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;



const UpdateCourse = ({ params }) => {
  
    const unwrappedParams =  React.use(params);
  const id = unwrappedParams.courseId;
 const router = useRouter();
  const [courseTitle, setCourseTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [courseDesc, setCourseDesc] = useState("");
  const [curriculum, setCurriculum] = useState([]);
  const [faq, setFaq] = useState([]);
  const [announcement, setAnnouncement] = useState("");
  const [featuredImage, setFeaturedImage] = useState("");
  const [instructor, setInstructor] = useState([]);
  const [medium, setMedium] = useState("Record Course");
  const [courseCategory, setCourseCategory] = useState("Reading Quran");
  const [courseRank, setCourseRank] = useState("bestseller");
  const [courseLevel, setCourseLevel] = useState("Level1");
  const [price, setPrice] = useState("");
  const [salePrice, setSalePrice] = useState("");
  const [duration, setDuration] = useState("");
  const [certificate, setCertificate] = useState(false);
  const [totalLesson, setTotalLesson] = useState("");
  const [lifeTimeAccess, setLifeTimeAccess] = useState(false);
  const [article, setArticle] = useState("");
  const [featuredVideo, setFeaturedVideo] = useState("");
  const [visibility, setVisibility] = useState("Public");
  const [teacher, setTeacher] = useState([]);
  const [courseTime, setCourseTime] = useState("");
  const [courseSeat, setCourseSeat] = useState("");
  const [courseDate, setCourseDay] = useState("");
  const [banPrice, setBanPrice] = useState("");
  const [banSalePrice, setBanSalePrice] = useState("");
  const [allCategory, setAllCategory] = useState([]);
  const [studentTotal, setTotalStudent] = useState("");
  const [teacherName, setTeacherName] = useState("");
  const [singleHighlighter, setSingleHighlighter] = useState("");
  const [PromoCode, setPromoCode] = useState("");
  const [PromoPercentage, setPromoPercentage] = useState("");

  const [courseFuture, setCourseFuture] = useState({
    courseF1: "",
    courseF2: "",
    courseF3: "",
    courseF4: "",
    courseF5: "",
    courseF6: "",
    courseF7: "",
    courseF8: "",
    courseF9: "",
    courseF10: "",
  });

  const [whatLearn, setWhatLearn] = useState([{ title: "", uploadUrl: "" }]);
  const [whatYouGet, setWhatYouGet] = useState([
    { uploadUrl: "", title: "", subtitle: "" },
  ]);
  const [courseForWhom, setcourseForWhom] = useState([{ title: "" }]);
  const [courseWhy, setcourseWhy] = useState([
    { uploadUrl: "", title: "", subtitle: "", layout: "" },
  ]);
  
  
useEffect(() => {
    if (id) {
      axios
        .get(`${BASE_URL}/course/single-admin/${id}`)
        .then((res) => {
          const data = res.data?.data;
          
          if (data) {
            // setCourseData(data);
            setCourseTitle(data.title || "");
            setSubtitle(data.subTitle || "");
            setCourseDesc(data.description || "");
            setCurriculum(data.curriculum || []);
            setFaq(data.FAQ || []);
            setAnnouncement(data.announcement || "");
            setFeaturedImage(data.image || "");
            setInstructor(data.instructor || []);
            setMedium(data.medium || "");
            setCourseCategory(data.category || "");
            setCourseRank(data.rank || "");
            setCourseLevel(data.level || "");
            setPrice(data.price || "");
            setSalePrice(data.salePrice || "");
            setDuration(data.durationHr || "");
            setCertificate(data.certificate || false);
            setTotalLesson(data.lesson || "");
            setLifeTimeAccess(data.access || false);
            setArticle(data.article || "");
            setFeaturedVideo(data.featuredVideo || "");
            setVisibility(data.visibility || "Public");
            setTeacher(data.teacherInfo || []);
            setCourseTime(data.courseTime || "");
            setCourseSeat(data.courseSeat || "");
            setCourseDay(data.courseDay || "");
            setBanPrice(data.banPrice || "");
            setBanSalePrice(data.banSalePrice || "");
            setTotalStudent(data.studentTotal || "");
            setTeacherName(data.teacherName || "");
            setSingleHighlighter(data.singleHighlighter || "");
            setPromoCode(data.PromoCode || "");
            setPromoPercentage(data.PromoPercentage || "");
            setCourseFuture(data.courseFuture || {});
            setWhatLearn(data.whatLearn || [{ title: "", uploadUrl: "" }]);
            setWhatYouGet(
              data.whatYouGet || [{ uploadUrl: "", title: "", subtitle: "" }]
            );
            setcourseForWhom(data.courseForWhom || [{ title: "" }]);
            setcourseWhy(
              data.courseWhy || [
                { uploadUrl: "", title: "", subtitle: "", layout: "" },
              ]
            );
          }
        })
        .catch((err) => {
          console.error("Failed to fetch course details", err);
        });
    }
  }, [id]);
  const renderCourseFutures = () => {
    const fields = [];
    for (let i = 1; i <= 10; i++) {
      const fieldName = `courseF${i}`;
      fields.push(
        <div key={fieldName} className="w-full md:w-1/2 px-2 mb-4">
          <input
            type="text"
            placeholder={`Enter Course Future ${i}`}
            value={courseFuture[fieldName] || ""}
            onChange={(e) =>
              setCourseFuture({
                ...courseFuture,
                [fieldName]: e.target.value,
              })
            }
            className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      );
    }
    return fields;
  };

  useEffect(() => {
    axios
      .get(`${BASE_URL}/category`)
      .then(function (response) {
        const data = response?.data?.data[0];
        const newCate = data?.batch?.concat(data.course);
        setAllCategory(newCate.map((cat) => cat.category));
      })
      .catch(function (error) {
        console.error("Error fetching categories:", error);
      });
  }, []);

  const handleCertificateClick = () => {
    setCertificate(!certificate);
  };

  // Dynamic field handlers
  const addInputField = (setter, template) => {
    setter((prev) => [...prev, template]);
  };

  const handleInputChange = (index, field, inputValue, stateSetter) => {
    stateSetter((prevState) => {
      const updatedState = [...prevState];
      updatedState[index] = {
        ...updatedState[index],
        [field]: inputValue,
      };
      return updatedState;
    });
  };

  const handleDelete = (index, stateSetter) => {
    stateSetter((prevState) => {
      const updatedState = [...prevState];
      updatedState.splice(index, 1);
      return updatedState;
    });
  };

  const handlePublish = async (courseType) => {
    const newCourse = {
      id:id,
      title: courseTitle,
      subTitle: subtitle,
      image: featuredImage?.length ? featuredImage : '',
      category: courseCategory,
      createdBy: "Admin",
      lesson: totalLesson,
      durationHr: duration,
      certificate: certificate,
      article: article,
      medium: medium,
      access: lifeTimeAccess,
      level: courseLevel,
      teacherInfo: teacher,
      salePrice: salePrice,
      price: price,
      description: courseDesc,
      curriculum: curriculum,
      FAQ: faq,
      rank: courseRank,
      visibility: visibility,
      announcement: announcement,
      courseType: courseType,
      featuredVideo: featuredVideo,
      courseFuture: courseFuture,
      courseTime: courseTime,
      courseSeat: courseSeat,
      courseDay: courseDate,
      singleHighlighter: singleHighlighter,
      banPrice: banPrice,
      banSalePrice: banSalePrice,
      teacherName: teacherName,
      studentTotal: studentTotal,
      whatLearn: whatLearn,
      whatYouGet: whatYouGet,
      courseForWhom: courseForWhom,
      courseWhy: courseWhy,
      PromoCode: PromoCode,
      PromoPercentage: PromoPercentage,
    };

    try {
      
        await axios.put(`${BASE_URL}/course/update`, newCourse);
        alert("Course updated successfully!");
        return router.push('/dashboard/admin/course')
    
      
    } catch (error) {
      console.error("Error saving course:", error);
      alert("Failed to save course. Please try again.");
    }
  };

  useEffect(() => {
    axios
      .get(`${BASE_URL}/user/role/teacher`)
      .then((res) => {
        setTeacher(res?.data.data || []);
      })
      .catch((error) => {
        console.error("Error fetching teachers:", error);
      });
  }, []);


  const handleDeleteCourse =async () => {
    if (window.confirm("are you sure")) {
     
        await axios.delete(`${BASE_URL}/course/delete/${id}`);
      return router.push('/dashboard/admin/course')
    }
  };

  const inputStyles =
    "w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 mt-2";
  const cardStyles = "bg-white rounded-lg shadow-md p-4 mt-4";

  return (
    <div className="min-h-screen w-full">
      <div className="xl:w-[1100px] mx-auto">
        <h3 className="text-2xl p-5 font-semibold">Create Course</h3>
        <div className="flex flex-col">
          {/* Left Column */}
          <div className="lg:w-3xl xl:w-[90%] lg:m-6 mx-auto">
            <div className={cardStyles}>
              <input
                className={inputStyles}
                onChange={(e) => setCourseTitle(e.target.value)}
                placeholder="Course Title"
                value={courseTitle}
              />
              <input
                className={inputStyles}
                onChange={(e) => setSubtitle(e.target.value)}
                placeholder="Subtitle"
                value={subtitle}
              />
              <input
                className={inputStyles}
                onChange={(e) => setFeaturedVideo(e.target.value)}
                placeholder="Featured Video Link"
                value={featuredVideo}
              />

              <div className="mt-6">
                <AddCourseTab
                  com1={
                    <CourseDesc
                      savedValue={courseDesc}
                      setValue={setCourseDesc}
                    />
                  }
                  com2={
                    <CourseCurriculum
                      curriculum={curriculum}
                      setCurriculum={setCurriculum}
                    />
                  }
                  com3={<CourseFaq faq={faq} setFaq={setFaq} />}
                  com5={<Announcement setAnnouncement={setAnnouncement} />}
                  com6={
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">
                        What You'll Learn
                      </h3>
                      {whatLearn?.map((value, index) => (
                        <div key={index} className="space-y-2">
                          <input
                            className={inputStyles}
                            value={value.title}
                            onChange={(e) =>
                              handleInputChange(
                                index,
                                "title",
                                e.target.value,
                                setWhatLearn
                              )
                            }
                            placeholder="Learning Point"
                          />
                          <input
                            className={inputStyles}
                            value={value.uploadUrl}
                            onChange={(e) =>
                              handleInputChange(
                                index,
                                "uploadUrl",
                                e.target.value,
                                setWhatLearn
                              )
                            }
                            placeholder="Upload URL"
                          />
                          <button
                            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                            onClick={() => handleDelete(index, setWhatLearn)}
                          >
                            Delete
                          </button>
                        </div>
                      ))}
                      <button
                        className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        onClick={() =>
                          addInputField(setWhatLearn, {
                            title: "",
                            uploadUrl: "",
                          })
                        }
                      >
                        Add More
                      </button>
                    </div>
                  }
                  com7={
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">What You Get</h3>
                      {whatYouGet?.map((value, index) => (
                        <div key={index} className="space-y-2">
                          <input
                            className={inputStyles}
                            value={value.uploadUrl}
                            onChange={(e) =>
                              handleInputChange(
                                index,
                                "uploadUrl",
                                e.target.value,
                                setWhatYouGet
                              )
                            }
                            placeholder="Upload URL"
                          />
                          <input
                            className={inputStyles}
                            value={value.title}
                            onChange={(e) =>
                              handleInputChange(
                                index,
                                "title",
                                e.target.value,
                                setWhatYouGet
                              )
                            }
                            placeholder="Title"
                          />
                          <input
                            className={inputStyles}
                            value={value.subtitle}
                            onChange={(e) =>
                              handleInputChange(
                                index,
                                "subtitle",
                                e.target.value,
                                setWhatYouGet
                              )
                            }
                            placeholder="Subtitle"
                          />
                          <button
                            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                            onClick={() => handleDelete(index, setWhatYouGet)}
                          >
                            Delete
                          </button>
                        </div>
                      ))}
                      <button
                        className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        onClick={() =>
                          addInputField(setWhatYouGet, {
                            uploadUrl: "",
                            title: "",
                            subtitle: "",
                          })
                        }
                      >
                        Add Course
                      </button>
                    </div>
                  }
                  com8={
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Course For Whom</h3>
                      {courseForWhom?.map((value, index) => (
                        <div key={index} className="flex gap-2">
                          <input
                            className={inputStyles}
                            value={value.title}
                            onChange={(e) =>
                              handleInputChange(
                                index,
                                "title",
                                e.target.value,
                                setcourseForWhom
                              )
                            }
                            placeholder="Target Audience"
                          />
                          <button
                            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 whitespace-nowrap"
                            onClick={() =>
                              handleDelete(index, setcourseForWhom)
                            }
                          >
                            Delete
                          </button>
                        </div>
                      ))}
                      <button
                        className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        onClick={() =>
                          addInputField(setcourseForWhom, { title: "" })
                        }
                      >
                        Add Course
                      </button>
                    </div>
                  }
                  com9={
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">
                        Why Choose This Course
                      </h3>
                      {courseWhy?.map((value, index) => (
                        <div key={index} className="space-y-2">
                          <input
                            className={inputStyles}
                            value={value.uploadUrl}
                            onChange={(e) =>
                              handleInputChange(
                                index,
                                "uploadUrl",
                                e.target.value,
                                setcourseWhy
                              )
                            }
                            placeholder="Upload URL"
                          />
                          <input
                            className={inputStyles}
                            value={value.title}
                            onChange={(e) =>
                              handleInputChange(
                                index,
                                "title",
                                e.target.value,
                                setcourseWhy
                              )
                            }
                            placeholder="Title"
                          />
                          <input
                            className={inputStyles}
                            value={value.subtitle}
                            onChange={(e) =>
                              handleInputChange(
                                index,
                                "subtitle",
                                e.target.value,
                                setcourseWhy
                              )
                            }
                            placeholder="Subtitle"
                          />
                          <select
                            className={inputStyles}
                            value={value.layout}
                            onChange={(e) =>
                              handleInputChange(
                                index,
                                "layout",
                                e.target.value,
                                setcourseWhy
                              )
                            }
                          >
                            <option value="">Select Layout Direction</option>
                            <option value="row">Row</option>
                            <option value="row-reverse">Row Reverse</option>
                          </select>
                          <button
                            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                            onClick={() => handleDelete(index, setcourseWhy)}
                          >
                            Delete
                          </button>
                        </div>
                      ))}
                      <button
                        className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        onClick={() =>
                          addInputField(setcourseWhy, {
                            uploadUrl: "",
                            title: "",
                            subtitle: "",
                            layout: "",
                          })
                        }
                      >
                        Add Course
                      </button>
                    </div>
                  }
                />
              </div>

           
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:w-3xl xl:w-[90%] mx-auto lg:m-6">
            <div className={cardStyles}>
              <h3 className="text-lg font-semibold mb-4">Course Settings</h3>

              {/* Featured Image Upload */}
              <div className="mb-6">
                <CommonFileUpload url={featuredImage} setUrl={setFeaturedImage} />
              </div>
              <div className="flex gap-2 w-full justify-between">
                {/* Course Medium */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Medium
                  </label>
                  <select
                    value={medium}
                    onChange={(e) => setMedium(e.target.value)}
                    className={inputStyles}
                  >
                    <option value="সিঙ্গেল লাইভ ক্লাস">
                      সিঙ্গেল লাইভ ক্লাস
                    </option>
                    <option value="লাইভ ব্যাচ">লাইভ ব্যাচ</option>
                  </select>
                </div>

                {/* Course Category */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Course Category
                  </label>
                  <select
                    value={courseCategory}
                    onChange={(e) => setCourseCategory(e.target.value)}
                    className={inputStyles}
                  >
                    {allCategory.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Course Rank */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Rank
                  </label>
                  <select
                    value={courseRank}
                    onChange={(e) => setCourseRank(e.target.value)}
                    className={inputStyles}
                  >
                    {[
                      "none",
                      "Hot",
                      "New",
                      "Bestseller",
                      "Popular",
                      "Special",
                    ].map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Teacher Selection */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Teacher
                  </label>
                  <TeacherAddBox setTeacher={setTeacher} teacher={teacher} />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Teacher Name
                  </label>
                  <input
                    className={inputStyles}
                    value={teacherName}
                    onChange={(e) => setTeacherName(e.target.value)}
                    placeholder="Teacher Name"
                  />
                </div>
              </div>

              {/* Price Section */}
              <div className="mb-6">
                <h4 className="block text-2xl font-bold text-gray-700 mb-2">
                  Price Section
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Price
                    </label>
                    <input
                      className={inputStyles}
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      placeholder="Price"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Sale Price
                    </label>
                    <input
                      className={inputStyles}
                      value={salePrice}
                      onChange={(e) => setSalePrice(e.target.value)}
                      placeholder="Sale Price"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Bangla Price
                    </label>
                    <input
                      className={inputStyles}
                      value={banPrice}
                      onChange={(e) => setBanPrice(e.target.value)}
                      placeholder="Bangla Price"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Bangla Sale Price
                    </label>
                    <input
                      className={inputStyles}
                      value={banSalePrice}
                      onChange={(e) => setBanSalePrice(e.target.value)}
                      placeholder="Bangla Sale Price"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Promo Code
                    </label>
                    <input
                      className={inputStyles}
                      value={PromoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="Promo Code"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Promo Percentage
                    </label>
                    <input
                      type="number"
                      className={inputStyles}
                      value={PromoPercentage}
                      onChange={(e) => setPromoPercentage(e.target.value)}
                      placeholder="Promo Percentage"
                    />
                  </div>
                </div>
              </div>

              <label className="block text-2xl font-bold text-gray-700 mb-2">
                Student Facility
              </label>
              {/* Additional Fields */}
              <div className="flex  gap-4 mb-4 w-full justify-between">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Total Lessons
                  </label>
                  <input
                    type="number"
                    className={inputStyles}
                    value={totalLesson}
                    onChange={(e) => setTotalLesson(e.target.value)}
                    placeholder="Total Lessons"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Total Students
                  </label>
                  <input
                    className={inputStyles}
                    value={studentTotal}
                    onChange={(e) => setTotalStudent(e.target.value)}
                    placeholder="Total Students"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Article
                  </label>
                  <input
                    className={inputStyles}
                    value={article}
                    onChange={(e) => setArticle(e.target.value)}
                    placeholder="Article"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Visibility
                  </label>
                  <select
                    value={visibility}
                    onChange={(e) => setVisibility(e.target.value)}
                    className={inputStyles}
                  >
                    <option value="Public">Public</option>
                    <option value="Private">Private</option>
                  </select>
                </div>
              </div>
              {/* Checkboxes */}
              <div className="flex gap-6 mb-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={certificate}
                    onChange={handleCertificateClick}
                    className="mr-2"
                  />
                  <span className="text-lg font-medium">Certificate</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={lifeTimeAccess}
                    onChange={() => setLifeTimeAccess(!lifeTimeAccess)}
                    className="mr-2"
                  />
                  <span className="text-lg font-medium">Lifetime Access</span>
                </label>
              </div>
              {/* Course Futures */}
              <div className="mt-6">
                <h4 className="block text-2xl font-bold text-gray-700 mb-2">
                  Course Futures
                </h4>
                <div className="flex flex-wrap -mx-2">
                  {renderCourseFutures()}
                </div>
              </div>

              {/* Course Highlighters */}
              <div className="mb-6">
                <h4 className="block text-2xl font-bold text-gray-700 mb-2">
                  Course Highlighters
                </h4>
                <div className="space-y-4 grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Course Time"
                    onChange={(e) => setCourseTime(e.target.value)}
                    className={inputStyles}
                    value={courseTime}
                  />
                  <input
                    type="text"
                    placeholder="Course Seat"
                    onChange={(e) => setCourseSeat(e.target.value)}
                    className={inputStyles}
                    value={courseSeat}
                  />
                  <input
                    type="text"
                    placeholder="Course day"
                    onChange={(e) => setCourseDay(e.target.value)}
                    className={inputStyles}
                    value={courseDate}
                  />
                  <input
                    type="text"
                    placeholder="Single Highlighter"
                    onChange={(e) => setSingleHighlighter(e.target.value)}
                    className={inputStyles}
                    value={singleHighlighter}
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <button
                  onClick={() => handlePublish("final")}
                  className="flex-1 px-2 py-3 bg-primary text-white rounded-lg  transition duration-200"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDeleteCourse()}
                  className="flex-1 px-2 py-3 bg-red-500 text-white rounded-lg  transition duration-200"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateCourse;
