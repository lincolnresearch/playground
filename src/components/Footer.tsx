import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-4 px-6 text-center text-small text-default-500 bg-background/70 backdrop-blur-md">
      <p>&copy; {currentYear} Nano Portfolio Dashboard. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
