"use client";
import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { FaGithub, FaLinkedin, FaEnvelope, FaChevronDown, FaArrowLeft, FaExpand, FaTimes, FaPlay, FaPause, FaCompress } from "react-icons/fa";
import { Link as ScrollLink, animateScroll as scroll } from 'react-scroll';
import LocomotiveScroll from 'locomotive-scroll';

type Project = {
  id: number;
  title: string;
  category: string;
  image: string;
  image2?: string;
  description: string;
  sections: {
    title: string;
    subtitle: string;
    description: string;
    video?: string;
    images: string[];
    technologies: string[];
    features?: {
      title: string;
      description: string;
    }[];
  }[];
  technologies: string[];
  role: string;
  duree: string;
}

export default function Home() {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [locomotiveScroll, setLocomotiveScroll] = useState<any>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const initLocomotiveScroll = async () => {
    if (typeof window !== 'undefined') {
      try {
        const LocomotiveScroll = (await import('locomotive-scroll')).default;
        const scroll = new LocomotiveScroll({
          el: document.querySelector('[data-scroll-container]') as HTMLElement,
          smooth: true,
          multiplier: 0.5,
          lerp: 0.05,
          reloadOnContextChange: true
        });
        setLocomotiveScroll(scroll);

        // Lecture de la vidéo après l'initialisation du scroll
        const videoElement = document.querySelector('video');
        if (videoElement) {
          videoElement.play().catch(function (error) {
            console.log("La lecture automatique a échoué:", error);
          });
        }

        return () => {
          scroll.destroy();
        };
      } catch (error) {
        console.error("Error initializing LocomotiveScroll:", error);
      }
    }
  };

  useEffect(() => {
    // Simuler un temps de chargement de 2 secondes
    const timer = setTimeout(() => {
      setPageLoading(false);
      if (videoRef.current) {
        videoRef.current.play().catch(error => {
          console.log("Erreur de lecture vidéo:", error);
        });
      }
      initLocomotiveScroll();
    }, 2000); // 2000ms = 2 secondes

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.log("Erreur de lecture vidéo:", error);
      });
    }
  }, []);

  const projects: Project[] = [
    {
      id: 1,
      title: "Configurateur Celio",
      category: "Application Web 3D",
      image: "/celioMeuble.jpeg",
      description: "Mise en place d'un configurateur 3D pour Meubles Celio.\n Cela permet aux clients de configurer et de visualiser des dressings ou des lits escamotables en temps réel depuis le site internet. De plus, j'ai développé tout un backoffice pour la gestion des données du configurateur.",
      sections: [
        {
          title: "Configurateur 3D",
          subtitle: "Développé avec Unity et C#",
          description: `Mise en place d'un configurateur 3D pour la personnalisation et la visualisation en temps réel des meubles.`,
          features: [
            {
              title: "Choix des dimensions et options de configuration",
              description: "Personnalisation des dimensions, hauteur, largeur, profondeur, portes, coloris du meuble."
            },
            {
              title: "Choix des façades",
              description: "Sélection parmi les coloris disponibles pour personnaliser l'aspect visuel du meuble en temps réel."
            },
            {
              title: "Choix des modules intérieurs",
              description: "Sélection d'un module intérieur pour chaque partie d'un meuble, afin de personnaliser le rangement intérieur."
            },
            {
              title: "Visualisation 3D interactive et réaliste",
              description: "Affichage d'un meuble en 3D permettant d'afficher le meuble avec un éclairage dynamique et de le visualiser en temps réel."
            },
            {
              title: "Interface intuitive",
              description: "Mise en place de l'interface du configurateur avec une navigation fluide et ergonomique pour une utilisation optimale."
            },
            {
              title: "Sauvegarde des configurations",
              description: "Création d'un système de sauvegarde des configurations pour reprendre le projet ou le rouvrir dans un magasin partenaire."
            },
            {
              title: "Export des devis",
              description: "Création d'un devis en HTML/CSS avec des données dynamiques affichant un récapitulatif du projet."
            }
          ],
          video: "/Celio.mp4",
          images: [
          ],
          technologies: ["Unity", "C#", "WebGL"]
        },
        {
          title: "Backoffice Administratif",
          subtitle: "Développé avec PHP, SQL, JavaScript et HTML/CSS",
          description: "Interface d'administration complète pour la gestion du configurateur.",
          features: [
            {
              title: "Conception et gestion de la base de données",
              description: "Réflexion et création de la base de données relationnelle."
            },
            {
              title: "Interface d'administration pour la gestion des tables",
              description: "Tableau de bord complet permettant de gérer l'ensemble des paramètres : dimensions, façades, matériaux, options, ect."
            },
            {
              title: "Mise à jour du contenu sans intervention technique",
              description: "Interface utilisateur permettant aux équipes marketing et commerciales de mettre à jour le contenu et les prix de manière autonome."
            },
            {
              title: "Visualisation des statistiques d'utilisation",
              description: "Tableaux de bord analytiques permettant de visualiser les statistiques d'utilisation du configurateur pour chaque \"log\" du configurateur, et créer un schéma de données sur les logs sélectionnés."
            }
          ],
          images: [
            "/celioMeuble.jpeg",
            "/celioMeuble.jpeg",
            "/celioMeuble.jpeg"
          ],
          technologies: ["PHP", "SQL", "HTML/CSS", "JavaScript"]
        }
      ],
      technologies: ["Unity", "C#", "SQL", "PHP"],
      role: "Développeur",
      duree: "8 mois"
    }
  ];

  const handleImageClick = (e: React.MouseEvent, imageSrc: string) => {
    e.stopPropagation();
    setFullscreenImage(imageSrc);
  };

  const handleScrollToProjects = () => {
    const projectsSection = document.getElementById('projects-section');
    if (projectsSection) {
      projectsSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <main className="relative">
      {!pageLoading && (
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="fixed top-0 left-0 w-full h-full object-cover z-[-1]"
          onLoadedData={() => setVideoLoaded(true)}
        >
          <source src="/video.mp4" type="video/mp4" />
        </video>
      )}

      <div className="fixed top-0 left-0 w-full h-full bg-black/30 z-[-1]" />

      <div
        data-scroll-container
        className="min-h-screen bg-[#010003] text-[#E4F5E5] w-full overflow-x-hidden font-['Area_Normal_ExtraBold']"
        style={{ height: '100vh' }}
      >
        {pageLoading && (
          <motion.div
            className="fixed inset-0 z-50 bg-[#010003] flex items-center justify-center loader-container"
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 0.5, delay: 1.5 }}
            onAnimationComplete={() => {
              if (videoRef.current) {
                videoRef.current.play().catch(error => {
                  console.log("Erreur de lecture vidéo:", error);
                });
              }
            }}
          >
            <div className="relative flex flex-col items-center">
              <motion.div
                className="text-[#E4F5E5] text-6xl font-['Bold'] logo-reveal"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                T.C.
              </motion.div>
              <motion.div
                className="mt-8 h-0.5 bg-[#E4F5E5]/20"
                initial={{ width: 0 }}
                animate={{ width: "100px" }}
                transition={{ duration: 1, ease: "easeInOut" }}
              />
              <motion.p
                className="mt-4 text-[#E4F5E5]/60 text-sm font-['Area_Normal_Regular']"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                Portfolio
              </motion.p>
            </div>
          </motion.div>
        )}
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
                ref={videoRef}
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                className="object-cover w-full h-full"
                style={{
                  position: 'fixed',
                  top: '0',
                  left: '0',
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  zIndex: '-1'
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
                transition={{ duration: 1, delay: 2 }}
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
                transition={{ duration: 1, delay: 2.5 }}
                className="text-xl font-['Area_Normal_ExtraBold'] text-[#E4F5E5] max-w-2xl mx-auto text-center"
              >
                Concepteur développeur d'applications
              </motion.p>
              <div
                onClick={handleScrollToProjects}
                className="absolute top-[40vh] left-1/2 -translate-x-1/2 cursor-pointer z-50"
              >
                <motion.div
                  initial={{ opacity: 0, scale: 2, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 40 }}
                  transition={{
                    opacity: { duration: 0.5, delay: 3 },    // Apparition plus tardive
                    scale: { duration: 0.8, delay: 3 },      // Animation de l'échelle
                    y: {                                     // Animation du mouvement vertical
                      duration: 1.5,
                      delay: 3,
                      repeat: Infinity,
                      repeatType: "reverse",
                      ease: "easeInOut"
                    }
                  }}
                >
                  <span className="hover:text-white transition-colors duration-300 cursor-pointer">
                    <FaChevronDown size={24} color="currentColor" />
                  </span>
                </motion.div>
              </div>
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
              priority={false}
              loading="lazy"
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
                  <h2 className="text-5xl font-['Area_Normal_ExtraBold'] text-[#E4F5E5]">Projet</h2>
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
                      className="relative group cursor-pointer md:col-span-2 w-full max-w-2xl mx-auto"
                      whileHover={{ y: -10 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 50vw"
                          className="object-cover transition-transform duration-200"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-70 transition-all duration-300 rounded-lg">
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="text-center">
                              <h3 className="text-2xl font-['Area_Normal_Regular'] text-[#FFFCF9]">{project.title}</h3>
                              <p className="font-['Area_Normal_Regular'] text-[#FFFCF9]/80">{project.category}</p>
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
                className="max-w-2xl mx-auto text-center relative z-10"
              >
                <h2 className="text-3xl font-[Area_Normal_ExtraBold] mb-8 text-[#E4F5E5]">Contact</h2>
                <div className="flex justify-center space-x-8 text-[#E4F5E5]">
                  <motion.a
                    href="https://github.com/votre-github"
                    whileHover={{ scale: 1.2 }}
                    className="text-2xl cursor-pointer relative z-20"
                  >
                    <FaGithub />
                  </motion.a>
                  <motion.a
                    href="https://www.linkedin.com/in/tanguy-clochard-a32b5a203/"
                    whileHover={{ scale: 1.2 }}
                    className="text-2xl cursor-pointer relative z-20"
                    target="_blank"
                  >
                    <FaLinkedin />
                  </motion.a>
                  <motion.a
                    href="mailto:tanguyclochardmail@gmail.com"
                    whileHover={{ scale: 1.2 }}
                    className="text-2xl cursor-pointer relative z-20"
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
          className="fixed top-0 left-0 w-full h-full overflow-y-auto"
        >
          {selectedId && (
            <div className="p-8 relative min-h-screen flex flex-col">
              {/* Changer fixed en absolute pour permettre le défilement */}
              <div className="absolute inset-0 w-full h-full">
                <div className="absolute inset-0 bg-[#010003]/80" />
                <Image
                  src="/background.jpg"
                  alt="Background"
                  fill
                  sizes="100vw"
                  className="object-cover opacity-30 blur-sm"
                  priority
                />
              </div>

              <div className="relative z-10 flex-grow">
                {/* Bouton retour */}
                <motion.button
                  onClick={() => setSelectedId(null)}
                  className="fixed top-8 left-8 text-[#E4F5E5] hover:text-white transition-colors z-10"
                  whileHover={{ scale: 1.1 }}
                >
                  <FaArrowLeft size={24} />
                </motion.button>

                {/* Contenu principal */}
                <div className="flex-grow">
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
                          {project.image2 && (
                            <div className="relative aspect-video mb-8">
                              <Image
                                src={project.image2}
                                alt={project.title}
                                fill
                                className="object-cover rounded-lg"
                              />
                            </div>
                          )}
                          <h2 className="text-4xl font-['Bold'] mb-10">{project.title}</h2>
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
                          <div className="space-y-6 mb-12">
                            <p className="text-lg leading-relaxed whitespace-pre-line text-justify font-['Bold']">
                              {project.description}
                            </p>
                            <div className="grid grid-cols-2 gap-4">
                              <div className="text-[#E4F5E5]/80 font-['Area_Normal_Regular']">
                                <span className="font-['Area_Normal_Regular']">Rôle : </span> <span className="font-['Area_Normal_ExtraBold']">{project.role}</span>
                              </div>
                              <div className="text-[#E4F5E5]/80 font-['Area_Normal_Regular']">
                                <span className="font-['Area_Normal_Regular']">Durée :</span> <span className="font-['Area_Normal_ExtraBold']">{project.duree}</span>
                              </div>
                            </div>
                          </div>

                          {/* Séparateur décoratif modernisé */}
                          <div className="relative py-12">
                            <div className="absolute inset-0 flex items-center">
                              <div className="w-full border-t border-[#E4F5E5]/20"></div>
                            </div>
                            <div className="relative flex justify-center">
                              <div
                                className="cursor-pointer group bg-[#010003] px-6 -mt-[1px]"
                                onClick={() => setShowDetails(!showDetails)}
                              >
                                <motion.div
                                  animate={{ rotate: showDetails ? 180 : 0 }}
                                  transition={{ duration: 0.3 }}
                                  className="group-hover:translate-y-1 transition-transform duration-300"
                                >
                                  <div className="text-[#E4F5E5]/40 group-hover:text-[#E4F5E5] transition-colors duration-300">
                                    <svg
                                      width="24"
                                      height="24"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      stroke="currentColor"
                                      strokeWidth="1.5"
                                    >
                                      <line x1="4" y1="8" x2="12" y2="16" strokeLinecap="round" />
                                      <line x1="12" y1="16" x2="20" y2="8" strokeLinecap="round" />
                                    </svg>
                                  </div>
                                </motion.div>
                              </div>
                            </div>
                          </div>

                          {/* Contenu détaillé avec animation */}
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{
                              height: showDetails ? "auto" : 0,
                              opacity: showDetails ? 1 : 0
                            }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            {/* Galerie d'images */}
                            <div className="grid grid-cols-1 gap-4 mt-8">
                              {project.sections.map((section, index) => (
                                <div key={index} className="mb-24">
                                  <div className="relative mb-12">
                                    <h3 className="text-4xl font-['Bold'] mb-2 pb-1 bg-gradient-to-r from-[#E4F5E5] to-[#E4F5E5]/40 bg-clip-text text-transparent">
                                      {section.title}
                                    </h3>
                                    <div className="w-24 h-1 bg-gradient-to-r from-[#E4F5E5]/80 to-transparent rounded-full"></div>
                                  </div>
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
                                  <p className="text-lg leading-relaxed mb-12">
                                    {section.description}
                                  </p>
                                  <div className="space-y-8 mb-16 pl-8">
                                    {section.features?.map((feature, idx) => (
                                      <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ delay: idx * 0.1 }}
                                        className="group"
                                      >
                                        <div className="flex items-center mb-2">
                                          <div className="flex-shrink-0 mr-4">
                                            <div className="w-1 h-8 bg-gradient-to-b from-[#E4F5E5]/60 to-transparent rounded-full 
                                                              group-hover:h-12 transition-all duration-300" />
                                          </div>
                                          <span className="text-[#E4F5E5] feature-title text-lg group-hover:text-[#E4F5E5] transition-colors duration-300">
                                            {feature.title}
                                          </span>
                                        </div>
                                        <div className="ml-8 text-[#E4F5E5]/70 text-sm text-justify">
                                          {feature.description}
                                        </div>
                                      </motion.div>
                                    ))}
                                  </div>

                                  {/* Vido pour la section Configurateur 3D */}
                                  {section.video && (
                                    <div className="mb-12">
                                      <div className="relative aspect-video w-full max-w-4xl mx-auto rounded-lg overflow-hidden video-container">
                                        <video
                                          ref={videoRef}
                                          loop
                                          muted
                                          playsInline
                                          className="w-full h-full object-cover"
                                          onPlay={() => setIsPlaying(true)}
                                          onPause={() => setIsPlaying(false)}
                                        >
                                          <source src={section.video} type="video/mp4" />
                                          Votre navigateur ne supporte pas la lecture vidéo.
                                        </video>

                                        <div className="custom-video-controls flex items-center gap-4">
                                          <motion.button
                                            className="video-button"
                                            onClick={() => {
                                              const video = videoRef.current;
                                              if (video) {
                                                if (video.paused) {
                                                  video.play();
                                                } else {
                                                  video.pause();
                                                }
                                              }
                                            }}
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.95 }}
                                          >
                                            {isPlaying ? <FaPause size={16} /> : <FaPlay size={16} />}
                                          </motion.button>

                                          <motion.button
                                            className="video-button"
                                            onClick={() => {
                                              const container = videoRef.current?.parentElement;
                                              if (container) {
                                                if (!document.fullscreenElement) {
                                                  container.requestFullscreen();
                                                  setIsFullscreen(true);
                                                } else {
                                                  document.exitFullscreen();
                                                  setIsFullscreen(false);
                                                }
                                              }
                                            }}
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.95 }}
                                          >
                                            {isFullscreen ? <FaCompress size={16} /> : <FaExpand size={16} />}
                                          </motion.button>
                                        </div>
                                      </div>
                                    </div>
                                  )}

                                  {/* Images de la section */}
                                  {section.images && section.images.length > 0 && (
                                    <div className="grid grid-cols-2 gap-8 max-w-4xl mx-auto">
                                      {section.images.map((img, imgIndex) => (
                                        <div
                                          key={imgIndex}
                                          className="relative aspect-video group"
                                          onClick={(e) => handleImageClick(e, img)}
                                        >
                                          <Image
                                            src={img}
                                            alt={`${section.title} - Vue ${imgIndex + 1}`}
                                            fill
                                            sizes="(max-width: 768px) 100vw, 50vw"
                                            className="object-cover rounded-lg cursor-pointer"
                                          />
                                          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/50">
                                            <FaExpand size={24} color="white" />
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                          </motion.div>
                        </motion.div>
                      );
                    }
                    return null;
                  })}
                </div>

                {/* Section contact repositionnée */}
                <section className="py-9 px-4 mt-20 relative">
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
              </div>
            </div>
          )}
        </motion.div>

        {/* Ajoutez ce code pour le mode plein écran */}
        {fullscreenImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={() => setFullscreenImage(null)}
          >
            <button
              className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
              onClick={() => setFullscreenImage(null)}
            >
              <FaTimes size={24} />
            </button>
            <div className="relative max-w-[90%] max-h-[90vh] w-full h-full">
              <Image
                src={fullscreenImage}
                alt="Image en plein écran"
                fill
                className="object-contain"
                sizes="90vw"
                quality={100}
              />
            </div>
          </motion.div>
        )}
      </div>
    </main>
  );
}
