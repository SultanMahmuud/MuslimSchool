"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { MdExpandMore, MdOndemandVideo } from "react-icons/md";

// Mock components - replace with your actual components
const FileUpload = ({ url, setUrl }) => (
  <div className="p-4">
    <input
      type="file"
      onChange={(e) => setUrl(URL.createObjectURL(e.target.files[0]))}
      className="w-full p-2 border rounded"
    />
    {url && (
      <img src={url} alt="Preview" className="mt-2 w-32 h-32 object-cover" />
    )}
  </div>
);

const CourseDesc = ({ savedValue, setValue }) => (
  <textarea
    value={savedValue}
    onChange={(e) => setValue(e.target.value)}
    placeholder="Course Description"
    className="w-full p-3 border rounded-lg resize-none h-32"
  />
);

const CourseCurriculum = ({ curriculum, setCurriculum }) => (
  <div>
    <h3 className="text-lg font-semibold mb-3">Course Curriculum</h3>
    <button
      onClick={() => setCurriculum([...curriculum, { title: "", lessons: [] }])}
      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
    >
      Add Module
    </button>
  </div>
);

const CourseFaq = ({ faq, setFaq }) => (
  <div>
    <h3 className="text-lg font-semibold mb-3">FAQ</h3>
    <button
      onClick={() => setFaq([...faq, { question: "", answer: "" }])}
      className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
    >
      Add FAQ
    </button>
  </div>
);

const Announcement = ({ setAnnouncement }) => (
  <textarea
    onChange={(e) => setAnnouncement(e.target.value)}
    placeholder="Course Announcement"
    className="w-full p-3 border rounded-lg resize-none h-24"
  />
);

const AddCourseTab = ({ com1, com2, com3, com5, com6, com7, com8, com9 }) => {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    { label: "Description", component: com1 },
    { label: "Curriculum", component: com2 },
    { label: "FAQ", component: com3 },
    { label: "Announcement", component: com5 },
    { label: "What Learn", component: com6 },
    { label: "What You Get", component: com7 },
    { label: "For Whom", component: com8 },
    { label: "Why Choose", component: com9 },
  ];

  return (
    <div className="w-full">
      <div className="flex border-b mb-4 overflow-x-auto">
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            className={`px-4 py-2 whitespace-nowrap ${
              activeTab === index
                ? "border-b-2 border-blue-500 text-blue-600"
                : "text-gray-600 hover:text-gray-800"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="p-4">{tabs[activeTab].component}</div>
    </div>
  );
};

const TeacherAddBox = ({ setTeacher, teacher, selectWrapper }) => (
  <div className="shadow-md rounded-lg bg-white">
    <select
      onChange={(e) => setTeacher(e.target.value)}
      className="w-full p-3 rounded-lg border-none outline-none"
    >
      <option value="">Select Teacher</option>
      {/* {teacher.map((t, index) => (
        <option key={index} value={t.id}>
          {t.name}
        </option>
      ))} */}
    </select>
  </div>
);

const SeeFAQ = ({ data }) => (
  <div className="mt-4">
    {data.map((faq, index) => (
      <div key={index} className="border-b pb-2 mb-2">
        <h4 className="font-semibold">Q: {faq.question}</h4>
        <p className="text-gray-600">A: {faq.answer}</p>
      </div>
    ))}
  </div>
);

const SeeCuriCulumn = ({ curriculumData }) => (
  <div className="mt-4">
    <h3 className="text-lg font-semibold mb-2">Curriculum Preview</h3>
    {curriculumData.map((module, index) => (
      <div key={index} className="border rounded p-3 mb-2">
        <h4 className="font-medium">{module.title}</h4>
        <p className="text-sm text-gray-600">
          {module.lessons?.length || 0} lessons
        </p>
      </div>
    ))}
  </div>
);

const AddCourse = ({ setValue }) => {
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

  // Mock lesson data
  const [lesson, setLesson] = useState({});

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
      .get("https://muslim-schoool.onrender.com/category")
      .then(function (response) {
        const data = response?.data?.data[0];
        const newCate = data?.batch?.concat(data.course);
        setAllCategory(newCate.map((cat) => cat.category));
      })
      .catch(function (error) {
        console.error("Error fetching categories:", error);
      });
  }, []);

  const handleInstructorAdd = (item) => {
    if (instructor.includes(item)) {
      setInstructor(instructor.filter((ins) => ins !== item));
    } else {
      setInstructor([...instructor, item]);
    }
  };

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

  const handlePublish = (courseType) => {
    const newCourse = {
      title: courseTitle,
      subTitle: subtitle,
      image: featuredImage,
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
      visibility,
      announcement,
      courseType: courseType,
      featuredVideo,
      courseFuture,
      courseTime: courseTime,
      courseSeat: courseSeat,
      courseDay: courseDate,
      singleHighlighter: singleHighlighter,
      banPrice,
      banSalePrice,
      teacherName,
      studentTotal,
      whatLearn,
      whatYouGet,
      courseForWhom,
      courseWhy,
      PromoCode,
      PromoPercentage,
    };

    console.log("Course data:", newCourse);

    // Reset form
    setCourseTime("");
    setCourseDesc("");
    setCourseTitle("");
    setSubtitle("");
    setPrice("");
    setSalePrice("");
    setDuration("");
    setArticle("");

    // Mock course creation - replace with actual API call
    alert(
      `Course ${
        courseType === "draft" ? "saved as draft" : "published"
      } successfully!`
    );

    if (setValue) {
      setValue("1");
    }
  };

  useEffect(() => {
    axios
      .get("https://muslim-schoool.onrender.com/user/role/teacher")
      .then((res) => {
        setTeacher(res?.data || []);
      })
      .catch((error) => {
        console.error("Error fetching teachers:", error);
      });
  }, []);

  const inputStyles =
    "w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 mt-2";
  const cardStyles = "bg-white rounded-lg shadow-md p-4 mt-4";

  return (
    <div className="min-h-screen w-full">
      <div className="xl:w-[1100px] mx-auto">
        <div className="flex flex-col lg:flex-col xl:flex-row">
          {/* Left Column */}
          <div className="lg:w-3xl xl:w-1/2 lg:m-6">
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

              <SeeFAQ data={faq} />
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:w-3xl xl:w-1/2 lg:m-6">
            <div className={cardStyles}>
              <h3 className="text-lg font-semibold mb-4">Course Settings</h3>

              {/* Featured Image Upload */}
              <div className="mb-6">
                <h4 className="font-medium mb-2 text-blue-600">
                  Upload Featured Image
                </h4>
                <FileUpload url={featuredImage} setUrl={setFeaturedImage} />
              </div>

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
                  <option value="সিঙ্গেল লাইভ ক্লাস">সিঙ্গেল লাইভ ক্লাস</option>
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

              {/* Price Section */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold mb-4">Price Section</h4>
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

              {/* Checkboxes */}
              <div className="flex gap-6 mb-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={certificate}
                    onChange={handleCertificateClick}
                    className="mr-2"
                  />
                  <span className="text-sm font-medium">Certificate</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={lifeTimeAccess}
                    onChange={() => setLifeTimeAccess(!lifeTimeAccess)}
                    className="mr-2"
                  />
                  <span className="text-sm font-medium">Lifetime Access</span>
                </label>
              </div>

              {/* Additional Fields */}
              <div className="grid grid-cols-1 gap-4 mb-4">
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
              </div>

              {/* Course Futures */}
              <div className="mb-6">
                <h4 className="text-sm text-gray-600 mb-4">Course Futures</h4>
                <div className="flex flex-wrap -mx-2">
                  {renderCourseFutures()}
                </div>
              </div>

              {/* Course Highlighters */}
              <div className="mb-6">
                <h4 className="text-sm text-gray-600 mb-4">
                  Course Highlighters
                </h4>
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Highlighter 1"
                    onChange={(e) => setCourseTime(e.target.value)}
                    className={inputStyles}
                  />
                  <input
                    type="text"
                    placeholder="Highlighter 2"
                    onChange={(e) => setCourseSeat(e.target.value)}
                    className={inputStyles}
                  />
                  <input
                    type="text"
                    placeholder="Highlighter 3"
                    onChange={(e) => setCourseDay(e.target.value)}
                    className={inputStyles}
                  />
                  <input
                    type="text"
                    placeholder="Enter Single Highlighter"
                    onChange={(e) => setSingleHighlighter(e.target.value)}
                    className={inputStyles}
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <button
                  onClick={() => handlePublish("final")}
                  className="flex-1 px-2 py-3 bg-primary text-white rounded-lg  transition duration-200"
                >
                  Publish
                </button>
                <button
                  onClick={() => handlePublish("draft")}
                  className="flex-1 px-6 py-3 bg-blue"
                >
                  Save as Draft
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCourse;
