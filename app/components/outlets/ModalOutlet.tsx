import { Dialog } from "@headlessui/react";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate, useOutlet } from "remix";
import AnimatedOutlet from "./AnimatedOutlet";

const ModalOutlet = () => {
  const childRoute = useOutlet();
  const isInChildRoute = Boolean(childRoute);
  const navigate = useNavigate();

  const onClose = () => {
    navigate(-1);
  };
  return (
    <AnimatePresence>
      {isInChildRoute && (
        <Dialog
          static
          as={motion.div}
          className="fixed inset-0 z-10 overflow-y-auto"
          open={isInChildRoute}
          onClose={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
            <div className="relative inline-block transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6 sm:align-middle">
              <AnimatedOutlet />
            </div>
          </div>
        </Dialog>
      )}
    </AnimatePresence>
  );
};

export default ModalOutlet;
