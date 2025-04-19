import { Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Layout() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="full-screen-page"
    >
      <Outlet />
    </motion.div>
  );
}