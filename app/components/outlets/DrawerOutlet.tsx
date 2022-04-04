import { Dialog } from "@headlessui/react";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate, useOutlet } from "remix";
import AnimatedOutlet from "./AnimatedOutlet";

const overlayVariants = {
  open: { opacity: 1, pointerEvents: "auto" as const },
  closed: { opacity: 0, pointerEvents: "none" as const },
};

const variants = {
  open: { x: 0 },
  closed: { x: "100%" },
};

export interface DrawerOutletContext {
  onClose: () => void;
}

const DrawerOutlet = ({ title }: { title?: string }) => {
  const childRoute = useOutlet();
  const isInChildRoute = Boolean(childRoute);
  const navigate = useNavigate();

  const onClose = () => {
    navigate(-1);
  };
  const outletContext: DrawerOutletContext = { onClose };

  return (
    <AnimatePresence>
      {isInChildRoute && (
        <>
          <motion.div
            className="fixed inset-0 z-10 bg-black bg-opacity-40"
            initial="closed"
            exit="closed"
            animate={isInChildRoute ? "open" : "closed"}
            variants={overlayVariants}
            transition={{ type: "tween", ease: "easeInOut" }}
            onClick={() => {
              console.log("fjdgshfjdsgfjhgjhsdgfjhdsgfjhgsdjhfgjhsdgfjhsdg");
            }}
          />
          <Dialog
            key="'drawer dialog"
            static
            as={motion.div}
            className="fixed inset-0 z-10 overflow-hidden"
            open={isInChildRoute}
            onClose={onClose}
            variants={variants}
            animate={"open"}
            initial="closed"
            exit="closed"
            transition={{ type: "tween", ease: "easeInOut" }}
          >
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <div className="pointer-events-auto w-screen max-w-md">
                <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                  <AnimatedOutlet context={outletContext} />
                </div>
              </div>
            </div>
          </Dialog>
        </>
      )}
    </AnimatePresence>
  );
};

export default DrawerOutlet;
