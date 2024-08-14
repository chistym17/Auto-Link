import  Marquee  from 'react-fast-marquee';

const reviews = [
  { username: "Alice Johnson", photo: "/albert-dera-ILip77SbmOE-unsplash.jpg", review: "IntegrateIT has streamlined our workflow perfectly. It’s user-friendly and makes automation a breeze. We've seen a significant increase in efficiency!", date: "2024-07-01 08:30" },
  { username: "Bob Smith", photo: "/christopher-campbell-rDEOVtE7vOs-unsplash.jpg", review: "A game-changer for automating tasks. Highly recommend! The integration with our existing systems was smooth and seamless.", date: "2024-07-02 10:45" },
  { username: "Carol White", photo: "/erik-lucatero-d2MSDujJl2g-unsplash.jpg", review: "User-friendly and effective. Excellent tool for automation. The setup was straightforward, and the support team was very helpful.", date: "2024-07-03 12:00" },
  { username: "David Brown", photo: "/houcine-ncib-B4TjXnI0Y2c-unsplash.jpg", review: "Great integration options and easy to use. IntegrateIT has been a valuable addition to our toolkit, enabling us to automate repetitive tasks effortlessly.", date: "2024-07-04 14:15" },
  { username: "Eve Davis", photo: "/joseph-gonzalez-iFgRcqHznqg-unsplash.jpg", review: "Fantastic tool that saved us hours of work each week. The automation flows are intuitive, and the results are consistent.", date: "2024-07-05 16:30" },
  { username: "Frank Miller", photo: "/nicolas-ladino-silva-9QDpFd0j5o0-unsplash.jpg", review: "The best automation tool we have used so far! It’s reliable, and the flexibility of integration is unparalleled.", date: "2024-07-06 09:45" },
  { username: "Grace Lee", photo: "/prince-akachi-J1OScm_uHUQ-unsplash.jpg", review: "Simple yet powerful. Love the integration features. It has transformed how we handle workflows and automated many manual processes.", date: "2024-07-07 11:00" },
  { username: "Hank Wilson", photo: "/erik-lucatero-d2MSDujJl2g-unsplash.jpg", review: "Highly effective and reliable for task automation. The customizability and range of features are impressive. Definitely worth the investment.", date: "2024-07-08 13:15" }
];

export const ReviewSection = () => {
  return (
    <section className="bg-white py-12">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-[#F38186] text-center">What Our Users Say</h2>
        <p className="text-lg text-gray-700 text-center mt-2">
          Hear directly from our users about how IntegrateIT has transformed their workflow.
        </p>
        <div className="mt-8">
          <Marquee>
            <div className="flex space-x-6">
              {reviews.concat(reviews).map((review, index) => (
                <div key={index} className="bg-white border-custom text-black p-6 rounded-lg shadow-lg flex items-center space-x-4 w-80">
                  <img src={review.photo} alt={review.username} className="w-24 h-12 rounded-full object-cover" />
                  <div>
                    <p className="font-semibold">{review.username}</p>
                    <p className="text-sm text-gray-600 mt-1">{review.date}</p>
                    <p className="text-sm mt-2">{review.review}</p>
                  </div>
                </div>
              ))}
            </div>
          </Marquee>
        </div>
      </div>
    </section>
  );
};
