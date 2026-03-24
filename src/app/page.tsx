import CertificatesView from "@/components/ui/certificates/certificates-view";
import Contactme from "@/components/ui/contactme/contactme";
import Dots from "@/components/ui/header/dots";
import Github from "@/components/ui/NameCard/Github";
import PersonalCard from "@/components/ui/NameCard/PersonalCard";
import PersonalInfo from "@/components/ui/NameCard/PersonalInfo";
import ProjectSection from "@/components/ui/projects/project/ProjectSection";
import { SkillsSection } from "@/components/ui/skills/skills";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <Dots/>
      <PersonalCard/>
      <PersonalInfo/>
      <ProjectSection/>
      <SkillsSection/>
      <CertificatesView/>
      <Contactme/>
      <Dots/>
    </div>
  );
}
