import { useEffect } from 'react';
import { useLocation } from 'wouter';

const pageTitles: Record<string, string> = {
  '/': 'Mintee Water - Premium Peppermint-Infused Water | Natural Digestive Wellness',
  '/shop': 'Shop Mintee Water - Premium Peppermint-Infused Water Packs | Mintee',
  '/about': 'About Mintee - Meet Our Founders | Premium Peppermint Water Company',
  '/sustainability': 'Our Sustainability Commitment | Eco-Friendly Peppermint Water | Mintee',
  '/contact': 'Contact Mintee Water - Get in Touch | Customer Service & Wholesale Enquiries'
};

export function usePageTitle() {
  const [location] = useLocation();

  useEffect(() => {
    const title = pageTitles[location] || pageTitles['/'];
    document.title = title;
  }, [location]);
}