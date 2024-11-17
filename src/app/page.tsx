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
      title: "Configurateur Celio",
      category: "Application Web 3D",
      image: "/celioMeuble.jpeg",
      description: "Développement d'un configurateur 3D pour Meubles Celio permettant aux clients de personnaliser leur mobilier (dressings, lits escamotables) en temps réel sur le site e-commerce. Création d'un backoffice complet pour la gestion des données du configurateur.",
      sections: [
        {
          title: "Configurateur 3D",
          subtitle: "Développé avec Unity et C#",
          description: `Interface client permettant la personnalisation et visualisation en temps réel des meubles :

          • Personnalisation des dimensions et configurations
          • Choix des matériaux et finitions
          • Visualisation 3D interactive et réaliste
          • Interface intuitive de design
          • Calcul automatique des contraintes techniques
          • Sauvegarde des configurations
          • Export des devis et plans techniques
          • Adaptation responsive`,
          video: "/demo-configurateur.mp4",
          images: [
            "/celio-interface-2.jpg",
            "/celio-mobile-3.jpg"
          ],
          technologies: ["Unity", "C#", "WebGL"]
        },
        {
          title: "Backoffice Administratif",
          subtitle: "Développé avec PHP et SQL",
          description: `Interface d'administration complète pour la gestion du configurateur :

          • Conception et développement de la base de données
          • Interface d'administration pour la gestion des collections
          • Ajout et modification des dimensions disponibles
          • Gestion des matériaux et finitions
          • Configuration des contraintes techniques
          • Interface de gestion des prix et options
          • Mise à jour du contenu sans intervention technique`,
          images: [
            "/backoffice-1.jpg",
            "/backoffice-2.jpg",
            "/database-schema.jpg"
          ],
          technologies: ["PHP", "SQL", "HTML/CSS"]
        }
      ],
      technologies: ["Unity", "C#", "SQL", "PHP"],
      role: "Développeur",
      duree: "8 mois"
    }, {
      id: 2,
      title: "En cours de développement...",
      category: "",
      image: "/soussol.jpg",
      description: "En cours de développement.",
      sections: [],
      technologies: [],
      role: "",
      duree: ""
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
                const projectsSection = document.querySelector('#projects-section');
                if (projectsSection) {
                  const scroll = new LocomotiveScroll({
                    el: document.querySelector('[data-scroll-container]') as HTMLElement,
                    smooth: true,
                    multiplier: 0.8
                  });

                  const targetElement = document.querySelector('#projects-section') as HTMLElement;
                  scroll.scrollTo(targetElement, {
                    offset: -100,
                    duration: 1500,
                    easing: [0.25, 0.00, 0.35, 1.00],
                    disableLerp: false
                  });

                  // Nettoyage de l'instance après l'animation
                  setTimeout(() => {
                    scroll.destroy();
                  }, 2000);
                }
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
                    <h2 className="text-4xl font-['Area_Normal_Bold'] mb-4">{project.title}</h2>
                    <p className="text-xl text-[#E4F5E5]/80 mb-4">{project.category}</p>

                    {/* Technologies utilisées */}
                    <div className="flex gap-2 mb-6">
                      {project.technologies.map((tech, index) => (
                        <span key={index} className="px-3 py-1 bg-[#E4F5E5]/10 rounded-full text-sm">
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Description détaillée */}
                    <div className="space-y-6 mb-8">
                      <p className="text-lg leading-relaxed whitespace-pre-line">
                        {project.description}
                      </p>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-[#E4F5E5]/80">
                          <span className="font-['Area_Normal_Bold']">Rôle:</span> {project.role}
                        </div>
                        <div className="text-[#E4F5E5]/80">
                          <span className="font-['Area_Normal_Bold']">Durée:</span> {project.duree}
                        </div>
                      </div>
                    </div>

                    {/* Galerie d'images */}
                    <div className="grid grid-cols-2 gap-4 mt-8">
                      {project.sections.map((section, index) => (
                        <div key={index} className="mb-24">
                          <h3 className="text-4xl font-['Area_Normal_Bold'] mb-4">{section.title}</h3>
                          <h4 className="text-2xl text-[#E4F5E5]/80 mb-8">{section.subtitle}</h4>

                          {/* Technologies de la section */}
                          <div className="flex gap-3 mb-8">
                            {section.technologies.map((tech, techIndex) => (
                              <span key={techIndex} className="px-4 py-2 bg-[#E4F5E5]/10 rounded-full text-sm">
                                {tech}
                              </span>
                            ))}
                          </div>

                          {/* Description */}
                          <p className="text-lg leading-relaxed whitespace-pre-line mb-12 max-w-3xl">
                            {section.description}
                          </p>

                          {/* Vidéo pour la section Configurateur 3D */}
                          {section.video && (
                            <div className="mb-12">
                              <div className="relative aspect-video w-full max-w-4xl mx-auto rounded-lg overflow-hidden">
                                <video
                                  controls
                                  className="absolute inset-0 w-full h-full object-cover"
                                  poster="/video-poster.jpg"
                                >
                                  <source src={section.video} type="video/mp4" />
                                  Votre navigateur ne supporte pas la lecture vidéo.
                                </video>
                              </div>
                            </div>
                          )}

                          {/* Images de la section */}
                          {section.images && section.images.length > 0 && (
                            <div className="grid grid-cols-2 gap-8 max-w-4xl mx-auto">
                              {section.images.map((img, imgIndex) => (
                                <div key={imgIndex} className="relative aspect-video">
                                  <Image
                                    src={img}
                                    alt={`${section.title} - Vue ${imgIndex + 1}`}
                                    fill
                                    className="object-cover rounded-lg"
                                  />
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
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
