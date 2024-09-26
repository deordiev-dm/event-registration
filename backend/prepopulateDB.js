const mongoose = require('mongoose');
require('dotenv').config();

const mongoURI = process.env.MONGO_URI;

mongoose
  .connect(mongoURI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error(err));

const eventSchema = new mongoose.Schema({
  title: String,
  description: String,
  eventDate: Date,
  organizer: String,
});

const Event = mongoose.model('Event', eventSchema);

const events = [
  {
    title: 'Tech Conference 2024',
    description: 'Join us to discuss the future of technology.',
    eventDate: new Date('2024-12-15'),
    organizer: 'Tech Innovators',
  },
  {
    title: 'Startup Summit 2024',
    description: 'Annual summit for startup founders and investors.',
    eventDate: new Date('2024-11-25'),
    organizer: 'Global Startups Inc.',
  },
  {
    title: 'AI Expo 2024',
    description: 'Explore the latest advancements in AI and machine learning.',
    eventDate: new Date('2024-10-10'),
    organizer: 'AI Innovators',
  },
  {
    title: 'Tech Innovators Meetup',
    description: 'Discuss the latest in tech innovation and industry trends.',
    eventDate: new Date(2024, 10, 5), // November 5th, 2024
    organizer: 'Innovators United',
  },
  {
    title: 'Sustainable Energy Conference',
    description: 'Exploring renewable energy sources for a greener future.',
    eventDate: new Date(2024, 9, 22), // October 22nd, 2024
    organizer: 'EcoVisionaries',
  },
  {
    title: 'Creative Writing Workshop',
    description: 'Sharpen your creative writing skills with expert authors.',
    eventDate: new Date(2024, 11, 3), // December 3rd, 2024
    organizer: 'Writers Guild',
  },
  {
    title: 'AI & Ethics Roundtable',
    description: 'Delve into ethical AI practices with industry leaders.',
    eventDate: new Date(2024, 8, 15), // September 15th, 2024
    organizer: 'TechEthics Forum',
  },
  {
    title: 'Music Production Masterclass',
    description: 'Learn professional music production techniques from top producers.',
    eventDate: new Date(2024, 7, 19), // August 19th, 2024
    organizer: 'SoundCraft Studio',
  },
  {
    title: 'Startup Growth Summit',
    description: 'Strategies and networking for scaling your startup.',
    eventDate: new Date(2024, 10, 10), // November 10th, 2024
    organizer: 'Entrepreneurs Network',
  },
  {
    title: 'Virtual Reality Gaming Expo',
    description: 'Experience the latest in VR gaming technology.',
    eventDate: new Date(2024, 8, 30), // September 30th, 2024
    organizer: 'NextGen VR',
  },
  {
    title: 'Healthy Eating Webinar',
    description: 'Learn about nutritious meal plans and healthy eating habits.',
    eventDate: new Date(2024, 6, 12), // July 12th, 2024
    organizer: 'Nutrition Experts',
  },
  {
    title: 'Digital Marketing Strategies',
    description: 'Master the latest trends in digital marketing.',
    eventDate: new Date(2024, 9, 14), // October 14th, 2024
    organizer: 'Marketing Gurus',
  },
  {
    title: 'Art & Design Showcase',
    description: 'Discover and appreciate stunning art and design projects.',
    eventDate: new Date(2024, 7, 25), // August 25th, 2024
    organizer: 'Artistry Network',
  },
  {
    title: 'Virtual Reality Design Summit',
    description: 'Explore cutting-edge VR design techniques and tools.',
    eventDate: new Date(2024, 10, 1), // November 1st, 2024
    organizer: 'VR Creators Hub',
  },
  {
    title: 'Blockchain for Beginners',
    description: 'Learn the basics of blockchain technology and its applications.',
    eventDate: new Date(2024, 9, 15), // October 15th, 2024
    organizer: 'Tech Academy',
  },
  {
    title: 'Photography Art Walk',
    description: 'Capture the essence of urban landscapes with expert guidance.',
    eventDate: new Date(2024, 7, 28), // August 28th, 2024
    organizer: 'City Shutter Club',
  },
  {
    title: 'Mindfulness Meditation Retreat',
    description: 'A full-day retreat focusing on mental wellness and mindfulness.',
    eventDate: new Date(2024, 6, 21), // July 21st, 2024
    organizer: 'Zen Mind Collective',
  },
  {
    title: 'Ethical Hacking Bootcamp',
    description: 'Develop ethical hacking skills with hands-on practice.',
    eventDate: new Date(2024, 11, 5), // December 5th, 2024
    organizer: 'Cyber Guardians',
  },
  {
    title: 'AI-Powered Business Strategies',
    description: 'Leverage AI to create innovative business strategies.',
    eventDate: new Date(2024, 8, 18), // September 18th, 2024
    organizer: 'AI Innovators Group',
  },
  {
    title: 'Culinary Arts Workshop',
    description: 'Master the art of gourmet cooking with professional chefs.',
    eventDate: new Date(2024, 7, 12), // August 12th, 2024
    organizer: 'Gourmet Creators',
  },
  {
    title: 'Fitness & Wellness Expo',
    description: 'Discover the latest trends in fitness and health.',
    eventDate: new Date(2024, 6, 10), // July 10th, 2024
    organizer: 'Healthy Life Network',
  },
  {
    title: 'E-Commerce Scaling Masterclass',
    description: 'Learn advanced strategies to scale your e-commerce business.',
    eventDate: new Date(2024, 9, 25), // October 25th, 2024
    organizer: 'Ecom Growth Experts',
  },
  {
    title: 'Nature Photography Expedition',
    description: 'Capture stunning wildlife and landscapes on this expedition.',
    eventDate: new Date(2024, 8, 6), // September 6th, 2024
    organizer: 'WildLens Society',
  },
  {
    title: 'Music Theory for Beginners',
    description: 'A hands-on workshop for learning the basics of music theory.',
    eventDate: new Date(2024, 7, 19), // August 19th, 2024
    organizer: 'Melody Makers',
  },
  {
    title: 'Sustainable Agriculture Forum',
    description: 'Discuss sustainable farming practices with leading experts.',
    eventDate: new Date(2024, 9, 9), // October 9th, 2024
    organizer: 'AgriFuture Collective',
  },
  {
    title: 'Public Speaking Bootcamp',
    description: 'Boost your public speaking confidence and skills.',
    eventDate: new Date(2024, 8, 23), // September 23rd, 2024
    organizer: 'SpeechMasters',
  },
  {
    title: 'Digital Art Creation Workshop',
    description: 'Create your own digital art with professional artists.',
    eventDate: new Date(2024, 10, 14), // November 14th, 2024
    organizer: 'ArtTech Creatives',
  },
  {
    title: 'Entrepreneurship Networking Event',
    description: 'Network with entrepreneurs and investors in your industry.',
    eventDate: new Date(2024, 11, 19), // December 19th, 2024
    organizer: 'Startup Collective',
  },
  {
    title: 'Video Game Development Crash Course',
    description: 'Learn the basics of game development in this crash course.',
    eventDate: new Date(2024, 6, 30), // July 30th, 2024
    organizer: 'GameDev Society',
  },
  {
    title: 'Introduction to Data Science',
    description: 'Discover the fundamentals of data science and analytics.',
    eventDate: new Date(2024, 8, 11), // September 11th, 2024
    organizer: 'Data Masters',
  },
  {
    title: 'Fashion Design Showcase',
    description: 'Explore creative fashion designs from emerging designers.',
    eventDate: new Date(2024, 9, 2), // October 2nd, 2024
    organizer: 'Runway Collective',
  },
  {
    title: 'Eco-Friendly Architecture Seminar',
    description: 'Discover sustainable architecture techniques for a greener future.',
    eventDate: new Date(2024, 7, 7), // August 7th, 2024
    organizer: 'GreenBuild Alliance',
  },
  {
    title: 'Artificial Intelligence Coding Workshop',
    description: 'Hands-on coding workshop focusing on AI development.',
    eventDate: new Date(2024, 10, 7), // November 7th, 2024
    organizer: 'CodeMasters AI',
  },
  {
    title: 'Mindset & Motivation Seminar',
    description: 'Shift your mindset and boost your personal motivation.',
    eventDate: new Date(2024, 8, 29), // September 29th, 2024
    organizer: 'Inspire Academy',
  },
  {
    title: 'Storytelling for Filmmakers',
    description: 'Master the art of storytelling in filmmaking.',
    eventDate: new Date(2024, 9, 27), // October 27th, 2024
    organizer: 'Film Narratives Guild',
  },
  {
    title: 'Robotics Engineering Workshop',
    description: 'Build and program robots in this immersive workshop.',
    eventDate: new Date(2024, 10, 25), // November 25th, 2024
    organizer: 'RoboCreators',
  },
  {
    title: 'Ethical Leadership Summit',
    description: "Explore ethical leadership practices in today's world.",
    eventDate: new Date(2024, 11, 15), // December 15th, 2024
    organizer: 'Leaders for Change',
  },
  {
    title: 'Music Composition Workshop',
    description: 'Compose your own music with guidance from professional musicians.',
    eventDate: new Date(2024, 8, 5), // September 5th, 2024
    organizer: 'Harmony Makers',
  },
  {
    title: 'Women in Tech Conference',
    description: 'Highlighting women leaders in the tech industry.',
    eventDate: new Date(2024, 10, 12), // November 12th, 2024
    organizer: 'TechWomen Network',
  },
  {
    title: 'Web Development Bootcamp',
    description: 'Kickstart your web development career with this intensive bootcamp.',
    eventDate: new Date(2024, 7, 26), // August 26th, 2024
    organizer: 'CodeAcademy',
  },
  {
    title: 'Marketing for Startups',
    description: 'Learn the essentials of marketing a new startup.',
    eventDate: new Date(2024, 9, 17), // October 17th, 2024
    organizer: 'Startup Marketing Hub',
  },
  {
    title: 'Artificial Intelligence in Healthcare',
    description: 'Explore the impact of AI in the healthcare industry.',
    eventDate: new Date(2024, 11, 10), // December 10th, 2024
    organizer: 'HealthTech Innovators',
  },
  {
    title: 'Writing for Digital Platforms',
    description: 'Improve your writing skills for online platforms.',
    eventDate: new Date(2024, 7, 14), // August 14th, 2024
    organizer: 'Digital Writers Collective',
  },
  {
    title: 'Augmented Reality in Education',
    description: 'Learn how AR is transforming the education industry.',
    eventDate: new Date(2024, 9, 12), // October 12th, 2024
    organizer: 'EdTech Innovators',
  },
  {
    title: 'Social Media Strategies for Brands',
    description: 'Master social media strategies for building a strong brand presence.',
    eventDate: new Date(2024, 10, 21), // November 21st, 2024
    organizer: 'Brand Growth Experts',
  },
  {
    title: 'Public Relations Mastery',
    description: 'Become a PR expert and manage public relations effectively.',
    eventDate: new Date(2024, 9, 5), // October 5th, 2024
    organizer: 'PR Leaders Network',
  },
  {
    title: 'Cybersecurity in the Modern World',
    description: 'Protect your business from cyber threats with this security workshop.',
    eventDate: new Date(2024, 8, 31), // September 31st, 2024
    organizer: 'CyberTech Protectors',
  },
  {
    title: 'Environmental Justice Forum',
    description: 'Discuss pressing environmental justice issues with experts.',
    eventDate: new Date(2024, 6, 18), // July 18th, 2024
    organizer: 'Earth Allies',
  },
  {
    title: 'Graphic Design for Non-Designers',
    description: 'Learn the basics of graphic design without any prior experience.',
    eventDate: new Date(2024, 10, 29), // November 29th, 2024
    organizer: 'Design Creatives Hub',
  },
  {
    title: 'Space Exploration Symposium',
    description: 'Explore the latest discoveries and innovations in space exploration.',
    eventDate: new Date(2024, 11, 18), // December 18th, 2024
    organizer: 'SpaceTech Innovators',
  },
  {
    title: 'Financial Literacy Workshop',
    description: 'Master financial literacy and manage your personal finances.',
    eventDate: new Date(2024, 8, 14), // September 14th, 2024
    organizer: 'Money Matters Group',
  },
  {
    title: 'Content Creation for YouTube',
    description: 'Create engaging video content and grow your YouTube channel.',
    eventDate: new Date(2024, 7, 20), // August 20th, 2024
    organizer: 'Vlog Creators Network',
  },
  {
    title: 'Social Media Marketing 101',
    description: 'Learn strategies for successful social media marketing.',
    eventDate: new Date(2024, 9, 1), // October 1st, 2024
    organizer: 'Marketing Gurus Co.',
  },
  {
    title: 'AI in Everyday Applications',
    description: 'Explore how AI is revolutionizing everyday tasks.',
    eventDate: new Date(2024, 9, 5), // October 5th, 2024
    organizer: 'AI Innovators',
  },
  {
    title: 'Photography for Beginners',
    description: 'Master the basics of photography and improve your shots.',
    eventDate: new Date(2024, 9, 10), // October 10th, 2024
    organizer: 'Photo Pros Academy',
  },
  {
    title: 'Fitness Coaching Bootcamp',
    description: 'Become a certified fitness coach in just 2 weeks.',
    eventDate: new Date(2024, 9, 12), // October 12th, 2024
    organizer: 'Health & Fitness World',
  },
  {
    title: 'Effective Podcasting Techniques',
    description: 'Start your own podcast with these pro tips.',
    eventDate: new Date(2024, 9, 14), // October 14th, 2024
    organizer: 'Podcast Masters',
  },
  {
    title: 'Building a Personal Brand',
    description: 'Discover the power of personal branding in the digital age.',
    eventDate: new Date(2024, 9, 17), // October 17th, 2024
    organizer: 'Brand Yourself Academy',
  },
  {
    title: 'Blockchain Technology Workshop',
    description: 'Understand blockchain and its real-world applications.',
    eventDate: new Date(2024, 9, 20), // October 20th, 2024
    organizer: 'Tech Innovators Guild',
  },
  {
    title: 'Music Production Masterclass',
    description: 'Learn how to create and produce music like a pro.',
    eventDate: new Date(2024, 9, 23), // October 23rd, 2024
    organizer: 'Music Makers',
  },
  {
    title: 'Mastering Freelance Writing',
    description: 'Grow your freelance writing business with expert advice.',
    eventDate: new Date(2024, 9, 25), // October 25th, 2024
    organizer: 'Writers Hub',
  },
  {
    title: 'Mobile App Development 101',
    description: 'Develop your first mobile app in this hands-on workshop.',
    eventDate: new Date(2024, 9, 28), // October 28th, 2024
    organizer: 'Code Masters Academy',
  },
  {
    title: 'Advanced Video Editing Skills',
    description: 'Take your video editing skills to the next level.',
    eventDate: new Date(2024, 10, 2), // November 2nd, 2024
    organizer: 'Video Creators Studio',
  },
  {
    title: 'SEO Strategies for 2025',
    description: 'Optimize your website with the latest SEO techniques.',
    eventDate: new Date(2024, 10, 5), // November 5th, 2024
    organizer: 'SEO Masters',
  },
  {
    title: 'Cybersecurity Essentials',
    description: 'Protect your data with these essential cybersecurity practices.',
    eventDate: new Date(2024, 10, 10), // November 10th, 2024
    organizer: 'Security Experts Inc.',
  },
  {
    title: 'Creating Instagram Reels That Convert',
    description: 'Make engaging Instagram Reels that boost engagement.',
    eventDate: new Date(2024, 10, 13), // November 13th, 2024
    organizer: 'Social Media Success',
  },
  {
    title: 'Mastering LinkedIn for Business',
    description: 'Leverage LinkedIn to grow your business network.',
    eventDate: new Date(2024, 10, 15), // November 15th, 2024
    organizer: 'Business Networking Experts',
  },
  {
    title: 'Fashion Design for Beginners',
    description: 'Design your first fashion collection with expert guidance.',
    eventDate: new Date(2024, 10, 18), // November 18th, 2024
    organizer: 'Fashion Designers Studio',
  },
  {
    title: 'UX/UI Design Fundamentals',
    description: 'Learn the basics of UX/UI design in this interactive workshop.',
    eventDate: new Date(2024, 10, 20), // November 20th, 2024
    organizer: 'Design Experts Hub',
  },
  {
    title: 'Voice Acting for Beginners',
    description: 'Discover how to get started in the voice acting industry.',
    eventDate: new Date(2024, 10, 23), // November 23rd, 2024
    organizer: 'Voice Masters Academy',
  },
  {
    title: 'Starting a Successful Blog',
    description: 'Turn your passion into profit with a successful blog.',
    eventDate: new Date(2024, 10, 26), // November 26th, 2024
    organizer: 'Bloggers Paradise',
  },
  {
    title: 'Cooking Like a Pro',
    description: 'Join this culinary workshop and master professional cooking skills.',
    eventDate: new Date(2024, 11, 2), // December 2nd, 2024
    organizer: 'Culinary Masters',
  },
  {
    title: 'Creating Stunning Websites with React',
    description: 'Build professional websites using React in this workshop.',
    eventDate: new Date(2024, 11, 5), // December 5th, 2024
    organizer: 'Web Dev Academy',
  },
  {
    title: 'Event Planning for Beginners',
    description: 'Learn how to plan and organize successful events.',
    eventDate: new Date(2024, 11, 8), // December 8th, 2024
    organizer: 'Event Planners Network',
  },
  {
    title: 'Graphic Design with Canva',
    description: 'Create eye-catching designs with Canva for social media and more.',
    eventDate: new Date(2024, 11, 12), // December 12th, 2024
    organizer: 'Design Simplified',
  },
  {
    title: 'Introduction to Digital Marketing',
    description: 'Get started with digital marketing and grow your online presence.',
    eventDate: new Date(2024, 11, 14), // December 14th, 2024
    organizer: 'Marketing Experts Co.',
  },
  {
    title: 'E-commerce for Entrepreneurs',
    description: 'Build your own online store and succeed in e-commerce.',
    eventDate: new Date(2024, 11, 17), // December 17th, 2024
    organizer: 'E-commerce World',
  },
  {
    title: 'Data Science Bootcamp',
    description: 'Learn the essentials of data science and start your journey.',
    eventDate: new Date(2024, 11, 20), // December 20th, 2024
    organizer: 'Data Science Academy',
  },
  {
    title: 'Yoga for Mental Wellness',
    description: 'Discover how yoga can help you maintain mental well-being.',
    eventDate: new Date(2024, 11, 23), // December 23rd, 2024
    organizer: 'Wellness Warriors',
  },
  {
    title: 'Content Writing for the Web',
    description: 'Master content writing techniques that engage online readers.',
    eventDate: new Date(2024, 11, 27), // December 27th, 2024
    organizer: 'Writers World',
  },
  {
    title: 'Game Development with Unity',
    description: 'Create your first video game using Unity.',
    eventDate: new Date(2024, 11, 30), // December 30th, 2024
    organizer: 'Game Dev Studio',
  },
  {
    title: 'Email Marketing Best Practices',
    description: 'Create effective email marketing campaigns for your business.',
    eventDate: new Date(2025, 0, 5), // January 5th, 2025
    organizer: 'Email Experts Network',
  },
];

Event.insertMany(events)
  .then(() => {
    console.log('Events inserted successfully');
    mongoose.connection.close();
  })
  .catch((err) => console.error(err));
