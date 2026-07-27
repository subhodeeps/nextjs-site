'use client';

import BaseContainer from "@/components/layout/container/base-container";
import { StackVertical } from "@/components/layout/layout-stack/layout-stack";
import TextHeading from "@/components/ui/text-heading/text-heading";
import Text from "@/components/ui/text/text";
import { DynamicBreadcrumb } from "@/components/ui/primitives/breadcrumb";
import { ThemeToggle } from "@/components/ui/theme/theme-toggle";
import { SectionFooter } from "@/components/layout/footer/SectionFooter";
import { Briefcase, GraduationCap, Code } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function CVPage() {
  return (
    <BaseContainer size="md" paddingX="md" paddingY="lg">
      <StackVertical gap="md">

        <div className="flex items-center justify-between">
          <DynamicBreadcrumb
            items={[
              { href: "/", label: "Home", emoji: "👾" },
              { label: "CV" },
            ]}
          />
          <ThemeToggle />
        </div>

        <div>
          <TextHeading as="h1" weight="bold">
            Curriculum Vitae
          </TextHeading>

          <Text variant="muted" className="mb-8">
            A summary of my academic and professional journey. You can find the complete version below.
          </Text>

          <div className="mb-8">
            <Text>
              You can find my complete CV{" "}
              <Link
                href="/files/CV_subhodeep.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-500 hover:underline"
              >
                here
              </Link>.
            </Text>
          </div>

          {/* Employment */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Briefcase className="w-5 h-5 text-purple-500" />
              <TextHeading as="h2" weight="bold">
                Employment
              </TextHeading>
            </div>

            <div className="flex flex-col gap-3">
              <div className="grid grid-cols-[auto_1fr_auto] items-start gap-x-2">
                <Text>•</Text>
                <Text>Postdoctoral Researcher, Department of Physics, IIT Gandhinagar</Text>
                <Text variant="muted" className="whitespace-nowrap">Jun 2026 – Ongoing!</Text>
              </div>
              <div className="grid grid-cols-[auto_1fr_auto] items-start gap-x-2">
                <Text>•</Text>
                <Text>Postdoctoral Researcher, Centre for Strings, Gravitation and Cosmology, IIT Madras</Text>
                <Text variant="muted" className="whitespace-nowrap">Apr 2024 – May 2026</Text>
              </div>
              <div className="grid grid-cols-[auto_1fr_auto] items-start gap-x-2">
                <Text>•</Text>
                <Text>Research Fellow, Centre for Theoretical Physics, Jamia Millia Islamia</Text>
                <Text variant="muted" className="whitespace-nowrap">Feb 2023 – Mar 2024</Text>
              </div>
              <div className="grid grid-cols-[auto_1fr_auto] items-start gap-x-2">
                <Text>•</Text>
                <Text>Senior Research Fellow and Teaching Assistant, IIIT Allahabad</Text>
                <Text variant="muted" className="whitespace-nowrap">Jul 2021 – Feb 2023</Text>
              </div>
              <div className="grid grid-cols-[auto_1fr_auto] items-start gap-x-2">
                <Text>•</Text>
                <Text>Junior Research Fellow and Teaching Assistant, IIIT Allahabad</Text>
                <Text variant="muted" className="whitespace-nowrap">Jul 2019 – Jul 2021</Text>
              </div>
            </div>
          </div>

          {/* Education */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <GraduationCap className="w-5 h-5 text-purple-500" />
              <TextHeading as="h2" weight="bold">
                Education
              </TextHeading>
            </div>

            <div className="flex flex-col gap-2">
              <div className="grid grid-cols-[auto_1fr_auto] items-start gap-x-2">
                <Text>•</Text>
                <Text>Ph.D. in Physics, IIIT Allahabad</Text>
                <Text variant="muted" className="whitespace-nowrap">2024</Text>
              </div>
              <div className="grid grid-cols-[auto_1fr_auto] items-start gap-x-2">
                <Text>•</Text>
                <Text>M.Sc. in Physics, Jamia Millia Islamia, New Delhi</Text>
                <Text variant="muted" className="whitespace-nowrap">2018</Text>
              </div>
              <div className="grid grid-cols-[auto_1fr_auto] items-start gap-x-2">
                <Text>•</Text>
                <Text>B.Sc. (Honours) in Physics, University of Calcutta, Kolkata</Text>
                <Text variant="muted" className="whitespace-nowrap">2016</Text>
              </div>
            </div>
          </div>

          {/* Skills */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Code className="w-5 h-5 text-purple-500" />
              <TextHeading as="h2" weight="bold">
                Skills
              </TextHeading>
            </div>

            <Text>
              Python, Jupyter, Git, NumPy, Matplotlib, Pandas, SciPy,
              TensorFlow, Keras, Scikit-learn, ONNX, SymPy, C, Fortran,
              Julia, Haskell, Mathematica, Octave, Veusz, Gnuplot,
              LaTeX.
            </Text>
          </div>
        </div>

        <div className="relative w-full aspect-[4/3] sm:aspect-[2/1] md:aspect-[21/9] rounded-lg overflow-hidden my-8">
          <Image
            src="/gulistan_e_ghalib.jpg"
            alt="Gulistan-e-Ghalib"
            fill
            className="object-cover"
            priority
            sizes="(max-width:640px)100vw,(max-width:1024px)90vw,80vw"
          />
        </div>

      </StackVertical>

      <SectionFooter color="purple" showToTop={false} />
    </BaseContainer>
  );
}