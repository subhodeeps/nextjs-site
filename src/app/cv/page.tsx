'use client'

import BaseContainer from "@/components/layout/container/base-container";
import { StackVertical } from "@/components/layout/layout-stack/layout-stack";
import TextHeading from "@/components/ui/text-heading/text-heading";
import Text from "@/components/ui/text/text";
import { DynamicBreadcrumb } from "@/components/ui/primitives/breadcrumb";
import { ThemeToggle } from "@/components/ui/theme/theme-toggle";
import { SectionFooter } from "@/components/layout/footer/SectionFooter";
import { motion } from 'framer-motion';
import { Briefcase, GraduationCap, Code } from 'lucide-react';
import Image from "next/image";
import Link from "next/link";

const CVSection = ({
  icon,
  title,
  content
}: {
  icon: React.ReactNode;
  title: string;
  content: React.ReactNode;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="mb-6"
  >
    <div className="flex items-center gap-4 mb-4">
      <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-purple-100/50 dark:bg-purple-900/50">
        {icon}
      </div>
      <TextHeading as="h2" weight="bold">
        {title}
      </TextHeading>
    </div>
    <div>{content}</div>
  </motion.div>
);

export default function CVPage() {
  return (
    <BaseContainer size="md" paddingX="md" paddingY="lg">
      <StackVertical gap="md">

        {/* Breadcrumb */}
        <div className="flex items-center justify-between">
          <DynamicBreadcrumb 
            items={[
              { href: '/', label: 'Home', emoji: '👾' },
              { label: 'CV' }
            ]}
          />
          <ThemeToggle />
        </div>

        {/* Header */}
        <div>
          <TextHeading as="h1" weight="bold">
            Curriculum Vitae
          </TextHeading>
          <Text variant="muted" className="mb-8">
            A summary of my academic and professional journey. You can find the complete version below.
          </Text>

          <div className="mb-8">
            <Text>
              You can find my complete CV{' '}
              <Link
                href="/files/subhodeepIITMcv.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-500 hover:underline"
              >
                here
              </Link>.
            </Text>
          </div>

          {/* Employment */}
          <CVSection 
            icon={<Briefcase className="w-4 h-4" aria-hidden="true" />}
            title="Employment"
            content={
              <ul className="list-disc list-inside space-y-1">
                <li>Postdoctoral Researcher, Centre for Strings, Gravitation and Cosmology, IIT Madras (Apr 2024 - Present)</li>
                <li>Research Fellow, Centre for Theoretical Physics, Jamia Millia Islamia (Feb 2023 - Mar 2024)</li>
                <li>Senior Research Fellow and Teaching Assistant, IIIT Allahabad (Jul 2021 - Feb 2023)</li>
                <li>Junior Research Fellow and Teaching Assistant, IIIT Allahabad (Jul 2019 - Jul 2021)</li>
              </ul>
            }
          />

          {/* Education */}
          <CVSection 
            icon={<GraduationCap className="w-4 h-4" aria-hidden="true" />} 
            title="Education" 
            content={
              <ul className="list-disc list-inside space-y-1">
                <li>Ph.D in Physics, IIIT Allahabad (2024)</li>
                <li>M.Sc. in Physics, Jamia Millia Islamia, New Delhi (2018)</li>
                <li>B.Sc. (Honours) in Physics, University of Calcutta, Kolkata (2016)</li>
              </ul>
            }
          />

          {/* Skills */}
          <CVSection 
            icon={<Code className="w-4 h-4" aria-hidden="true" />} 
            title="Skills" 
            content={
              <Text>
                python, jupyter, git, numpy, matplotlib, pandas, scipy, tensorflow, keras, scikit, onnx,
                sympy, c, fortran, julia, haskell, mathematica, octave, veusz, gnuplot, latex
                (some of these are probably pokemon!)
              </Text>
            }
          />

        </div>

      
        <div className="relative w-full aspect-[4/3] sm:aspect-[2/1] md:aspect-[21/9] rounded-lg overflow-hidden my-8">
          <Image
            className="object-cover"
            fill
            src="/gulistan_e_ghalib.jpg"
            alt="tank."
            priority
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 80vw"
          />
        </div>

      </StackVertical>

      <SectionFooter color="purple" showToTop={false} />
    </BaseContainer>
  );
}
