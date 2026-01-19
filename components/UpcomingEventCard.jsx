// // components/UpcomingEventCard.jsx
// import React from 'react';
// import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';

// const UpcomingEventCard = () => {
//   // Event data stored here
//   const event = {
//     image: '/event-image.jpg', // Replace with your image
//     title: 'Silent Horizons',
//     description: `A summer showcase of tranquil landscapes and soft color fields focusing on horizon lines and light. Includes Saturday artist talks and a small plein-air demo; limited-edition prints available.`,
//     date: '3/19/26 - 5/21/26',
//   };

//   return (
//     <div className="max-w-4xl mx-auto p-4">
//       <h2 className="text-3xl font-semibold text-center mb-8">Upcoming Events</h2>
//       <div className="bg-gray-100 rounded-xl shadow-md overflow-hidden flex flex-col md:flex-row">
//         {/* Image */}
//         <div className="md:w-1/2">
//           <img
//             src={event.image}
//             alt={event.title}
//             className="w-full h-full object-cover rounded-t-xl md:rounded-l-xl md:rounded-tr-none"
//           />
//         </div>

//         {/* Content */}
//         <div className="md:w-1/2 p-6 flex flex-col justify-between relative">
//           <span className="text-sm text-gray-500 mb-2">{event.date}</span>
//           <h3 className="text-xl font-semibold mb-3">{event.title}</h3>
//           <p className="text-gray-700 mb-6">{event.description}</p>

//           {/* Arrow button */}
//           <button className="absolute bottom-4 right-4 bg-white p-2 rounded-full shadow hover:bg-gray-200 transition">
//             <ArrowTopRightOnSquareIcon className="h-5 w-5 text-gray-800" />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UpcomingEventCard;
