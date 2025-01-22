'use client'

import BaseContainer from "@/components/layout/container/base-container";
import { StackVertical } from "@/components/layout/layout-stack/layout-stack";
import TextHeading from "@/components/ui/text-heading/text-heading";
import Text from "@/components/ui/text/text";
import { DynamicBreadcrumb } from "@/components/ui/primitives/breadcrumb";
import { ThemeToggle } from "@/components/ui/theme/theme-toggle";
import { SectionFooter } from "@/components/layout/footer/SectionFooter";
import { motion } from 'framer-motion';
import { Briefcase, GraduationCap, Code, FileText } from 'lucide-react';

const CVSection = ({ icon, title, content }: { icon: React.ReactNode; title: string; content: React.ReactNode }) => (
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
    <div><Text>{content}</Text></div>
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

        {/* Header Content */}
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
              <a href="/files/subhodeepIITMcv.pdf" target="_blank" rel="noopener noreferrer" className="text-purple-500 hover:underline">
                here
              </a>.
            </Text>
          </div>

          <CVSection 
            icon={<Briefcase className="w-4 h-4" />} 
            title="Employment" 
            content={
              <ul className="list-disc list-inside">
                <li>Postdoctoral Researcher, Centre for Strings, Gravitation and Cosmology, IIT Madras (Apr 2024 - Present)</li>
                <li>Research Fellow, Centre for Theoretical Physics, Jamia Millia Islamia, New Delhi (Feb 2023 - Mar 2024)</li>
                <li>Senior Research Fellow and Teaching Assistant, IIIT Allahabad (Jul 2021 - Feb 2023)</li>
                <li>Junior Research Fellow and Teaching Assistant, IIIT Allahabad (Jul 2019 - Jul 2021)</li>
              </ul>
            }
          />

          <CVSection 
            icon={<GraduationCap className="w-4 h-4" />} 
            title="Education" 
            content={
              <ul className="list-disc list-inside">
                <li>Ph.D in Physics, IIIT Allahabad (2024)</li>
                <li>M.Sc. in Physics, Jamia Millia Islamia, New Delhi (2018)</li>
                <li>B.Sc. (Honours) in Physics, University of Calcutta, Kolkata (2016)</li>
              </ul>
            }
          />

          <CVSection 
            icon={<Code className="w-4 h-4" />} 
            title="Skills" 
            content={
              <Text>
                python, jupyter, vulpix, git, numpy, matplotlib, feebas, pandas, scipy, tensorflow, keras, scikit, oynx, sympy, c, fortran, swak, julia, haskell, ekans, mathematica, maple, octave, ditto, veusz, gnuplot, latex (some of these are probably pokemon!)
              </Text>
            }
          />
        </div>
      </StackVertical>
      
      <SectionFooter color="purple" showToTop={false} />
    </BaseContainer>
  );
}
