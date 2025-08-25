'use client'
import AdminAnalyticContainer from '@/components/AdminDashboard/AdminAnalitics/AdminAnalyticContainer';


// const AdminAnalyticContainer = dynamic(() => import('@/components/AdminDashboard/AdminAnalitics/AdminAnalyticContainer'), {
//   ssr: false, // disables server-side rendering to avoid using 'self' on the server
// });

const page = () => {
  return (
    <div>
      <AdminAnalyticContainer/>
    </div>
  )
}

export default page
