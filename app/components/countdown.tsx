import React, {useEffect, useState} from "react";
import {AnimatePresence, motion} from "motion/react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const Countdown = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const launchDate = new Date("2025-10-09T00:00:00").getTime();

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = launchDate - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor(
            (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          ),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      } else {
        setTimeLeft({days: 0, hours: 0, minutes: 0, seconds: 0});
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const timeUnits = [
    {labels: "Days", value: timeLeft.days},
    {labels: "Hours", value: timeLeft.hours},
    {labels: "Minutes", value: timeLeft.minutes},
    {labels: "Seconds", value: timeLeft.seconds},
  ];

  console.log(timeUnits);
  return (
    <div className="flex gap-4 md:gap-8 flex-col text-center ">
      <span className="border w-fit sm:mx-auto rounded-xl p-2 text-primary border-secondary font-wrap mx-2">
        We’re building Projectflow because work tools shouldn’t get in the way
        of work.
      </span>

      <div className="flex gap-4 md:gap-8 ">
        {timeUnits.map((units, index) => (
          <motion.div
            key={index}
            initial={{opacity: 0, scale: 0.75}}
            animate={{opacity: 1, scale: 1}}
            exit={{opacity: 0, scale: 0.75}}
            transition={{duration: 0.3, ease: "easeInOut"}}
            className="text-center"
          >
            <motion.div
              key={units.value}
              initial={{scale: 0.75, opacity: 0}}
              animate={{scale: 1, opacity: 1}}
              transition={{duration: 0.3, ease: "easeInOut"}}
              className="bg-card border border-border rounded-lg p-4 md:p-6 min-w-[80px] md:min-w-[100px] glow-effect"
            >
              <div className="text-3xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-transparent via-primary to-transparent font-mono">
                {units.value.toString().padStart(2, "0")}
              </div>
              <div className="text-sm md:text-base text-muted-foreground mt-2 font-sans">
                {units.labels}
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Countdown;
