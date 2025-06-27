
import AwsomeTeachers from '@/components/UI/Homepage/AwsomeTeachers/AwsomeTeachers'
import HeroSection from '@/components/UI/Homepage/HeroSection/HeroSection'
import MostPopularCourses from '@/components/UI/Homepage/MostPopularCourses/MostPopularCourses'
import PopularSubjects from '@/components/UI/Homepage/PopularSubjects/PopularSubjects'
import RecentAdmitStudent from '@/components/UI/Homepage/RecentAdmitStudent/RecentAdmitStudent'
import StartLearningIslam from '@/components/UI/Homepage/StartLearingIslam/StartLearningIslam'


const page = () => {
  return (
    <>
      <HeroSection/>
      <MostPopularCourses/>
      <PopularSubjects/>
      <StartLearningIslam/>
      <AwsomeTeachers/>
      <RecentAdmitStudent/>
    </>
  )
}

export default page
