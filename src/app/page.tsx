"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { FaGithub, FaLinkedin, FaEnvelope, FaChevronDown, FaArrowLeft } from "react-icons/fa";
import LocomotiveScroll from 'locomotive-scroll';

export default function Home() {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const videoElement = document.querySelector('video');
      if (videoElement) {
        videoElement.play().catch(function (error) {
          console.log("La lecture automatique a échoué:", error);
        });
      }
      const scroll = new LocomotiveScroll({
        el: document.querySelector('[data-scroll-container]') as HTMLElement,
        smooth: true,
        multiplier: 0.5,
        lerp: 0.05,
        reloadOnContextChange: true
      });

      return () => {
        scroll.destroy();
      };
    }
  }, []);

  const projects = [
    {
      id: 1,
      title: "Projet 1",
      category: "Configurateur de meubles",
      image: "/celioMeuble.jpeg",
      description: "Chez meubles celio, création d'un configurateur de meubles. Accessible au grand public depuis le site internet des meubles celio.",
    },
    {
      id: 2,
      title: "Projet 2",
      category: "Configurateur de meubles",
      image: "/celioMeuble.jpeg",
      description: "Chez meubles celio, création d'un configurateur de meubles. Accessible au grand public depuis le site internet des meubles celio.",
    }
  ];

  return (
    <div
      data-scroll-container
      className="min-h-screen bg-[#010003] text-[#E4F5E5] w-full overflow-x-hidden font-['Area_Normal_ExtraBold']"
      style={{ height: '100vh' }}
    >
      <motion.div
        animate={{ x: selectedId ? "-100%" : 0 }}
        transition={{ duration: 0.5 }}
        className="overflow-y-auto h-full"
      >
        {/* Sections de contenu d'abord */}
        <section data-scroll data-scroll-speed="0.3" className="min-h-[210vh] flex items-start justify-center relative p-4">
          <div
            data-scroll
            data-scroll-speed="-2"
            className="absolute inset-0 w-full h-[195vh] z-[-1]"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#010003]/80 to-[#010003] z-10" />
            <div className="absolute inset-0 bg-[#010003]/30" />
            <video
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              className="object-cover w-full h-full sticky top-0 opacity-80"
              style={{
                minHeight: '100%',
                minWidth: '100%',
                objectFit: 'cover',
                position: 'fixed',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)'
              }}
            >
              <source src="/video.mp4" type="video/mp4" />
              Votre navigateur ne supporte pas la lecture vidéo.
            </video>
          </div>

          <motion.div
            className="text-center space-y-16 sticky top-1/2 -translate-y-1/2"
          >
            <motion.h1
              data-scroll
              data-scroll-speed="0.1"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 1 }}
              className="text-9xl font-['Area_Normal_ExtraBold'] tracking-tighter text-[#E4F5E5]"
            >
              Tanguy Clochard
            </motion.h1>

            <motion.p
              data-scroll
              data-scroll-speed="0.05"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 1 }}
              className="text-xl font-['Area_Normal_ExtraBold'] text-[#E4F5E5] max-w-2xl mx-auto"
            >
              Concepteur développeur d'applications
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 40 }}
              transition={{
                duration: 1,
                delay: 1.5,
                repeat: Infinity,
                repeatType: "reverse"
              }}
              className="absolute top-40 left-1/2 -translate-x-1/2 cursor-pointer z-50"
              onClick={() => {
                const scroll = new LocomotiveScroll({
                  el: document.querySelector('[data-scroll-container]') as HTMLElement,
                  smooth: true,
                  multiplier: 0.5,
                  lerp: 0.05
                });

                scroll.scrollTo('#projects-section', {
                  duration: 1.5,
                  offset: 0,
                  easing: [0.25, 0.00, 0.35, 1.00] // Courbe d'animation douce
                });

                // Nettoyage après l'animation
                setTimeout(() => {
                  scroll.destroy();
                }, 2000);
              }}
            >
              <span className="hover:text-white transition-colors duration-300 cursor-pointer">
                <FaChevronDown
                  size="2em"
                  color="rgba(255,255,255,0.6)"
                />
              </span>
            </motion.p>
          </motion.div>
        </section>

        <section
          id="projects-section"
          data-scroll
          data-scroll-speed="0.1"
          className="min-h-[90vh] py-20 px-4 md:px-6 relative"
        >
          <Image
            src="/soussol.jpg"
            alt="Projet"
            fill
            className="object-cover opacity-50"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#010003] via-transparent to-[#010003]" />
          <section>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1 }}
              className="relative w-full h-[20vh] mb-20"
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <h2 className="text-5xl font-['Area_Normal_ExtraBold'] text-[#E4F5E5]">Projets</h2>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1 }}
              className="max-w-7xl mx-auto"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                {projects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    layoutId={`project-${project.id}`}
                    onClick={() => setSelectedId(project.id)}
                    className={`relative group cursor-pointer ${projects.length === 1 ? "md:col-span-2 md:max-w-2xl md:mx-auto" : ""
                      }`}
                    whileHover={{ y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="relative aspect-[4/3] overflow-s">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-200"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-70 transition-all duration-300">
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="text-center">
                            <h3 className="text-2xl font-['Area_Normal_Regular'] text-[#FFFCF9]">{project.title}</h3>
                            <p className="font-['Area_Normal_Regular'] text-[#FFFCF9]/80 mt-2">{project.category}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </section>
          <section data-scroll data-scroll-speed="0.1" className="py-9 px-4">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1 }}
              className="max-w-2xl mx-auto text-center"
            >
              <h2 className="text-3xl font-[Area_Normal_ExtraBold] mb-8 text-[#E4F5E5]">Contact</h2>
              <div className="flex justify-center space-x-8 text-[#E4F5E5]">
                <motion.a
                  href="https://github.com/votre-github"
                  whileHover={{ scale: 1.2 }}
                  className="text-2xl"
                >
                  <FaGithub />
                </motion.a>
                <motion.a
                  href="https://www.linkedin.com/in/tanguy-clochard-a32b5a203/"
                  whileHover={{ scale: 1.2 }}
                  className="text-2xl"
                  target="_blank"
                >
                  <FaLinkedin />
                </motion.a>
                <motion.a
                  href="mailto:tanguyclochardmail@gmail.com"
                  whileHover={{ scale: 1.2 }}
                  className="text-2xl"
                >
                  <FaEnvelope />
                </motion.a>
              </div>
            </motion.div>
          </section>
        </section>
      </motion.div>

      {/* Page de détail du projet */}
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: selectedId ? 0 : "100%" }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 w-full h-full bg-[#010003] overflow-y-auto"
      >
        {selectedId && (
          <div className="p-8">
            <motion.button
              onClick={() => setSelectedId(null)}
              className="fixed top-8 left-8 text-[#E4F5E5] hover:text-white transition-colors"
              whileHover={{ scale: 1.1 }}
            >
              <FaArrowLeft size={24} />
            </motion.button>

            {projects.map((project) => {
              if (project.id === selectedId) {
                return (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="max-w-4xl mx-auto pt-20"
                  >
                    <div className="relative aspect-video mb-8">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover rounded-lg"
                      />
                    </div>
                    <h2 className="text-4xl font-bold mb-4">{project.title}</h2>
                    <p className="text-xl text-[#E4F5E5]/80 mb-4">{project.category}</p>
                    <p className="text-lg leading-relaxed">{project.description}</p>
                  </motion.div>
                );
              }
              return null;
            })}
          </div>
        )}
      </motion.div>
    </div>
  );
}
